// ไฟล์: backend/models/User.js
const mongoose = require('mongoose');

// สร้างแบบแปลน (Schema) สำหรับตารางผู้ใช้งาน
const userSchema = new mongoose.Schema({
  // ข้อมูลพื้นฐาน
  email: {
    type: String,
    required: [true, 'กรุณากรอกอีเมล'],
    unique: true, // ห้ามอีเมลซ้ำกัน
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'กรุณากรอกรหัสผ่าน'],
    minlength: 8 // ต้องยาว 8 ตัวขึ้นไป
  },
  firstName: {
    type: String,
    required: [true, 'กรุณากรอกชื่อจริง']
  },
  lastName: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    required: [true, 'กรุณากรอกเบอร์โทรศัพท์']
  },
  
  // บทบาทของผู้ใช้งาน (สำคัญมากสำหรับการแยก UI)
  role: {
    type: String,
    enum: ['buyer', 'supplier', 'admin'], // เป็นได้แค่ 3 ค่านี้เท่านั้น
    required: true
  },

  // เชื่อมโยงไปยังตารางบริษัท (Company)
  // ถ้าเขายังไม่สร้างบริษัท ค่านี้จะว่างไว้ก่อน
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', 
    default: null
  },

  // สถานะการใช้งาน
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true // บันทึก createdAt และ updatedAt อัตโนมัติ
});

// ส่งออก Model เพื่อให้ Controller เอาไปใช้ต่อ
module.exports = mongoose.model('User', userSchema);