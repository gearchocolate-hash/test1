// ไฟล์: src/pages/SupplierProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function SupplierProfile() {
  const { id } = useParams(); // รับ ID โรงงานจาก URL (เช่น /supplier-profile/123)
  
  // 1. State สำหรับเก็บข้อมูลโรงงาน
  const [factory, setFactory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. State ควบคุม Tab และ Modal
  const [activeTab, setActiveTab] = useState('about');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. ดึงข้อมูลเมื่อโหลดหน้า (จำลองการยิง API)
  useEffect(() => {
    // ของจริง: fetch(`http://localhost:5000/api/factories/${id}`)
    
    // จำลองข้อมูล (Mock Data)
    setTimeout(() => {
      setFactory({
        _id: id || '1',
        companyName: 'บริษัท ไทย เมทัล เวิร์ค จำกัด',
        province: 'ชลบุรี',
        industryParams: {
          primaryIndustry: 'automotive',
          manufacturingProcesses: ['machining', 'metal_stamping'],
          customTags: ['เหล็ก SKD11', 'ความคลาดเคลื่อน 0.01mm']
        },
        aboutText: 'เราคือผู้เชี่ยวชาญด้านงานกลึง CNC และปั๊มโลหะสำหรับอุตสาหกรรมยานยนต์ ก่อตั้งมาแล้วกว่า 15 ปี พร้อมทีมวิศวกรควบคุมคุณภาพและเครื่องจักรที่ทันสมัยนำเข้าจากประเทศญี่ปุ่น',
        machines: [
          { id: 1, name: 'CNC Lathe (เครื่องกลึง)', brand: 'Okuma', spec: '5-Axis, Max 500mm', qty: 12 },
          { id: 2, name: 'Stamping Press (ปั๊มโลหะ)', brand: 'Aida', spec: '200 Ton', qty: 5 }
        ],
        certifications: ['ISO 9001:2015', 'IATF 16949'],
        isVerified: true
      });
      setIsLoading(false);
    }, 600);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <i className="fa-solid fa-circle-notch fa-spin text-5xl text-blue-600"></i>
      </div>
    );
  }

  if (!factory) {
    return <div className="text-center py-20 text-red-500">ไม่พบข้อมูลโรงงาน</div>;
  }

  // แปลงชื่ออุตสาหกรรมเป็นภาษาไทย
  const getIndustryName = (key) => {
    const types = { automotive: 'ยานยนต์และชิ้นส่วน', electronic: 'อิเล็กทรอนิกส์', machine: 'เครื่องจักร' };
    return types[key] || 'อุตสาหกรรมทั่วไป';
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 pb-20">
      
      {/* ================= HEADER SECTION ================= */}
      <header className="bg-white border-b border-gray-200">
        {/* Cover Image */}
        <div className="h-48 md:h-64 w-full relative bg-blue-900 overflow-hidden">
          <img src={`https://source.unsplash.com/1600x400/?factory,machine`} alt="cover" className="w-full h-full object-cover opacity-60" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative pb-8">
          {/* Logo & Basic Info */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20 gap-6">
            
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
              {/* รูปโลโก้โรงงาน */}
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl shadow-xl border-4 border-white overflow-hidden shrink-0 z-10 flex items-center justify-center text-blue-200 text-6xl">
                <i className="fa-solid fa-industry"></i>
              </div>
              
              <div className="pb-2">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
                    {getIndustryName(factory.industryParams.primaryIndustry)}
                  </span>
                  {factory.isVerified && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 flex items-center">
                      <i className="fa-solid fa-shield-check mr-1"></i> ยืนยันตัวตนแล้ว
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                  {factory.companyName}
                </h1>
                <p className="text-gray-500 font-medium">
                  <i className="fa-solid fa-location-dot text-red-400 mr-2"></i>จ.{factory.province}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center md:justify-end space-x-3 w-full md:w-auto z-10">
              <button className="px-5 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 shadow-sm transition flex items-center">
                <i className="fa-regular fa-bookmark mr-2"></i> บันทึก
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md transition transform active:scale-95 flex items-center"
              >
                <i className="fa-solid fa-handshake mr-2"></i> ติดต่อ / เจรจา
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= TABS NAVIGATION ================= */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('about')}
            className={`whitespace-nowrap py-4 px-6 font-medium text-sm transition border-b-2 ${activeTab === 'about' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            ข้อมูลทั่วไป (About)
          </button>
          <button 
            onClick={() => setActiveTab('machines')}
            className={`whitespace-nowrap py-4 px-6 font-medium text-sm transition border-b-2 ${activeTab === 'machines' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            เครื่องจักร & ความสามารถ (Capacities)
          </button>
          <button 
            onClick={() => setActiveTab('cert')}
            className={`whitespace-nowrap py-4 px-6 font-medium text-sm transition border-b-2 ${activeTab === 'cert' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            มาตรฐาน & ผลงาน (Cert. & Portfolio)
          </button>
        </div>
      </div>

      {/* ================= TAB CONTENTS ================= */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
        {/* TAB: ข้อมูลทั่วไป */}
        {activeTab === 'about' && (
          <div className="animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">เกี่ยวกับบริษัท</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {factory.aboutText}
                </p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">กระบวนการผลิตเด่น</h3>
                <div className="flex flex-wrap gap-2">
                  {factory.industryParams.manufacturingProcesses.map(proc => (
                    <span key={proc} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold border border-blue-100">
                      {proc.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">จุดเด่น / แท็กเฉพาะทาง</h3>
                <div className="flex flex-wrap gap-2">
                  {factory.industryParams.customTags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md text-xs font-bold">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: เครื่องจักร */}
        {activeTab === 'machines' && (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">รายการเครื่องจักรหลัก (Main Machines)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {factory.machines.map(mac => (
                <div key={mac.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                    <i className="fa-solid fa-cogs text-3xl"></i>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-lg text-gray-900 leading-tight mb-1">{mac.name}</h4>
                    <p className="text-sm text-gray-500 mb-3"><span className="font-bold text-gray-700">Brand:</span> {mac.brand}</p>
                    <div className="flex items-end justify-between mt-auto">
                      <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">Spec: {mac.spec}</div>
                      <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">จำนวน: {mac.qty}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: มาตรฐาน */}
        {activeTab === 'cert' && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4">มาตรฐานที่ได้รับการรับรอง</h3>
            <div className="flex gap-4">
              {factory.certifications.map((cert, idx) => (
                <div key={idx} className="bg-white border border-gray-200 px-6 py-4 rounded-xl shadow-sm font-bold text-gray-700 flex items-center">
                  <i className="fa-solid fa-certificate text-yellow-500 mr-2 text-xl"></i> {cert}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ================= CONTACT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-[100] flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-md overflow-hidden transform scale-100 transition-transform duration-300">
            <div className="bg-blue-600 p-6 text-white flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-1">ติดต่อซัพพลายเออร์</h3>
                <p className="text-blue-100 text-sm">ติดต่อ: {factory.companyName}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500/50 hover:bg-blue-500 transition text-white"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <button onClick={() => alert('เปิดแชท')} className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-400 hover:bg-blue-50 transition flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl mr-4 shrink-0"><i className="fa-solid fa-comment-dots"></i></div>
                <div>
                  <h4 className="font-bold text-gray-900">คุยแชทผ่านเว็บ</h4>
                  <p className="text-xs text-gray-500 mt-0.5">สอบถามข้อมูลเบื้องต้น (ตอบกลับไว 15 นาที)</p>
                </div>
              </button>
              
              <button onClick={() => alert('เปิด RFQ')} className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-orange-400 hover:bg-orange-50 transition flex items-center">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl mr-4 shrink-0"><i className="fa-solid fa-file-invoice-dollar"></i></div>
                <div>
                  <h4 className="font-bold text-gray-900">ขอใบเสนอราคา (RFQ)</h4>
                  <p className="text-xs text-gray-500 mt-0.5">ระบุสเปกเพื่อประเมินราคาอย่างเป็นทางการ</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default SupplierProfile;