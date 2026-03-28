// ไฟล์: backend/routes/factoryRoutes.js
const express = require('express');
const router = express.Router();
const factoryController = require('../controllers/factoryController');

// [GET] ค้นหาแบบ Scope Search (เช่น /api/factories/search?province=ระยอง)
router.get('/search', factoryController.searchFactories);

// [GET] ดึงโรงงานแนะนำสำหรับหน้าแรก (ต้องวางไว้บนสุดเพื่อไม่ให้ตีกับ :id)
router.get('/featured', factoryController.getFeaturedFactories);

// [GET] ดึงโปรไฟล์โรงงานรายบุคคลตาม ID (เช่น /api/factories/65abcd1234efg)
router.get('/:id', factoryController.getFactoryProfile);

module.exports = router;