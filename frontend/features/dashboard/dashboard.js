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
                        <span class="date-text">20 June • Today</span>
                    </div>
                    <button class="add-task-btn">+ Add task</button>
                </div>

                <div class="task-item border-box">
                    <div class="task-body">
                        <i class="fa-regular fa-circle icon-status red"></i>
                        <div class="task-info">
                            <h3>Attend Nischal's Birthday Party</h3>
                            <p>Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)...</p>
                            <div class="task-footer">
                                <span>Priority: <span class="blue-text">Moderate</span></span>
                                <span>Status: <span class="red-text">Not Started</span></span>
                                <span class="created-at">Created on: 20/06/2023</span>
                            </div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=150" class="task-img" alt="party">
                    </div>
                </div>

                <div class="task-item border-box">
                    <div class="task-body">
                        <i class="fa-regular fa-circle icon-status blue"></i>
                        <div class="task-info">
                            <h3>Landing Page Design for TravelDays</h3>
                            <p>Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)</p>
                            <div class="task-footer">
                                <span>Priority: <span class="blue-text">Moderate</span></span>
                                <span>Status: <span class="blue-text">In Progress</span></span>
                                <span class="created-at">Created on: 20/06/2023</span>
                            </div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150" class="task-img" alt="design">
                    </div>
                </div>

                <div class="task-item border-box">
                    <div class="task-body">
                        <i class="fa-regular fa-circle icon-status blue"></i>
                        <div class="task-info">
                            <h3>Presentation on Final Product</h3>
                            <p>Make sure everything is functioning and all the necessities are properly met.</p>
                            <div class="task-footer">
                                <span>Priority: <span class="blue-text">Moderate</span></span>
                                <span>Status: <span class="blue-text">In Progress</span></span>
                                <span class="created-at">Created on: 19/06/2023</span>
                            </div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=150" class="task-img" alt="meeting">
                    </div>
                </div>
            </section>

            <div class="sidebar-content">
                <section class="status-section card">
                    <h2 class="title-todo"><i class="fa-solid fa-chart-pie"></i> Task Status</h2>
                    <div class="status-charts">
                        <div class="chart-item">
                            <div class="ring" style="--percent: 84; --color: #22c55e;">84%</div>
                            <span class="label">● Completed</span>
                        </div>
                        <div class="chart-item">
                            <div class="ring" style="--percent: 46; --color: #3b82f6;">46%</div>
                            <span class="label">● In Progress</span>
                        </div>
                        <div class="chart-item">
                            <div class="ring" style="--percent: 13; --color: #ef4444;">13%</div>
                            <span class="label">● Not Started</span>
                        </div>
                    </div>
                </section>

                <section class="completed-section card">
                    <h2 class="title-todo"><i class="fa-regular fa-square-check"></i> Completed Task</h2>
                    <div class="completed-list">
                        <div class="mini-task border-box">
                            <div class="mini-info">
                                <h4>Walk the dog</h4>
                                <p>Take the dog to the park and bring treats...</p>
                                <div class="mini-footer">
                                    <span class="status-done">Status: Completed</span>
                                    <span class="time-ago">2 days ago</span>
                                </div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=100" alt="dog">
                        </div>
                        <div class="mini-task border-box">
                            <div class="mini-info">
                                <h4>Conduct meeting</h4>
                                <p>Meet with the client and finalize requirements.</p>
                                <div class="mini-footer">
                                    <span class="status-done">Status: Completed</span>
                                    <span class="time-ago">2 days ago</span>
                                </div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100" alt="meeting">
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>

    `;
}


