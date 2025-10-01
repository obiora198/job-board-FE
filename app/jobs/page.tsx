"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobFilters from "../components/JobFilters";
import { CiLocationOn, CiClock2, CiCalendar } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";

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

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch jobs from API
  const fetchJobs = async (keyword: string, filters: any) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        ...(keyword && { keyword }),
        ...(filters.country && { country: filters.country }),
        ...(filters.city && { city: filters.city }),
      } as any).toString();

      const res = await api.get(`/jobs?${query}`);
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch: read keyword from URL query (CSR only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("keyword") || "";
    setSearchTerm(keyword);
    fetchJobs(keyword, filters);
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full p-6">
        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Update URL without reload
            const newUrl = `/jobs?keyword=${encodeURIComponent(searchTerm)}`;
            window.history.pushState(null, "", newUrl);
            fetchJobs(searchTerm, filters);
          }}
          className="mb-4 flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            placeholder="Search by job title, company or keyword"
            className="flex-1 p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-amber-500 text-gray-800 px-4 py-2 rounded"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <JobFilters onFilterChange={(filters: any) => setFilters(filters)} />

        {/* Jobs List */}
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="border rounded-lg p-4 shadow-sm flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <FaRegStar className="inline text-amber-500 mr-2" />
                </div>
                <h3 className="text-sm text-gray-700">{job.companyName}</h3>
                <p className="text-xs text-gray-600 flex items-center">
                  <CiLocationOn className="inline mr-1" />
                  {job.city}, {job.country}
                </p>
                <p className="text-xs text-gray-600 flex items-center">
                  <CiClock2 className="inline mr-1" />
                  {job.employmentType}
                </p>
                <p className="text-xs text-gray-600 flex items-center">
                  <CiCalendar className="inline mr-1" />
                  Posted on {job.datePosted}
                </p>
                <p className="text-xs text-gray-700 h-4 overflow-hidden">
                  {job.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-bold">{job.salaryRange}</p>
                  <a
                    href={job.applyLink}
                    target="_blank"
                    className="bg-amber-500 text-gray-800 px-4 py-2 rounded font-bold"
                  >
                    Apply now
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
