"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";

const AddBill = () => {
    const { patientId } = useParams(); // 🔹 استخراج ID المريض من الـ URL
    const [total_amount , settotal_amount] = useState("");
    const [total_rest, settotal_rest] = useState("");

    const router = useRouter();

    const handleAddBill = async () => {
        const token = localStorage.getItem("token");
            axios.post(
                `https://7stars-events.com/api/bill/${patientId}`,
                {
                    total_amount: total_amount,
                    total_rest: total_rest,
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
            <h2 className="text-xl font-semibold mb-4 text-black text-center">إضافة فاتورة للمريض</h2>
            <div className="flex flex-col gap-3 text-black">
            <h2 className="text-lg font-semibold mb-4 text-gray-500">إضافة المبلغ المدفوع</h2>
                <input 
                    type="number" 
                    className="border border-gray-300 rounded-lg p-2"
                    value={total_amount} 
                    onChange={(e) => settotal_amount(e.target.value)} 
                />
                <h2 className="text-lg font-semibold mb-4 text-gray-500">إضافة المبلغ الباقي</h2>
                <input 
                    type="number" 
                    className="border border-gray-300 rounded-lg p-2"
                    value={total_rest} 
                    onChange={(e) => settotal_rest(e.target.value)} 
                />
                
                <button 
                    onClick={handleAddBill}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                    إضافة الفاتورة
                </button>
            </div>
        </div>
    );
};

export default AddBill;
