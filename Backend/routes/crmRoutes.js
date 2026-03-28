// ไฟล์: backend/routes/crmRoutes.js
const express = require('express');
const router = express.Router();
const crmController = require('../controllers/crmController');

// [GET] ดึงข้อมูลการ์ดทั้งหมดของโรงงานนั้นๆ
// ตัวอย่าง URL: http://localhost:5000/api/crm/supplier/12345
router.get('/supplier/:supplierId', crmController.getLeadsBySupplier);

// [POST] สร้างการ์ดลูกค้าใหม่
// ตัวอย่าง URL: http://localhost:5000/api/crm/lead
router.post('/lead', crmController.createLead);

// [PUT] อัปเดตสถานะการ์ด (ย้ายคอลัมน์)
// ตัวอย่าง URL: http://localhost:5000/api/crm/lead/98765/stage
router.put('/lead/:leadId/stage', crmController.updateLeadStage);

module.exports = router;