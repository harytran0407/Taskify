export function loadDashboardTab() {
    const username = localStorage.getItem('username') || 'Guest';

    const app = document.getElementById('app');

    app.innerHTML=  `
    <div class="dashboard-container">
        <header class="dashboard-header">
            <h1>Welcome back, <span id="dashboard-username">${username}</span> 👋</h1>            
            <div class="dashboard-header-right">
                <div class="avatar-group">
                    <img src="https://i.pravatar.cc/150?u=1" alt="user">
                    <img src="https://i.pravatar.cc/150?u=2" alt="user">
                    <img src="https://i.pravatar.cc/150?u=3" alt="user">
                    <div class="avatar-more">+4</div>
                </div>
                <button class="btn-invite">
                    <i class="fa-solid fa-user-plus"></i> Invite
                </button>
            </div>
        </header>

        <div class="main-content">
            <section class="todo-section card">
                <div class="card-header">
                    <div>
                        <h2 class="title-todo"><i class="fa-regular fa-clipboard"></i> To-Do</h2>
                        <span class="date-text"><span id="current-date"></span> • Today</span>
                    </div>
                    <div class="card-header-right">
                        <!-- ACTIVE bulk -->
                        <div id="bulkActions-active" class="bulk-actions" style="display: none;">
                            <div class="bulk-buttons">
                                <button id="completeBtn-active" class="btn-complete" data-type="active">Complete</button>
                                <button id="deleteBtn-active" class="btn-delete" data-type="active">Delete</button>
                                <button class="btn-selectAll select-all-btn" data-type="active">Select All</button>
                            </div>
                        </div>
                        <!-- ACTIVE bulk end -->

                        <button class="add-task-btn">+ Add task</button>
                    </div>
                    
                    
                </div>
                <span class="selected-count" data-type="active"></span>

                <!-- Task List -->

                <div id="taskList" class="task-list"></div>
                    <p class="empty-task-message">
                        No tasks available. Click + Add task to start!
                    </p>
                
            </section>

            

            <div class="sidebar-content">
                <section class="status-section card">
                    <h2 class="title-todo"><i class="fa-solid fa-chart-pie"></i> Task Status</h2>
                    <div class="status-charts">
                        <div class="chart-item">
                            <div class="ring" style="--percent: 0; --color: #22c55e;">0%</div>
                            <span class="label">● Completed</span>
                        </div>
                        <div class="chart-item">
                            <div class="ring" style="--percent: 0; --color: #3b82f6;">0%</div>
                            <span class="label">● In Progress</span>
                        </div>
                        <div class="chart-item">
                            <div class="ring" style="--percent: 0; --color: #ef4444;">0%</div>
                            <span class="label">● Not Started</span>
                        </div>
                    </div>
                </section>

                <section class="completed-section card">

                    <div class="completed-header">

                        <h2 class="title-todo">
                            <i class="fa-regular fa-square-check"></i>
                            Completed Task
                        </h2>

                        <div class="completed-toolbar">
                            <span class="selected-count" data-type="completed"></span>

                            <div class="completed-actions">

                                <div id="bulkActions-completed" class="bulk-actions" style="display: none;">

                                    <div class="bulk-buttons">

                                        <button class="btn-delete" id="deleteBtn-completed" data-type="completed">Delete</button>
                                        <button class="btn-recomplete" id="recompleteBtn-completed" data-type="completed">Recomplete</button>
                                        <button class="btn-selectAll select-all-btn" data-type="completed">Select All</button>

                                    </div>

                                </div>

                            </div>
                        </div>      

                    </div>

                    <div id="completedTaskList" class="completed-list"></div>

                </section>
            </div>
        </div>
    </div>

    
    
    

    
    `;

    
}