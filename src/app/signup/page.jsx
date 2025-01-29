"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation'


const SignupPage = () => {
  const router = useRouter()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://7stars-events.com/api/register', {
            name: name,
            email: email,
            password: password,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data"
            }
        })
        .then((result) => {
            console.log(result);
            
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="signup-page flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-400">
            <form onSubmit={handleSubmit} className="signup-container bg-white p-8 shadow-lg rounded-lg w-3/4 xl:w-2/4 lg:w-3/5 sm:w-3/4">
                <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
                    إنشاء حساب جديد
                </h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                            الاسم الكامل
                        </label>
                        <input
                            onChange={handleName} value={name}
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="اسمك الكامل"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                            البريد الإلكتروني
                        </label>
                        <input
                            onChange={handleEmail} value={email}
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="example@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                            كلمة المرور
                        </label>
                        <input
                            onChange={handlePassword} value={password}
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
                        إنشاء حساب
                    </button>
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                    لديك حساب بالفعل؟
                    <Link href="/login" className="text-blue-500 hover:underline">
                        تسجيل الدخول الآن
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;
