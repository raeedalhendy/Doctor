    "use client";
    import axios from "axios";
    import React, { useEffect, useState } from "react";
    import { useRouter } from "next/navigation";
    import { FiTrash2 } from "react-icons/fi"; // استيراد أيقونة الحذف
    import { cardio } from "ldrs";

    cardio.register();

    const Page = () => {
    const [patients, setPatients] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
        .get("https://7stars-events.com/api/patients", {
            headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            },
        })
        .then((result) => {
            setTimeout(() => {
            setLoading(false);
            setPatients(result.data[0]);
            }, 2000);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleEdit = (patientId) => {
        router.push(`/admin/patients/edit/${patientId}`);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        router.push("/admin/patients/createpatients");
    };

    const handleDelete = (patientId) => {
        if (confirm("Are you sure you want to delete this patient?")) {
        const token = localStorage.getItem("token");
        const formData = new FormData();
    formData.append('_method', "delete");
        axios
            .post(`https://7stars-events.com/api/patients/${patientId}`,formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            })
            .then(() => {
            setPatients((prevPatients) =>
                prevPatients.filter((patient) => patient.id !== patientId)
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
            Our Patients
        </h1>
        <div className="flex justify-end items-center mb-6">
            <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-10 py-4 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
            >
            Create Patient
            </button>
        </div>
        {loading ? (
            <div className="flex pt-40 items-center justify-center">
            <l-cardio size="150" stroke="10" speed="2" color="rgb(29, 78, 216)"></l-cardio>
            </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient, index) => (
            <div
                key={index}
                className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
                <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    {patient.name} ({patient.namear})
                </h2>
                <p className="text-gray-600 text-sm my-1">
                    <strong>Phone:</strong> {patient.phone}
                </p>
                <p className="text-gray-600 text-sm my-1">
                    <strong>Date of Birth:</strong> {patient.datae_of_birth}
                </p>
                <p className="text-gray-600 text-sm my-1">
                    <strong>Address:</strong> {patient.adress}
                </p>
                <p className="text-gray-600 text-sm my-1">
                    <strong>Medical History:</strong> {patient.medical_history}
                </p>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleEdit(patient.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(patient.id)}
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
        </div>)}
        </div>
    );
    };

    export default Page;
