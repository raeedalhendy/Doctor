    "use client";
    import axios from "axios";
    import React, { useEffect, useState } from "react";
    import { cardio } from "ldrs";
    import { FiTrash2 } from "react-icons/fi"; // استيراد أيقونة الحذف

    cardio.register();

    const Page = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bills_monthly, setbills_monthly] = useState([]);
    const [patients, setPatients] = useState([]);
    const [patientsLoading, setPatientsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
        .get("https://7stars-events.com/api/bill", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            console.log(res.data)
            setTimeout(() => {
            setBills(res.data);
            setLoading(false);
            }, 2000);
        })
        .catch((err) => console.log(err));

        axios
        .get("https://7stars-events.com/api/bills_monthly", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setbills_monthly(res.data))
        .catch((err) => console.log(err));

        axios
        .get("https://7stars-events.com/api/patients", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            console.log(response.data)
            setPatients(response.data.patients);
            setPatientsLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching patients:", error);
            setPatientsLoading(false);
        });
    }, []);

    const handleDelete = (billId) => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("_method", "delete");

        axios
        .post(`https://7stars-events.com/api/bill/${billId}`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            setBills((prevBills) => prevBills.filter((bill) => bill.id !== billId));
        })
        .catch((err) => {
            console.error("Error deleting bill:", err);
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">الفواتير</h1>

        <div className="bg-blue-600 text-center text-white mb-6 p-4 rounded-xl shadow-lg">
            {bills_monthly.map((bill, index) => (
            <div key={index}>
                <h1 className="text-lg font-bold">المجموع: {bill.total_income} ل.س</h1>
                <p className="text-red-500 font-bold text-sm mb-1">
                <strong>المبلغ المتبقي :</strong> {bill.total_due}
                </p>
            </div>
            ))}
        </div>

        {loading || patientsLoading ? (
            <div className="flex pt-40 items-center justify-center">
            <l-cardio size="150" stroke="10" speed="2" color="rgb(29, 78, 216)"></l-cardio>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bills.map((bill) => {
                const patient = patients.find((p) => p.id === bill.patients_id);
                return (
                <div
                    key={bill.id}
                    className="relative bg-white text-right shadow-lg rounded-xl p-6 transform transition-all duration-300 hover:scale-105"
                >
                    <button
                    onClick={() => handleDelete(bill.id)}
                    className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md"
                    >
                    <FiTrash2 size={20} />
                    </button>
                    <p className="text-2xl font-semibold text-blue-500">
                    اسم المريض: {patient ? patient.namear : "غير معروف"}
                    </p>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                    المبلغ الكلي: {bill.total_amount} ل.س
                    </h2>
                    <p className="text-gray-600 text-sm">
                    <strong>المبلغ المتبقي:</strong> {bill.total_rest} ل.س
                    </p>
                </div>
                );
            })}
            </div>
        )}
        </div>
    );
    };

    export default Page;
