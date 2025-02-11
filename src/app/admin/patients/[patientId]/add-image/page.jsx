"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const AddPatientImage = () => {
    const { patientId } = useParams(); // 🔹 استخراج ID المريض من الـ URL
    const [image, setImage] = useState(null);
    const [descriptionAr, setDescriptionAr] = useState("");

    const router = useRouter();

    const handleImageUpload = async () => {
        

        const formData = new FormData();
        formData.append("image_path", image);
        formData.append("description_ar", descriptionAr);
        formData.append("patient_id", patientId);

        const token = localStorage.getItem("token");

        try {
            await axios.post(
                `https://7stars-events.com/api/medicalImage/${patientId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("✅ تم رفع الصورة بنجاح!");
            router.push(`/admin/patients/${patientId}`);
        } catch (error) {
            console.error("❌ خطأ في رفع الصورة:", error);
            alert("⚠️ حدث خطأ أثناء رفع الصورة، يرجى المحاولة مرة أخرى.");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-6 text-black">
            <h2 className="text-xl font-semibold mb-4 text-center">رفع صورة للمريض</h2>
            <div className="flex flex-col gap-3">
                {/* رفع الصورة */}
                <input
                    type="file"
                    accept="image/*"
                    className="border border-gray-300 rounded-lg p-2"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                {/* وصف الصورة بالعربية */}
                <input
                    type="text"
                    placeholder="وصف الصورة (بالعربية)"
                    className="border border-gray-300 rounded-lg p-2"
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(e.target.value)}
                />

                {/* زر الرفع */}
                <button
                    onClick={handleImageUpload}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    رفع الصورة
                </button>
            </div>
        </div>
    );
};

export default AddPatientImage;
