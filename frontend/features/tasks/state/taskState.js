const state = {

    activeSelected: new Set(),

    completedSelected: new Set()
};


/* ================= GET SET ================= */

function getSet(type = 'active') {

    return type === 'completed'
        ? state.completedSelected
        : state.activeSelected;
}


/* ================= TOGGLE ================= */

export function toggleTask(id, type = 'active') {

    const selectedSet = getSet(type);

    if (selectedSet.has(String(id))) {

        selectedSet.delete(String(id));

    } else {

        selectedSet.add(String(id));
    }
}


/* ================= CLEAR ================= */

export function clearSelection(type = 'active') {

    getSet(type).clear();
}


/* ================= GETTERS ================= */

export function getSelectedTasks(type = 'active') {

    return [...getSet(type)];
}


export function getSelectedSet(type = 'active') {

    return getSet(type);
}


export function isSelected(id, type = 'active') {

    return getSet(type).has(String(id));
}


export function getSelectedCount(type = 'active') {

    return getSet(type).size;
}


/* ================= SELECT ALL ================= */

export function selectAllTasks(tasks, type = 'active') {

    const selectedSet = getSet(type);

    tasks.forEach(task => {

        selectedSet.add(String(task.id));
    });
}