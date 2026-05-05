import { formatDate, formatPriority, formatStatus, getPriorityClass } from '../utils/taskUtils.js';
import { isSelected } from '../state/taskState.js';

export function renderTasks(tasks, container) {
    container.innerHTML = tasks.map(task => {

        return `
        <div class="task-card">
            <div class="task-row">

                <div class="status-circle ${getPriorityClass(task.priority)} 
                    ${isSelected(task.id) ? 'selected' : ''}" 
                    data-id="${task.id}">

                    <i class="fa-solid fa-check check-icon"></i>
                </div>

                <div class="task-content">
                    <h3>${task.title}</h3>
                    <p>${task.description || ''}</p>

                    <div class="task-meta">
                        <span>Priority: ${formatPriority(task.priority)}</span>
                        <span>Status: ${formatStatus(task.status)}</span>
                        <span>Due: ${formatDate(task.due_date)}</span>
                    </div>
                </div>

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
