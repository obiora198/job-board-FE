"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import Navbar from "../../components/Navbar";
import { JobType } from "../../page";
import Footer from "../../components/Footer";
import JobFormModal from "../../components/JobFormModal";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobType | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchJobs = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get("/jobs/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) router.push("/login");
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await api.delete(`/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((j) => j.id !== id));
    } catch (err) {
      console.error("Error deleting job", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>

        <button
          onClick={() => {
            setEditingJob(null);
            setIsModalOpen(true);
          }}
          className="mb-4 bg-amber-500 text-gray-700 px-4 py-2 rounded hover:bg-amber-400"
        >
          Post a New Job
        </button>

        {/* Job List */}
        <h2 className="text-lg font-semibold mb-2">My Job Listings</h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">You haven’t posted any jobs yet.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="border p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.description}</p>
                  <p className="text-xs text-gray-400">
                    {job.city}, {job.country}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                      job.status === "APPROVED"
                        ? "bg-green-100 text-green-600"
                        : job.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditingJob(job);
                      setIsModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />

      <JobFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchJobs}
        token={token}
        job={editingJob}
      />
    </div>
  );
}
