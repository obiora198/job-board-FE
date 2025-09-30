'use client';
import { useState } from "react";

export default function JobFilters({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [filters, setFilters] = useState({
    country: "all-countries",
    state: "all-states",
    city: "all-cities",
    title: "all-titles",
    date: "any-time",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // pass filters up to parent
  };

  return (
    <div className="flex flex-wrap gap-4 text-xs mb-8">
      {/* Country */}
      <select
        name="country"
        id="country"
        value={filters.country}
        onChange={handleChange}
        className="flex-1 p-2 border rounded mb-4"
      >
        <option value="all-countries">All Countries</option>
        <option value="Nigeria">Nigeria</option>
        <option value="USA">United States</option>
        <option value="Canada">Canada</option>
        <option value="UK">United Kingdom</option>
        <option value="Kenya">Kenya</option>
      </select>

      {/* State / Region */}
      <select
        name="state"
        id="state"
        value={filters.state}
        onChange={handleChange}
        className="flex-1 p-2 border rounded mb-4"
      >
        <option value="all-states">All States & Regions</option>
        <option value="Lagos">Lagos</option>
        <option value="Abuja">Abuja</option>
        <option value="Ontario">Ontario</option>
        <option value="California">California</option>
        <option value="Nairobi">Nairobi</option>
      </select>

      {/* City */}
      <select
        name="city"
        id="city"
        value={filters.city}
        onChange={handleChange}
        className="flex-1 p-2 border rounded mb-4"
      >
        <option value="all-cities">All Cities</option>
        <option value="Lagos">Lagos</option>
        <option value="Abuja">Abuja</option>
        <option value="Toronto">Toronto</option>
        <option value="New York">New York</option>
        <option value="Nairobi">Nairobi</option>
      </select>

      {/* Job Title */}
      <select
        name="title"
        id="title"
        value={filters.title}
        onChange={handleChange}
        className="flex-1 p-2 border rounded mb-4"
      >
        <option value="all-titles">All Job Titles</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="marketing">Marketing</option>
        <option value="finance">Finance</option>
        <option value="sales">Sales</option>
        <option value="hr">HR</option>
      </select>

      {/* Date Posted */}
      <select
        name="date"
        id="date"
        value={filters.date}
        onChange={handleChange}
        className="flex-1 p-2 border rounded mb-4"
      >
        <option value="any-time">Any Time</option>
        <option value="last-24-hours">Last 24 Hours</option>
        <option value="last-7-days">Last 7 Days</option>
        <option value="last-30-days">Last 30 Days</option>
      </select>
    </div>
  );
}
