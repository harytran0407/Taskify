import express from 'express';
import { getUserInfo, editUserInfo, changePassword } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: "Đây là dữ liệu riêng tư", userId: req.id });
});;
router.get('/info', authMiddleware, getUserInfo);
router.put('/update', authMiddleware, editUserInfo);
router.put('/password', authMiddleware, changePassword);



export default router;