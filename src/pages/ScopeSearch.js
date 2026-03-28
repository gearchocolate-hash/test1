// ไฟล์: src/pages/ScopeSearch.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ScopeSearch() {
  const [factories] = useState([
    { _id: '1', name: 'บจก. ไทย เมทัล เวิร์ค', province: 'ชลบุรี', process: 'Machining', tags: ['ISO9001', 'CNC'] },
    { _id: '2', name: 'เอเชีย พลาสติก อินดัสทรี', province: 'ระยอง', process: 'Injection', tags: ['IATF16949', 'ABS'] },
  ]);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-80px)] text-gray-800 pb-12 flex flex-col md:flex-row max-w-7xl mx-auto">
      
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 p-6 border-r border-gray-200 bg-white">
        <h2 className="font-bold text-lg mb-6 flex items-center"><i className="fa-solid fa-filter text-blue-500 mr-2"></i> ตัวกรอง (Filters)</h2>
        
        <div className="mb-6">
          <h3 className="font-bold text-sm text-gray-700 mb-3">จังหวัด</h3>
          <select className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none">
            <option>ทั้งหมด</option>
            <option>ชลบุรี</option>
            <option>ระยอง</option>
          </select>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-sm text-gray-700 mb-3">อุตสาหกรรม</h3>
          <div className="space-y-2 text-sm">
            <label className="flex items-center space-x-2"><input type="checkbox" className="rounded" /> <span>ยานยนต์ (150)</span></label>
            <label className="flex items-center space-x-2"><input type="checkbox" className="rounded" /> <span>เครื่องมือแพทย์ (42)</span></label>
          </div>
        </div>
      </aside>

      {/* Main Results */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ผลการค้นหา: พบ {factories.length} โรงงาน</h1>
          <select className="p-2 border border-gray-300 rounded-lg text-sm bg-white outline-none">
            <option>เรียงตาม: ความเกี่ยวข้อง</option>
            <option>เรียงตาม: อัปเดตล่าสุด</option>
          </select>
        </div>

        <div className="space-y-4">
          {factories.map(f => (
            <div key={f._id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between hover:shadow-md transition">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl text-gray-400">
                  <i className="fa-solid fa-industry"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{f.name}</h3>
                  <p className="text-sm text-gray-500"><i className="fa-solid fa-location-dot text-red-400"></i> {f.province}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded">{f.process}</span>
                    {f.tags.map(tag => <span key={tag} className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-1 rounded">#{tag}</span>)}
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col justify-center gap-2">
                <Link to={`/supplier-profile/${f._id}`} className="bg-white border border-blue-600 text-blue-600 font-bold px-6 py-2 rounded-lg text-center text-sm hover:bg-blue-50 transition">ดูโปรไฟล์</Link>
                <button className="bg-blue-600 text-white font-bold px-6 py-2 rounded-lg text-center text-sm hover:bg-blue-700 transition">ติดต่อ</button>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}

export default ScopeSearch;