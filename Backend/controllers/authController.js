// ไฟล์: backend/controllers/authController.js
const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. ฟังก์ชัน: สมัครสมาชิก (Register)
exports.register = async (req, res) => {
    try {
        // รับข้อมูลที่ส่งมาจากหน้าเว็บ (Frontend)
        const { email, password, firstName, phoneNumber, companyName, province, companyType, industryParams } = req.body;

        // เช็กก่อนว่ามีอีเมลนี้ในระบบหรือยัง?
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น' });
        }

        // เข้ารหัสผ่าน (Hash Password) เพื่อความปลอดภัยขั้นสุด
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // สร้างโปรไฟล์บริษัท (Company) ก่อน
        const newCompany = await Company.create({
            companyName: companyName,
            companyType: companyType, // 'buyer' หรือ 'supplier'
            province: province,
            industryParams: industryParams // พวกกระบวนการผลิต, แท็กต่างๆ
        });

        // สร้างบัญชีผู้ใช้งาน (User) แล้วผูกกับบริษัทที่เพิ่งสร้าง
        const newUser = await User.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            phoneNumber: phoneNumber,
            role: companyType, 
            companyId: newCompany._id // <--- สำคัญ! เอา ID บริษัทมาผูกกับคนนี้
        });

        res.status(201).json({ 
            message: 'สมัครสมาชิกสำเร็จ!', 
            userId: newUser._id,
            companyId: newCompany._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// 2. ฟังก์ชัน: เข้าสู่ระบบ (Login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // หา User จากอีเมล
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
        }

        // เทียบรหัสผ่านที่กรอกมา กับรหัสที่เข้ารหัสไว้ใน Database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
        }

        // สร้างบัตรผ่าน (JWT Token) ให้ User เอาไว้ใช้เข้าหน้า CRM โดยไม่ต้องล็อกอินใหม่
        const token = jwt.sign(
            { userId: user._id, role: user.role, companyId: user.companyId },
            'YOUR_SECRET_KEY', // (ของจริงควรเอาไปซ่อนในไฟล์ .env)
            { expiresIn: '1d' } // บัตรผ่านหมดอายุใน 1 วัน
        );

        // ส่งบัตรผ่านและข้อมูลส่วนตัวกลับไปให้หน้าเว็บ
        res.status(200).json({
            message: 'เข้าสู่ระบบสำเร็จ',
            token: token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};