// ไฟล์: src/pages/SourcingRequest.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SourcingRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', category: 'automotive', description: '', quantity: '', budgetRange: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('โพสต์ประกาศสำเร็จ! ระบบได้นำขึ้นกระดานเรียบร้อยแล้ว');
    navigate('/buyer-dashboard'); // กลับไปหน้า Dashboard
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-3xl mx-auto px-4 pt-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ฝากโพสต์หาซัพพลายเออร์</h1>
          <p className="text-gray-500">กรอกรายละเอียดงานของคุณ เพื่อให้โรงงานที่ตรงสเปกเสนอราคาเข้ามา</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <div>
            <label className="block font-bold text-gray-700 mb-1">หัวข้อโปรเจกต์ (Project Title) *</label>
            <input type="text" onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500" placeholder="เช่น หาโรงงานฉีดพลาสติก ABS" />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">หมวดหมู่อุตสาหกรรม *</label>
            <select onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500">
              <option value="automotive">ยานยนต์และชิ้นส่วน</option>
              <option value="electronic">อิเล็กทรอนิกส์</option>
              <option value="medical">เครื่องมือแพทย์</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">รายละเอียดงาน *</label>
            <textarea rows="4" onChange={(e) => setFormData({...formData, description: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500 resize-none" placeholder="ระบุสเปก วัสดุ หรือเงื่อนไขเพิ่มเติม..."></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">จำนวนการผลิต</label>
              <input type="text" onChange={(e) => setFormData({...formData, quantity: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500" placeholder="เช่น 5,000 ชิ้น/เดือน" />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">งบประมาณ (ประเมิน)</label>
              <input type="text" onChange={(e) => setFormData({...formData, budgetRange: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500" placeholder="เช่น 100k - 500k" />
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-blue-50 transition cursor-pointer">
            <i className="fa-solid fa-cloud-arrow-up text-3xl text-blue-500 mb-2"></i>
            <p className="font-bold">อัปโหลดไฟล์แบบ (Drawing / 3D)</p>
            <p className="text-xs text-gray-500 mt-1">รองรับ PDF, JPG, STEP</p>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 shadow-md transition">
            โพสต์ประกาศขึ้นระบบ
          </button>
        </form>
      </div>
    </div>
  );
}

export default SourcingRequest;