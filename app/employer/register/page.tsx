"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployerRegistration() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    website: "",
    logo: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
  });

  
  useEffect(() => {
    const stored = localStorage.getItem("employerDetails");
    if (stored) {
      setFormData(JSON.parse(stored));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("employerDetails", JSON.stringify(formData)); 
    alert("Company details saved!");
    router.push("/employer/profile"); 
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-blue-200 via-white to-blue-100">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-white/20 to-blue-300/40 backdrop-blur-sm" />

      {/* Card Container */}
      <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center" />

        {/* Right Side - Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 p-8 md:p-12 space-y-6"
        >
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Employer Registration
          </h1>

          {/* Company Details */}
          <div className="space-y-4">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <textarea
              name="description"
              placeholder="Company Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows={3}
              required
            />
            <input
              type="url"
              name="website"
              placeholder="Company Website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="url"
              name="logo"
              placeholder="Logo URL (e.g. https://...)"
              value={formData.logo}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={formData.contactPerson}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Contact Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Contact Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Company Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Save & Go to Profile
          </button>
        </form>
      </div>
    </main>
  );
}
