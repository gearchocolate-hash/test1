// ไฟล์: backend/controllers/sourcingController.js
const Sourcing = require('../models/Sourcing');

// 1. ฟังก์ชัน: ผู้ซื้อสร้างประกาศงานใหม่ (ใช้ในหน้า SourcingRequest)
exports.createPost = async (req, res) => {
    try {
        const { buyerId, title, category, description, quantity, budgetRange, attachmentUrl } = req.body;

        const newPost = await Sourcing.create({
            buyerId,
            title,
            category,
            description,
            quantity,
            budgetRange,
            attachmentUrl
        });

        res.status(201).json({
            message: 'สร้างประกาศหางานสำเร็จ',
            post: newPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ไม่สามารถสร้างประกาศได้' });
    }
};

// 2. ฟังก์ชัน: ดึงประกาศทั้งหมดที่กำลัง "เปิดรับ (Open)" (ใช้ในหน้า SourcingBoard สำหรับ Supplier)
exports.getAllOpenPosts = async (req, res) => {
    try {
        // ดึงงานที่สถานะ open และดึงข้อมูลชื่อบริษัทผู้ซื้อมาโชว์ด้วย (.populate)
        const posts = await Sourcing.find({ status: 'open' })
                                    .populate('buyerId', 'companyName province') 
                                    .sort({ createdAt: -1 }); // เรียงจากใหม่ไปเก่า

        res.status(200).json({
            message: 'ดึงข้อมูลกระดานจัดซื้อสำเร็จ',
            count: posts.length,
            posts: posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ดึงข้อมูลกระดานจัดซื้อล้มเหลว' });
    }
};

// 3. ฟังก์ชัน: ดึงประกาศเฉพาะของบริษัทผู้ซื้อคนนั้น (ใช้ในหน้า BuyerDashboard)
exports.getPostsByBuyer = async (req, res) => {
    try {
        const { buyerId } = req.params;

        const myPosts = await Sourcing.find({ buyerId: buyerId })
                                      .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'ดึงข้อมูลประกาศของคุณสำเร็จ',
            posts: myPosts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ดึงข้อมูลส่วนตัวล้มเหลว' });
    }
};