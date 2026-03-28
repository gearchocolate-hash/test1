// ไฟล์: src/pages/BuyerDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BuyerDashboard() {
  // 1. State สำหรับจัดการเมนูที่กำลังเปิดอยู่ (dashboard, quotes, requests)
  const [activeView, setActiveView] = useState('dashboard');

  // 2. State สำหรับ Pop-up ติดต่อซัพพลายเออร์
  const [modalState, setModalState] = useState({
    isOpen: false,
    supplierName: ''
  });

  // 3. State สำหรับเก็บข้อมูลจำลอง (Mock Data)
  const [stats, setStats] = useState({ requests: 0, quotes: 0, saved: 0 });
  const [recentRequests, setRecentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // จำลองการดึงข้อมูลจาก Backend
    setTimeout(() => {
      setStats({ requests: 3, quotes: 12, saved: 5 });
      
      setRecentRequests([
        { id: 'REQ-001', title: 'งานฉีดพลาสติก ABS ชิ้นส่วนรถยนต์', category: 'ยานยนต์', quotes: 5, status: 'เปิดรับข้อเสนอ' },
        { id: 'REQ-002', title: 'กลึงชิ้นส่วนสแตนเลส SUS316L', category: 'เครื่องมือแพทย์', quotes: 2, status: 'กำลังพิจารณา' },
      ]);
      
      setIsLoading(false);
    }, 500); // หน่วงเวลา 0.5 วินาทีจำลองการโหลด
  }, []);

  // ฟังก์ชันสลับเมนู Sidebar
  const handleNavClick = (viewName) => {
    setActiveView(viewName);
  };

  // ดึงชื่อหน้าจาก view ปัจจุบัน
  const getPageTitle = () => {
    if (activeView === 'dashboard') return 'ภาพรวมการจัดซื้อ (Buyer Dashboard)';
    if (activeView === 'quotes') return 'เปรียบเทียบใบเสนอราคา';
    if (activeView === 'requests') return 'โพสต์ประกาศของฉัน';
    return '';
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-gray-50 text-gray-800 relative">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl z-20 shrink-0 hidden md:flex">
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto no-scrollbar">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">เมนูการจัดซื้อ</p>
          
          <button 
            onClick={() => handleNavClick('dashboard')} 
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition ${activeView === 'dashboard' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800/50'}`}
          >
            <i className="fa-solid fa-chart-pie w-6"></i> ภาพรวม (Dashboard)
          </button>
          
          <button 
            onClick={() => handleNavClick('quotes')} 
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition ${activeView === 'quotes' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800/50'}`}
          >
            <i className="fa-solid fa-file-invoice-dollar w-6"></i> เปรียบเทียบราคา <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">ใหม่</span>
          </button>
          
          <button 
            onClick={() => handleNavClick('requests')} 
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition ${activeView === 'requests' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800/50'}`}
          >
            <i className="fa-solid fa-bullhorn w-6"></i> โพสต์ประกาศของฉัน
          </button>

          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-8 px-2">เครือข่าย</p>
          <button className="w-full flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl font-medium transition">
            <i className="fa-solid fa-bookmark w-6"></i> โรงงานที่บันทึกไว้
          </button>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 mr-4">{getPageTitle()}</h1>
            <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full border border-teal-200 hidden md:inline-block">
              <i className="fa-solid fa-user-tie mr-1"></i> โหมดผู้จัดซื้อ
            </span>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* ปุ่มสลับโหมด */}
            <Link to="/supplier-crm" className="hidden sm:flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-bold hover:bg-gray-200 hover:text-blue-700 transition border border-gray-200 shadow-sm group">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm mr-2 group-hover:text-blue-600 transition">
                <i className="fa-solid fa-shop text-xs"></i>
              </div>
              สลับเป็นโหมดผู้ขาย
            </Link>

            <button className="relative text-gray-400 hover:text-teal-600 transition">
              <i className="fa-regular fa-bell text-xl"></i>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* พื้นที่เนื้อหาที่เปลี่ยนไปตาม activeView */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <i className="fa-solid fa-circle-notch fa-spin text-4xl text-teal-500"></i>
            </div>
          ) : (
            <>
              {/* ================= VIEW: DASHBOARD ================= */}
              {activeView === 'dashboard' && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* กล่องสถิติ */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
                      <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mr-4 shrink-0">
                        <i className="fa-solid fa-bullhorn"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">ประกาศหางาน (Active)</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.requests} <span className="text-xs text-gray-400 font-normal ml-1">โปรเจกต์</span></p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
                      <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-2xl mr-4 shrink-0">
                        <i className="fa-solid fa-file-invoice-dollar"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">ใบเสนอราคาที่ได้รับ</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.quotes} <span className="text-xs text-red-500 font-bold ml-1">+ใหม่ 3</span></p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
                      <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-2xl mr-4 shrink-0">
                        <i className="fa-solid fa-bookmark"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">โรงงานที่บันทึกไว้</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.saved} <span className="text-xs text-gray-400 font-normal ml-1">แห่ง</span></p>
                      </div>
                    </div>
                  </div>

                  {/* ตารางประกาศล่าสุด */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 w-full">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-gray-800">ประกาศจัดซื้อล่าสุดของคุณ</h3>
                      <button onClick={() => setActiveView('requests')} className="text-sm text-teal-600 font-semibold hover:underline border border-teal-200 bg-teal-50 px-3 py-1.5 rounded-lg">ดูทั้งหมด</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-gray-400 text-sm border-b border-gray-100">
                            <th className="pb-3 font-medium">ชื่อโปรเจกต์ / รหัส</th>
                            <th className="pb-3 font-medium">หมวดหมู่</th>
                            <th className="pb-3 font-medium">ข้อเสนอที่ได้รับ</th>
                            <th className="pb-3 font-medium">สถานะ</th>
                            <th className="pb-3 font-medium text-right">จัดการ</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {recentRequests.map((req) => (
                            <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                              <td className="py-4">
                                <p className="font-bold text-gray-800">{req.title}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{req.id}</p>
                              </td>
                              <td className="py-4"><span className="bg-orange-50 text-orange-600 px-2 py-1 rounded font-medium text-xs">{req.category}</span></td>
                              <td className="py-4 font-bold text-teal-600">{req.quotes} โรงงาน</td>
                              <td className="py-4"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium text-xs">{req.status}</span></td>
                              <td className="py-4 text-right">
                                <button onClick={() => setActiveView('quotes')} className="bg-teal-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-teal-700 shadow-sm transition">
                                  เทียบราคา
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= VIEW: QUOTES (เปรียบเทียบราคา) ================= */}
              {activeView === 'quotes' && (
                <div className="animate-fade-in space-y-6">
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <h3 className="font-bold text-teal-900 text-lg">งานฉีดพลาสติก ABS ชิ้นส่วนรถยนต์ (REQ-001)</h3>
                      <p className="text-teal-700 text-sm">มี 3 โรงงานเสนอราคาเข้ามา กรุณาเปรียบเทียบและเลือกผู้ชนะ (Award)</p>
                    </div>
                    <button className="mt-4 md:mt-0 bg-white border border-teal-300 text-teal-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                      <i className="fa-solid fa-download mr-2"></i> ดาวน์โหลดตารางเทียบราคา (Excel)
                    </button>
                  </div>

                  {/* โมเดลกล่องเทียบราคาแบบง่าย */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* โรงงาน 1 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-teal-400 transition">
                      <h4 className="font-bold text-gray-900 text-lg mb-1">บจก. เอเชีย โพลีเมอร์</h4>
                      <p className="text-xs text-gray-500 mb-4"><i className="fa-solid fa-star text-yellow-400"></i> เรตติ้ง 4.8 (Verified)</p>
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm"><span className="text-gray-500">ราคาต่อชิ้น:</span> <span className="font-bold">฿ 12.50</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-500">ค่าแม่พิมพ์ (Mold):</span> <span className="font-bold">฿ 120,000</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-500">ระยะเวลาผลิต:</span> <span className="font-bold text-orange-500">45 วัน</span></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setModalState({ isOpen: true, supplierName: 'บจก. เอเชีย โพลีเมอร์' })} className="border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-bold hover:bg-gray-50">ติดต่อ</button>
                        <button className="bg-teal-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-teal-700">เลือกเจ้านี้</button>
                      </div>
                    </div>

                    {/* โรงงาน 2 */}
                    <div className="bg-teal-50 border-2 border-teal-500 rounded-2xl p-5 shadow-md relative transform scale-105">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">ราคาดีที่สุด</div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">ไทยพลาสติก อินดัสทรี</h4>
                      <p className="text-xs text-gray-500 mb-4"><i className="fa-solid fa-star text-yellow-400"></i> เรตติ้ง 4.9 (Verified)</p>
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm"><span className="text-gray-500">ราคาต่อชิ้น:</span> <span className="font-bold text-green-600">฿ 11.80</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-500">ค่าแม่พิมพ์ (Mold):</span> <span className="font-bold">฿ 125,000</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-500">ระยะเวลาผลิต:</span> <span className="font-bold">40 วัน</span></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setModalState({ isOpen: true, supplierName: 'ไทยพลาสติก อินดัสทรี' })} className="border border-teal-300 text-teal-700 py-2 rounded-lg text-sm font-bold hover:bg-teal-100">ติดต่อ</button>
                        <button className="bg-teal-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-teal-700">เลือกเจ้านี้</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= VIEW: REQUESTS (โพสต์ของฉัน) ================= */}
              {activeView === 'requests' && (
                <div className="animate-fade-in text-center py-20 text-gray-500">
                  <i className="fa-solid fa-bullhorn text-5xl mb-4 text-gray-300"></i>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">หน้าจัดการประกาศจัดซื้อ</h3>
                  <p className="mb-6">คุณสามารถสร้าง แก้ไข หรือปิดรับประกาศหางานของคุณได้ที่นี่</p>
                  <Link to="/sourcing-request" className="bg-teal-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-700 shadow-md">
                    + ฝากโพสต์ประกาศงานใหม่
                  </Link>
                </div>
              )}
            </>
          )}

        </div>
      </main>

      {/* ================= CONTACT MODAL (POP-UP 3 ช่องทาง) ================= */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-[100] flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-md overflow-hidden transform scale-100 transition-transform duration-300">
            <div className="bg-teal-600 p-6 text-white flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-1">ติดต่อซัพพลายเออร์</h3>
                <p className="text-teal-100 text-sm">เจรจาต่อรองกับ: {modalState.supplierName}</p>
              </div>
              <button 
                onClick={() => setModalState({ isOpen: false, supplierName: '' })} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-500/50 hover:bg-teal-500 transition text-white"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <button onClick={() => alert('จำลอง: ระบบเปิดหน้าต่างแชท...')} className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-teal-400 hover:bg-teal-50 transition flex items-center">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xl mr-4 shrink-0"><i className="fa-solid fa-comment-dots"></i></div>
                <div>
                  <h4 className="font-bold text-gray-900">คุยแชทผ่านเว็บ</h4>
                  <p className="text-xs text-gray-500 mt-0.5">สอบถามสเปกแม่พิมพ์เบื้องต้น</p>
                </div>
              </button>
              <button onClick={() => alert('จำลอง: ระบบส่งอีเมล...')} className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-indigo-400 hover:bg-indigo-50 transition flex items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl mr-4 shrink-0"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <h4 className="font-bold text-gray-900">ส่งอีเมล (Email)</h4>
                  <p className="text-xs text-gray-500 mt-0.5">ส่งไฟล์แนบหรือเอกสาร NDA</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default BuyerDashboard;