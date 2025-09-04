"use client";

import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showNotification = (type: "success" | "error", message: string) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as "email" | "password"]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);

      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showNotification(
        "success",
        "Login successful! Redirecting to dashboard..."
      );

      setTimeout(() => {
        router.push("/Dashboard");
      }, 2000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as "email" | "password"] = issue.message;
          }
        });
        setErrors(fieldErrors);
        showNotification("error", "Please fix the errors and try again.");
      } else {
        showNotification("error", "Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center min-h-screen bg-[#14171c] font-poppins px-4"
      >
        <div className="bg-[#272a2e] w-80 p-6 rounded-3xl shadow-lg">
          <div className="text-3xl font-bold mb-5 text-center text-[#b6e82e]">
            Login
          </div>

          <label htmlFor="email" className="block text-white font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-2 mb-2 rounded border ${
              errors.email ? "border-red-500" : "border-[#b6e82e]"
            } bg-[#b6e82e33] text-white placeholder:text-[#f0ecec] focus:outline-none focus:ring-2 focus:ring-[#b6e82e]`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}

          <label
            htmlFor="password"
            className="block text-white font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full p-2 mb-2 rounded border ${
              errors.password ? "border-red-500" : "border-[#b6e82e]"
            } bg-[#b6e82e33] text-white placeholder:text-[#f0ecec] focus:outline-none focus:ring-2 focus:ring-[#b6e82e]`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}

          <div className="flex items-center mb-4 gap-2">
            <input type="checkbox" id="remember-me" className="w-4 h-4" />
            <label
              htmlFor="remember-me"
              className="text-white text-sm select-none"
            >
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-[#b6e82e] text-black font-semibold rounded hover:bg-[#d0ff40] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-sm text-white">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#b6e82e] underline hover:text-white"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
