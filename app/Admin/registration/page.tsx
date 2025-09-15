"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    userName: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    isActive: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.userName) {
      newErrors.userName = "Admin Name is required";
    } else if (!/^[A-Za-z]+$/.test(form.userName)) {
      newErrors.userName = "Admin Name must contain letters and numbers";
    }

    if (!form.fullName) {
      newErrors.fullName = "Full Name is required";
    } else if (!/^[A-Za-z ]+$/.test(form.fullName)) {
      newErrors.fullName = "Full Name must contain only letters and spaces";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6 || form.password.length > 32) {
      newErrors.password = "Password must be 6-32 characters long";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:3000/Admin/createadmin", {
        userName: form.userName,
        fullName: form.fullName,
        password: form.password,
        isActive: form.isActive,
      });

      if (res.status === 201 || res.status === 200) {
        setMessage("Registration successful");
        setForm({
          userName: "",
          fullName: "",
          password: "",
          confirmPassword: "",
          isActive: false,
        });
        setErrors({});
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="w-full max-w-md bg-[#222] p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Register</h2>
        <p className="text-center text-sm text-gray-400 mt-1">
          Already have an account?{" "}
          <a href="/login" className="text-lime-400 hover:underline">
            Login
          </a>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Admin Name */}
          <div><label className="text-white">Admin Name</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter your Admin Name"
              value={form.userName}
              onChange={handleChange}
              className={`w-full p-2 rounded border ${
                errors.userName ? "border-red-500" : "border-lime-600"
              } bg-lime-800 text-white placeholder-lime-300 focus:outline-none`}
            />
            {errors.userName && (
              <p className="text-red-400 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

          {/* Full Name */}
          <div><label className="text-white">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
              value={form.fullName}
              onChange={handleChange}
              className={`w-full p-2 rounded border ${
                errors.fullName ? "border-red-500" : "border-lime-600"
              } bg-lime-800 text-white placeholder-lime-300 focus:outline-none`}
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Password */}
          <div><label className="text-white">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={form.password}
              onChange={handleChange}
              className={`w-full p-2 rounded border ${
                errors.password ? "border-red-500" : "border-lime-600"
              } bg-lime-800 text-white placeholder-lime-300 focus:outline-none`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div><label className="text-white">Re-enter Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full p-2 rounded border ${
                errors.confirmPassword ? "border-red-500" : "border-lime-600"
              } bg-lime-800 text-white placeholder-lime-300 focus:outline-none`}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* isActive Checkbox */}
          <label className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-lime-400 bg-gray-700 border-gray-600 rounded"
            />
            <span>Activate account</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-lime-400 text-black py-2 rounded-md font-semibold hover:bg-lime-500"
            >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-lime-300">{message}</p>
        )}
      </div>
    </div>
  );
}