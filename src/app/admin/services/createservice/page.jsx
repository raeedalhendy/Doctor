"use client"
import axios from "axios";
import {  useRouter } from "next/navigation";
import { useState } from "react";

const CreateService = () => {
    const router = useRouter();
    const [service_name_ar, setService_name_ar] = useState("");
    const [description_ar, setDescription_ar] = useState("");
    const [imag, setImag] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("service_name_ar", service_name_ar);
    formData.append("description_ar", description_ar);
    formData.append("imag", imag);
    axios.post('https://7stars-events.com/api/service', formData , {
        headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,

        }
    })
    .then((result) => {
        console.log(result)
        router.push("/admin/services"); // العودة إلى صفحة الخدمات

    })
    .catch((err) => {
        console.log(err)
    });

    
  };

  return (
    <div className="max-w-xl  mx-auto mt-3 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Create New Service
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
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
        
        <div>
          <label className="block font-medium mb-1">Service Name </label>
          <input
            type="text"
            value={service_name_ar}
            onChange={(e) => setService_name_ar(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل اسم الخدمة"
            required
          />
        </div>
        
        <div>
          <label className="block font-medium mb-1">Description </label>
          <textarea
            value={description_ar}
            onChange={(e) => setDescription_ar(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="أدخل وصف الخدمة"
            required
          />
        </div>
        
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition duration-300"
        >
          Create Service
        </button>
      </form>
    </div>
  );
};

export default CreateService;
