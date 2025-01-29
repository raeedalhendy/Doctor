"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditServicePage = () => {
    const { id } = useParams(); // استخدام useParams لفك الوعد والحصول على المعرف
    const router = useRouter();

  
  const [service_name, setService_name] = useState('');
  const [service_name_ar, setService_name_ar] = useState('');
  const [description, setDescription] = useState('');
  const [description_ar, setDescription_ar] = useState('');
  const [price, setPrice] = useState('');
  const [imag, setImag] = useState(null);


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // جلب بيانات الخدمة عند فتح الصفحة
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`https://7stars-events.com/api/service/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const serviceData = res.data[0];
        setService_name(serviceData.service_name || '')
        setService_name_ar(serviceData.service_name_ar || '')
        setDescription(serviceData.description || '')
        setDescription_ar(serviceData.description_ar || '')
        setPrice(serviceData.price || '')
        setImag(serviceData.imag || null)

      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch service details.");
      });
  }, [id]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('service_name', service_name);
    formData.append('service_name_ar', service_name_ar);
    formData.append('description', description);
    formData.append('description_ar', description_ar);
    formData.append('price', price);
    formData.append('_method', "put");

    const token = localStorage.getItem("token");
    axios
      .post(`https://7stars-events.com/api/service/${id}`, formData , {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
       
      })
      .then(() => {
        setIsLoading(false);
        alert("Service updated successfully!");
        router.push("/admin/services"); // العودة إلى صفحة الخدمات
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        setError("Failed to update service.");
      });
  };

  return (
    <div className="h-screen overflow-auto bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Edit Service
      </h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="imag" className="block text-gray-700 font-semibold">
            Upload Image
          </label>
          <input
            type="file"
            id="imag"
            onChange={(e) => setImag(e.target.files[0])}
            className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-customBlack text-black hover:file:bg-blue-100"
            />
        </div>
        <div className="mb-4">
          <label htmlFor="service_name" className="block text-gray-700 font-semibold">
            Service Name
          </label>
          <input
            type="text"
            value={service_name}
            onChange={(e) => setService_name(e.target.value)}
            className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="service_name_ar" className="block text-gray-700 font-semibold">
            Service Name In Arabic
          </label>
          <input
            type="text"
            value={service_name_ar}
            onChange={(e) => setService_name_ar(e.target.value)}
            className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="description_ar" className="block text-gray-700 font-semibold">
          Description In Arabic
          </label>
          <input
            type="text"
            value={description_ar}
            onChange={(e) => setDescription_ar(e.target.value)}
            className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Service"}
        </button>
      </form>
    </div>
  );
};

export default EditServicePage;
