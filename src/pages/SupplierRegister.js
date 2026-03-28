// ไฟล์: src/pages/SupplierRegister.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SupplierRegister() {
  const navigate = useNavigate();

  // 1. สร้าง State เก็บข้อมูลทั้งหมดในฟอร์ม
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    phoneNumber: '',
    password: '',
    companyName: '',
    province: '',
    primaryIndustry: '',
    processes: [], // เก็บกระบวนการผลิต (เลือกได้สูงสุด 2)
    customTag1: '', // คำค้นหาอิสระ 1
    customTag2: '', // คำค้นหาอิสระ 2
    isAccepted: false // ยอมรับเงื่อนไข
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. ฟังก์ชันจัดการเมื่อพิมพ์ข้อมูลทั่วไป
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 3. ฟังก์ชันจัดการการเลือก "กระบวนการผลิต" (จำกัดสูงสุด 2 อัน)
  const handleProcessChange = (value) => {
    setFormData(prev => {
      const isSelected = prev.processes.includes(value);
      
      // ถ้าเลือกอยู่แล้ว ให้เอาออก
      if (isSelected) {
        return { ...prev, processes: prev.processes.filter(p => p !== value) };
      }
      
      // ถ้ายังไม่เลือก และยังเลือกไม่ครบ 2 อัน ให้เพิ่มเข้าไป
      if (prev.processes.length < 2) {
        return { ...prev, processes: [...prev.processes, value] };
      }

      // ถ้าเลือกครบ 2 แล้วพยายามเลือกอีก ให้คืนค่าเดิม (ไม่ให้เลือกเพิ่ม)
      return prev;
    });
  };

  // 4. ฟังก์ชันเมื่อกดปุ่ม Submit (ส่งข้อมูลไป Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      // จัดรูปแบบข้อมูลให้ตรงกับที่ Backend (authController) รอรับ
      const payload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        phoneNumber: formData.phoneNumber,
        companyName: formData.companyName,
        companyType: 'supplier', // บังคับว่าเป็น supplier
        province: formData.province,
        industryParams: {
          primaryIndustry: formData.primaryIndustry,
          manufacturingProcesses: formData.processes,
          // เอาเฉพาะช่องที่ไม่ว่างใส่เข้าไปใน Array
          customTags: [formData.customTag1, formData.customTag2].filter(tag => tag.trim() !== '')
        }
      };

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
        navigate('/login'); // เตะไปหน้าล็อกอิน
      } else {
        setErrorMsg(data.message || 'การลงทะเบียนล้มเหลว');
      }
    } catch (error) {
      console.error('Register Error:', error);
      setErrorMsg('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    } finally {
      setIsLoading(false);
    }
  };

  // ตัวแปรเสริมสำหรับวาด UI ช่องเลือกกระบวนการผลิต
  const processOptions = [
    { value: 'injection', label: 'พลาสติก / ฉีดขึ้นรูป', sub: '(Injection Part)' },
    { value: 'metal_stamping', label: 'ปั๊ม / ตัดพับโลหะ', sub: '(Metal Stamping)' },
    { value: 'machining', label: 'งานกลึง / CNC', sub: '(Machining Part)' },
    { value: 'casting', label: 'หล่อ / ดายแคสติ้ง', sub: '(Casting / Die-cast)' },
    { value: 'surface', label: 'ชุบ / อบสี / เคลือบผิว', sub: '(Surface Treatment)' },
    { value: 'assembly', label: 'งานประกอบชิ้นส่วน', sub: '(Assembly)' },
    { value: 'fabrication', label: 'เชื่อม / ประกอบโครงสร้าง', sub: '(Fabrication)' },
    { value: 'mold', label: 'ผลิตแม่พิมพ์', sub: '(Mold & Die)' },
    { value: 'electronic_pcb', label: 'แผงวงจร / สายไฟ', sub: '(PCB / Wire Harness)' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* ฝั่งซ้าย (โฆษณา/ประโยชน์) - โค้ดเดิมจาก HTML */}
      <div className="hidden lg:flex lg:w-5/12 bg-blue-700 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
        <div className="relative z-10">
            <Link to="/" className="flex items-center space-x-2 mb-12">
                <div className="bg-white p-2 rounded-lg text-blue-700">
                    <i className="fa-solid fa-industry text-xl"></i>
                </div>
                <span className="text-2xl font-bold tracking-tight">FactoryConnect</span>
            </Link>
            <h1 className="text-4xl font-extrabold mb-6 leading-tight">เปิดหน้าร้านออนไลน์ <br/>พร้อมระบบ CRM ฟรี</h1>
            <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                ลงทะเบียนเพื่อรับโอกาสทางธุรกิจจากฝ่ายจัดซื้อทั่วประเทศที่กำลังมองหาซัพพลายเออร์ที่ผ่านการตรวจสอบ
            </p>
            {/* ... ลิสต์จุดเด่น ... */}
            <ul className="space-y-6">
                <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-600/50 flex items-center justify-center mr-4 shrink-0 mt-1">
                        <i className="fa-solid fa-bullseye text-blue-200 text-sm"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">ค้นหาลูกค้าตรงกลุ่ม (Scope Search)</h4>
                        <p className="text-blue-200 text-sm mt-1">เพิ่มแท็กความเชี่ยวชาญเพื่อให้ลูกค้าหาคุณเจอง่ายขึ้น</p>
                    </div>
                </li>
                {/* ... (ย่อไว้เพื่อความกระชับ) ... */}
            </ul>
        </div>
      </div>

      {/* ฝั่งขวา (ฟอร์มลงทะเบียน) */}
      <div className="w-full lg:w-7/12 h-screen overflow-y-auto p-6 md:p-12">
        <div className="w-full max-w-2xl mx-auto py-4">
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">สร้างบัญชีโรงงาน</h2>
            <p className="text-gray-500">กรุณากรอกข้อมูลบริษัทของท่านให้ครบถ้วน เพื่อความน่าเชื่อถือ</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm font-medium border border-red-200">
              <i className="fa-solid fa-circle-exclamation mr-2"></i> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* 1. ข้อมูลผู้ติดต่อ */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">1. ข้อมูลผู้ติดต่อ (แอดมินระบบ)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">อีเมลบริษัท (ใช้สำหรับเข้าสู่ระบบ) *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อผู้ติดต่อ *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์ (มือถือ) *</label>
                  <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน *</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white" />
                </div>
              </div>
            </div>

            {/* 2. ข้อมูลบริษัท */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">2. ข้อมูลบริษัท (Company Profile)</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อบริษัท / โรงงาน *</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">จังหวัดที่ตั้งโรงงาน *</label>
                  <select name="province" value={formData.province} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white">
                    <option value="" disabled>เลือกจังหวัด...</option>
                    <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                    <option value="สมุทรปราการ">สมุทรปราการ</option>
                    <option value="ชลบุรี">ชลบุรี</option>
                    <option value="ระยอง">ระยอง</option>
                    <option value="ปทุมธานี">ปทุมธานี</option>
                    <option value="อยุธยา">พระนครศรีอยุธยา</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. อุตสาหกรรม */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">3. อุตสาหกรรมและความเชี่ยวชาญ</h3>
              <div className="space-y-8">
                
                {/* 3.1 Primary Industry */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">3.1 อุตสาหกรรมหลัก (Primary Industry) *</label>
                  <select name="primaryIndustry" value={formData.primaryIndustry} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white font-medium">
                    <option value="" disabled>คลิกเพื่อเลือกอุตสาหกรรม...</option>
                    <option value="automotive">ยานยนต์และชิ้นส่วน (Automotive)</option>
                    <option value="electronic">อิเล็กทรอนิกส์และไฟฟ้า (Electronic & Electrical)</option>
                    <option value="machine">เครื่องจักรและอุปกรณ์ (Machine & Equipment)</option>
                    <option value="other">อื่นๆ (Other)</option>
                  </select>
                </div>

                {/* 3.2 Manufacturing Process */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-bold text-gray-700">3.2 กระบวนการผลิต (Manufacturing Process)</label>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full border ${formData.processes.length === 2 ? 'text-green-600 bg-green-50 border-green-200' : 'text-blue-600 bg-blue-50 border-blue-200'}`}>
                      {formData.processes.length === 2 ? 'เลือกครบ 2 รายการแล้ว' : `เลือกได้อีก ${2 - formData.processes.length} รายการ`}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {processOptions.map(opt => {
                      const isSelected = formData.processes.includes(opt.value);
                      const isDisabled = formData.processes.length >= 2 && !isSelected;

                      return (
                        <label key={opt.value} className={`cursor-pointer relative ${isDisabled ? 'opacity-50' : ''}`}>
                          <input 
                            type="checkbox" 
                            className="peer sr-only process-cb" 
                            checked={isSelected}
                            disabled={isDisabled}
                            onChange={() => handleProcessChange(opt.value)}
                          />
                          <div className={`p-3 border-2 rounded-xl text-center transition ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white hover:border-blue-300'}`}>
                            <span className={`text-sm ${isSelected ? 'text-blue-800 font-bold' : 'text-gray-600'}`}>
                              {opt.label}<br/>{opt.sub}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 3.3 Custom Tags */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">3.3 ความเชี่ยวชาญเฉพาะทาง (เพิ่มได้ 2 คำค้นหา)</label>
                  <p className="text-xs text-gray-500 mb-3">พิมพ์ Keyword ที่เป็นจุดแข็งของคุณ (เช่น ความแม่นยำ 0.01, ผลิตจำนวนน้อย, Prototype)</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-400 font-bold">#</span>
                      <input type="text" name="customTag1" value={formData.customTag1} onChange={handleChange} placeholder="เช่น ความแม่นยำ 0.01" className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-400 font-bold">#</span>
                      <input type="text" name="customTag2" value={formData.customTag2} onChange={handleChange} placeholder="เช่น ผลิตจำนวนน้อย" className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Submit */}
            <div>
              <label className="flex items-start space-x-3 mb-6 cursor-pointer">
                <input type="checkbox" name="isAccepted" checked={formData.isAccepted} onChange={handleChange} required className="mt-1 w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-600">
                  ข้าพเจ้ายืนยันว่าข้อมูลข้างต้นเป็นความจริง และยอมรับเงื่อนไขการให้บริการ
                </span>
              </label>

              <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 shadow-lg disabled:opacity-70 transition flex justify-center items-center">
                {isLoading ? 'กำลังประมวลผล...' : <><i className="fa-solid fa-rocket mr-2"></i> ลงทะเบียนและเปิดใช้งาน CRM</>}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default SupplierRegister;