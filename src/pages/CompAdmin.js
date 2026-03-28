// ไฟล์: src/pages/CompAdmin.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CompAdmin() {
  // 1. State ควบคุม Tab ที่กำลังเปิด
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'machines', 'certs'

  // 2. State เก็บข้อมูลฟอร์มพื้นฐาน
  const [formData, setFormData] = useState({
    companyName: 'บริษัท ไทย เมทัล เวิร์ค จำกัด',
    bizType: 'manufacturer', // 'manufacturer', 'trading', 'both'
    province: 'ชลบุรี',
    aboutText: 'เราคือผู้เชี่ยวชาญด้านงานกลึง CNC และปั๊มโลหะสำหรับอุตสาหกรรมยานยนต์...',
    website: 'www.thaimetalwork.co.th',
    phone: '038-123-4567'
  });

  // 3. State เก็บรายการเครื่องจักร
  const [machines, setMachines] = useState([
    { id: 1, name: 'เครื่องกลึง CNC (CNC Lathe)', brand: 'Okuma', spec: '5-Axis, Max size 500mm', qty: 12 },
    { id: 2, name: 'เครื่องปั๊มโลหะ (Stamping Press)', brand: 'Aida', spec: '200 Ton', qty: 5 }
  ]);

  // 4. State เก็บรายการใบเซอร์
  const [certs, setCerts] = useState(['ISO 9001:2015', 'IATF 16949']);

  // ฟังก์ชันจัดการการพิมพ์ในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ฟังก์ชันจำลองการกดบันทึก
  const handleSave = (e) => {
    e.preventDefault();
    alert('บันทึกข้อมูลเรียบร้อยแล้ว (จำลองการยิง API)');
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-gray-50 text-gray-800 relative">
      
      {/* ================= SIDEBAR (เหมือนหน้า CRM) ================= */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col h-full shadow-xl shrink-0 hidden md:flex z-20">
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto no-scrollbar">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 px-2">เมนูหลัก</p>
          <Link to="/supplier-dashboard" className="w-full flex items-center px-4 py-3 text-blue-200 hover:bg-blue-800/50 rounded-xl font-medium transition">
            <i className="fa-solid fa-chart-pie w-6"></i> ภาพรวม (Dashboard)
          </Link>
          <Link to="/supplier-crm" className="w-full flex items-center px-4 py-3 text-blue-200 hover:bg-blue-800/50 rounded-xl font-medium transition">
            <i className="fa-solid fa-clipboard-list w-6"></i> กระดาน CRM
          </Link>
          
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 mt-8 px-2">การตั้งค่า</p>
          <button className="w-full flex items-center px-4 py-3 bg-blue-800 text-white rounded-xl font-medium transition cursor-default">
            <i className="fa-solid fa-building w-6"></i> โปรไฟล์โรงงาน
          </button>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">ตั้งค่าโปรไฟล์โรงงาน</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to={`/supplier-profile/1`} className="text-sm font-bold text-blue-600 hover:underline flex items-center">
              <i className="fa-solid fa-eye mr-2"></i> ดูหน้าโปรไฟล์สาธารณะ
            </Link>
          </div>
        </header>

        {/* Layout แบบมีเมนูย่อยด้านซ้าย (Sub-navigation) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* เมนูแท็บด้านซ้าย */}
          <div className="w-full md:w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto p-4 md:p-6 gap-2">
            <button 
              onClick={() => setActiveTab('basic')} 
              className={`text-left px-4 py-3 rounded-xl transition font-medium whitespace-nowrap md:whitespace-normal ${activeTab === 'basic' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <i className="fa-solid fa-circle-info w-6 text-center"></i> ข้อมูลพื้นฐาน
            </button>
            <button 
              onClick={() => setActiveTab('machines')} 
              className={`text-left px-4 py-3 rounded-xl transition font-medium whitespace-nowrap md:whitespace-normal ${activeTab === 'machines' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <i className="fa-solid fa-cogs w-6 text-center"></i> จัดการเครื่องจักร
            </button>
            <button 
              onClick={() => setActiveTab('certs')} 
              className={`text-left px-4 py-3 rounded-xl transition font-medium whitespace-nowrap md:whitespace-normal ${activeTab === 'certs' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <i className="fa-solid fa-certificate w-6 text-center"></i> เอกสารรับรอง (Cert.)
            </button>
          </div>

          {/* พื้นที่แก้ไขข้อมูล (ฟอร์ม) */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50 no-scrollbar">
            
            {/* ================= TAB 1: ข้อมูลพื้นฐาน ================= */}
            {activeTab === 'basic' && (
              <div className="animate-fade-in max-w-3xl space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mb-5">โลโก้และรูปภาพปก</h3>
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:border-blue-300 transition cursor-pointer">
                      <i className="fa-solid fa-camera text-2xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1">อัปโหลดโลโก้บริษัท</h4>
                      <p className="text-xs text-gray-500 mb-3">แนะนำขนาด 400x400px (JPG, PNG)</p>
                      <button className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100">เลือกไฟล์รูปภาพ</button>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                  <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mb-5">ข้อมูลบริษัทเบื้องต้น</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อบริษัท (แสดงหน้าโปรไฟล์) *</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ประเภทธุรกิจ *</label>
                      <select name="bizType" value={formData.bizType} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white">
                        <option value="manufacturer">ผู้ผลิต / โรงงาน (Manufacturer)</option>
                        <option value="trading">เทรดดิ้ง / ผู้นำเข้า (Trading)</option>
                        <option value="both">เป็นทั้งผู้ผลิตและเทรดดิ้ง</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">จังหวัดที่ตั้ง *</label>
                      <input type="text" name="province" value={formData.province} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">เกี่ยวกับบริษัท (About Us) *</label>
                    <textarea name="aboutText" value={formData.aboutText} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white resize-none"></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์สาธารณะ</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">เว็บไซต์บริษัท (ถ้ามี)</label>
                      <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white" />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 shadow-md transition active:scale-95">
                      <i className="fa-solid fa-save mr-2"></i> บันทึกข้อมูล
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ================= TAB 2: จัดการเครื่องจักร ================= */}
            {activeTab === 'machines' && (
              <div className="animate-fade-in max-w-4xl">
                
                {/* 🔴 Logic อัจฉริยะ: ซ่อนส่วนนี้ถ้าเป็น Trading ล้วน */}
                {formData.bizType === 'trading' ? (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-2xl text-center">
                    <i className="fa-solid fa-triangle-exclamation text-3xl mb-3 text-yellow-500"></i>
                    <h3 className="font-bold text-lg mb-1">ไม่สามารถเพิ่มเครื่องจักรได้</h3>
                    <p className="text-sm">เนื่องจากคุณระบุประเภทธุรกิจเป็น "เทรดดิ้ง" หากคุณมีเครื่องจักรโปรดเปลี่ยนประเภทธุรกิจในหน้าข้อมูลพื้นฐาน</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">รายการเครื่องจักรและความสามารถ</h2>
                        <p className="text-sm text-gray-500">เพิ่มรายละเอียดเครื่องจักรเพื่อเพิ่มโอกาสในการค้นหา</p>
                      </div>
                      <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-blue-700 shadow-sm flex items-center">
                        <i className="fa-solid fa-plus mr-2"></i> เพิ่มเครื่องจักร
                      </button>
                    </div>

                    <div className="space-y-4">
                      {machines.map(mac => (
                        <div key={mac.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between group">
                          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                              <i className="fa-solid fa-cogs text-2xl"></i>
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-gray-900">{mac.name}</h4>
                              <p className="text-sm text-gray-500"><span className="font-medium">ยี่ห้อ:</span> {mac.brand} | <span className="font-medium">สเปก:</span> {mac.spec}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="text-center">
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">จำนวน</p>
                              <p className="font-bold text-blue-600 text-lg">{mac.qty}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition flex items-center justify-center">
                                <i className="fa-solid fa-pen"></i>
                              </button>
                              <button className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition flex items-center justify-center">
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ================= TAB 3: เอกสารรับรอง ================= */}
            {activeTab === 'certs' && (
              <div className="animate-fade-in max-w-4xl space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center border-dashed border-2 hover:bg-blue-50 transition cursor-pointer">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-3">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                  </div>
                  <h3 className="font-bold text-gray-800">คลิกเพื่ออัปโหลดใบรับรอง (Certificate)</h3>
                  <p className="text-sm text-gray-500 mt-1">รองรับไฟล์ PDF หรือ JPG (เช่น ISO9001, IATF16949, BOI)</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certs.map((cert, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <i className="fa-solid fa-file-pdf text-red-500 text-2xl"></i>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{cert}</p>
                          <p className="text-xs text-green-500 font-bold flex items-center mt-0.5"><i className="fa-solid fa-check-circle mr-1"></i> ตรวจสอบแล้ว</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

export default CompAdmin;