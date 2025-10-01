"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to <span className="font-semibold">Post New Job</span>, a
          platform designed to connect job seekers with exciting opportunities
          and employers with the right talent. We aim to make hiring simple,
          transparent, and accessible for everyone.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our mission is to bridge the gap between job seekers and employers by
          providing an easy-to-use platform that ensures efficiency and trust.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Whether you’re looking for your next big career move or the perfect
          candidate for your company, we’ve got you covered.
        </p>
      </main>
      <Footer />
    </div>
  );
}
