import { loadDashboardTab } from './dashboard.js';
import { loadInformationTab } from './information.js';

// Tab switching functionality
export function setupTabSwitching() {
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    const tabContents = document.querySelectorAll('.tab-content');

    menuItems.forEach(item => {
        item.addEventListener('click', function () {

            // active menu
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // hide all tabs
            tabContents.forEach(tab => tab.classList.remove('active'));

            // show selected tab
            const tabId = this.getAttribute('data-tab');
            if (tabId === 'dashboard') {
                loadDashboardTab();
            } else if (tabId === 'information') {
                loadInformationTab();
            }
            const activeTab = document.getElementById(`${tabId}-content`);

            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
}

// Initialize tab switching on page load
export function initializeTabs() {
    const allTabs = document.querySelectorAll('.tab-content');

    allTabs.forEach(tab => tab.classList.remove('active'));

    const defaultTab = document.getElementById('dashboard-content');
    if (defaultTab) {
        defaultTab.classList.add('active');
    }
}
