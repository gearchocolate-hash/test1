// ไฟล์: src/pages/BuyerRegister.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function BuyerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', firstName: '', phoneNumber: '', password: '', companyName: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // จำลองการยิง API
      const payload = { ...formData, companyType: 'buyer' };
      console.log('ส่งข้อมูล:', payload);
      
      setTimeout(() => {
        alert('สร้างบัญชีผู้ซื้อสำเร็จ!');
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 pb-12">
      <div className="bg-blue-900 py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">สมัครสมาชิกสำหรับ <span className="text-teal-400">ฝ่ายจัดซื้อ</span></h1>
        <p className="text-blue-200">เข้าถึงฐานข้อมูลโรงงานกว่า 2,500 แห่ง และโพสต์หางานได้ฟรี</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-6 border-b pb-2">ข้อมูลผู้ใช้งาน (User Info)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">ชื่อบริษัท (Company Name) *</label>
              <input type="text" name="companyName" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">ชื่อผู้ติดต่อ *</label>
              <input type="text" name="firstName" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">เบอร์โทรศัพท์ *</label>
              <input type="tel" name="phoneNumber" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">อีเมล (ใช้ล็อกอิน) *</label>
              <input type="email" name="email" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">รหัสผ่าน *</label>
              <input type="password" name="password" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 shadow-md transition disabled:opacity-70">
            {isLoading ? 'กำลังประมวลผล...' : 'สร้างบัญชีผู้ซื้อ'}
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-6">
            มีบัญชีอยู่แล้ว? <Link to="/login" className="text-teal-600 font-bold hover:underline">เข้าสู่ระบบ</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default BuyerRegister;