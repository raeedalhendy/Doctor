"use client"
import axios from "axios";
import React, { useState } from "react";
import {  useRouter } from "next/navigation";

const CreatePatients = () => {
        const router = useRouter();
    
  const [nameAr, setNameAr] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("namear", nameAr);
    formData.append("phone", phone);
    formData.append("datae_of_birth", dateOfBirth);
    formData.append("adress", address);

    axios.post("https://7stars-events.com/api/patients", formData , {
            headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            },
        })
      
      .then((result) => {
        alert("Patient created successfully!");
        setNameAr("");
        setPhone("");
        setDateOfBirth("");
        setAddress("");
        router.push("/admin/patients");
      })
      .catch((error) => {
        console.error("Error creating patient:", error);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create Patient
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name (Arabic)</label>
          <input
            type="text"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter patient's name in Arabic"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black  shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter patient's phone number"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full px-3 py-2 text-black border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter patient's address"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
        >
          Create Patient
        </button>
      </form>
    </div>
  );
};

export default CreatePatients;
