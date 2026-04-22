import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import dotenv from 'dotenv';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users',authMiddleware, userRoutes);
app.use('/api/tasks',authMiddleware , taskRoutes);

export default app;