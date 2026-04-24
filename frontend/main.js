
import { updateDateTime } from './features/utils/dateUtils.js';
import { setupTabSwitching, loadTab } from './features/tabs/tabController.js';
import { setupLogout } from './features/auth/logout.js';
import { setupAuthUI } from './features/auth/auth.js';


// chạy thời gian
updateDateTime();
setInterval(updateDateTime, 1000);

// Setup UI và logout
setupAuthUI();
setupLogout();

// Setup tabs
setupTabSwitching();

// Load tab mặc định
loadTab('dashboard');