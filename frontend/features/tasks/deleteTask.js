import { showToast } from '../../components/toast.js';
export async function deleteTask(id) {
    try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                showToast('success', 'Task deleted successfully!');
            }
            window.dispatchEvent(new Event('taskAdded')); // reload
        } catch (err) {
            console.error(err);
        }
    
}
