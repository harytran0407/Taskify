import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    console.log('🔥 AUTH MIDDLEWARE HIT');
    console.log('AUTH HEADER:', req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('❌ NO AUTH HEADER');
        return res.status(401).json({ message: 'No auth header' });
    }

    const token = authHeader.split(' ')[1];
    console.log('TOKEN:', token);

    if (!token) {
        console.log('❌ NO TOKEN AFTER SPLIT');
        return res.status(401).json({ message: 'No token' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);

        console.log('DECODED TOKEN:', decoded);

        req.id = decoded.id;

        console.log('SET USER ID:', req.id);
        console.log(decoded)
        console.log(req.id)

        return next(); // 👈 QUAN TRỌNG: return luôn
    } catch (err) {
        console.log('❌ JWT ERROR:', err.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};