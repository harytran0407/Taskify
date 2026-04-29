import {pool} from '../config/db.js';
import sql from 'mssql';

export const getTask = async (req, res) => {
    const id = req.id;
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Tasks WHERE user_id = @id');
    res.json(result.recordset);
}
console.log("CREATE TASK FUNCTION START");
export const createTask = async (req, res) => {
    const id = req.id;
    const { title, description, dueDate, priority } = req.body;
    console.log('=== CREATE TASK REQUEST ===');
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Due Date:', dueDate);
    console.log('Priority:', priority);
    console.log('User ID:', id);
    console.log('Body:', req.body);
    console.log('=======================');

    await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .input('dueDate', sql.DateTime, dueDate)
        .input('priority', sql.NVarChar, priority)
        .query('INSERT INTO Tasks (user_id, title, description, due_date, priority) VALUES (@id, @title, @description, @dueDate, @priority)');
    res.json({ message: 'Task created' });
}
export const updateTask = async (req, res) => {
    const userId = req.id;
    const { id: taskId } = req.params;
    const { title, description, dueDate, priority } = req.body;

    const parsedDate = new Date(dueDate);

    await pool.request()
        .input('userId', sql.Int, userId)
        .input('taskId', sql.Int, taskId)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .input('dueDate', sql.DateTime, parsedDate)
        .input('priority', sql.NVarChar, priority)
        .query(`
            UPDATE Tasks 
            SET title = @title, 
                description = @description, 
                due_date = @dueDate, 
                priority = @priority 
            WHERE id = @taskId AND user_id = @userId
        `);

    res.json({ message: 'Task updated' });
};

export const deleteTask = async (req, res) => {
    const userId = req.id;
    const { id: taskId } = req.params;

    await pool.request()
        .input('userId', sql.Int, userId)
        .input('taskId', sql.Int, taskId)
        .query(`
            DELETE FROM Tasks 
            WHERE id = @taskId AND user_id = @userId
        `);

    res.json({ message: 'Task deleted' });
};

export const markComplete = async (req, res) => {
    const userId = req.id;
    const { id: taskId } = req.params;

    await pool.request()
        .input('userId', sql.Int, userId)
        .input('taskId', sql.Int, taskId)
        .query(`
            UPDATE Tasks 
            SET status = 'completed' 
            WHERE id = @taskId AND user_id = @userId
        `);

    res.json({ message: 'Task marked as complete' });
};