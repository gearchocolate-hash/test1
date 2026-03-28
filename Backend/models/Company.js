// ไฟล์: backend/models/Company.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  // ข้อมูลพื้นฐานบริษัท
  companyName: {
    type: String,
    required: [true, 'กรุณากรอกชื่อบริษัท'],
    trim: true
  },
  companyType: {
    type: String,
    enum: ['buyer', 'supplier', 'both'], // ประเภทของบริษัท
    required: true
  },
  province: {
    type: String,
    required: [true, 'กรุณาเลือกจังหวัด']
  },

  // --- ส่วนนี้สำหรับ Supplier (โรงงาน) โดยเฉพาะ ---
  industryParams: {
    // 3.1 อุตสาหกรรมหลัก (Primary Industry)
    primaryIndustry: {
      type: String,
      default: ''
    },
    // 3.2 กระบวนการผลิต (Manufacturing Process) - เก็บเป็น Array เพราะเลือกได้ 2 อัน
    manufacturingProcesses: [{
      type: String
    }],
    // 3.3 ความเชี่ยวชาญเฉพาะทาง (Custom Tags) - เช่น ISO, Tolerance
    customTags: [{
      type: String
    }]
  },

  // ข้อมูลการติดต่อสาธารณะ (โชว์หน้าร้าน)
  contactInfo: {
    address: String,
    website: String,
    publicPhone: String
  },

  // สถิติและสถานะ
  isVerified: {
    type: Boolean,
    default: false // แอดมินต้องเป็นคนกดอนุมัติ (Verified) ให้
  },
  credits: {
    type: Number,
    default: 1000 // แจกเครดิตเริ่มต้นสำหรับทำการตลาด (Email Marketing)
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Company', companySchema);