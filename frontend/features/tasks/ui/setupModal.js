export function setupModal() {
    const modal = document.getElementById('addTaskModal');
    if (!modal) return;

    const closeModalBtn = document.getElementById('closeModal');

    // OPEN ADD MODAL
    document.querySelectorAll('.add-task-btn, .empty-task-message')
        .forEach(el => {
            el.addEventListener('click', () => {
                modal.dataset.mode = 'add';
                
                delete modal.dataset.id;
                document.getElementById('modalTitle').textContent = 'Add New Task';
                document.getElementById('saveTaskBtn').textContent = 'Save Task';
                document.getElementById('taskTitle').value = '';
                // reset form
                document.getElementById('taskDate').value = '';
                document.getElementById('taskDesc').value = '';

                modal.style.display = 'flex';
                document.querySelectorAll('input[name="priority"]').forEach(r => r.checked = false);
            });
        });

    // CLOSE BUTTON
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // CLICK OUTSIDE
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}