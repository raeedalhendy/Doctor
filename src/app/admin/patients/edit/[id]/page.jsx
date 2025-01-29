    "use client";

    import React, { useEffect, useState } from "react";
    import { useParams, useRouter } from "next/navigation";
    import axios from "axios";

    const EditPatient = () => {
        const { id } = useParams()
    const [name, setName] = useState("");
    const [namear, setNameAr] = useState("");
    const [phone, setPhone] = useState("");
    const [datae_of_birth, setDataeOfBirth] = useState("");
    const [medical_history, setMedicalHistory] = useState("");
    const [adress, setAdress] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
        .get(`https://7stars-events.com/api/patients/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((result) => {
            const patientsData = result.data[0];
            console.log(result.data[0])
            setName(patientsData.name);
            setNameAr(patientsData.namear);
            setPhone(patientsData.phone);
            setDataeOfBirth(patientsData.datae_of_birth);
            setMedicalHistory(patientsData.medical_history);
            setAdress(patientsData.adress);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching patient data:", error);
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('name', name);
        formData.append('namear', namear);
        formData.append('phone', phone);
        formData.append('datae_of_birth', datae_of_birth);
        formData.append('adress', adress);
        formData.append('medical_history', medical_history);

        formData.append('_method', "put");
        
        

        axios
        .post(`https://7stars-events.com/api/patients/${id}`, formData , {
            headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
            },
        
        })
        .then(() => {
            setLoading(false);
            alert("Service updated successfully!");
            router.push("/admin/patients"); // العودة إلى صفحة الخدمات
        })
        .catch((err) => {
            setLoading(false);
            console.error(err);
            setError("Failed to update service.");
        });
    };

    if (loading) {
        return (
        <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
        </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Edit Patient
            </h2>

            <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-black px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter patient name"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name (Arabic)</label>
            <input
                type="text"
                value={namear}
                onChange={(e) => setNameAr(e.target.value)}
                className="w-full text-black px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter patient name in Arabic"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-black px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter phone number"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
            <input
                type="date"
                value={datae_of_birth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full text-black px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Medical History</label>
            <textarea
                value={medical_history}
                onChange={(e) => setMedicalHistory(e.target.value)}
                className="w-full text-black px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter medical history"
                required
            ></textarea>
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <input
                type="text"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                className="w-full text-black px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter address"
                required
            />
            </div>

            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
            >
            Update Patient
            </button>
        </form>
        </div>
    );
    };

    export default EditPatient;
