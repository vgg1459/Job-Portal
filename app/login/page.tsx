"use client";

import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://backend-server.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors({ api: data.error || "Login failed" });
        setLoading(false);
        return;
      }

      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setErrors({ api: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-5 bg-[#F7F9FC]">
      <section className="w-full max-w-md bg-white p-9 md:p-10 rounded-2xl shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#799EFF]">
          Log In
        </h2>

        {errors.api && <p className="mb-4 text-red-600 text-center">{errors.api}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Email", type: "email", name: "email" },
            { label: "Password", type: "password", name: "password" },
          ].map(({ label, type, name }) => (
            <div key={name}>
              <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
                {label}
              </label>
              <input
                id={name}
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border focus:outline-none ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[name] && (
                <p className="mt-1 text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 mt-2 bg-[#799EFF] text-white font-bold text-base rounded-lg shadow-md hover:bg-[#5C82E3] transition"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="mt-5 text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#799EFF] font-bold">
            Sign up
          </a>
        </p>
      </section>
    </main>
  );
}
