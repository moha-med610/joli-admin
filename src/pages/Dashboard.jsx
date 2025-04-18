import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">لوحة التحكم</h2>
      <div className="space-y-3">
        <Link to="/admin/products" className="block bg-gray-100 p-4 rounded hover:bg-gray-200">عرض المنتجات</Link>
        <Link to="/admin/products/add" className="block bg-green-100 p-4 rounded hover:bg-green-200">إضافة منتج</Link>
      </div>
    </div>
  );
}

export default Dashboard;
