"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function RegistrationForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isValidFullname = (name: string) =>
    name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());

  const isValidEmail = (email: string) => email.endsWith("@aiub.edu");

  const isValidPhoneNumber = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.startsWith("01") && cleanPhone.length === 11;
  };

  const isValidPassword = (password: string) =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[@$!%*?&]/.test(password);

  const isValidImage = (file: File | null) => {
    if (!file) return false;
    return file.size <= 5 * 1024 * 1024;
  };

  const handleReset = () => {
    setFullname("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setImage(null);
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async () => {
    setError("");
    setSuccessMessage("");

    if (!fullname || !email || !phoneNumber || !password || !image) {
      setError("All fields are required (including image)");
    } else if (!isValidFullname(fullname)) {
      setError(
        "Full name must be at least 2 characters and contain only letters and spaces"
      );
    } else if (!isValidEmail(email)) {
      setError("Email must end with @aiub.edu");
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setError("Phone number must start with 01 and contain exactly 11 digits");
    } else if (!isValidPassword(password)) {
      setError(
        "Password must be 8+ characters with at least one uppercase letter and one special character"
      );
    } else if (!isValidImage(image)) {
      setError("Image size must not exceed 5MB");
    } else {
      try {
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("password", password);
        if (image) {
          formData.append("image", image);
        }

        const res = await axios.post("http://localhost:8000/Organizer/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 201 || res.status === 200) {
          setSuccessMessage("Registration successful! Redirecting to login...");
          handleReset();

          setTimeout(() => {
            window.location.href = "./Login";
          }, 1000);
        } else {
          setError("Registration failed. Please try again.");
        }
      } catch (err: any) {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-5">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-green-800 mb-6">
          Registration
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-green-800 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@aiub.edu"
              className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-green-800 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="01xxxxxxxxx"
              className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-green-800 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-green-800 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            <p className="text-gray-400 text-xs mt-1">
              Must be 8+ characters with at least one uppercase letter and special character
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-green-800 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            <p className="text-gray-400 text-xs mt-1">Max size: 5MB</p>
          </div>
        </div>

        {error && <p className="text-[tomato] text-center mt-4">{error}</p>}
        {successMessage && (
          <p className="text-[darkgreen] text-center mt-4">{successMessage}</p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleReset}
            className="flex-1 bg-[tomato] hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-800 hover:bg-green-900 text-white py-2 rounded-lg font-medium transition"
          >
            Submit
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-gray-300">Already have an account? </span>
          <Link
            href="/Organizer/Login"
            className="text-green-700 hover:underline font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
