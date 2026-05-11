import {
    clearSelection,
    getSelectedTasks,
    selectAllTasks,
    toggleTask,
    areAllTasksSelected
} from '../../state/taskState.js';

import {
    getTasksByType,
    updateSelectAllButton,
    updateSelectedCount
} from './taskSelectionHelpers.js';

import { deleteTask } from '../../services/deleteTask.js';
import { markTaskComplete } from '../../services/completeTask.js';
import { markTaskReComplete } from '../../services/reComplete.js';

import { updateBulkActions } from './bulkActions.js';


/* ================= SELECT TASK ================= */

export function handleSelectTask(circle, tasks) {

    const id = circle.dataset.id;

    const type = circle.dataset.type;

    toggleTask(id, type);
    updateSelectedCount(type);  

    circle.classList.toggle('selected');    

    const filteredTasks =
        getTasksByType(tasks, type);

    updateSelectAllButton(filteredTasks, type);

      

    updateBulkActions(type);
}


/* ================= SELECT ALL ================= */

export function handleSelectAll(tasks, type) {
    
    const filteredTasks =
        getTasksByType(tasks, type);

    const allSelected =
        areAllTasksSelected(filteredTasks, type);

    if (allSelected) {

        clearSelection(type);

    } else {

        clearSelection(type);

        selectAllTasks(filteredTasks, type);
    }

    rerenderSectionSelection(type);

    updateSelectedCount(type);

    updateSelectAllButton(filteredTasks, type);

    updateBulkActions(type);
}


/* ================= RERENDER SECTION ================= */

function rerenderSectionSelection(type) {

    document
        .querySelectorAll(
            `.status-circle[data-type="${type}"]`
        )
        .forEach(circle => {

            const id = circle.dataset.id;

            const selected =
                getSelectedTasks(type)
                    .includes(String(id));

            circle.classList.toggle(
                'selected',
                selected
            );
        });
}


/* ================= BULK DELETE ================= */

export async function handleBulkDelete(
    loadTasks,
    type
) {

    const ids = getSelectedTasks(type);

    if (!ids.length) return;

    if (!confirm(`Delete ${ids.length} tasks?`)) {
        return;
    }

    await Promise.all(
        ids.map(id => deleteTask(Number(id)))
    );

    clearSelection(type);

    updateBulkActions(type);

    await loadTasks();
}


/* ================= BULK COMPLETE ================= */

export async function handleBulkComplete(
    loadTasks,
    type
) {

    const ids = getSelectedTasks(type);

    if (!ids.length) return;

    await Promise.all(
        ids.map(id => markTaskComplete(Number(id)))
    );

    clearSelection(type);

    updateBulkActions(type);

    await loadTasks();
}

export async function handleBulkReComplete(
    loadTasks,
    type
) {

    const ids = getSelectedTasks(type);

    if (!ids.length) return;

    await Promise.all(
        ids.map(id => markTaskReComplete(Number(id)))
    );

    clearSelection(type);

    updateBulkActions(type);

    await loadTasks();
}