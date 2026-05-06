// ==============================
// IMPORT CORE FEATURES
// ==============================
import { updateDateTime } from './features/utils/dateUtils.js';
import { setupTabSwitching, loadTab } from './features/tabs/tabController.js';
import { setupLogout } from './features/auth/logout.js';
import { setupAuthUI } from './features/auth/auth.js';


// ==============================
// CLOCK (REALTIME)
// ==============================
updateDateTime();
setInterval(updateDateTime, 1000);


// ==============================
// AUTH SYSTEM
// ==============================
setupAuthUI();
setupLogout();


// ==============================
// TAB SYSTEM
// ==============================
setupTabSwitching();


// ==============================
// DEFAULT TAB
// ==============================
loadTab('dashboard');