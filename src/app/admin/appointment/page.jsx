    "use client"
    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { cardio } from "ldrs";
    cardio.register();


    const Page = () => {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get('https://7stars-events.com/api/appointment', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            const filteredAppointments = response.data[0].filter(appointment => {
            const appointmentDate = new Date(appointment.appointment_time);
            const currentDate = new Date();

            // إزالة الوقت للمقارنة بين التاريخ فقط
            currentDate.setHours(0, 0, 0, 0);
            appointmentDate.setHours(0, 0, 0, 0);

            // تصفية المواعيد التي هي اليوم أو في المستقبل
            return appointmentDate >= currentDate;
            });

            // ترتيب المواعيد حسب التاريخ (الأقرب أولاً)
            filteredAppointments.sort((a, b) => {
            const dateA = new Date(a.appointment_time);
            const dateB = new Date(b.appointment_time);
            return dateA - dateB;  // ترتيب التصاعدي (الأقرب أولاً)
            });

            setTimeout(() => {
                setLoading(false);
                setAppointments(filteredAppointments);
            }, 2000);
        })
        .catch(error => {
            console.error('Error fetching appointments:', error);
        });

        axios.get('https://7stars-events.com/api/patients', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            setPatients(response.data.patients);  // التأكد من أن البيانات هي مصفوفة تحتوي على عناصر
        })
        .catch(error => {
            console.error('Error fetching patients:', error);
        });
    }, []);

    return (
        <div className="container mx-auto p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">المواعيد القادمة</h1>
        {loading ? (
            <div className="flex pt-40 items-center justify-center">
            <l-cardio size="150" stroke="10" speed="2" color="rgb(29, 78, 216)"></l-cardio>
            </div>
        ) : (
        <div>
        {appointments.length > 0 ? (
            <ul className="space-y-6">
            {appointments.map(appointment => {
                const patient = patients.find(p => p.id === appointment.patient_id);
                return (
                <li key={appointment.id} className="bg-gray-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-blue-500">
                    <p className="text-2xl font-semibold ">اسم المريض: {patient ? patient.namear : 'غير معروف'}</p>
                    <p className="text-sm mt-2"> {appointment.appointment_time}</p>
                </li>
                );
            })}
            </ul>
        ) : (
            <p className="text-center text-xl text-white">لا توجد مواعيد قادمة اليوم أو غداً.</p>
        )}
        </div>)}
        </div>
    );
    };

    export default Page;
