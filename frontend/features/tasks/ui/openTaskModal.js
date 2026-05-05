export function openTaskModal() {
    const modal = document.getElementById('addTaskModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (!modal) return;

    // mở modal (gộp nhiều trigger)
    document.querySelectorAll('.add-task-btn, .empty-task-message')
        .forEach(el => {
            el.addEventListener('click', () => {
                modal.style.display = 'flex';
            });
        });

    // đóng modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // click ra ngoài
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}