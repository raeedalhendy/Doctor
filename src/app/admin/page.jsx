import React from 'react'

export const metadata = {
    title: "Admin",
    description: "Admin next app",
    };
const admin = () => {
    
    return (
    <div className=' flex justify-center items-center h-full text-black'>
        <div>
            <h1 className="text-2xl font-bold">مرحبًا بك في لوحة التحكم</h1>
            <p className="mt-4">اختر خيارًا من القائمة على اليسار.</p>
        </div>
    </div>
    )
}

export default admin
