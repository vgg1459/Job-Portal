"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#1e293b] font-[Poppins,sans-serif]">
      <Navbar />
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Job Seeker Portal
        </h1>
        <p className="max-w-xl text-lg mb-8">
          Find your dream job, connect with top employers, and manage your
          applications — all in one place.
        </p>
        <div className="flex gap-4">
          <Link
            href="/jobs"
            className="px-6 py-3 bg-[#799EFF] text-white rounded-lg font-semibold no-underline transition-all duration-300"
          >
            Browse Jobs
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 border-2 border-[#799EFF] rounded-lg font-semibold no-underline text-[#799EFF] transition-all duration-300"
          >
            Create Profile
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-[-2rem] flex justify-center gap-8 flex-wrap px-4 pb-16">
        {[
          {
            title: "Search Jobs",
            desc: "Find jobs by title, skills, and location.",
            bg: "#E8F0FF",
          },
          {
            title: "Track Applications",
            desc: "Easily manage all your job applications.",
            bg: "#FFF5D6",
          },
          {
            title: "Get Alerts",
            desc: "Receive instant job notifications.",
            bg: "#FFEBD1",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl shadow-md w-[250px] text-center transition-transform duration-200 hover:-translate-y-1"
            style={{ backgroundColor: feature.bg }}
          >
            <h3 className="text-xl font-semibold mb-2 text-[#1e293b]">
              {feature.title}
            </h3>
            <p className="text-sm text-[#475569]">{feature.desc}</p>
          </div>
        ))}
      </section>
      <Footer />
    </main>

  );
}