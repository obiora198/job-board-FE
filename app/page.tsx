"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JobFilters from "./components/JobFilters";
import { FaInstagram, FaRegStar } from "react-icons/fa";
import {
  FiMessageCircle,
  FiTwitter,
  FiPhone,
  FiLinkedin,
  FiFacebook,
} from "react-icons/fi";
import { CiLocationOn, CiClock2, CiCalendar } from "react-icons/ci";
import { useRouter } from "next/navigation";

export type JobType = {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  applyLink: string;
  employmentType: string;
  salaryRange: string;
  datePosted: string;
  companyName: string;
  status: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const fetchJobs = async (filters: any = {}, searchKeyword: string = "") => {
    try {
      const params: any = {};
      if (filters.country && filters.country !== "all-countries")
        params.country = filters.country;
      if (filters.state && filters.state !== "all-states")
        params.state = filters.state;
      if (filters.city && filters.city !== "all-cities")
        params.city = filters.city;
      if (filters.title && filters.title !== "all-titles")
        params.keyword = filters.title;
      if (searchKeyword) params.keyword = searchKeyword;

      // Handle date filters
      if (filters.date && filters.date !== "any-time") {
        const now = new Date();
        if (filters.date === "last-24-hours")
          params.datePosted = new Date(
            now.getTime() - 24 * 60 * 60 * 1000
          ).toISOString();
        if (filters.date === "last-7-days")
          params.datePosted = new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000
          ).toISOString();
        if (filters.date === "last-30-days")
          params.datePosted = new Date(
            now.getTime() - 30 * 24 * 60 * 60 * 1000
          ).toISOString();
      }

      const res = await api.get("/jobs", { params });
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  useEffect(() => {
    fetchJobs(filters, search);
  }, [filters, search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(filters, search);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center gap-4 p-4">
        <FaInstagram size={20} />
        <FiFacebook size={20} />
        <FiMessageCircle size={20} />
        <FiTwitter size={20} />
        <FiPhone size={20} />
        <FiLinkedin size={20} />
      </div>

      {/* Hero + Search */}
      <div className="bg-gray-800 text-white flex flex-col justify-center items-center gap-6 p-6 sm:gap-8 sm:p-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Find Your Dream Job Today
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/jobs?keyword=${encodeURIComponent(search)}`);
          }}
          className="w-full max-w-2xl bg-white p-4 rounded"
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Search by Job title, company or keyword"
              className="flex-1 p-2 rounded border border-gray-300 text-gray-800"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="bg-amber-500 text-gray-800 px-4 py-2 rounded hover:bg-amber-600 transition"
            >
              Search Jobs
            </button>
          </div>
        </form>
      </div>

      {/* Filters + Jobs */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <JobFilters onFilterChange={(filters) => setFilters(filters)} />

        <span className="flex items-center text-xl text-gray-800 font-bold mb-4">
          <FaRegStar className="inline text-amber-500 mr-2" />
          Featured Jobs
        </span>

        {jobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <li key={job.id} className="p-4 border rounded space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <FaRegStar className="text-amber-500" />
                </div>
                <h3 className="text-gray-800 text-xs">{job.companyName}</h3>
                <p className="text-xs text-gray-700 flex items-center">
                  <CiLocationOn className="inline mr-1" />
                  {job.city}, {job.country}
                </p>
                <p className="text-xs text-gray-700 flex items-center">
                  <CiClock2 className="inline mr-1" />
                  {job.employmentType}
                </p>
                <p className="text-xs text-gray-700 flex items-center">
                  <CiCalendar className="inline mr-1" />
                  Posted on {job.datePosted}
                </p>
                <p className="text-xs text-gray-700 h-4 overflow-hidden">
                  {job.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-xl text-gray-800 font-bold">
                    {job.salaryRange}
                  </p>
                  <a
                    href={job.applyLink}
                    target="_blank"
                    className="text-gray-800 font-bold bg-amber-500 px-4 py-2 border rounded"
                  >
                    Apply now
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
}
