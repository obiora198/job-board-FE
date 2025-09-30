"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) setToken(token);
    if (role) setRole(role);
  }, []);
  return (
    <header className="w-full bg-gray-800 text-white">
      <nav className="max-w-4xl mx-auto flex justify-between items-center p-4 ">
        <Link href="/" className="font-bold">
          <div className="flex items-center space-x-2">
            <span className="h-10 w-10 bg-amber-500 text-gray-800 rounded-full flex items-center justify-center">
              PNJ
            </span>
            <span>Post New Job</span>
          </div>
        </Link>
        <div className="space-x-4 font-extralight">
          {token ? (
            <>
              <Link href="/" className="text-white hover:underline">
                Home
              </Link>
              <Link
                href={`/dashboard/${role?.toLowerCase()}`}
                className="text-white hover:underline"
              >
                dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  setToken(null);
                  router.push("/");
                }}
                className="text-red-500 hover:underline hover:text-red-400"
              >
                logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signup" className="border px-4 py-2 rounded-md">
                signup
              </Link>
              <Link
                href="/login"
                className="bg-amber-500 text-gray-800 border px-4 py-2 rounded-md"
              >
                signin
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
