// ไฟล์: backend/models/Lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  // เจ้าของกระดาน CRM นี้ (บริษัทของเซลส์)
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  
  // ข้อมูลลูกค้า
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // ถ้าลูกค้ามีบัญชีในระบบ จะผูก ID ไว้
    default: null
  },
  companyName: {
    type: String,
    required: [true, 'กรุณาระบุชื่อบริษัทลูกค้า']
  },
  contactPerson: {
    type: String,
    default: ''
  },

  // ข้อมูลความต้องการ (Project)
  projectTitle: {
    type: String,
    required: true
  },
  industryCategory: {
    type: String,
    default: 'general'
  },
  estimatedValue: {
    type: Number,
    default: 0 // มูลค่าโปรเจกต์ (บาท)
  },

  // สถานะบนกระดาน Kanban
  stage: {
    type: String,
    enum: ['1_Intro', '2_RFQ', '3_Sampling', '4_Negotiate', '5_Won', 'Lost'],
    default: '1_Intro' // เริ่มต้นที่ช่องแรกเสมอ
  },
  
  // ลูกค้าทักมาจากช่องทางไหน
  source: {
    type: String,
    enum: ['Chat', 'Email', 'RFQ_Board', 'Manual'], // Manual คือเซลส์คีย์เข้าระบบเอง
    default: 'Manual'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);