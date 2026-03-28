// ไฟล์: src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  // 1. State สำหรับฟอร์มค้นหา
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    province: ''
  });

  // 2. State สำหรับเก็บข้อมูลโรงงานแนะนำ และสถานะโหลด
  const [featuredFactories, setFeaturedFactories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. State สำหรับจัดการ Pop-up Modal ติดต่อ
  const [modalState, setModalState] = useState({
    isOpen: false,
    supplierName: ''
  });

  // 4. ดึงข้อมูลโรงงานแนะนำจาก Backend ตอนโหลดหน้าครั้งแรก
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/factories/featured');
        if (response.ok) {
          const data = await response.json();
          setFeaturedFactories(data.factories);
        }
      } catch (error) {
        console.error('ไม่สามารถดึงข้อมูลโรงงานแนะนำได้:', error);
        // จำลองข้อมูล (Mock Data) เผื่อ Backend ยังไม่เปิด
        setFeaturedFactories([
          { _id: '1', companyName: 'บริษัท ไทย เมทัล เวิร์ค จำกัด', province: 'ชลบุรี', industryParams: { primaryIndustry: 'automotive' } },
          { _id: '2', companyName: 'โรงงานพลาสติก เอเชีย', province: 'สมุทรปราการ', industryParams: { primaryIndustry: 'machine' } }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  // 5. จัดการเมื่อกดปุ่มค้นหา
  const handleSearch = (e) => {
    e.preventDefault();
    // นำค่าที่พิมพ์ไปต่อท้าย URL (เช่น /search?keyword=เหล็ก&province=ชลบุรี)
    const query = new URLSearchParams(searchParams).toString();
    // หมายเหตุ: หน้า /search เราจะสร้างในอนาคต
    navigate(`/search?${query}`); 
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      
      {/* ================= HERO SECTION ================= */}
      <header className="relative bg-gradient-to-br from-blue-900 to-blue-700 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            เชื่อมต่อโรงงานไทย <br/><span className="text-orange-400 font-bold">คุยตรงถึงเซลล์</span> พร้อมระบบ CRM
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            ค้นหาซัพพลายเออร์ที่ผ่านการตรวจสอบคุยผ่านแชทได้ทันที <br className="hidden md:block" /> และบันทึกข้อมูลลูกค้าเข้าสู่ระบบของบริษัทคุณเองเพื่อแก้ปัญหา Data Ownership
          </p>
          
          {/* กล่องค้นหา (Scope Search Form) */}
          <form onSubmit={handleSearch} className="bg-white p-2 md:p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
            
            <div className="flex-[2] flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-100">
              <i className="fa-solid fa-magnifying-glass text-blue-400 mr-3"></i>
              <input 
                type="text" 
                placeholder="ค้นหาอุตสาหกรรม (เช่น งานเหล็ก, ฉีดพลาสติก...)" 
                className="w-full py-4 outline-none text-gray-700 font-medium placeholder-gray-400"
                value={searchParams.keyword}
                onChange={(e) => setSearchParams({...searchParams, keyword: e.target.value})}
              />
            </div>

            <div className="flex-1 flex items-center px-4">
              <i className="fa-solid fa-location-dot text-orange-500 mr-3"></i>
              <input 
                type="text" 
                placeholder="พิมพ์ชื่อจังหวัด..." 
                className="w-full py-4 outline-none text-gray-700 font-medium placeholder-gray-400"
                list="provinces"
                value={searchParams.province}
                onChange={(e) => setSearchParams({...searchParams, province: e.target.value})}
              />
              <datalist id="provinces">
                <option value="กรุงเทพมหานคร" />
                <option value="ชลบุรี" />
                <option value="ระยอง" />
                <option value="สมุทรปราการ" />
                <option value="ปทุมธานี" />
                <option value="พระนครศรีอยุธยา" />
              </datalist>
            </div>

            <button type="submit" className="bg-orange-500 text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all active:scale-95 shadow-lg">
              ค้นหาเลย
            </button>
          </form>
          
          {/* สถิติและแท็กค้นหา */}
          <div className="mt-6 flex justify-center space-x-6 text-blue-200 text-sm">
            <span><i className="fa-solid fa-check-circle mr-1 text-green-400"></i> โรงงานยืนยันตัวตนแล้ว 2,500+ แห่ง</span>
            <span><i className="fa-solid fa-bolt mr-1 text-yellow-400"></i> ตอบกลับเฉลี่ยภายใน 15 นาที</span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-5">
            <button className="px-5 py-2.5 bg-white/10 hover:bg-white/25 border border-blue-300/30 rounded-full text-white text-sm font-medium backdrop-blur-sm transition flex items-center shadow-sm">
              <i className="fa-solid fa-cogs mr-2 text-blue-300"></i> ค้นหาผ่านเครื่องจักร
            </button>
            <button className="px-5 py-2.5 bg-white/10 hover:bg-white/25 border border-blue-300/30 rounded-full text-white text-sm font-medium backdrop-blur-sm transition flex items-center shadow-sm">
              <i className="fa-solid fa-layer-group mr-2 text-blue-300"></i> ค้นหาผ่านประเภทการผลิต
            </button>
          </div>
        </div>
      </header>

      {/* ================= FEATURED SUPPLIERS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16 flex-1 w-full">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">โรงงานที่น่าสนใจ</h2>
            <p className="text-gray-500">ซัพพลายเออร์แนะนำพร้อมให้คำปรึกษา</p>
          </div>
          <Link to="/search" className="text-blue-600 font-semibold flex items-center hover:underline group">
            ดูทั้งหมด <i className="fa-solid fa-arrow-right ml-2 text-sm group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>

        {/* แสดง Loading Spinner หรือ ข้อมูลโรงงาน */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <i className="fa-solid fa-circle-notch fa-spin text-4xl text-blue-500"></i>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* วนลูป (Map) ข้อมูลที่ได้จาก Backend มาวาดเป็นการ์ด */}
            {featuredFactories.map((factory) => (
              <div key={factory._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative h-56 bg-gray-200">
                  {/* รูปภาพจำลอง (ของจริงจะดึงจาก factory.logoUrl) */}
                  <img src={`https://source.unsplash.com/800x600/?factory,industry&sig=${factory._id}`} alt="factory" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-600 shadow-sm border border-green-100">
                    <i className="fa-solid fa-shield-check mr-1"></i> Verified
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3 truncate">{factory.companyName}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex items-center">
                    <i className="fa-solid fa-location-dot mr-2 text-red-400"></i> {factory.province || 'ไม่ระบุจังหวัด'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <Link to={`/supplier-profile/${factory._id}`} className="py-3 px-4 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition border border-gray-200 text-center flex items-center justify-center text-sm">
                      ดูข้อมูลโรงงาน
                    </Link>
                    <button 
                      onClick={() => setModalState({ isOpen: true, supplierName: factory.companyName })}
                      className="py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition flex items-center justify-center shadow-md text-sm"
                    >
                      <i className="fa-solid fa-handshake mr-2"></i> ติดต่อ / เจรจา
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* การ์ดโฆษณาเชิญชวนให้ลงทะเบียน */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300 font-medium">
              <div className="relative h-56 bg-blue-50 flex flex-col items-center justify-center p-8 text-center">
                <i className="fa-solid fa-briefcase text-blue-300 text-5xl mb-4"></i>
                <h4 className="text-blue-900 font-bold text-xl mb-2">ลงทะเบียนเพื่อเพิ่มยอดขาย</h4>
                <p className="text-blue-700/70 text-sm mb-6 leading-relaxed">รับฟีเจอร์แชทและระบบ CRM สำหรับจัดเก็บ Lead ลูกค้าของบริษัทคุณเอง</p>
                <Link to="/register-supplier" className="bg-blue-600 text-white px-8 py-2.5 rounded-full shadow-lg hover:bg-blue-700 transition-all active:scale-95">สมัครฟรีวันนี้</Link>
              </div>
              <div className="p-6 bg-blue-900 text-white h-full">
                <h5 className="font-bold mb-3 uppercase text-xs tracking-widest text-blue-300">จุดเด่นระบบ Micro-CRM</h5>
                <ul className="text-sm space-y-3 opacity-90">
                    <li className="flex items-center"><i className="fa-solid fa-circle-check text-green-400 mr-2"></i> ข้อมูลลูกค้าเป็นของบริษัท 100%</li>
                    <li className="flex items-center"><i className="fa-solid fa-circle-check text-green-400 mr-2"></i> บันทึกประวัติการแชทอัตโนมัติ</li>
                </ul>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* ================= CONTACT MODAL (POP-UP) ================= */}
      {/* ใช้เงื่อนไข {modalState.isOpen && (...)} เพื่อซ่อน/แสดง Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-[100] flex items-center justify-center">
          {/* ตัวกล่อง Modal ขาวๆ */}
          <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-md overflow-hidden animate-fade-in">
            
            <div className="bg-blue-600 p-6 text-white flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-1">ติดต่อซัพพลายเออร์</h3>
                <p className="text-blue-100 text-sm">ติดต่อ: {modalState.supplierName}</p>
              </div>
              <button 
                onClick={() => setModalState({ isOpen: false, supplierName: '' })} 
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
              
              <button onClick={() => alert('เปิดอีเมล')} className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-indigo-400 hover:bg-indigo-50 transition flex items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl mr-4 shrink-0"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <h4 className="font-bold text-gray-900">ส่งอีเมล (Email)</h4>
                  <p className="text-xs text-gray-500 mt-0.5">เหมาะสำหรับมีไฟล์ Drawing ขนาดใหญ่</p>
                </div>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Home;