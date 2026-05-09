import {
    areAllTasksSelected,
    getSelectedCount,
    getSelectedTasks
} from '../../state/taskState.js';


export function getTasksByType(tasks, type) {

    return tasks.filter(task => {

        if (type === 'active') {
            return task.status !== 'completed';
        }

        return task.status === 'completed';
    });
}


export function updateSelectAllButton(tasks, type) {

    const button = document.querySelector(
        `.select-all-btn[data-type="${type}"]`
    );

    if (!button) return;

    const allSelected =
        areAllTasksSelected(tasks, type);

    button.textContent =
        allSelected
            ? 'Unselect All'
            : 'Select All';

    button.classList.toggle(
        'all-selected',
        allSelected
    );
}


export function updateSelectedCount(type) {

    const countElement = document.querySelector(
        `.selected-count[data-type="${type}"]`
    );
    console.log(type);
console.log(countElement);
console.log(getSelectedCount(type));

    if (!countElement) return;

    const count = getSelectedCount(type);

    countElement.textContent = count > 0 ? `(${count}) selected` : '';
}


export function getSelectedTasksInGroup(tasks, type) {

    const selectedIds = getSelectedTasks(type);

    return tasks.filter(task =>
        selectedIds.includes(String(task.id))
    );
}