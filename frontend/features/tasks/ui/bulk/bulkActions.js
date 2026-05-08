import { getSelectedCount } from '../../state/taskState.js';

export function updateBulkActions() {

    const bulk = document.getElementById('bulkActions');

    const countTasks = document.querySelector('.selected-count');

    if (!bulk || !countTasks) return;

    const count = getSelectedCount();

    if (count > 0) {

        // show bulk buttons
        bulk.style.display = 'flex';

        // show selected count
        countTasks.style.display = 'inline-flex';

        countTasks.textContent =`(${count}) selected`;

    } else {

        // hide bulk buttons
        bulk.style.display = 'none';

        // hide selected count
        countTasks.style.display = 'none';
    }
}