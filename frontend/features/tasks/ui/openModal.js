export function addTaskModal() {
    const modal = document.getElementById('addTaskModal');
    if (!modal) return;
    modal.style.display = 'flex';
}

export function editTaskModal(task) {
    const modal = document.getElementById('addTaskModal');
    const saveBtn = document.getElementById('saveTaskBtn');
    const modalTitle = document.getElementById('modalTitle');

    if (!modal || !task) return;

    modal.dataset.mode = 'edit';
    modal.dataset.id = task.id;

    modalTitle.textContent = 'Edit Task';
    saveBtn.textContent = 'Update Task';

    document.getElementById('taskTitle').value = task.title || '';
    document.getElementById('taskDesc').value = task.description || '';
    document.getElementById('taskDate').value = formatDateForInput(task.due_date) || '';

    document.querySelectorAll('input[name="priority"]').forEach(radio => {
        radio.checked = radio.value === task.priority;
    });

    modal.style.display = 'flex';
}

const formatDateForInput = (dateStr) => { if (!dateStr) return ''; return dateStr.split('T')[0]; };