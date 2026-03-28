// ไฟล์: backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// เมื่อมีคนยิงข้อมูลแบบ POST มาที่ URL: /api/auth/register
// ให้ไปเรียกฟังก์ชัน authController.register มาทำงาน
router.post('/register', authController.register);

// เมื่อมีคนยิงข้อมูลแบบ POST มาที่ URL: /api/auth/login
// ให้ไปเรียกฟังก์ชัน authController.login มาทำงาน
router.post('/login', authController.login);

module.exports = router;