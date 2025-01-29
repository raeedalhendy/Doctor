    "use client";

    import axios from "axios";
    import Link from "next/link";
    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import { cardio } from "ldrs";

    cardio.register();

    const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // حالة التحميل
    const router = useRouter();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // تفعيل حالة التحميل

        axios
        .post(
            "https://7stars-events.com/api/login",
            {
            email: email,
            password: password,
            },
            {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            }
        )
        .then((result) => {
            console.log(result.data);
            localStorage.setItem("token", result.data.token);
            setTimeout(() => {
            setLoading(false); // إيقاف التحميل
            router.replace("/admin");
            }, 2000); // انتظار 2 ثانية قبل الانتقال
        })
        .catch((err) => {
            console.log(err);
            setLoading(false); // إيقاف التحميل عند حدوث خطأ
        });
    };

    return (
        <div className="login-page flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-400">
        {loading ? (
            // عرض مكون CardioLoader أثناء التحميل
            <div className="flex items-center justify-center">
            <l-cardio
                size="150"
                stroke="10"
                speed="2"
                color="rgb(29, 78, 216)"
            ></l-cardio>
            </div>
        ) : (
            <form
            onSubmit={handleSubmit}
            className="login-container bg-white p-8 shadow-lg rounded-lg w-3/4 xl:w-2/4 lg:w-3/5 sm:w-3/4"
            >
            <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
                تسجيل الدخول
            </h2>
            <div className="space-y-4">
                <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600 mb-1"
                >
                    البريد الإلكتروني
                </label>
                <input
                    onChange={handleEmail}
                    value={email}
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="example@example.com"
                />
                </div>
                <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-600 mb-1"
                >
                    كلمة المرور
                </label>
                <input
                    onChange={handlePassword}
                    value={password}
                    type="password"
                    id="password"
                    className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="••••••••"
                />
                </div>
                <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                تسجيل الدخول
                </button>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
                ليس لديك حساب؟
                <Link href="/signup" className="text-blue-500 hover:underline">
                أنشئ حسابًا الآن
                </Link>
            </p>
            </form>
        )}
        </div>
    );
    };

    export default Page;
