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

// task đang mở detail
let currentDetailTaskId = null;


/* ================= LOAD TASKS ================= */

export async function loadTasks() {

    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedTaskList');
    const emptyMessage = document.querySelector('.empty-task-message');

    // đang ở detail page
    if (!taskList || !completedList) return;

    try {

        const res = await getTasks();

        const tasks = Array.isArray(res)
            ? res
            : (res.tasks || res.data || []);

        // normalize
        taskEdit = tasks.map(task => ({
            ...task,
            completed: Number(task.completed)
        }));

        const { active, completed } = splitTasks(taskEdit);

        /* ================= ACTIVE TASKS ================= */

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

        /* ================= COMPLETED TASKS ================= */

        renderTasks(completed, completedList);

        /* ================= BULK UI ================= */

        updateBulkActions();

    } catch (error) {

        console.error(error);

        if (taskList) {
            taskList.innerHTML = '<p>Lỗi khi tải task</p>';
        }
    }
}


/* ================= REFRESH DETAIL ================= */

async function refreshDetailView() {

    // không ở detail
    if (!currentDetailTaskId) return false;

    const res = await getTasks();

    const tasks = Array.isArray(res)
        ? res
        : (res.tasks || res.data || []);

    taskEdit = tasks.map(task => ({
        ...task,
        completed: Number(task.completed)
    }));

    const updatedTask = taskEdit.find(
        t => t.id == currentDetailTaskId
    );

    // task bị xóa
    if (!updatedTask) {

        currentDetailTaskId = null;

        await loadDashboardTab();
        await loadTasks();

        return true;
    }

    const app = document.getElementById('app');

    if (!app) return false;

    app.innerHTML = renderTaskDetail(updatedTask);

    return true;
}


/* ================= EVENTS ================= */

let isBound = false;

if (!isBound) {

    document.addEventListener('click', async (e) => {

        /* ================= MENU TOGGLE ================= */

        if (e.target.classList.contains('menu-btn')) {

            const id = e.target.dataset.id;

            const menu = document.getElementById(`menu-${id}`);

            if (!menu) return;

            const isOpen = menu.style.display === 'block';

            document
                .querySelectorAll('.dropdown')
                .forEach(m => m.style.display = 'none');

            menu.style.display = isOpen ? 'none' : 'block';

            return;
        }


        /* ================= GO BACK ================= */

        const goBackBtn = e.target.closest('#closeDetailBtn');

        if (goBackBtn) {

            currentDetailTaskId = null;

            await loadDashboardTab();
            await loadTasks();

            return;
        }


        /* ================= DELETE TASK ================= */

        const deleteBtn = e.target.closest('.delete-task');

        if (deleteBtn) {

            const id = deleteBtn.dataset.id;

            if (!confirm('Delete task?')) return;

            await deleteTask(id);

            window.dispatchEvent(
                new Event('taskUpdated')
            );

            return;
        }


        /* ================= EDIT TASK ================= */

        const editBtn = e.target.closest('.edit-task');

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

        const completeBtn = e.target.closest('.complete-task');

        if (completeBtn) {

            const id = completeBtn.dataset.id;

            const task = taskEdit.find(
                t => t.id == id
            );

            if (!task) return;

            // đã complete
            if (Number(task.completed) === 1) {

                alert('Task already completed');

                return;
            }

            await markTaskComplete(id);

            window.dispatchEvent(
                new Event('taskUpdated')
            );

            return;
        }

        /* ================= RECOMPLETE ================= */

        const recompleteBtn = e.target.closest('.recomplete-btn');

        if (recompleteBtn) {

            const type = recompleteBtn.dataset.type;

            await handleBulkComplete(loadTasks, type);

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


        /* ================= SELECT TASK ================= */

        const circle = e.target.closest('.status-circle');

        if (circle) {

            handleSelectTask(circle, taskEdit);

            return;
        }


        /* ================= SELECT ALL ================= */

        const selectBtn = e.target.closest('.select-all-btn');

        if (selectBtn) {
            const type = selectBtn.dataset.type;
            handleSelectAll(taskEdit, type);
            return;
        }


        /* ================= BULK DELETE ================= */

        if (e.target.closest('#deleteBtn')) {

            await handleBulkDelete(loadTasks);

            return;
        }


        /* ================= BULK COMPLETE ================= */

        if (e.target.closest('#completeBtn')) {

            await handleBulkComplete(loadTasks);

            return;
        }


        /* ================= TASK DETAIL ================= */

        const blocked =
            e.target.closest('.menu-btn') ||
            e.target.closest('.status-circle') ||
            e.target.closest('.edit-task') ||
            e.target.closest('.delete-task') ||
            e.target.closest('.dropdown') ||
            e.target.closest('.complete-task');

        if (!blocked) {

            const taskCard = e.target.closest('.task-card');

            if (taskCard) {

                const id = taskCard.dataset.id;

                const task = taskEdit.find(
                    t => t.id == id
                );

                if (!task) return;

                currentDetailTaskId = id;

                const app = document.getElementById('app');

                if (!app) return;

                app.innerHTML = renderTaskDetail(task);
            }

            return;
        }
    });

    isBound = true;
}


/* ================= AUTO RELOAD ================= */

window.addEventListener(
    'taskAdded',
    loadTasks
);


/* ================= TASK UPDATED ================= */

window.addEventListener('taskUpdated', async () => {

    // đang ở detail
    const refreshed = await refreshDetailView();

    // dashboard
    if (!refreshed) {

        await loadTasks();
    }
});