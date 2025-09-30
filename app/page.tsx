"use client";

import { SetStateAction, useEffect, useState } from "react";
import api from "../lib/api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FaInstagram, FaRegStar } from "react-icons/fa";
import {
  FiMessageCircle,
  FiTwitter,
  FiPhone,
  FiLinkedin,
  FiFacebook,
} from "react-icons/fi";
import { CiLocationOn, CiClock2, CiCalendar } from "react-icons/ci";

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
  const [jobs, setJobs] = useState<JobType[] | []>([]);

  useEffect(() => {
    api
      .get("/jobs")
      .then((res: { data: SetStateAction<any> }) => setJobs(res.data));
  }, []);

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
      <div className="bg-gray-800 text-white flex flex-col justify-center items-center gap-8 p-10 sm:p-16">
        <h1 className="text-2xl font-bold">Find Your Dream Job Today</h1>
        <form action="" className="bg-white p-2 rounded">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search by Job title, company or keyword"
              className="p-2 rounded w-64 sm:w-96 text-gray-800 placeholder-gray-300 border border-gray-300"
            />
            <button className="bg-amber-500 text-gray-800 px-4 py-2 rounded">
              Search Jobs
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex flex-wrap gap-4 text-xs mb-8">
          <select
            name="country"
            id="country"
            className="flex-1 p-2 border rounded mb-4"
          >
            <option value="all-countries" defaultChecked>
              All Countries
            </option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
          </select>
          <select
            name="states"
            id="states"
            className="flex-1 p-2 border rounded mb-4"
          >
            <option value="all-states" defaultChecked>
              All states & regions
            </option>
            <option value="state1">State 1</option>
            <option value="state2">State 2</option>
          </select>
          <select
            name="cities"
            id="cities"
            className="flex-1 p-2 border rounded mb-4"
          >
            <option value="all-cities">All Cities</option>
            <option value="city1">City 1</option>
            <option value="city2">City 2</option>
          </select>
          <select
            name="title"
            id="title"
            className="flex-1 p-2 border rounded mb-4"
          >
            <option value="all-titles">All Job titles</option>
            <option value="marketing">Marketing</option>
            <option value="developer">Developer</option>
          </select>
          <select
            name="date"
            id="date"
            className="flex-1 p-2 border rounded mb-4"
          >
            <option value="any-time" defaultChecked>
              Any time
            </option>
            <option value="last-24-hours">Last 24 hours</option>
            <option value="last-7-days">Last 7 days</option>
          </select>
        </div>

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
                  <span>{job.city}, {job.country}</span>
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

const jobListings = [
  {
    id: 1,
    jobTitle: "Senior Software Engineer",
    companyName: "TechCorp Incorporated",
    location: "New York, NY",
    employmentType: "Full-time",
    datePosted: "January 15, 2025",
    description:
      "We are looking for an experienced Senior Software Engineer to lead a team of developers in building scalable cloud-based applications. The ideal candidate has expertise in React, Node.js, and AWS.",
    salaryRange: "$120,000 - $150,000",
    applyLink: "https://techcorp.com/careers/apply/senior-software-engineer",
  },
  {
    id: 2,
    jobTitle: "Product Manager",
    companyName: "InnovateX Solutions",
    location: "San Francisco, CA",
    employmentType: "Full-time",
    datePosted: "January 20, 2025",
    description:
      "We need a strategic Product Manager to drive the roadmap and delivery of our AI-powered SaaS platform. Strong analytical and communication skills are essential.",
    salaryRange: "$110,000 - $135,000",
    applyLink: "https://innovatex.io/jobs/product-manager",
  },
  {
    id: 3,
    jobTitle: "UI/UX Designer",
    companyName: "PixelWorks Studio",
    location: "Remote",
    employmentType: "Contract",
    datePosted: "January 10, 2025",
    description:
      "PixelWorks is hiring a creative UI/UX Designer to craft user-friendly interfaces for mobile and web apps. You will collaborate with engineers and product managers to deliver world-class designs.",
    salaryRange: "$50 - $70/hour",
    applyLink: "https://forms.gle/pixelworks-uiux-apply",
  },
  {
    id: 4,
    jobTitle: "Data Analyst",
    companyName: "Global Insights Ltd.",
    location: "London, UK",
    employmentType: "Full-time",
    datePosted: "January 22, 2025",
    description:
      "Join our analytics team to extract actionable insights from large datasets. Must be proficient in SQL, Python, and data visualization tools like Power BI or Tableau.",
    salaryRange: "£45,000 - £55,000",
    applyLink: "https://globalinsights.co.uk/careers/data-analyst",
  },
  {
    id: 5,
    jobTitle: "Marketing Specialist",
    companyName: "BrightPath Media",
    location: "Berlin, Germany",
    employmentType: "Part-time",
    datePosted: "January 18, 2025",
    description:
      "We are seeking a Marketing Specialist to assist in digital campaigns, social media strategy, and content creation. Fluency in both English and German is preferred.",
    salaryRange: "€60 - €80/hour",
    applyLink: "https://brightpathmedia.de/jobs/marketing-specialist",
  },
  {
    id: 6,
    jobTitle: "Customer Support Representative",
    companyName: "CloudServe Technologies",
    location: "Toronto, Canada",
    employmentType: "Full-time",
    datePosted: "January 25, 2025",
    description:
      "Provide exceptional customer support to enterprise clients using our cloud services. Previous support or call center experience is a plus. Training provided.",
    salaryRange: "CAD $45,000 - $55,000",
    applyLink: "https://cloudserve.ca/apply/customer-support",
  },
];
