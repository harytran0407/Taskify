import { showToast } from '../../../components/toast.js';
export async function markTaskReComplete(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${id}/recomplete`, {
            method: 'PUT',
            headers: {  
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            showToast('success', 'Task marked as Recomplete!');
        }
        window.dispatchEvent(new Event('taskAdded')); // reload
    } catch (err) {
        console.error(err);
    }
}