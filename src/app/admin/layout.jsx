"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-1/4 bg-black shadow-md p-6">
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-6">
          Admin Panel
        </h2>
        <ul className="space-y-4">
          {[
            { name: "Services", href: "/admin/services" },
            { name: "Patients", href: "/admin/patients" },
            { name: "Treatment", href: "/admin/treatment" },
            { name: "Image", href: "/admin/image" },
            { name: "Appointment", href: "/admin/appointment" },
          ].map((item) => (
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
