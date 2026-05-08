export function splitTasks(tasks) {
    return {
        active: tasks.filter(t => t.status !== 'completed'),
        completed: tasks.filter(t => t.status === 'completed')
    };
}

export function formatStatus(status) {
    if (status === 'pending') return '<span class="red-text">Not Started</span>';
    if (status === 'in_progress') return '<span class="blue-text">In Progress</span>';
    if (status === 'completed') return '<span class="green-text">Completed</span>';
    return status;
}

export function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
}

export function formatPriority(priority) {
    if (priority === 'extreme') return '<span class="red-text">Extreme</span>';
    if (priority === 'moderate') return '<span class="blue-text">Moderate</span>';
    return '<span class="green-text">Low</span>';
}

export function getPriorityClass(priority) {
    if (priority === 'extreme') return 'priority-high';
    if (priority === 'moderate') return 'priority-medium';
    return 'priority-low';
}