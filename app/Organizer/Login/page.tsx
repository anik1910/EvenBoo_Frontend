"use client";
import axios from "axios";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const loginRes = await axios.post(
        "http://localhost:8000/Organizer/login",
        { email, password },
        {
          timeout: 10000,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (loginRes.status === 200 || loginRes.status === 201) {
        const responseData = loginRes.data;
        const token =
          responseData.token ||
          responseData.access_token ||
          responseData.accessToken;

        if (token) {
          localStorage.setItem("jwtToken", token);
          setSuccessMessage("Login successful! Redirecting...");

          setTimeout(() => {
            router.push("./Profile");
          }, 1000);
        } else {
          setError("No authentication token received from server.");
        }
      } else {
        setError(loginRes.data?.message || "Login failed.");
      }
    } catch (err: any) {
      if (err.code === "ECONNABORTED") {
        setError("Request timeout. Please try again.");
      } else if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 404) {
        setError("Login endpoint not found.");
      } else {
        setError(err.response?.data?.message || "Server error. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-900 border border-green-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-900 border border-green-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {error && (
            <p className="text-[tomato] text-center text-sm">{error}</p>
          )}
          {successMessage && (
            <p className="text-[darkgreen] text-center text-sm">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 hover:bg-green-900 disabled:bg-green-950 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-300 text-sm">Don't have an account? </span>
            <Link
              href="/Organizer/Registration"
              className="text-green-700 hover:underline font-medium text-sm"
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
