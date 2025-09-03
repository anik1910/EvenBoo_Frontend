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
      .refine((file) => file?.size <= 5000000, "File size must be under 5MB")
      .optional()
      .nullable(),
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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#14171c",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <ToastContainer position="top-right" autoClose={5000} />
      <form onSubmit={handleSubmit}>
        <div className="signup-container">
          <div className="signup-title">
            <p>Register</p>
          </div>
          <div className="signup-subtitle">
            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
          <div className="field-container">
            <div>
              <label htmlFor="fname">Full Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Enter your Full Name"
                value={formData.fname}
                onChange={handleInputChange}
                className={errors.fname ? "error" : ""}
              />
              {errors.fname && <p className="error-message">{errors.fname}</p>}
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm your Password"
                value={formData.cpassword}
                onChange={handleInputChange}
                className={errors.cpassword ? "error" : ""}
              />
              {errors.cpassword && (
                <p className="error-message">{errors.cpassword}</p>
              )}
            </div>

            <div className="NID-attach">
              <p>Please Attach your NID</p>
              <input
                type="file"
                id="nid-file"
                name="nid_file"
                accept=".jpg, .jpeg, .png"
                onChange={handleInputChange}
                className={errors.nid_file ? "error" : ""}
              />
              {errors.nid_file && (
                <p className="error-message">{errors.nid_file}</p>
              )}
            </div>

            <div>
              <input
                type="submit"
                name="submit"
                id="signup-btn"
                value={isSubmitting ? "Signing Up..." : "Sign Up"}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
