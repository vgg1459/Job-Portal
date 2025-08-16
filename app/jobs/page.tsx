"use client";
import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
}

export default function Jobs() {
  const [jobs] = useState<Job[]>([
    { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote", type: "Full-time", experience: "2+ years" },
    { id: 2, title: "Backend Engineer", company: "DataSoft", location: "Bangalore", type: "Contract", experience: "3+ years" },
    { id: 3, title: "UI/UX Designer", company: "CreativeStudio", location: "Mumbai", type: "Internship", experience: "0-1 years" },
  ]);

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    type: "",
    experience: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
      job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      (filters.type ? job.type === filters.type : true) &&
      (filters.experience ? job.experience === filters.experience : true)
    );
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8F0FF] via-[#FFF5D6] to-[#FFEBD1] p-5">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-2">Jobs</h1>
      <p className="text-center text-base text-gray-700 mb-8">Recommended jobs</p>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <input
          type="text"
          name="keyword"
          placeholder="Keyword (title, skills)"
          value={filters.keyword}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border border-gray-300 min-w-[150px] outline-none"
        />
        <input
          type="text"
          name="location"
          placeholder="Location (city, remote)"
          value={filters.location}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border border-gray-300 min-w-[150px] outline-none"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border border-gray-300 min-w-[150px] outline-none"
        >
          <option value="">Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={filters.experience}
          onChange={handleFilterChange}
          className="p-2 rounded-lg border border-gray-300 min-w-[150px] outline-none"
        />
      </div>

      {/* Jobs */}
      <div className="flex flex-wrap justify-center gap-5">
        {filteredJobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="flex-1 min-w-[220px] p-5 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-white/40 text-center cursor-pointer transition-transform hover:-translate-y-1 text-gray-800 no-underline"
          >
            <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
            <p className="text-sm text-gray-700 mb-1">{job.company}</p>
            <p className="text-sm text-gray-500 mb-1">
              {job.location} • {job.type}
            </p>
            <p className="text-xs text-gray-500">Experience: {job.experience}</p>
            <button
              className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-md"
            >
              Apply
            </button>
          </Link>
        ))}
      </div>
    </main>
  );
}
