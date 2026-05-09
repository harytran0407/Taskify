import { getSelectedCount }
from '../../state/taskState.js';

export function updateBulkActions(type) {

    

    const bulkContainer =
        document.getElementById(
            `bulkActions-${type}`
        );
    


    if (!bulkContainer) return;

    const selectedCount =
        getSelectedCount(type);

    bulkContainer.style.display =
        selectedCount > 0
            ? 'flex'
            : 'none';
}