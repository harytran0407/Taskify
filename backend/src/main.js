import { initTodoApp } from './controllers/todoController.js';
import { updateDateTime } from './utils/dateUtils.js';

initTodoApp();

// chạy thời gian
updateDateTime();
setInterval(updateDateTime, 1000);