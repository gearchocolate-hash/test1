// ไฟล์: src/pages/CRM.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CRM() {
  // 1. State เก็บข้อมูลรายการลูกค้าบนกระดาน (Leads)
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. State ควบคุม Slide-over Panel (หน้าต่างรายละเอียดขวามือ)
  const [panelState, setPanelState] = useState({
    isOpen: false,
    activeTab: 'contacts', // มี 'contacts', 'rfq', 'activity'
    selectedLead: null     // เก็บข้อมูลการ์ดที่ถูกคลิก
  });

  // 3. (จำลอง) ดึงข้อมูลการ์ดจาก Backend เมื่อเปิดหน้า
  useEffect(() => {
    // ในของจริงเราจะดึง SupplierId จาก AuthContext แล้วยิง API
    // fetch(`http://localhost:5000/api/crm/supplier/${user.companyId}`)
    
    // ตรงนี้ผมใส่ข้อมูลจำลอง (Mock Data) ให้หน้าตามีการ์ดขึ้นมาเหมือน HTML เดิม
    const mockLeads = [
      {
        _id: '1', stage: '1_Intro', industryCategory: 'ยานยนต์', time: '1 ชม.',
        companyName: 'บจก. ออโต้พาร์ท (ไทยแลนด์)', projectTitle: 'หาโรงงานฉีดพลาสติกคอนโซลหน้า จำนวน 50,000 ชิ้น/เดือน',
        contactPerson: 'คุณสมชาย', source: 'Chat', price: null
      },
      {
        _id: '2', stage: '1_Intro', industryCategory: 'อิเล็กทรอนิกส์', time: '2 ชม.',
        companyName: 'บมจ. อินโนเวทีฟ เทค', projectTitle: 'แนบ Drawing ประเมินราคา',
        contactPerson: 'คุณก้องเกียรติ', source: 'Email', price: null
      },
      {
        _id: '3', stage: '2_RFQ', industryCategory: 'เครื่องมือแพทย์', statusBadge: 'รอปรับแบบ (Rev.2)',
        companyName: 'บมจ. เมดิคอล เซ็นเตอร์', projectTitle: 'กลึงชิ้นส่วนสแตนเลส (SUS316L)',
        contactPerson: 'คุณวิภา', source: 'RFQ_Board', price: '฿ 250,000'
      }
    ];
    
    setLeads(mockLeads);
    setIsLoading(false);
  }, []);

  // 4. ฟังก์ชันเปิดหน้าต่างรายละเอียด
  const openPanel = (lead) => {
    setPanelState({
      isOpen: true,
      activeTab: 'contacts',
      selectedLead: lead
    });
  };

  // 5. ฟังก์ชันปิดหน้าต่าง
  const closePanel = () => {
    setPanelState({ ...panelState, isOpen: false });
    // หน่วงเวลาเคลียร์ข้อมูลเพื่อรอให้ Animation สไลด์ปิดเสร็จก่อน
    setTimeout(() => {
      setPanelState(prev => ({ ...prev, selectedLead: null }));
    }, 300);
  };

  // 6. โครงสร้างคอลัมน์ของ Kanban
  const columns = [
    { id: '1_Intro', title: '1. แนะนำตัว / สอบถาม', color: 'gray' },
    { id: '2_RFQ', title: '2. ประเมินราคา (RFQ)', color: 'blue' },
    { id: '3_Sampling', title: '3. ส่งตัวอย่าง (Sampling)', color: 'purple' },
    { id: '4_Negotiate', title: '4. เจรจาเงื่อนไข (Negotiate)', color: 'yellow' },
    { id: '5_Won', title: '5. สั่งซื้อ (Won / PO)', color: 'green' }
  ];

  // ฟังก์ชันช่วยแสดงไอคอนตาม Source (ช่องทางที่ติดต่อมา)
  const getSourceIcon = (source) => {
    if (source === 'Chat') return <><i className="fa-solid fa-comment-dots mr-1"></i> แชท</>;
    if (source === 'Email') return <><i className="fa-solid fa-envelope mr-1"></i> อีเมล</>;
    return <><i className="fa-solid fa-file-invoice-dollar mr-1"></i> RFQ</>;
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-gray-50 text-gray-800 relative">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col h-full shadow-xl shrink-0 hidden md:flex">
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto no-scrollbar">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 px-2">เมนูหลัก</p>
          <Link to="/supplier-dashboard" className="w-full flex items-center px-4 py-3 text-blue-200 hover:bg-blue-800/50 rounded-xl font-medium transition">
            <i className="fa-solid fa-chart-pie w-6"></i> ภาพรวม (Dashboard)
          </Link>
          <button className="w-full flex items-center px-4 py-3 bg-blue-800 text-white rounded-xl font-medium transition cursor-default">
            <i className="fa-solid fa-clipboard-list w-6"></i> กระดาน CRM
          </button>
          <button className="w-full flex items-center px-4 py-3 text-blue-200 hover:bg-blue-800/50 rounded-xl font-medium transition">
            <i className="fa-solid fa-inbox w-6"></i> กล่องข้อความ (Inbox) <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">1</span>
          </button>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 mr-4">กระดานจัดการลูกค้า (Pipeline)</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 hidden md:inline-block">
              <i className="fa-solid fa-shop mr-1"></i> โหมดผู้ขาย
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-sm"></i>
              <input type="text" placeholder="ค้นหาบริษัท, โปรเจกต์..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-48 md:w-64" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center">
              <i className="fa-solid fa-plus mr-2"></i> สร้าง Lead
            </button>
          </div>
        </header>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 bg-gray-50/50 no-scrollbar">
          <div className="flex space-x-6 h-full items-start">
            
            {columns.map((col) => {
              // กรองเฉพาะการ์ดที่อยู่ในคอลัมน์นี้
              const colLeads = leads.filter(lead => lead.stage === col.id);

              return (
                <div key={col.id} className={`min-w-[320px] max-w-[320px] bg-${col.color}-50/50 rounded-2xl p-4 flex flex-col h-full border border-${col.color}-100/50`}>
                  
                  {/* หัวคอลัมน์ */}
                  <div className="flex justify-between items-center mb-4 px-1 shrink-0">
                    <h3 className={`font-bold text-${col.color}-800 flex items-center text-sm uppercase tracking-wide`}>
                      <span className={`w-2.5 h-2.5 bg-${col.color}-500 rounded-full mr-2`}></span> {col.title}
                    </h3>
                    <span className={`bg-${col.color}-200 text-${col.color}-800 text-xs font-bold px-2 py-0.5 rounded-full`}>
                      {colLeads.length}
                    </span>
                  </div>

                  {/* พื้นที่ใส่การ์ด */}
                  <div className="space-y-3 overflow-y-auto no-scrollbar pb-2 flex-1">
                    {colLeads.length > 0 ? (
                      colLeads.map(lead => (
                        <div 
                          key={lead._id} 
                          onClick={() => openPanel(lead)}
                          className={`bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:border-blue-500 hover:shadow-md transition transform hover:-translate-y-1 ${lead.stage === '2_RFQ' ? 'border-l-4 border-l-blue-500' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[10px] font-bold border border-orange-100">{lead.industryCategory}</span>
                            {lead.time && <span className="text-[10px] text-gray-400 font-medium"><i className="fa-regular fa-clock"></i> {lead.time}</span>}
                            {lead.statusBadge && <span className="text-[10px] text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">{lead.statusBadge}</span>}
                          </div>
                          <h4 className="font-bold text-gray-900 mb-1 leading-tight">{lead.companyName}</h4>
                          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{lead.projectTitle}</p>
                          <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-3">
                            {lead.price ? (
                              <span className="font-bold text-gray-700">{lead.price}</span>
                            ) : (
                              <div className="flex items-center text-gray-500"><i className="fa-solid fa-user-tie mr-1.5"></i> {lead.contactPerson}</div>
                            )}
                            <span className={`px-1.5 py-0.5 rounded border ${lead.source === 'Chat' ? 'text-blue-600 bg-blue-50 border-blue-100' : lead.source === 'Email' ? 'text-indigo-600 bg-indigo-50 border-indigo-100' : 'text-orange-600 bg-orange-50 border-orange-100'}`}>
                              {getSourceIcon(lead.source)}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      // ถ้าไม่มีการ์ดในคอลัมน์นี้
                      <div className="h-24 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center opacity-50">
                        <span className="text-sm text-gray-400 font-medium">ลากการ์ดมาที่นี่</span>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ================= SLIDE-OVER PANEL (รายละเอียด CRM) ================= */}
      {/* ฉากหลังสีดำเบลอๆ (แสดงเมื่อ isOpen = true) */}
      <div 
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${panelState.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={closePanel}
      ></div>

      {/* ตัว Panel สไลด์จากขวา */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${panelState.isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {panelState.selectedLead && (
          <>
            {/* Header ของ Panel */}
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-start shrink-0">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold border border-green-200">{panelState.selectedLead.industryCategory}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{panelState.selectedLead.companyName}</h2>
                <p className="text-sm text-gray-500 mt-1"><i className="fa-solid fa-diagram-project mr-1"></i> {panelState.selectedLead.projectTitle}</p>
              </div>
              <button onClick={closePanel} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white transition">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* เมนูแท็บ */}
            <div className="flex border-b border-gray-200 shrink-0 px-6">
              <button onClick={() => setPanelState({...panelState, activeTab: 'contacts'})} className={`py-3 px-4 text-sm transition border-b-2 ${panelState.activeTab === 'contacts' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-gray-500 font-medium hover:text-gray-700'}`}>ข้อมูลบริษัท & ผู้ติดต่อ</button>
              <button onClick={() => setPanelState({...panelState, activeTab: 'rfq'})} className={`py-3 px-4 text-sm transition border-b-2 ${panelState.activeTab === 'rfq' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-gray-500 font-medium hover:text-gray-700'}`}>ใบเสนอราคา (RFQ)</button>
              <button onClick={() => setPanelState({...panelState, activeTab: 'activity'})} className={`py-3 px-4 text-sm transition border-b-2 ${panelState.activeTab === 'activity' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-gray-500 font-medium hover:text-gray-700'}`}>บันทึกประวัติ (Activity)</button>
            </div>

            {/* เนื้อหาด้านใน (สลับตาม Tab) */}
            <div className="flex-1 overflow-y-auto p-6 bg-white no-scrollbar">
              
              {/* TAB 1: Contacts */}
              {panelState.activeTab === 'contacts' && (
                <div className="animate-fade-in space-y-6">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">รายละเอียดความต้องการ (Lead Note)</h4>
                    <p className="text-sm text-gray-800 whitespace-pre-line">{panelState.selectedLead.projectTitle}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center"><i className="fa-solid fa-users mr-2 text-blue-500"></i> ผู้ติดต่อ (Contacts)</h4>
                    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">{panelState.selectedLead.contactPerson.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{panelState.selectedLead.contactPerson}</p>
                          <p className="text-xs text-gray-500">ฝ่ายจัดซื้อ / วิศวกร</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: RFQ */}
              {panelState.activeTab === 'rfq' && (
                <div className="animate-fade-in text-center py-10 text-gray-500">
                  <i className="fa-solid fa-file-invoice-dollar text-4xl mb-3 text-gray-300"></i>
                  <p>ยังไม่มีประวัติใบเสนอราคาสำหรับโปรเจกต์นี้</p>
                  <button className="mt-4 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg">+ สร้างใบเสนอราคา</button>
                </div>
              )}

              {/* TAB 3: Activity */}
              {panelState.activeTab === 'activity' && (
                <div className="animate-fade-in">
                  <textarea rows="3" placeholder="บันทึกรายละเอียดการโทรคุย หรืออัปเดตงาน..." className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-2 resize-none"></textarea>
                  <div className="flex justify-end">
                    <button className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700">บันทึกประวัติ</button>
                  </div>
                </div>
              )}

            </div>
          </>
        )}
      </div>

    </div>
  );
}

export default CRM;