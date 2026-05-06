import { showToast } from '../../../components/toast.js';

export function setupSaveTask() {
    const saveBtn = document.getElementById('saveTaskBtn');
    const modal = document.getElementById('addTaskModal');

    if (!saveBtn || !modal) return;

    saveBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const mode = modal.dataset.mode;

        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDesc').value.trim();
        const dueDate = document.getElementById('taskDate').value;

        const priority =
            document.querySelector('input[name="priority"]:checked')?.value || 'low';

        // ================= VALIDATE =================
        if (!title || !dueDate) {
            showToast('error', 'Vui lòng điền vào những ô còn thiếu!');
            return;
        }

        try {

            // ================= ADD =================
            if (mode === 'add') {
                const response = await fetch('http://localhost:3000/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ title, description, dueDate, priority })
                });

                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message || 'Không thể tạo task');
                }

                showToast('success', 'Tạo task thành công!');
                window.dispatchEvent(new Event('taskAdded'));
            }

            // ================= EDIT =================
            if (mode === 'edit') {
                const id = modal.dataset.id;

                if (!id) {
                    showToast('error', 'Không tìm thấy ID task!');
                    return;
                }

                const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ title, description, dueDate, priority })
                });

                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message || 'Không thể cập nhật task');
                }

                showToast('success', 'Cập nhật task thành công!');
                window.dispatchEvent(new Event('taskUpdated'));
            }

            // ================= RESET MODAL =================
            modal.dataset.mode = 'add';
            delete modal.dataset.id;

            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDesc').value = '';
            document.getElementById('taskDate').value = '';

            document.querySelectorAll('input[name="priority"]').forEach(r => {
                r.checked = false;
            });

            modal.style.display = 'none';

        } catch (error) {
            console.error(error);
            showToast('error', error.message || 'Có lỗi xảy ra!');
        }
    });
}