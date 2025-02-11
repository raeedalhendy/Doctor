"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateTreatment = () => {
    const router = useRouter();
    const [treatment_name_ar, setTreatmentNameAr] = useState("");
    const [description_ar, setDescriptionAr] = useState("");
    const [cost, setCost] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("treatment_name_ar", treatment_name_ar);
        formData.append("description_ar", description_ar);
        formData.append("cost", cost);

        axios.post('https://7stars-events.com/api/treatment', formData, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(() => {
            router.back(); // الرجوع إلى الصفحة السابقة
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="max-w-xl mx-auto mt-3 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                Create New Treatment
            </h2>
            {loading && <p className="text-center text-blue-600 font-bold">Loading...</p>}
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
                
                
                <div>
                    <label className="block font-medium mb-1">Treatment Name (Arabic)</label>
                    <input
                        type="text"
                        value={treatment_name_ar}
                        onChange={(e) => setTreatmentNameAr(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="أدخل اسم العلاج"
                        required
                    />
                </div>
                
                <div>
                    <label className="block font-medium mb-1">Description (Arabic)</label>
                    <textarea
                        value={description_ar}
                        onChange={(e) => setDescriptionAr(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="أدخل وصف العلاج"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Cost</label>
                    <input
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter treatment cost"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition duration-300"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Treatment"}
                </button>
            </form>
        </div>
    );
};

export default CreateTreatment;
