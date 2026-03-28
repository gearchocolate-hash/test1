// ไฟล์: backend/routes/sourcingRoutes.js
const express = require('express');
const router = express.Router();
const sourcingController = require('../controllers/sourcingController');

// [POST] สร้างประกาศใหม่ (ยิงมาจากฟอร์ม SourcingRequest)
router.post('/', sourcingController.createPost);

// [GET] ดึงประกาศทั้งหมดไปโชว์ในกระดาน
router.get('/board', sourcingController.getAllOpenPosts);

// [GET] ดึงประกาศส่วนตัวไปโชว์ใน Dashboard ฝั่งจัดซื้อ
router.get('/my-posts/:buyerId', sourcingController.getPostsByBuyer);

module.exports = router;