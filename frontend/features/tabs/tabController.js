import { loadDashboardTab} from '../dashboard/loadDashboard.js';
import { loadTasks } from '../tasks/loadTask.js';
import { setupModal } from '../dashboard/dashboard.js';
import { setupAddTask } from '../tasks/addTask.js';
import { loadInformationTab } from '../user/loadUserInfo.js';
import { editInformationTab } from '../user/userInfo.js';
import { loadChangePasswordTab } from '../user/changePassword.js';
import { setupChangePassword } from '../user/editChangePassword.js';


export function loadTab(tab) {
    const app = document.getElementById("app");

    if (tab === "dashboard") {
        app.innerHTML = loadDashboardTab();
        loadTasks();
        setupModal();
        setupAddTask();
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

export function setupTabSwitching() {
    document.addEventListener('click', function (e) {
        const item = e.target.closest('[data-tab]');
        if (!item) return;

        // active menu
        document.querySelectorAll('[data-tab]').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const tabId = item.getAttribute('data-tab');
        loadTab(tabId);
    });
}