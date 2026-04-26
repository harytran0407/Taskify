import { getTasks } from '../../api/taskApi.js';

export async function loadTasks() {
    const taskList = document.getElementById('taskList');
    const emptyMessage = document.querySelector('.empty-task-message');

    try {
        const res = await getTasks();
        const tasks = Array.isArray(res) ? res : (res.tasks || res.data || []);

        if (!tasks.length) {
            taskList.innerHTML = '';

            if (emptyMessage) {
                emptyMessage.style.display = 'block';
            }

            return;
        }

        if (emptyMessage) {
            emptyMessage.style.display = 'none';
        }

        taskList.innerHTML = tasks.map(task => {
            const priorityColor = getPriorityColor(task.priority);
            const priorityText = formatPriority(task.priority);
            const date = formatDate(task.due_date);

            return `
                <div class="border-box">
                    <div class="task-body">

                        <!-- ICON -->
                        <div class="icon-status">
                            ${priorityColor}
                        </div>

                        <!-- INFO -->
                        <div class="task-info">
                            <h3>${task.title}</h3>
                            <p>${task.description || ''}</p>

                            <div class="task-footer">
                                <span>Priority: ${priorityText}</span>
                                <span>Status: <span class="blue-text">In Progress</span></span>
                                <span>Due: ${date}</span>
                            </div>
                        </div>

                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error(error);
        if (!taskList.innerHTML.trim()) {
                taskList.innerHTML = '<p>Lỗi khi tải task</p>';
    }    
}
}

// Tải lại task khi có sự kiện 'taskAdded' được dispatch
window.addEventListener('taskAdded', loadTasks);

/* ===== Helper functions (viết luôn trong file) ===== */

function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
}

function formatPriority(priority) {
    if (priority === 'extreme') return '<span class="red-text">Extreme</span>';
    if (priority === 'moderate') return '<span class="blue-text">Moderate</span>';
    return '<span>Low</span>';
}

function getPriorityColor(priority) {
    if (priority === 'extreme') return '🔴';
    if (priority === 'moderate') return '🔵';
    return '🟢';
}