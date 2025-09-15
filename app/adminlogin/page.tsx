"use client";
import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    adminName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/Admin/login", {
        userName: formData.adminName,
        password: formData.password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token); 
        localStorage.setItem("adminName", formData.adminName);
        alert("Login successful ");
        window.location.href = "/Admin"; 
      } else {
        setError("Invalid login response");
      }
    } catch (err: any) {
      setError("Invalid Admin Name or Password ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-lime-400 mb-6 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-400 mb-3 text-center font-semibold">{error}</p>
        )}

        <label className="block text-lime-400 mb-1">Admin Name</label>
        <input
          type="text"
          name="adminName"
          value={formData.adminName}
          onChange={handleChange}
          placeholder="Enter Admin Name"
          className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          required
        />

        <label className="block text-lime-400 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your Password"
          className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold py-2 rounded-lg transition duration-200"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
