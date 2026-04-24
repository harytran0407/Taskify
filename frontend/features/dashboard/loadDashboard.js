export function loadDashboardTab() {
    const username = localStorage.getItem('username') || 'Guest';

    return `
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
                    <button class="add-task-btn">+ Add task</button>
                </div>

                <div id="task-list-container">
                    <p class="empty-task-message">
                        No tasks available. Click + Add task to start!
                    </p>
                </div>
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
                    <h2 class="title-todo"><i class="fa-regular fa-square-check"></i> Completed Task</h2>
                    <div id="completed-list-container" class="completed-list">
                        </div>
                </section>
            </div>
        </div>
    </div>
    
    <div id="addTaskModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Add New Task</h2>
                <button class="btn-go-back" id="closeModal">Go Back</button>
            </div>
            
            <div class="modal-body">
                <div class="input-group">
                    <label>Title</label>
                    <input type="text" id="taskTitle" placeholder="Enter task title...">
                </div>

                <div class="input-group">
                    <label>Date</label>
                    <div class="date-input-wrapper">
                        <input type="text" id="taskDate" placeholder="DD/MM/YYYY">
                        <i class="fa-regular fa-calendar"></i>
                    </div>
                </div>

                <div class="priority-group">
                    <label>Priority</label>
                    <div class="priority-options">
                        <label class="custom-radio">                             
                            <span class="dot red"></span> Extreme 
                            <input type="radio" name="priority" value="extreme"> 
                            <span class="square-box"></span>
                        </label>
                        <label class="custom-radio">                             
                            <span class="dot blue"></span> Moderate 
                            <input type="radio" name="priority" value="moderate"> 
                            <span class="square-box"></span>
                        </label>
                        <label class="custom-radio">                             
                            <span class="dot green"></span> Low 
                            <input type="radio" name="priority" value="low"> 
                            <span class="square-box"></span>
                        </label>
                    </div>
                </div>

                <div class="flex-row">
                    <div class="input-group flex-1">
                        <label>Task Description</label>
                        <textarea id="taskDesc" placeholder="Start writing here..."></textarea>
                    </div>
                    <div class="upload-section">
                        <label>Upload Image</label>
                        <div class="upload-box">
                            <i class="fa-solid fa-cloud-arrow-up"></i>
                            <p>Drop files here or <span>Browse</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn" id="saveTaskBtn">Done</button>
            </div>
        </div>
    </div>
    `;
}