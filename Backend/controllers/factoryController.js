// ไฟล์: backend/controllers/factoryController.js
const Company = require('../models/Company');

// 1. ฟังก์ชัน: ค้นหาโรงงานแบบเจาะจง (Scope Search)
exports.searchFactories = async (req, res) => {
    try {
        // รับค่าเงื่อนไขการค้นหาที่ส่งมาจาก URL (Query String)
        // ตัวอย่าง: /api/factories/search?province=ชลบุรี&industry=automotive&process=injection&keyword=ISO
        const { province, industry, process, keyword } = req.query;

        // สร้าง Query พื้นฐาน: ต้องเป็นโรงงาน (supplier หรือ both) และต้องยืนยันตัวตนแล้ว (Verified)
        let searchQuery = { 
            companyType: { $in: ['supplier', 'both'] },
            isVerified: true 
        };

        // ถ้ามีการระบุ "จังหวัด" เข้ามา ให้เพิ่มในเงื่อนไข
        if (province) {
            searchQuery.province = province;
        }

        // ถ้ามีการระบุ "อุตสาหกรรมหลัก"
        if (industry) {
            searchQuery['industryParams.primaryIndustry'] = industry;
        }

        // ถ้ามีการระบุ "กระบวนการผลิต" (เช่น CNC, Injection)
        if (process) {
            // ค้นหาใน Array ว่ามีค่านี้อยู่หรือไม่
            searchQuery['industryParams.manufacturingProcesses'] = process;
        }

        // ถ้าพิมพ์ "คำค้นหา (Keyword)" ในช่อง Search
        if (keyword) {
            searchQuery.$or = [
                // หาจากชื่อบริษัท (ไม่สนใจตัวพิมพ์เล็ก/ใหญ่)
                { companyName: { $regex: keyword, $options: 'i' } },
                // หาจากแท็กความเชี่ยวชาญเฉพาะทาง (Custom Tags)
                { 'industryParams.customTags': { $regex: keyword, $options: 'i' } }
            ];
        }

        // สั่งให้ Database ทำการค้นหาตามเงื่อนไขที่ประกอบร่างไว้
        const factories = await Company.find(searchQuery)
                                       .select('-credits'); // ไม่ต้องส่งข้อมูลเครดิตการตลาดกลับไปให้คนนอกดู

        res.status(200).json({
            message: 'ค้นหาสำเร็จ',
            count: factories.length,
            factories: factories
        });

    } catch (error) {
        console.error('Search Error:', error);
        res.status(500).json({ message: 'ระบบค้นหามีปัญหา กรุณาลองใหม่' });
    }
};

// 2. ฟังก์ชัน: ดึงข้อมูลโปรไฟล์โรงงาน 1 แห่งแบบละเอียด (สำหรับหน้า Supplier Profile.html)
exports.getFactoryProfile = async (req, res) => {
    try {
        const { id } = req.params; // รับ ID ของโรงงานจาก URL

        const factory = await Company.findById(id).select('-credits');

        if (!factory || factory.companyType === 'buyer') {
            return res.status(404).json({ message: 'ไม่พบข้อมูลโรงงานนี้' });
        }

        res.status(200).json({
            message: 'ดึงข้อมูลโปรไฟล์สำเร็จ',
            factory: factory
        });

    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ message: 'ระบบดึงข้อมูลมีปัญหา' });
    }
};

// 3. ฟังก์ชัน: ดึงโรงงานแนะนำ (Featured Suppliers) สำหรับแสดงในหน้า index.html
exports.getFeaturedFactories = async (req, res) => {
    try {
        // ดึงโรงงานที่ Verified แล้วมา 6 แห่งล่าสุด
        const featured = await Company.find({ companyType: { $in: ['supplier', 'both'] }, isVerified: true })
                                      .sort({ createdAt: -1 })
                                      .limit(6)
                                      .select('companyName province industryParams');

        res.status(200).json({
            message: 'ดึงข้อมูลโรงงานแนะนำสำเร็จ',
            factories: featured
        });
    } catch (error) {
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลโรงงานแนะนำได้' });
    }
};