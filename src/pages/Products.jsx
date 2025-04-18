import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://e-commerce-joli-backend.onrender.com/api/products', { withCredentials: true });
      setProducts(res.data.data);
    } catch (err) {
        console.error(err);
    }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await axios.delete(`https://e-commerce-joli-backend.onrender.com/api/products/${id}`, { withCredentials: true });
      setProducts(products.filter(prod => prod._id !== id));
    } catch (err) {
      alert('خطأ في الحذف' + err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-5xl font-bold mb-10 text-center">المنتجات</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((prod) => (
          <div key={prod._id} className="bg-white shadow p-4 rounded-xl border">
            <img src={prod.images} 
                className=''
            />
            <h3 className="text-lg font-semibold mb-1">{prod.title}</h3>
            <p className="text-sm mb-2 text-gray-600 line-clamp-1">{prod.description}</p>
            <p className="mb-2 font-bold text-blue-700">{prod.price} جنيه</p>
            <p className='mb-2 text-sm test-black'>{format(prod.createdAt, 'd MMMM yyyy, hh:mm a')}</p>
            <div className="flex justify-between">
              <button className="bg-yellow-300 text-black px-3 py-1 rounded" onClick={() => navigate(`/admin/products/edit/${prod._id}`)}>تعديل</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(prod._id)}>حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
