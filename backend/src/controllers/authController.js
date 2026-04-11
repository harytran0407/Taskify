import {pool} from '../config/db.js';
import sql from 'mssql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;


export const register = async (req, res) => {
    const { username,email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.request()
        .input('username', sql.NVarChar, username)
        .input('email', sql.NVarChar, email)
        .input('password', sql.NVarChar, hashedPassword)
        .query('INSERT INTO Users (username, email, password) VALUES (@username, @email, @password)');
    res.status(201).json({ message: 'Đăng ký thành công' });
}

export const login = async (req, res) => {
  try {
  const { username, password } = req.body;

  const result = await pool.request()
    .input('username', sql.NVarChar, username)
    .query('SELECT * FROM Users WHERE username = @username');

const user = result.recordset[0];
if (!user) {
  return res.status(400).json({ message: 'User không tồn tại' });
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
}
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
res.json({ token });
} catch (error) {
  console.error('Login error:', error);
  res.status(500).json({ message: 'Lỗi server' });
};
}


