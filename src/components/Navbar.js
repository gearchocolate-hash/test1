// ไฟล์: src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* ซ้าย: โลโก้ และ เมนูนำทาง */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <i className="fa-solid fa-industry text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-blue-900 tracking-tight">FactoryConnect</span>
            </Link>
            
            <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
              <Link to="/search" className="hover:text-blue-600 transition">ค้นหาโรงงาน (Scope Search)</Link>
              <Link to="/sourcing-board" className="hover:text-blue-600 transition">กระดานจัดซื้อ (Sourcing)</Link>
            </div>
          </div>

          {/* ขวา: ระบบสมาชิก */}
          <div className="flex items-center space-x-3">
            {!user ? (
              // กรณี: ยังไม่ได้ล็อกอิน
              <>
                <Link to="/login" className="text-gray-600 font-bold hover:text-blue-600 px-3 py-2 text-sm transition">
                  เข้าสู่ระบบ
                </Link>
                <Link to="/register-buyer" className="hidden sm:inline-block border-2 border-teal-500 text-teal-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-teal-50 transition">
                  จัดซื้อสมัครฟรี
                </Link>
                <Link to="/register-supplier" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 shadow-md transition">
                  ลงทะเบียนโรงงาน
                </Link>
              </>
            ) : (
              // กรณี: ล็อกอินแล้ว
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold text-gray-700 hidden md:block">
                  <i className="fa-regular fa-user mr-1"></i> {user.firstName || 'ผู้ใช้งาน'}
                </span>
                
                {user.role === 'buyer' ? (
                  <Link to="/buyer-dashboard" className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-teal-700">
                    <i className="fa-solid fa-chart-pie mr-1"></i> Dashboard
                  </Link>
                ) : (
                  <div className="flex space-x-2">
                    <Link to="/supplier-admin" className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-200">
                      <i className="fa-solid fa-gear"></i>
                    </Link>
                    <Link to="/supplier-crm" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                      CRM
                    </Link>
                  </div>
                )}

                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition ml-2">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;