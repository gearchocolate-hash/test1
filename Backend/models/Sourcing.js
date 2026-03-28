// ไฟล์: backend/models/Sourcing.js
const mongoose = require('mongoose');

const sourcingSchema = new mongoose.Schema({
  // ผูกกับบริษัทที่เป็นผู้ซื้อ (Buyer)
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  
  // รายละเอียดประกาศ
  title: {
    type: String,
    required: [true, 'กรุณาระบุหัวข้องาน']
  },
  category: {
    type: String,
    required: [true, 'กรุณาระบุหมวดหมู่อุตสาหกรรม'] // เช่น automotive, medical
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    default: 'ไม่ระบุ' // เช่น "50,000 ชิ้น/เดือน"
  },
  budgetRange: {
    type: String,
    default: 'รอเสนอราคา' 
  },
  
  // แนบไฟล์ (เก็บเป็น URL ของไฟล์ใน Cloud/Storage)
  attachmentUrl: {
    type: String,
    default: ''
  },

  // สถานะของประกาศ
  status: {
    type: String,
    enum: ['open', 'reviewing', 'closed'],
    default: 'open' // เริ่มต้นคือเปิดรับข้อเสนอ
  },
  
  // จำนวนซัพพลายเออร์ที่เสนอราคาเข้ามาแล้ว
  proposalCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // เก็บวันที่โพสต์ (createdAt) อัตโนมัติ
});

module.exports = mongoose.model('Sourcing', sourcingSchema);