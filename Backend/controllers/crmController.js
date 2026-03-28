// ไฟล์: backend/controllers/crmController.js
const Lead = require('../models/Lead');

// 1. ฟังก์ชัน: ดึงข้อมูลการ์ดทั้งหมดของโรงงานนี้ (เอาไปโชว์บน Kanban)
exports.getLeadsBySupplier = async (req, res) => {
    try {
        const { supplierId } = req.params; // รับ ID โรงงานจาก URL

        // ค้นหาการ์ดทั้งหมดที่เป็นของโรงงานนี้
        const leads = await Lead.find({ supplierId: supplierId })
                                .sort({ updatedAt: -1 }); // เรียงจากอัปเดตล่าสุด

        res.status(200).json({
            message: 'ดึงข้อมูล CRM สำเร็จ',
            totalLeads: leads.length,
            leads: leads
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูล CRM ได้' });
    }
};

// 2. ฟังก์ชัน: สร้างลูกค้าใหม่ (Lead) เข้ากระดาน
exports.createLead = async (req, res) => {
    try {
        // รับข้อมูลจากฟอร์ม (หรือระบบสร้างให้อัตโนมัติเมื่อมีคนทักแชท)
        const { supplierId, companyName, contactPerson, projectTitle, industryCategory, source } = req.body;

        const newLead = await Lead.create({
            supplierId,
            companyName,
            contactPerson,
            projectTitle,
            industryCategory,
            source
        });

        res.status(201).json({
            message: 'สร้าง Lead ใหม่สำเร็จ เข้าสู่กระดานเรียบร้อย',
            lead: newLead
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้าง Lead' });
    }
};

// 3. ฟังก์ชัน: อัปเดตสเตจ (เวลาย้ายการ์ดข้ามคอลัมน์)
exports.updateLeadStage = async (req, res) => {
    try {
        const { leadId } = req.params; // ID ของการ์ดที่ถูกย้าย
        const { newStage } = req.body;   // ชื่อคอลัมน์ใหม่ที่ย้ายไป

        const updatedLead = await Lead.findByIdAndUpdate(
            leadId,
            { stage: newStage },
            { new: true } // ให้ส่งข้อมูลอัปเดตล่าสุดกลับมา
        );

        if (!updatedLead) {
            return res.status(404).json({ message: 'ไม่พบ Lead นี้ในระบบ' });
        }

        res.status(200).json({
            message: 'อัปเดตสถานะสำเร็จ',
            lead: updatedLead
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตสเตจ' });
    }
};