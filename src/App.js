// ไฟล์: src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// นำเข้า Components และ Pages
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SupplierRegister from './pages/SupplierRegister';
import BuyerRegister from './pages/BuyerRegister';
import ScopeSearch from './pages/ScopeSearch';
import SupplierProfile from './pages/SupplierProfile';
import CompAdmin from './pages/CompAdmin';
import CRM from './pages/CRM';
import BuyerDashboard from './pages/BuyerDashboard';
import SourcingBoard from './pages/SourcingBoard';
import SourcingRequest from './pages/SourcingRequest';

function App() {
  function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-50 min-h-screen text-gray-800 font-kanit">
          {/* Navbar ลอยอยู่ทุกหน้า */}
          <Navbar /> 

          <main>
            <Routes>
              {/* หน้าสาธารณะ */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register-supplier" element={<SupplierRegister />} />
              <Route path="/register-buyer" element={<BuyerRegister />} />
              <Route path="/search" element={<ScopeSearch />} />
              <Route path="/supplier-profile/:id" element={<SupplierProfile />} />
              <Route path="/sourcing-board" element={<SourcingBoard />} />

              {/* หน้าเฉพาะ Role (ของจริงควรทำ PrivateRoute ดักไว้ด้วย) */}
              <Route path="/supplier-admin" element={<CompAdmin />} />
              <Route path="/supplier-crm" element={<CRM />} />
              <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
              <Route path="/sourcing-request" element={<SourcingRequest />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;