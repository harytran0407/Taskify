//import { showToast } from '../../../components/toast.js';
export function updateTask() {
    const modal = document.getElementById('addTaskModal');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDesc');
    const taskDueDateInput = document.getElementById('taskDate');
    const taskErrorMessage = document.getElementById('task-error-message');

    console.log('ID:', modal.dataset.id);

    saveTaskBtn.addEventListener = async (e) => {
        e.preventDefault();

        if (modal.dataset.mode !== 'edit') return; 
        const id = modal.dataset.id;


        const title = taskTitleInput.value.trim();
        const description = taskDescriptionInput.value.trim();
        const dueDate = taskDueDateInput.value;

        const priorityInput = document.querySelector('input[name="priority"]:checked');
        const priority = priorityInput ? priorityInput.value : 'low';

        if (!title || !dueDate) {
            taskErrorMessage.textContent = 'Vui lòng điền vào tất cả các trường bắt buộc.';
            taskErrorMessage.style.display = 'block';
            return;
        }

        taskErrorMessage.style.display = 'none';
        saveTaskBtn.disabled = true;

        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, description, dueDate, priority })
            });

            if (response.ok) {
                taskTitleInput.value = '';
                taskDescriptionInput.value = '';
                taskDueDateInput.value = '';
                document.getElementById('addTaskModal').style.display = 'none';

                showToast('success', 'Cập nhật task thành công!');
                window.dispatchEvent(new Event('taskUpdated'));
            } else {
                const errorData = await response.json();
                showToast('error', `Lỗi: ${errorData.message || 'Không thể cập nhật task.'}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            taskErrorMessage.textContent = 'Bị lỗi khi cập nhật task.';
            taskErrorMessage.style.display = 'block';
        } finally {
            saveTaskBtn.disabled = false;
        }
    };
}