"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Globe,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

export default function EmployerProfile() {
  const [employer, setEmployer] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("employerDetails");
    if (stored) {
      setEmployer(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const updated = localStorage.getItem("employerDetails");
      if (updated) {
        setEmployer(JSON.parse(updated));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!employer) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
        <p className="text-gray-600 text-lg">
          No employer profile found. Please register.
        </p>
      </main>
    );
  }

  const handleDelete = () => {
    localStorage.removeItem("employerDetails");
    setShowConfirm(false);
    router.push("/employer/register");
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full max-w-3xl relative">
        {/* Top-right icons */}
        <div className="absolute top-4 right-4 flex gap-3 z-10">
          <button
            onClick={() => router.push("/employer/register")}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#a5b3d5] text-white hover:bg-[#5f7edc] transition"
          >
            <Pencil className="w-4 h-4" />
            <span className="text-sm font-medium">Update</span>
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-400 text-white hover:bg-red-600 transition"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </div>

        {/* Header Section */}
        <div className="bg-[#799EFF] h-32 relative">
          <div className="absolute -bottom-12 left-8 flex items-center gap-4">
            <img
              src={employer.logoUrl || "https://via.placeholder.com/100"}
              alt="Company Logo"
              className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-white"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {employer.companyName}
              </h1>
              
              {employer.website && (
                <a
                  href={employer.website}
                  target="_blank"
                  className="text-sm text-[#FFBC4C] hover:underline"
                  rel="noopener noreferrer"
                >
                  {employer.website}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 mt-12 space-y-6">
          {/* About */}
          <p className="text-gray-700 leading-relaxed">
            {employer.description}
          </p>

          {/* Contact Section */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Contact Details
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#799EFF]" />
                <span className="font-medium">Person:</span> {employer.contactPerson}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#799EFF]" />
                <span className="font-medium">Email:</span>
                <a
                  href={`mailto:${employer.email}`}
                  className="hover:underline text-blue-600"
                >
                  {employer.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#799EFF]" />
                <span className="font-medium">Phone:</span>
                <a
                  href={`tel:${employer.phone}`}
                  className="hover:underline text-blue-600"
                >
                  {employer.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#799EFF]" />
                <span className="font-medium">Address:</span> {employer.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this profile? <br />
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-400 text-white hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
