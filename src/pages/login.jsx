import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://e-commerce-joli-backend.onrender.com/api/users/login', { email, password }, { withCredentials: true });
      Cookies.set('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      toast.error('فشل تسجيل الدخول');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" placeholder="البريد الإلكتروني" className="w-full mb-3 p-2 border rounded" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="كلمة السر" className="w-full mb-4 p-2 border rounded" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">دخول</button>
      </form>
    </div>
  );
}

export default Login;
