import { getTasks } from '../../api/taskApi.js';
import { deleteTask } from './deleteTask.js';
import { markTaskComplete } from './completeTask.js';

/* ================= STATE ================= */
const selectedTasks = new Set();

/* ================= MAIN ================= */
export async function loadTasks() {
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedTaskList');
    const emptyMessage = document.querySelector('.empty-task-message');

    try {
        const res = await getTasks();
        const tasks = Array.isArray(res) ? res : (res.tasks || res.data || []);

        if (!tasks.length) {
            taskList.innerHTML = '';
            completedList.innerHTML = '';

            if (emptyMessage) emptyMessage.style.display = 'block';
            return;
        }

        if (emptyMessage) emptyMessage.style.display = 'none';

        const activeTasks = tasks.filter(t => t.status !== 'completed');
        const completedTasks = tasks.filter(t => t.status === 'completed');

        renderTasks(activeTasks, taskList);
        renderTasks(completedTasks, completedList);

    } catch (error) {
        console.error(error);
        taskList.innerHTML = '<p>Lỗi khi tải task</p>';
    }
}

/* ================= RENDER ================= */
function renderTasks(tasks, container) {
    container.innerHTML = tasks.map(task => {
        const date = formatDate(task.due_date);

        return `
        <div class="task-card">
    <div class="task-row">

        <!-- LEFT -->
        <div class="status-circle ${getPriorityClass(task.priority)} 
            ${selectedTasks.has(task.id) ? 'selected' : ''}" 
            data-id="${task.id}">

            <i class="fa-solid fa-check check-icon"></i>
        </div>

        <!-- CENTER -->
        <div class="task-content">
            <h3>${task.title}</h3>
            <p>${task.description || ''}</p>

            <div class="task-meta">
                <span>Priority: ${formatPriority(task.priority)}</span>
                <span>Status: ${formatStatus(task.status)}</span>
                <span>Due: ${formatDate(task.due_date)}</span>
            </div>
        </div>

        <!-- RIGHT -->
        <div class="task-right">
            <div class="menu">
                <span class="menu-btn" data-id="${task.id}">⋯</span>
                <div class="dropdown" id="menu-${task.id}">
                    <div class="edit-task" data-id="${task.id}">Edit</div>
                    <div class="delete-task" data-id="${task.id}">Delete</div>
                </div>
            </div>

        </div>

    </div>
</div>
        `;
    }).join('');
}

/* ================= EVENTS ================= */
document.addEventListener('click', async (e) => {

    /* ===== SELECT TASK ===== */
    const circle = e.target.closest('.status-circle');
    if (circle) {
        const id = circle.dataset.id;

        if (selectedTasks.has(id)) {
            
            selectedTasks.delete(id);
            circle.classList.remove('selected');
        } else {
            selectedTasks.add(id);
            circle.classList.add('selected');
        }

        updateBulkActions();
        
    }

    /* ===== MENU TOGGLE ===== */
    if (e.target.classList.contains('menu-btn')) {
        const id = e.target.dataset.id;
        const menu = document.getElementById(`menu-${id}`);

        const isOpen = menu.style.display === 'block';

        document.querySelectorAll('.dropdown').forEach(m => m.style.display = 'none');

        menu.style.display = isOpen ? 'none' : 'block';
    }

    /* ===== EDIT ===== */
    if (e.target.classList.contains('edit-task')) {
        const id = e.target.dataset.id;
        console.log('Edit task:', id);
    }

    /* ===== DELETE SINGLE ===== */
    if (e.target.classList.contains('delete-task')) {
        const id = e.target.dataset.id;
        if (!confirm('Are you sure you want to delete this task?')) return;
        await deleteTask(id);
        loadTasks();
    }

    /* ===== CLICK OUTSIDE ===== */
    if (!e.target.closest('.menu')) {
        document.querySelectorAll('.dropdown').forEach(m => m.style.display = 'none');
    }
});

/* ================= BULK ACTION ================= */
function updateBulkActions() {
    const bulk = document.getElementById('bulkActions');
    const count = document.querySelector('.selected-count');

    if (!bulk) return;

    if (selectedTasks.size > 0) {
        bulk.style.display = 'flex';
        if (count) count.textContent = `${selectedTasks.size} selected`;
    } else {
        bulk.style.display = 'none';
    }
}

/* ===== COMPLETE MULTIPLE ===== */
document.addEventListener('click', async (e) => {

    // ===== DELETE MULTIPLE =====
    if (e.target.closest('#deleteBtn')) {

        if (selectedTasks.size === 0) return;

        if (!confirm(`Delete ${selectedTasks.size} tasks?`)) return;

        try {
            await Promise.all(
                [...selectedTasks].map(id => deleteTask(Number(id)))
            );

            selectedTasks.clear();
            updateBulkActions();
            loadTasks();

        } catch (err) {
            console.error(err);
        }
    }

    // ===== COMPLETE MULTIPLE =====
    if (e.target.closest('#completeBtn')) {

        if (selectedTasks.size === 0) return;

        try {
            await Promise.all(
                [...selectedTasks].map(id => markTaskComplete(Number(id)))
            );

            selectedTasks.clear();
            updateBulkActions();
            loadTasks();

        } catch (err) {
            console.error(err);
        }
    }

});

/* ================= HELPERS ================= */
function formatStatus(status) {
    if (status === 'pending') return '<span class="orange-text">Pending</span>';
    if (status === 'in_progress') return '<span class="blue-text">In Progress</span>';
    if (status === 'completed') return '<span class="green-text">Completed</span>';
    return status;
}

function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
}

function formatPriority(priority) {
    if (priority === 'extreme') return '<span class="red-text">Extreme</span>';
    if (priority === 'moderate') return '<span class="blue-text">Moderate</span>';
    return '<span class="green-text">Low</span>';
}

function getPriorityClass(priority) {
    if (priority === 'extreme') return 'priority-high';
    if (priority === 'moderate') return 'priority-medium';
    return 'priority-low';
}

/* ================= AUTO RELOAD ================= */
window.addEventListener('taskAdded', loadTasks);