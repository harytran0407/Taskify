export function getTasks() {
    return fetch(`http://localhost:3000/api/tasks/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching tasks:', error);
        throw error;
    });
}