import {pool} from '../config/db.js';
import sql from 'mssql';

export const getTask = async (req, res) => {
    const id = req.id;
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Tasks WHERE user_id = @id');
    res.json(result.recordset);
}

export const createTask = async (req, res) => {
    const id = req.id;
    const { title, description } = req.body;
    await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .query('INSERT INTO Tasks (user_id, title, description) VALUES (@id, @title, @description)');
    res.json({ message: 'Task created' });
}
 export const updateTask = async (req, res) => {
    const id = req.id;
    const { id:taskId } = req.params;
    const { title, description } = req.body;
    await pool.request()
        .input('id', sql.Int, id)
        .input('id', sql.Int, taskId)
        .input('title', sql.NVarChar, title)
        .input('description', sql.NVarChar, description)
        .query('UPDATE Tasks SET title = @title, description = @description WHERE id = @id AND user_id = @id');
    res.json({ message: 'Task updated' });
}

export const deleteTask = async (req, res) => {
    const id = req.id;
    const { id:taskId } = req.params;
    await pool.request()
        .input('id', sql.Int, id)
        .input('id', sql.Int, taskId)
        .query('DELETE FROM Tasks WHERE id = @id AND user_id = @id');
    res.json({ message: 'Task deleted' });
}