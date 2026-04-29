export function editTask(id) {
    const title = prompt('Enter new title:');
    const description = prompt('Enter new description:');
    const dueDate = prompt('Enter new due date (YYYY-MM-DD):');
    const priority = prompt('Enter new priority (Low, Medium, High):');
    
    if (title && dueDate && priority) {
        fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, dueDate, priority })
        }).then(() => {
            window.dispatchEvent(new Event('taskAdded')); // reload
        }).catch(err => console.error(err));
    } else {
        alert('Title, Due Date, and Priority are required.');
    }
}