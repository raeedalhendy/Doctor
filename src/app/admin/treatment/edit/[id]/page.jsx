"use client"
import axios from "axios";
import { useParams , useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const TreatmentEdit = () => {
        const { id } = useParams(); // استخدام useParams لفك الوعد والحصول على المعرف
        const router = useRouter();
    
  const [treatment_name_ar, settreatment_name_ar] = useState('');
  const [description_ar, setDescription_ar] = useState('');
  const [cost, setcost] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`https://7stars-events.com/api/treatment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        const TreatmentData = res.data[0];
        settreatment_name_ar(TreatmentData.treatment_name_ar || '')
        setDescription_ar(TreatmentData.description_ar || '')
        setcost(TreatmentData.cost || '')

      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch service details.");
      });
  }, [id]);



  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('treatment_name_ar', treatment_name_ar);
    formData.append('description_ar', description_ar);
    formData.append('cost', cost);

    formData.append('_method', "put");

    const token = localStorage.getItem("token");
    axios
      .post(`https://7stars-events.com/api/treatment/${id}`, formData , {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
       
      })
      .then(() => {
        alert("Service updated successfully!");
        router.push("/admin/treatment"); // العودة إلى صفحة الخدمات
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">تعديل العلاج</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        {/* اسم العلاج */}
        <div>
          <label className="block text-gray-700 mb-1">اسم العلاج </label>
          <input
            type="text"
            name="treatment_name_ar"
            value={treatment_name_ar}
            onChange={(e) => settreatment_name_ar(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="أدخل اسم العلاج"
          />
        </div>

        {/* الوصف */}
        <div>
          <label className="block text-gray-700 mb-1">الوصف </label>
          <textarea
            name="description_ar"
            value={description_ar}
            onChange={(e) => setDescription_ar(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="أدخل وصف العلاج"
          ></textarea>
        </div>


        <div>
          <label className="block text-gray-700 mb-1">الوصف </label>
          <input
          type="number"
            name="cost"
            value={cost}
            onChange={(e) => setcost(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="أدخل سعر العلاج"
          ></input>
        </div>

        {/* زر الحفظ */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default TreatmentEdit;
