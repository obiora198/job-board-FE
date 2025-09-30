'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "../../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const res = await api.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);

      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      if (payload.role === "ADMIN") router.push("/dashboard/admin");
      else router.push("/dashboard/employer");
        localStorage.setItem("role", payload.role);
    } catch (err: any) {
      alert(err.response?.data?.error || "Invalid credentials");
        console.error(err);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl shadow-lg p-8 border mt-8">
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-4">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-600 text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-600 text-gray-800 placeholder-gray-400 focus:outline-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-amber-500 text-gray-800 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            Don’t have an account?{" "}
            <a href="/signup" className="text-gray-700 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
