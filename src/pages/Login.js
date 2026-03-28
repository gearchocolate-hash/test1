// ไฟล์: src/pages/Login.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ดึงฟังก์ชัน login จากความจำส่วนกลาง

  // สร้าง State สำหรับเก็บข้อมูลที่ผู้ใช้พิมพ์
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // สร้าง State สำหรับเก็บข้อความแจ้งเตือน และสถานะการโหลด
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชันจัดการเมื่อพิมพ์ข้อความในช่อง Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ฟังก์ชันจัดการเมื่อกดปุ่ม "ลงชื่อเข้าใช้"
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันหน้าเว็บรีเฟรช
    setErrorMsg('');
    setIsLoading(true);

    try {
      // ยิง API ไปหา Backend ที่เราเขียนไว้
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ถ้ารหัสถูก: นำข้อมูลไปเก็บใน AuthContext
        login(data.user, data.token);

        // เช็ก Role ว่าเป็นใคร แล้วเด้งไปหน้าที่ถูกต้อง
        if (data.user.role === 'buyer') {
          navigate('/buyer-dashboard');
        } else {
          navigate('/supplier-crm');
        }
      } else {
        // ถ้ารหัสผิด: โชว์ข้อความ Error จาก Backend
        setErrorMsg(data.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setErrorMsg('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden">
      
      {/* พื้นหลังสีน้ำเงินด้านบน */}
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-700 rounded-b-[50px] z-0">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 pt-10 pb-20">
        
        {/* กล่องฟอร์มล็อกอิน */}
        <div className="bg-white rounded-[30px] shadow-2xl p-8 md:p-10 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">ยินดีต้อนรับกลับมา</h2>
            <p className="text-gray-500 text-sm">กรุณาลงชื่อเข้าใช้เพื่อจัดการระบบของคุณ</p>
          </div>

          {/* แสดงข้อความแจ้งเตือนถ้าล็อกอินผิด */}
          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm flex items-center">
              <i className="fa-solid fa-circle-exclamation mr-2 text-lg"></i>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">อีเมลผู้ใช้งาน</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-envelope text-gray-400"></i>
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com" 
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white text-gray-800"
                  required 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-gray-700">รหัสผ่าน</label>
                <a href="#" className="text-xs text-blue-600 font-semibold hover:underline">ลืมรหัสผ่าน?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-gray-400"></i>
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white text-gray-800"
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 shadow-lg transition transform active:scale-95 flex justify-center items-center mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> กำลังเข้าสู่ระบบ...</span>
              ) : (
                <span>ลงชื่อเข้าใช้ <i className="fa-solid fa-arrow-right-to-bracket ml-2"></i></span>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <span className="h-px w-full bg-gray-200"></span>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider whitespace-nowrap">ยังไม่มีบัญชี?</span>
            <span className="h-px w-full bg-gray-200"></span>
          </div>

          <div className="mt-6 flex flex-col space-y-3">
            <Link to="/register-supplier" className="w-full border-2 border-blue-600 text-blue-600 font-bold py-2.5 rounded-xl hover:bg-blue-50 transition text-center flex justify-center items-center">
              <i className="fa-solid fa-industry mr-2"></i> ลงทะเบียนสำหรับโรงงาน (ฟรี)
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;