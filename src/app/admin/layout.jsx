"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // أيقونات

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "الخدمات", href: "/admin/services" },
    { name: "العلاجات", href: "/admin/treatment" },
    { name: "المرضى", href: "/admin/patients" },
    { name: "المواعيد", href: "/admin/appointment" },
    { name: "الفواتير", href: "/admin/bill" },
    { name: "الصلاحيات", href: "/admin/auth" },

  ];

  return (
    <div className="flex flex-row-reverse min-h-screen">
      {/* زر فتح القائمة عند تصغير الشاشة */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={28} />
      </button>

      {/* Sidebar - متحركة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-full bg-black shadow-lg p-6 z-50"
          >
            <button
              className="absolute top-4 left-2 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-md"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>
            <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">
              لوحة التحكم
            </h2>
            <ul className="space-y-4 text-right">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg font-medium text-lg transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "text-white hover:bg-blue-400 hover:shadow"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar العادي للشاشات الكبيرة */}
      <nav className="hidden lg:block w-1/4 bg-black shadow-md p-6">
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">
          لوحة التحكم
        </h2>
        <ul className="space-y-4 text-right">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-lg font-medium text-lg transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "text-white hover:bg-blue-400 hover:shadow"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="bg-white w-full">{children}</div>
    </div>
  );
}
