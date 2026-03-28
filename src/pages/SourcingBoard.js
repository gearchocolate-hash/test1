// ไฟล์: src/pages/SourcingBoard.js
import React, { useState } from 'react';

function SourcingBoard() {
  const [posts] = useState([
    { id: 'REQ-089', title: 'หาโรงงานฉีดพลาสติก ABS สำหรับชิ้นส่วนภายในรถยนต์', buyer: 'บมจ. ออโต้ อินดัสทรี', category: 'ยานยนต์', budget: '500k-1M', time: '2 ชม. ที่แล้ว' },
    { id: 'REQ-090', title: 'กลึงชิ้นส่วนสแตนเลส (SUS316L) งานเครื่องมือแพทย์', buyer: 'บจก. เมดิคอล เซ็นเตอร์', category: 'เครื่องมือแพทย์', budget: 'รอเสนอราคา', time: '5 ชม. ที่แล้ว' },
  ]);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 pb-12">
      <div className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">กระดานจัดซื้อ (Sourcing Board)</h1>
            <p className="text-gray-500 mt-1">ค้นหางานที่ตรงกับความสามารถของโรงงานคุณ และเสนอราคาได้ทันที</p>
          </div>
          <div className="flex bg-gray-100 rounded-xl p-1 w-full md:w-auto">
            <input type="text" placeholder="ค้นหาชื่อโปรเจกต์..." className="bg-transparent px-4 py-2 outline-none text-sm w-full md:w-64" />
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-bold shadow-sm text-sm">ค้นหา</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col md:flex-row justify-between gap-4 hover:border-blue-400 transition shadow-sm">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded text-xs">{post.category}</span>
                <span className="text-xs text-gray-400"><i className="fa-regular fa-clock"></i> {post.time}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-3"><i className="fa-solid fa-building mr-1"></i> ผู้ซื้อ: {post.buyer} <span className="text-green-500 ml-2"><i className="fa-solid fa-shield-check"></i> ยืนยันตัวตนแล้ว</span></p>
              <p className="text-sm"><span className="font-bold text-gray-700">งบประมาณ:</span> {post.budget}</p>
            </div>
            <div className="flex flex-col justify-center items-end gap-2">
              <button onClick={() => alert('เปิดหน้าส่งใบเสนอราคา')} className="w-full md:w-auto bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition">
                เสนอราคา (Quote)
              </button>
              <button className="w-full md:w-auto border border-blue-600 text-blue-600 font-bold px-6 py-2 rounded-xl hover:bg-blue-50 transition">
                ติดต่อสอบถาม
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SourcingBoard;