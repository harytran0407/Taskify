import express from 'express';
import { getUserInfo, editUserInfo, changePassword } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: "Đây là dữ liệu riêng tư", userId: req.id });
});;
router.get('/info', getUserInfo);
router.put('/update', editUserInfo);
router.put('/password', changePassword);



export default router;