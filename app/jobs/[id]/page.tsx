"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function JobDetails() {
  const params = useParams();
  const jobId = params?.id;

  // Mock data (replace with API later)
  const job = {
    id: jobId,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will work with modern frameworks, collaborate with designers, and create seamless user experiences.",
    requirements: [
      "Strong knowledge of React and TypeScript",
      "Experience with Tailwind CSS",
      "Familiarity with REST APIs",
      "Good problem-solving skills",
    ],
    salary: "₹6–8 LPA",
    postedOn: "2025-08-10",
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#E8F0FF] via-[#FFF5D6] to-[#FFEBD1]">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-white/40">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-block mb-6 text-blue-600 font-medium hover:underline"
        >
          ← Back to Dashboard
        </Link>

        {/* Job Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-800 mb-1">
            {job.title}
          </h1>
          <p className="text-lg text-gray-700">{job.company}</p>
          <p className="text-gray-500 mt-1">
            {job.location} • {job.type}
          </p>
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-[#FFF5D6] text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow">
            {job.experience} exp
          </span>
          <span className="bg-[#FFEBD1] text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow">
            ₹ {job.salary}
          </span>
          <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium shadow">
            Posted: {job.postedOn}
          </span>
        </div>

        {/* Description */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Job Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </section>

        {/* Requirements */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Requirements
          </h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </section>

        {/* Apply Button */}
        <div className="flex justify-center">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition duration-300 ease-in-out hover:from-blue-600 hover:to-blue-700">
            Apply Now
          </button>
        </div>
      </div>
    </main>
  );
}
