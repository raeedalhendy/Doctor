"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";

const AddAppointment = () => {
    const { patientId } = useParams(); // 🔹 استخراج ID المريض من الـ URL
    const [appointment_time, setAppointmentTime] = useState("");
    const [statusAr, setStatusAr] = useState("");

    const router = useRouter();

    const handleAddAppointment = async () => {
        const token = localStorage.getItem("token");

        

            axios.post(
                `https://7stars-events.com/api/appointment/${patientId}`,
                {
                    appointment_time: appointment_time,
                    status_ar: statusAr,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result)=>{
                console.log(result.data)
                router.push(`/admin/patients/${patientId}`)
            })
            .catch((error)=>{
                console.log(error)

            })
            
         
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">إضافة موعد للمريض</h2>
            <div className="flex flex-col gap-3 text-black">
                
                <input 
                    type="datetime-local" 
                    className="border border-gray-300 rounded-lg p-2"
                    value={appointment_time} 
                    onChange={(e) => setAppointmentTime(e.target.value)} 
                />
                
                <select
        
        onChange={(e) => setStatusAr(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      >
        <option value="معلق">معلق</option>
        <option value="مؤكد">مؤكد</option>
        <option value="ملغي">ملغي</option>
      </select>
                <button 
                    onClick={handleAddAppointment}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                    إضافة الموعد
                </button>
            </div>
        </div>
    );
};

export default AddAppointment;
