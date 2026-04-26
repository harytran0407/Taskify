import { showToast } from '../../components/toast.js';
export function setupAddTask() {
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDesc');
    const taskDueDateInput = document.getElementById('taskDate');
    const taskErrorMessage = document.getElementById('task-error-message');

    saveTaskBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const title = taskTitleInput.value.trim();
        const description = taskDescriptionInput.value.trim();
        const dueDate = taskDueDateInput.value;

        // 👉 lấy priority TẠI THỜI ĐIỂM CLICK
        const priorityInput = document.querySelector('input[name="priority"]:checked');
        const priority = priorityInput ? priorityInput.value : 'low';

        // ✅ validate
        if (!title || !dueDate) {
            taskErrorMessage.textContent = 'Vui lòng điền vào tất cả các trường bắt buộc.';
            taskErrorMessage.style.display = 'block';
            return;
        }

        taskErrorMessage.style.display = 'none';

        try {
            const response = await fetch('http://localhost:3000/api/tasks/', {
                method: 'POST',
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
                showToast('success', 'Tạo task thành công!');
                window.dispatchEvent(new Event('taskAdded'));
            } else {
                const errorData = await response.json();
                showToast('error', `Lỗi: ${errorData.message || 'Không thể tạo task.'}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            taskErrorMessage.textContent = 'Bị lỗi khi thêm công việc.';
            taskErrorMessage.style.display = 'block';
        }
    });
}