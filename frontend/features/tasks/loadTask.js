import { getTasks } from './services/getTask.js';
import { deleteTask } from './services/deleteTask.js';
import { markTaskComplete } from './services/completeTask.js';

import { renderTasks } from './ui/taskRender.js';
import { renderTaskDetail } from './ui/detail/taskDetailView.js';

import { updateBulkActions } from './ui/bulk/bulkActions.js';

import {
    handleSelectTask,
    handleSelectAll,
    handleBulkDelete,
    handleBulkComplete
} from './ui/bulk/bulkHandlers.js';

import { splitTasks } from './utils/taskUtils.js';

import { editTaskModal } from './ui/modal/openModal.js';

import { loadDashboardTab } from '../dashboard/dashboardView.js';


/* ================= STATE ================= */

let taskEdit = [];
let currentDetailTaskId = null;


/* ================= HELPERS ================= */

// lấy toàn bộ tasks mới nhất
async function fetchTasks() {

    const res = await getTasks();

    const tasks = Array.isArray(res)
        ? res
        : (res.tasks || res.data || []);

    taskEdit = tasks;

    return tasks;
}


// render dashboard list
function renderTaskLists(tasks) {

    const taskList =
        document.getElementById('taskList');

    const completedList =
        document.getElementById('completedTaskList');

    const emptyMessage =
        document.querySelector('.empty-task-message');

    // đang ở detail
    if (!taskList || !completedList) return;

    const { active, completed } =
        splitTasks(tasks);

    /* ================= ACTIVE ================= */

    if (active.length === 0) {

        taskList.innerHTML = '';

        if (emptyMessage) {
            emptyMessage.style.display = 'block';
        }

    } else {

        if (emptyMessage) {
            emptyMessage.style.display = 'none';
        }

        renderTasks(active, taskList);
    }

    /* ================= COMPLETED ================= */

    renderTasks(completed, completedList);

    updateBulkActions('active');
    updateBulkActions('completed');
}


// render detail
function renderDetail(task) {

    const app = document.getElementById('app');

    if (!app) return;

    app.innerHTML = renderTaskDetail(task);
}


// reload detail nếu đang ở detail
async function refreshDetailView() {

    if (!currentDetailTaskId) return false;

    const tasks = await fetchTasks();

    const updatedTask = tasks.find(
        t => t.id == currentDetailTaskId
    );

    // task bị xóa
    if (!updatedTask) {

        currentDetailTaskId = null;

        await loadDashboardTab();

        renderTaskLists(tasks);

        return true;
    }

    renderDetail(updatedTask);

    return true;
}


// emit update
function emitTaskUpdated() {

    window.dispatchEvent(
        new Event('taskUpdated')
    );
}


/* ================= LOAD TASKS ================= */

export async function loadTasks() {

    try {

        const tasks = await fetchTasks();

        renderTaskLists(tasks);

    } catch (error) {

        console.error(error);

        const taskList =
            document.getElementById('taskList');

        if (taskList) {
            taskList.innerHTML =
                '<p>Lỗi khi tải task</p>';
        }
    }
}


/* ================= EVENTS ================= */

let isBound = false;

if (!isBound) {

    document.addEventListener('click', async (e) => {

        /* ================= MENU TOGGLE ================= */

        if (e.target.classList.contains('menu-btn')) {

            const id = e.target.dataset.id;

            const menu =
                document.getElementById(`menu-${id}`);

            if (!menu) return;

            const isOpen =
                menu.style.display === 'block';

            document
                .querySelectorAll('.dropdown')
                .forEach(m => {
                    m.style.display = 'none';
                });

            menu.style.display =
                isOpen ? 'none' : 'block';

            return;
        }


        /* ================= GO BACK ================= */

        if (e.target.closest('#closeDetailBtn')) {

            currentDetailTaskId = null;

            await loadDashboardTab();

            await loadTasks();

            return;
        }


        /* ================= DELETE TASK ================= */

        const deleteBtn =
            e.target.closest('.delete-task');

        if (deleteBtn) {

            const id = deleteBtn.dataset.id;

            if (!confirm('Delete task?')) return;

            await deleteTask(id);

            emitTaskUpdated();

            return;
        }


        /* ================= EDIT TASK ================= */

        const editBtn =
            e.target.closest('.edit-task');

        if (editBtn) {

            const id = editBtn.dataset.id;

            const task = taskEdit.find(
                t => t.id == id
            );

            if (!task) return;

            editTaskModal(task);

            return;
        }


        /* ================= COMPLETE TASK ================= */

        const completeBtn =
            e.target.closest('.complete-task');

        if (completeBtn) {

            const id = completeBtn.dataset.id;

            const task = taskEdit.find(
                t => t.id == id
            );

            if (!task) return;

            if (task.status === 'completed') {

                alert('Task already completed');

                return;
            }

            await markTaskComplete(id);

            emitTaskUpdated();

            return;
        }


        /* ================= SELECT TASK ================= */

        const circle =
            e.target.closest('.status-circle');

        if (circle) {

            handleSelectTask(circle, taskEdit);

            return;
        }


        /* ================= SELECT ALL ================= */

        const selectBtn =
            e.target.closest('.select-all-btn');

        if (selectBtn) {

            const type =
                selectBtn.dataset.type;

            handleSelectAll(taskEdit, type);

            return;
        }


        /* ================= BULK DELETE ACTIVE ================= */

        if (e.target.closest('#deleteBtn-active')) {
            await handleBulkDelete(loadTasks, 'active');
            return;
        }

        /* ================= BULK COMPLETE ACTIVE ================= */

        if (e.target.closest('#completeBtn-active')) {
            await handleBulkComplete(loadTasks, 'active');
            return;
        }

        /* ================= BULK DELETE COMPLETED ================= */

        if (e.target.closest('#deleteBtn-completed')) {
            await handleBulkDelete(loadTasks, 'completed');
            return;
        }

        /* ================= BULK RECOMPLETE COMPLETED ================= */

        if (e.target.closest('#recompleteBtn-completed')) {
            await handleBulkComplete(loadTasks, 'completed');
            return;
        }




        /* ================= CLICK OUTSIDE MENU ================= */

        if (!e.target.closest('.menu')) {

            document
                .querySelectorAll('.dropdown')
                .forEach(m => {
                    m.style.display = 'none';
                });
        }


        /* ================= TASK DETAIL ================= */

        const blocked =
            e.target.closest('.menu-btn') ||
            e.target.closest('.status-circle') ||
            e.target.closest('.edit-task') ||
            e.target.closest('.delete-task') ||
            e.target.closest('.dropdown') ||
            e.target.closest('.complete-task');

        if (blocked) return;

        const taskCard =
            e.target.closest('.task-card');

        if (!taskCard) return;

        const id = taskCard.dataset.id;

        const task = taskEdit.find(
            t => t.id == id
        );

        if (!task) return;

        currentDetailTaskId = id;

        renderDetail(task);
    });

    isBound = true;
}


/* ================= AUTO RELOAD ================= */

window.addEventListener(
    'taskAdded',
    loadTasks
);


window.addEventListener(
    'taskUpdated',
    async () => {

        const refreshed =
            await refreshDetailView();

        // đang ở dashboard
        if (!refreshed) {
            await loadTasks();
        }
    }
);