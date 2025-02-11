    "use client";
    import axios from "axios";
    import React, { useEffect, useState } from "react";
    import { useRouter } from "next/navigation";
    import { FiTrash2 } from "react-icons/fi"; // أيقونة الحذف
    import { cardio } from "ldrs";
    import { IoIosAddCircle } from "react-icons/io";

    
    cardio.register();  

    const TreatmentPage = () => {
    const [treatments, setTreatments] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        
        axios
        .get("https://7stars-events.com/api/treatment", {
            headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            },
        })
        .then((result) => {
            setTimeout(() => {
            setLoading(false);
            setTreatments(result.data[0]);
            }, 2000);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleEdit = (treatmentId) => {
        router.push(`/admin/treatment/edit/${treatmentId}`);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        router.push("/admin/treatment/createtreatment");
    };

    const handleDelete = (treatmentId) => {
        if (confirm("Are you sure you want to delete this treatment?")) {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("_method", "delete");

        axios
            .post(`https://7stars-events.com/api/treatment/${treatmentId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            })
            .then(() => {
            setTreatments((prevTreatments) =>
                prevTreatments.filter((treatment) => treatment.id !== treatmentId)
            );
            })
            .catch((err) => {
            console.error(err);
            });
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen overflow-auto p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            العلاجات
        </h1>
        <div className="flex justify-end items-center mb-6">
            <button
            onClick={handleCreate}
            className=" text-blue-500    "
            >
            <IoIosAddCircle size={50} />
            </button>
        </div>
        {loading ? (
            <div className="flex pt-40 items-center justify-center">
            <l-cardio size="150" stroke="10" speed="2" color="rgb(29, 78, 216)"></l-cardio>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment, index) => (
                <div
                key={index}
                className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
                >
                
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                    {treatment.treatment_name_ar}
                    </h2>
                    <p className="text-gray-600 text-sm my-2">
                    {treatment.description_ar}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-green-600">
                        {treatment.cost} S.P
                    </span>
                    <div className="flex items-center space-x-2">
                        <button
                        onClick={() => handleEdit(treatment.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
                        >
                        تعديل
                        </button>
                        <button
                        onClick={() => handleDelete(treatment.id)}
                        className="text-red-500 hover:text-red-600 transition-all duration-200"
                        title="Delete"
                        >
                        <FiTrash2 size={20} />
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
    };

    export default TreatmentPage;
