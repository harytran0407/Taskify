// ==============================
// TAB CONTROLLER (CLEAN VERSION)
// ==============================

import { loadDashboardTab } from '../dashboard/dashboardView.js';
import { loadTasks } from '../tasks/loadTask.js';
import { setupModal } from '../tasks/ui/modal/setupModal.js';
import { setupSaveTask } from '../tasks/services/saveTask.js';

import { loadInformationTab } from '../user/loadUserInfo.js';
import { editInformationTab } from '../user/userInfo.js';

import { loadChangePasswordTab } from '../user/changePassword.js';
import { setupChangePassword } from '../user/editChangePassword.js';


// ==============================
// LOAD TAB
// ==============================
export function loadTab(tab) {
    const app = document.getElementById("app");

    if (tab === "dashboard") {

        // render UI
        loadDashboardTab();

        // init dashboard features
        loadTasks();
        setupModal();
        setupSaveTask();
    }

    else if (tab === "information") {

        app.innerHTML = loadInformationTab();
        editInformationTab();
    }

    else if (tab === "changePassword") {

        app.innerHTML = loadChangePasswordTab();
        setupChangePassword();
    }
}


// ==============================
// TAB SWITCHING
// ==============================
export function setupTabSwitching() {

    document.addEventListener('click', function (e) {
        const item = e.target.closest('[data-tab]');
        if (!item) return;

        // remove active
        document.querySelectorAll('[data-tab]')
            .forEach(i => i.classList.remove('active'));

        item.classList.add('active');

        const tabId = item.getAttribute('data-tab');
        loadTab(tabId);
    });
}