export function filterTaskByDate(tasks, selectedDate) {

    return tasks.filter(task => {

        if (!task.due_date) return false;

        return (
            task.due_date.split('T')[0] === selectedDate
        );
    });
}