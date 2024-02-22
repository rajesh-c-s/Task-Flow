import express from 'express';
import  { registerUser, loginUser, forgotPassword, resetPassword, verifyEmail} from '../controllers/authController.js';
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);
router.get('/verify-email?:token',verifyEmail);

export default router;