'use client';

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";

type JobType = {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  status: string;
};

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "users">("jobs");
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  useEffect(() => {
    if (!token) router.push("/login");
  }, [token]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs?status=PENDING", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "jobs") fetchJobs();
    if (activeTab === "users") fetchUsers();
  }, [activeTab]);

  // ===== JOB ACTIONS =====
  const approveJob = async (id: string) => {
    try {
      const res = await api.put(`/admin/jobs/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } });
      if(res.data.status === "APPROVED") {
        // setJobs(jobs.filter((j) => j.id !== id));
        fetchJobs(); // Refresh the job list after approval
      }
    } catch (error) {
      console.error("Failed to approve job", error);
    }
  };

  const rejectJob = async (id: string) => {
    try {
      const res = await api.put(`/admin/jobs/${id}/reject`, {}, { headers: { Authorization: `Bearer ${token}` } });
      if(res.data.status === "REJECTED"){
        // setJobs(jobs.filter((j) => j.id !== id));
        fetchJobs(); // Refresh the job list after rejection
      }
    } catch (error) {
      console.error("Failed to reject job", error);
    }
  };

  // ===== USER ACTIONS =====
  const suspendUser = async (id: string) => {
    await api.put(`/admin/users/${id}/suspend`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "SUSPENDED" } : u)));
  };

  const approveUser = async (id: string) => {
    await api.put(`/admin/users/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "APPROVED" } : u)));
  };

  const deleteUser = async (id: string) => {
    await api.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex mb-6 bg-gray-200 rounded-t-md">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-4 py-2 rounded-t-md ${activeTab === "jobs" ? "bg-white text-gray-700" : ""}`}
          >
            Jobs
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-t-md ${activeTab === "users" ? "bg-white text-gray-700" : ""}`}
          >
            Users
          </button>
        </div>

        {/* JOBS TAB */}
        {activeTab === "jobs" && (
          <div>
            {loading && <p>Loading jobs...</p>}
            {!loading && jobs.length === 0 && <p className="text-gray-500">No pending jobs 🎉</p>}

            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 shadow-sm flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-lg">{job.title}</h2>
                    <p className="text-sm text-gray-600">{job.description}</p>
                    <p className="text-xs text-gray-400">
                      {job.city}, {job.country}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => approveJob(job.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Approve
                    </button>
                    <button onClick={() => rejectJob(job.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div>
            {loading && <p>Loading users...</p>}
            {!loading && users.length === 0 && <p className="text-gray-500">No users found</p>}

            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 shadow-sm flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-400">
                      Role: {user.role} | Status: {user.status}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => approveUser(user.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Approve
                    </button>
                    <button onClick={() => suspendUser(user.id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                      Suspend
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
