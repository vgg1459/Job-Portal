"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployerProfile() {
  const router = useRouter();
  const [employer, setEmployer] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("employerDetails");
    if (saved) {
      setEmployer(JSON.parse(saved));
    }
  }, []);

  const handleDelete = () => {
    localStorage.removeItem("employerDetails");
    setEmployer(null);
    alert("Employer profile deleted!");
  };

  const handleUpdate = () => {
    router.push("/employer/register"); // ✅ go back to registration to update
  };

  if (!employer) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 mb-4">No employer registered.</p>
        <button
          onClick={() => router.push("/employer/register")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Register Now
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{employer.companyName}</h2>
      <p className="text-gray-600 mb-4">{employer.description}</p>
      <p className="text-gray-600 mb-4">{employer.email} | {employer.phone}</p>
      <p className="text-gray-600 mb-6">{employer.address}</p>

      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
