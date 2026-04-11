import {pool} from '../config/db.js';
import sql from 'mssql';

export const getTask = async (req, res) => {
    const userId = req.userId;
    const result = await pool.request()
        .input('userId', sql.Int, userId)
        .query('SELECT * FROM Tasks WHERE user_id = @userId');
    res.json(result.recordset);
}

export const createTask = async (req, res) => {
    const userId = req.userId;
    const { title, description } = req.body;
    await pool.request()
        .input('userId', sql.Int, userId)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .query('INSERT INTO Tasks (user_id, title, description) VALUES (@userId, @title, @description)');
    res.json({ message: 'Task created' });
}
 export const updateTask = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const { title, description } = req.body;
    await pool.request()
        .input('userId', sql.Int, userId)
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .query('UPDATE Tasks SET title = @title, description = @description WHERE id = @id AND user_id = @userId');
    res.json({ message: 'Task updated' });
}

export const deleteTask = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    await pool.request()
        .input('userId', sql.Int, userId)
        .input('id', sql.Int, id)
        .query('DELETE FROM Tasks WHERE id = @id AND user_id = @userId');
    res.json({ message: 'Task deleted' });
}