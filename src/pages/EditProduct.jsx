import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function EditProduct() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://e-commerce-joli-backend.onrender.com/api/products/${id}`, { withCredentials: true })
      .then(res => {
        setTitle(res.data.title);
        setPrice(res.data.price);
        setDescription(res.data.description);
      })
      .catch(() => toast.error('فشل تحميل البيانات'));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://e-commerce-joli-backend.onrender.com/api/products/${id}`, { title, price, description }, { withCredentials: true });
      toast.success('تم التعديل بنجاح');
      navigate('/admin/products');
    } catch {
      toast.error('فشل التعديل');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">تعديل المنتج</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" placeholder="اسم المنتج" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded" placeholder="السعر" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" placeholder="الوصف" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">تحديث</button>
      </form>
    </div>
  );
}

export default EditProduct;
