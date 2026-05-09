import { formatDate, formatPriority, formatStatus, getPriorityClass } from '../../utils/taskUtils.js';

export function renderTaskDetail(task) {

    return `
        <div class="task-detail">

            <div>

                <div class="task-detail-header">

                    <div class="task-detail-top">

                        <div class="task-detail-image">
                            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" />
                        </div>

                        <div class="task-detail-title">

                            <h1>${task.title}</h1>

                            <div class="task-detail-info">

                                <p>
                                    Priority:
                                    <span class="priority-text">
                                        ${formatPriority(task.priority)}
                                    </span>
                                </p>

                                <p>
                                    Status:
                                    <span class="status-text">
                                        ${formatStatus(task.status)}
                                    </span>
                                </p>

                                <p>
                                    Due:
                                    <span class="dueDate-text">
                                        ${formatDate(task.due_date)}
                                    </span>
                                    
                                </p>

                            </div>

                        </div>

                    </div>

                    <button id="closeDetailBtn">
                        Go Back
                    </button>

                </div>

                <div class="task-detail-description">
                    ${task.description || 'No description'}
                </div>

            </div>

            <div class="task-detail-actions">

                <button class="delete-task" data-id="${task.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>

                <button class="edit-task" data-id="${task.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>

                ${task.status === "completed"
                    ? `
                        <button disabled class="completed-btn">
                            <i class="fa-solid fa-rotate-right"></i>
                        </button>
                    `
                    : `
                        <button class="complete-task" data-id="${task.id}">
                            <i class="fa-solid fa-circle-check"></i>
                        </button>
                    `
                }

            </div>

        </div>
    `;
}