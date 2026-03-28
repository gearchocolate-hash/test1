// ไฟล์: backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// สร้าง Express App (ตัวเซิร์ฟเวอร์)
const app = express();

// 1. ตั้งค่า Middleware (ยามเฝ้าประตู)
app.use(cors()); // อนุญาตให้ Frontend (React/HTML) ข้ามโดเมนมาดึงข้อมูลได้
app.use(express.json()); // ให้เซิร์ฟเวอร์อ่านข้อมูลที่ส่งมาเป็น JSON ได้
// ================= เพิ่มโค้ดส่วนนี้ =================
// นำเข้า Routes ต่างๆ
const authRoutes = require('./routes/authRoutes');
const crmRoutes = require('./routes/crmRoutes');
const factoryRoutes = require('./routes/factoryRoutes');
const sourcingRoutes = require('./routes/sourcingRoutes');

// เสียบปลั๊ก Routes เข้ากับ URL หลัก
app.use('/api/auth', authRoutes); 
app.use('/api/crm', crmRoutes);
app.use('/api/factories', factoryRoutes);
app.use('/api/sourcing', sourcingRoutes);
// ===============================================

// 2. เชื่อมต่อฐานข้อมูล MongoDB
// (ในของจริงจะใช้ตัวแปร ENV ซ่อนรหัสผ่านไว้ แต่นี่คือโครงสร้างเบื้องต้นครับ)
const DB_URI = 'mongodb://localhost:27017/factory_connect'; 
mongoose.connect(DB_URI)
  .then(() => console.log('✅ เชื่อมต่อฐานข้อมูล MongoDB สำเร็จแล้ว!'))
  .catch((err) => console.error('❌ ดาต้าเบสมีปัญหา:', err));

// 3. สร้าง Route (เส้นทาง) ทดสอบระบบ
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'เซิร์ฟเวอร์ FactoryConnect ทำงานปกติ! 🚀' 
  });
});

// กำหนด Port และเปิดเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server เปิดทำงานแล้วที่ Port: ${PORT}`);
  console.log(`👉 ลองเข้าเว็บ http://localhost:${PORT}/api/health เพื่อทดสอบ`);
});