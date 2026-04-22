import {pool} from '../config/db.js';
import sql from 'mssql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export const getUserInfo = async (req, res) => {
    try {
    console.log('🔥 ENTER getUserInfo');

    console.log('REQ HEADERS:', req.headers);
    console.log('REQ ID:', req.id);
    const userId = req.id;
    console.log('USER ID IN INFO:', req.id);
    const result = await pool.request()
        .input('id', sql.Int, userId)
        .query('SELECT username, email, contactNumber FROM users WHERE id = @id');
    const user = result.recordset[0];
    if (!user) {
        return res.status(400).json({ message: 'User không tồn tại' });
    }
    res.json({
        username: user.username,
        email: user.email,
        contactNumber: user.contactNumber,
    });
} catch (error) {
    console.error('Error in getUserInfo:', error);
    res.status(500).json({ message: 'Lỗi server' });
}
}

export const editUserInfo = async (req, res) => {
    const userId = req.id;
    const { username, email, contactNumber } = req.body;
    console.log('=== EDIT USER REQUEST ===');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Contact Number:', contactNumber);
    console.log('User ID:', userId);
    console.log('Body:', req.body);
    console.log('=======================');
    await pool.request()
        .input('id', sql.Int, userId)
        .input('username', sql.NVarChar, username)
        .input('email', sql.NVarChar, email)
        .input('contactNumber', sql.NVarChar, contactNumber)
        .query('UPDATE users SET username = @username, email = @email, contactNumber = @contactNumber WHERE id = @id');
    res.json({ message: 'Thông tin đã được cập nhật' });
}

export const changePassword = async (req, res) => {
    const userId = req.id;
    const { currentPassword, newPassword } = req.body;
    const result = await pool.request()
        .input('id', sql.Int, userId)
        .query('SELECT password FROM users WHERE id = @id');
    const user = result.recordset[0];
    if (!user) {
        return res.status(400).json({ message: 'User không tồn tại' });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.request()
        .input('id', sql.Int, userId)
        .input('password', sql.NVarChar, hashedPassword)
        .query('UPDATE users SET password = @password WHERE id = @id');
    res.json({ message: 'Mật khẩu đã được thay đổi' });
}