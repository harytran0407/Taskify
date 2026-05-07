import { getTasks } from './services/getTask.js';
import { deleteTask } from './services/deleteTask.js';
import { renderTasks } from './ui/taskRender.js';
import { updateBulkActions } from './ui/bulk/bulkActions.js';
import { splitTasks } from './utils/taskUtils.js';
import { editTaskModal } from './ui/modal/openModal.js';
import { toggleTask, getSelectedSet } from './state/taskState.js';
import {
    handleSelectTask,
    handleSelectAll,
    handleBulkDelete,
    handleBulkComplete
} from './ui/bulk/bulkHandlers.js';
let taskEdit=[];
/* ================= MAIN ================= */
export async function loadTasks() {
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedTaskList');
    const emptyMessage = document.querySelector('.empty-task-message');
    

    try {
        const res = await getTasks();
        const tasks = Array.isArray(res) ? res : (res.tasks || res.data || []);
        taskEdit = tasks;

        const { active, completed } = splitTasks(tasks);

        // ===== ACTIVE TASKS =====
        if (active.length === 0) {
            taskList.innerHTML = '';
            if (emptyMessage) emptyMessage.style.display = 'block';
        } else {
            if (emptyMessage) emptyMessage.style.display = 'none';
            renderTasks(active, taskList);
        }

        // ===== COMPLETED TASKS =====
        renderTasks(completed, completedList);

        // ===== SYNC BULK UI =====
        updateBulkActions();

    } catch (error) {
        console.error(error);
        taskList.innerHTML = '<p>Lỗi khi tải task</p>';
    }
}

/* ================= EVENTS ================= */
let isBound = false;

if (!isBound) {
    document.addEventListener('click', async (e) => {

        

        /* ===== MENU TOGGLE ===== */
        if (e.target.classList.contains('menu-btn')) {
            const id = e.target.dataset.id;
            const menu = document.getElementById(`menu-${id}`);

            const isOpen = menu.style.display === 'block';
            document.querySelectorAll('.dropdown').forEach(m => m.style.display = 'none');

            menu.style.display = isOpen ? 'none' : 'block';
            return;
        }

        /* ===== DELETE MENU ===== */        
        const deleteBtn = e.target.classList.contains('delete-task');

        if (deleteBtn) {
            const id = e.target.dataset.id;

            if (!confirm('Delete task?')) return;

            await deleteTask(id);
            loadTasks();
            return;
        }

        /* ===== EDIT MENU ===== */
        const editBtn = e.target.closest('.edit-task');

        if (editBtn) {
            const id = editBtn.dataset.id;

            const task = taskEdit.find(t => t.id == id);
            if (!task) return;
            editTaskModal(task);
            return;
        }

        /* ===== CLICK OUTSIDE MENU ===== */
        if (!e.target.closest('.menu')) {
            document.querySelectorAll('.dropdown').forEach(m => m.style.display = 'none');
        }

        /* ===== SELECT TASK ===== */
        const circle = e.target.closest('.status-circle');
        if (circle) {
            handleSelectTask(circle, taskEdit);
            return;
        }

        /* ==== SELECT ALL ==== */
        if (e.target.closest('#selectAllBtn')){
            handleSelectAll(taskEdit);
            return;
        }

        /* ===== BULK DELETE ===== */
        if (e.target.closest('#deleteBtn')) {
            await handleBulkDelete(loadTasks);
            return;
        }

        /* ===== BULK COMPLETE ===== */
        if (e.target.closest('#completeBtn')) {
            await handleBulkComplete(loadTasks);
            return;
        }

    });

    isBound = true;
}

/* ================= AUTO RELOAD ================= */
window.addEventListener('taskAdded', loadTasks);
window.addEventListener('taskUpdated', loadTasks);