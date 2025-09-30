"use client";

import { useState, useEffect } from "react";
import api from "../../lib/api";
import { JobType } from "../page";

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void; // callback to refresh jobs
  token: string | null;
  job?: JobType | null; // if provided → edit mode
}

export default function JobFormModal({
  isOpen,
  onClose,
  onSaved,
  token,
  job,
}: JobFormModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [datePosted, setDatePosted] = useState(
    new Date().toISOString().split("T")[0] // YYYY-MM-DD
  );
  const [companyName, setCompanyName] = useState("");
  const [currency, setCurrency] = useState("$");
  const [submitting, setSubmitting] = useState(false);

  // populate fields if editing
  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setCity(job.city);
      setCountry(job.country);
      setApplyLink(job.applyLink);
      setEmploymentType(job.employmentType);
      setSalaryRange(job.salaryRange);
      setDatePosted(job.datePosted);
      setCompanyName(job.companyName);
    } else {
      resetForm();
    }
  }, [job]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCity("");
    setCountry("");
    setApplyLink("");
    setEmploymentType("");
    setSalaryRange("");
    setDatePosted("");
    setCompanyName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSubmitting(true);
    try {
      const formattedSalaryRange = `${currency}${salaryFrom} - ${currency}${salaryTo}`;

      const payload = {
        title,
        description,
        city,
        country,
        applyLink,
        employmentType,
        salaryRange: formattedSalaryRange,
        datePosted,
        companyName,
      };

      if (job) {
        await api.put(`/jobs/${job.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/jobs", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSaved()
      onClose()
    } catch (err) {
      console.error("Error saving job", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-l font-bold mb-4">
          {job ? "Edit Job Post" : "Post a New Job"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-1/2 p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-1/2 p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 font-medium mb-1">
              Salary Range
            </label>
            <div className="flex space-x-2 items-center">
              <label className="text-sm">From</label>

              <input
                type="number"
                placeholder="eg 150,000"
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
                className="w-1/4 sm:w-2/6 p-2 border rounded"
              />
              <label>--</label>

              <input
                type="number"
                placeholder="eg 200,000"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
                className="w-1/4 sm:w-2/6 p-2 border rounded"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-2 border rounded w-1/4 sm:w-1/6"
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="₦">NGN (₦)</option>
                <option value="£">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Apply Link"
              value={applyLink}
              onChange={(e) => setApplyLink(e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-1/2 p-2 border rounded"
              required
            >
              <option value="" defaultChecked disabled>
                Select Employment Type
              </option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 rounded text-gray-700 ${
                submitting
                  ? "bg-amber-300 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-400"
              }`}
            >
              {submitting
                ? job
                  ? "Updating..."
                  : "Posting..."
                : job
                ? "Update Job"
                : "Post Job"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
