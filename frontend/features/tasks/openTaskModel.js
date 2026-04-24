export function openTaskModal() {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const emptyMessage = document.querySelector('.empty-task-message');
    const modal = document.getElementById('addTaskModal');
    const closeModalBtn = document.getElementById('closeModal');

    addTaskBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    emptyMessage.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
