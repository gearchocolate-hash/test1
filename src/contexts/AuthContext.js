// ไฟล์: src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// สร้าง Context (กระเป๋าความจำส่วนกลาง)
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // เมื่อเปิดเว็บมาครั้งแรก ให้เช็กว่ามี Token อยู่ในเครื่องไหม
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // ฟังก์ชันล็อกอิน (ถูกเรียกใช้ตอนกดปุ่มในหน้า Login)
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // ฟังก์ชันออกจากระบบ
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};