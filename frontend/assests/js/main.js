import { initTodoApp } from './modules/todoController.js';
import { updateDateTime } from './dateUtils.js';
import { initializeTabs, setupTabSwitching } from './tab.js';
import {setupLogout} from './logout.js';
import { setupAuthUI } from './auth.js';
import { loadInformationTab } from './information.js';
import { loadDashboardTab } from './dashboard.js';

// chạy thời gian
updateDateTime();
setInterval(updateDateTime, 1000);

// Setup UI and logout
setupAuthUI();
setupLogout();

// Update information tab only when tab is selected
loadDashboardTab();


// Initialize tabs
initializeTabs();
setupTabSwitching();