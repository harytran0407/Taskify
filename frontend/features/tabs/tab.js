import { loadDashboardTab } from '../dashboard/dashboard.js';
import { loadInformationTab } from '../user/userInfo.js';
import { editInformationTab } from '../user/editUserInfo.js';

export function loadTab(tab) {
    const app = document.getElementById("app");

    if (tab === "dashboard") {
        app.innerHTML = loadDashboardTab();
    }

    if (tab === "information") {
        app.innerHTML = loadInformationTab();
        editInformationTab();
    }
}

export function setupTabSwitching() {
    const menuItems = document.querySelectorAll('.sidebar-menu li');

    menuItems.forEach(item => {
        item.addEventListener('click', function () {

            // active menu
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            const tabId = this.getAttribute('data-tab');
            loadTab(tabId);
        });
    });
}