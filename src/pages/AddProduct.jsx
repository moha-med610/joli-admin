import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", images);

    setIsLoading(true); // تفعيل حالة التحميل

    try {
      await axios.post(
        "https://e-commerce-joli-backend.onrender.com/api/products",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("تمت الإضافة بنجاح!");
    } catch (err) {
      alert("خطأ في الإضافة: " + err.message);
    } finally {
      setIsLoading(false); // إيقاف حالة التحميل
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">إضافة منتج</h2>
      <form onSubmit={handleAdd} className="space-y-4">
        <input
          type="text"
          placeholder="اسم المنتج"
          className="w-full p-2 border rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="الوصف"
          className="w-full p-2 border rounded"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="السعر"
          className="w-full p-2 border rounded"
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="mb-4">
          <label
            htmlFor="productImage"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            إضافة صورة المنتج
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImages(e.target.files[0])}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isLoading} // تعطيل الزر أثناء التحميل
        >
          {isLoading ? "جاري الإضافة..." : "إضافة"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
