"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://your-backend.com/api/profile", {
          credentials: "include",
        });
        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        const data = await res.json();
        setProfile({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePic(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!profile.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(profile.email)) newErrors.email = "Invalid email";
    if (profile.phone && !/^\d{10}$/.test(profile.phone))
      newErrors.phone = "Phone must be 10 digits";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", profile.fullName);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);
      formData.append("address", profile.address);
      if (profilePic) formData.append("profilePic", profilePic);

      const res = await fetch("https://your-backend.com/api/profile", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Profile update failed");
        return;
      }

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-5 bg-[#F7F9FC]">
      <Navbar />
      <section className="w-full max-w-md bg-white p-9 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#799EFF]">
          Profile
        </h2>

        <form onSubmit={handleSubmit}>
          {[
            { label: "Full Name", name: "fullName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Address", name: "address", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="mb-5">
              <label
                htmlFor={name}
                className="block mb-1.5 font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={profile[name as keyof typeof profile]}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg text-base outline-none border ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[name] && (
                <p className="mt-1 text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}

          <div className="mb-5">
            <label className="block mb-1.5 font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-[#799EFF] text-white font-bold text-base rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
}
