    "use client";
    import axios from "axios";
    import React, { useEffect, useState } from "react";
    import { useParams } from "next/navigation";
    import { cardio } from "ldrs";
    import { useRouter } from "next/navigation";

    cardio.register();

    const AuthPage = () => {
    const { id } = useParams();
    const [authData, setAuthData] = useState([]); // قائمة المستخدمين
    const [roles, setRoles] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        const token = localStorage.getItem("token");

        axios
        .get("https://7stars-events.com/api/secretary", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            const users = res.data.flat();
            setTimeout(() => {
                setLoading(false);
                setAuthData(users);
            }, 2000);

            const initialRoles = users.reduce((acc, user) => {
            acc[user.id] = { doctor: user.doctor === 1, secretary: user.secretary === 1 };
            return acc;
            }, {});

            setRoles(initialRoles);
        })
        .catch(() => {
            setError("Error fetching users data");
        });
    };

    const handleUpdate = (userId) => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("_method", "put");
        formData.append("doctor", roles[userId]?.doctor ? 1 : 0);
        formData.append("secretary", roles[userId]?.secretary ? 1 : 0);

        axios
        .post(`https://7stars-events.com/api/secretary/${userId}`, formData, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            console.log("تم التحديث بنجاح:", res.data);
            location.reload()
        })
        .catch((err) => {
            console.error("خطأ أثناء التحديث:", err);
        });
    };

    const handleDelete = (userId) => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("_method", "delete");

        axios
        .post(`https://7stars-events.com/api/secretary/${userId}`,formData, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            setTimeout(() => {
                setLoading(true);
                setAuthData(authData.filter((user) => user.id !== userId));
            }, 2000);
            console.log("تم الحذف بنجاح");
            location.reload()
        })
        .catch((err) => {
            console.error("خطأ أثناء الحذف:", err);
        });
    };

    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl text-center mt-12 mb-5 font-bold text-blue-500 my-4">إدارة المستخدمين</h1>
        {loading ? (
                <div className="flex pt-40 items-center justify-center">
                <l-cardio size="150" stroke="10" speed="2" color="rgb(29, 78, 216)"></l-cardio>
                </div>
            ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl text-white">
            {authData.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 shadow-md flex flex-col bg-gray-800">
                <span className="font-semibold text-blue-400">{user.email}</span>

                <label className="flex items-center text-white mt-4 cursor-pointer">
                    <input
                    type="checkbox"
                    checked={roles[user.id]?.doctor || false}
                    onChange={(e) =>
                        setRoles({
                        ...roles,
                        [user.id]: { ...roles[user.id], doctor: e.target.checked },
                        })
                    }
                    className="mr-2 w-5 h-5"
                    />
                    Doctor 
                </label>

                <label className="flex items-center text-white mt-2 cursor-pointer">
                    <input
                    
                    type="checkbox"
                    checked={roles[user.id]?.secretary || false}
                    onChange={(e) =>
                        setRoles({
                        ...roles,
                        [user.id]: { ...roles[user.id], secretary: e.target.checked },
                        })
                    }
                    className="mr-2 w-5 h-5"
                    />
                    Secretary 
                </label>

                <div className="flex justify-between mt-4">
                    <button
                    onClick={() => handleUpdate(user.id)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
                    >
                    تحديث البيانات
                    </button>

                    <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                    حذف
                    </button>
                </div>
                </div>
            ))}
            
        </div>)}
        </div>
    );
    };

    export default AuthPage;
