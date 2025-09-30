"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) setToken(token);
    if (role) setRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setMobileOpen(false);
    router.push("/");
  };

  const menuItems = token ? (
    <>
      <Link href="/" className="block px-4 py-2 hover:bg-gray-700 rounded">
        Home
      </Link>
      <Link
        href={`/dashboard/${role?.toLowerCase()}`}
        className="block px-4 py-2 hover:bg-gray-700 rounded"
      >
        Dashboard
      </Link>
      <button
        onClick={handleLogout}
        className="block px-4 py-2 text-red-500 hover:text-red-400 hover:bg-gray-700 rounded w-full text-left"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        href="/signup"
        className="block px-4 py-2 hover:bg-gray-700 rounded"
      >
        Signup
      </Link>
      <Link
        href="/login"
        className="block px-4 py-2 bg-amber-500 text-gray-800 rounded hover:bg-amber-600"
      >
        Signin
      </Link>
    </>
  );

  return (
    <header className="w-full bg-gray-800 text-white shadow">
      <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="flex items-center space-x-2 font-bold">
          <span className="h-10 w-10 bg-amber-500 text-gray-800 rounded-full flex items-center justify-center">
            PNJ
          </span>
          <span>Post New Job</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 font-extralight">{menuItems}</div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          {menuItems}
        </div>
      )}
    </header>
  );
}
