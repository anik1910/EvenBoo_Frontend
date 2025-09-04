"use client";

import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Zod validation schema
const signupSchema = z
  .object({
    fname: z
      .string()
      .min(2, "Full Name must be at least 2 characters")
      .max(50, "Full Name must be less than 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    cpassword: z.string(),
    nid_file: z
      .any()
      .refine((file) => file != null, "Please attach your NID file")
      .refine(
        (file) => !file || file.size <= 5000000,
        "File size must be under 5MB"
      ),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords do not match",
    path: ["cpassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

interface FormErrors {
  fname?: string;
  email?: string;
  password?: string;
  cpassword?: string;
  nid_file?: string;
}

export default function SignupPage() {
  const router = useRouter(); // Initialize router
  const [formData, setFormData] = useState<SignupFormData>({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
    nid_file: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showNotification = (type: "success" | "error", message: string) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "nid_file") {
      setFormData((prev) => ({
        ...prev,
        nid_file: files ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for the field when typing/changing file
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signupSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormData({
        fname: "",
        email: "",
        password: "",
        cpassword: "",
        nid_file: null,
      });
      showNotification(
        "success",
        "Registration successful! Redirecting to login..."
      );

      // Redirect after a short delay to allow toast to show
      setTimeout(() => {
        router.push("/login");
      }, 2000); // 2 second delay
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof FormErrors] = issue.message;
          }
        });
        setErrors(fieldErrors);
        showNotification("error", "Please fix the errors and try again.");
      } else {
        showNotification("error", "Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="bg-[#14171c] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-[#272a2e] rounded-[18px] p-7 w-[340px] mt-4"
        >
          <div className="text-center mb-5">
            <p className="text-3xl font-bold text-white">Register</p>
            <p className="mt-7 text-[#b6e82e] text-sm font-semibold">
              Already have an account?{" "}
              <Link href="/login" className="underline hover:text-white">
                Login
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fname"
                className="block text-white text-base mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Enter your Full Name"
                value={formData.fname}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded border ${
                  errors.fname ? "border-red-500" : "border-[#b6e82e]"
                } bg-[#b6e82e33] text-white placeholder:text-[#f0ecec] focus:outline-none focus:ring-2 focus:ring-[#b6e82e]`}
              />
              {errors.fname && (
                <p className="text-red-500 text-sm mt-1">{errors.fname}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-white text-base mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded border ${
                  errors.email ? "border-red-500" : "border-[#b6e82e]"
                } bg-[#b6e82e33] text-white placeholder:text-[#f0ecec] focus:outline-none focus:ring-2 focus:ring-[#b6e82e]`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-white text-base mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded border ${
                  errors.password ? "border-red-500" : "border-[#b6e82e]"
                } bg-[#b6e82e33] text-white placeholder:text-[#f0ecec] focus:outline-none focus:ring-2 focus:ring-[#b6e82e]`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="cpassword"
                className="block text-white text-base mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm your Password"
                value={formData.cpassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded border ${
                  errors.cpassword ? "border-red-500" : "border-[#b6e82e]"
                } bg-[#b6e82e33] text-white placeholder:text-[#f0ecec] focus:outline-none focus:ring-2 focus:ring-[#b6e82e]`}
              />
              {errors.cpassword && (
                <p className="text-red-500 text-sm mt-1">{errors.cpassword}</p>
              )}
            </div>

            {/* NID Attach */}
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold">Please Attach your NID</p>
              <label
                htmlFor="nid-file"
                className="inline-flex items-center cursor-pointer px-4 py-2 bg-[#b6e82e33] text-white rounded-full hover:bg-[#b6e82e] hover:text-black transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Upload NID
                <input
                  type="file"
                  id="nid-file"
                  name="nid_file"
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </label>
              {formData.nid_file && (
                <span className="text-[#b6e82e] text-sm font-medium">
                  {formData.nid_file.name}
                </span>
              )}
              {errors.nid_file && (
                <p className="text-red-500 text-sm mt-1">{errors.nid_file}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <input
                type="submit"
                id="signup-btn"
                name="submit"
                value={isSubmitting ? "Signing Up..." : "Sign Up"}
                disabled={isSubmitting}
                className="w-full cursor-pointer bg-[#b6e82e] text-black font-semibold py-3 rounded-md hover:bg-[#a0d10a] disabled:opacity-60 disabled:cursor-not-allowed transition"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
