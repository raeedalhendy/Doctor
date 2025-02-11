    "use client";
    import axios from "axios";
    import React, { useEffect, useState } from "react";
    import { useRouter } from "next/navigation";
    import { FiTrash2 } from "react-icons/fi"; // استيراد أيقونة الحذف
    import { cardio } from "ldrs";
    import { IoIosAddCircle } from "react-icons/io";
    


    cardio.register();

    const Page = () => {
    const [patientss, setPatients] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");


    const fetchPatients = () => {
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
            console.log(result.data.patients)
            setTimeout(() => {
            setLoading(false);
            setPatients(result.data.patients);
            }, 2000);
        })
        .catch((err) => {
            console.log(err);
        });
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
    useEffect(() => {
        fetchPatients();
    }, []);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (!value.trim()) {
            fetchPatients(); // إعادة تحميل كل المرضى عند مسح البحث
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "https://7stars-events.com/api/search",
                { search: value },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPatients(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error searching for patients:", error);
        }
    };

    const handleEdit = (patientId) => {
        router.push(`/admin/patients/edit/${patientId}`);
    };

    const handleAddImage = (patientId) => {
        router.push(`/admin/patients/${patientId}/add-image`);
    };
    
    const handleAddTreatment = (patientId) => {
        router.push(`/admin/patients/${patientId}/add-appointments`);
    };
    const handleAddBill = (patientId) => {
        router.push(`/admin/patients/${patientId}/add-bill`);
    };

    return (
        <div className="bg-gray-100 min-h-screen overflow-auto p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            المرضى
        </h1>
        <div className="flex flex-wrap w-full gap-4 justify-between items-center mb-6">
        <input
            className="px-4 text-right py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
            type="search"
            placeholder="...ابحث عن مريض"
                />
            <button
            onClick={handleCreate}
            className=" text-blue-500">
                <IoIosAddCircle size={50} />
            </button>
        </div>
        {loading ? (
            <div className="flex pt-40 items-center justify-center">
            <l-cardio size="150" stroke="10" speed="2" color="rgb(29, 78, 216)"></l-cardio>
            </div>
        ) : (
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {patientss.map((patient, index) => (
            <div
                key={index}
                className="text-right bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
                <div>
                    <button
                    onClick={() => router.push(`/admin/patients/${patient.id}`)}
                    className="px-3 bg-blue-600">
                        عرض التفاصيل
                    </button>
                </div>
                <div className="p-8">
                <h2 className="text-2xl text-center font-bold text-gray-800">
                    {patient.namear}
                </h2>
                <p className="text-gray-600 text-sm my-1">
                    <strong>رقم الهاتف:</strong> {patient.phone}
                </p>
                <p className="text-gray-600 text-sm my-1">
                    <strong>تاريخ الميلاد:</strong> {patient.datae_of_birth}
                </p>
                <p className="text-gray-600 text-sm my-1">
                    <strong>العنوان:</strong> {patient.adress}
                </p>

                <div className="flex w-full justify-between items-center mt-4">
                    <div className="flex items-center space-x-2">
                    
                    <button
                        onClick={() => handleDelete(patient.id)}
                        className="text-red-500  absolute top-2 left-1 hover:text-red-600 transition-all duration-200"
                        title="Delete"
                    >
                        <FiTrash2 size={20} />
                    </button>
                    </div>
                    <div className="flex flex-col w-full gap-4 justify-between text-black ">
                    <button
                        onClick={() => handleEdit(patient.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
                    >
                        Edit
                    </button>
                    <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
                    onClick={() => handleAddImage(patient.id)}>إضافة صورة</button>
                    <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
                    onClick={() => handleAddTreatment(patient.id)}>إضافة موعد</button>
                    <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
                    onClick={() => handleAddBill(patient.id)}>إضافة فاتورة</button>
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
