"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EventForm() {
  const [organizerFunctions, setOrganizerFunctions] = useState<any[]>([]);
  const [organizerLowerFunctions, setOrganizerLowerFunctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response1 = await axios.get("http://localhost:8000/Organizer/functions", {
          timeout: 10000,
          headers: { "Content-Type": "application/json" },
        });

        const response2 = await axios.get("http://localhost:8000/organizer/users", {
          timeout: 10000,
          headers: { "Content-Type": "application/json" },
        });

        setOrganizerFunctions(response1.data);
        setOrganizerLowerFunctions(response2.data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>

        <div className="flex justify-center gap-4 mb-8">
          <Link href="/Organizer/Login">
            <button className="bg-lime-500 hover:bg-lime-600 text-black font-medium py-2 px-4 rounded-lg transition">
              Login
            </button>
          </Link>
          <Link href="/Organizer/Registration">
            <button className="bg-lime-500 hover:bg-lime-600 text-black font-medium py-2 px-4 rounded-lg transition">
              Registration
            </button>
          </Link>
        </div>

        {loading && (
          <div className="text-center text-gray-400">Loading data...</div>
        )}

        {error && (
          <div className="text-center text-red-500">{error}</div>
        )}

        {!loading && !error && (
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold text-lime-400 mb-3">
                All Functions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
                  <thead className="bg-lime-500 text-black">
                    <tr>
                      <th className="px-4 py-2 text-left">Organizer</th>
                      <th className="px-4 py-2 text-left">Title</th>
                      <th className="px-4 py-2 text-left">Description</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizerFunctions.map((func, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-700 hover:bg-gray-700 transition"
                      >
                        <td className="px-4 py-2">{func.organizer?.fullname || "N/A"}</td>
                        <td className="px-4 py-2">{func.title}</td>
                        <td className="px-4 py-2">{func.description}</td>
                        <td className="px-4 py-2">
                          {func.date ? new Date(func.date).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="px-4 py-2">{func.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-lime-400 mb-3">
                All Organizers
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
                  <thead className="bg-lime-500 text-black">
                    <tr>
                      <th className="px-4 py-2 text-left">Fullname</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                      <th className="px-4 py-2 text-left">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizerLowerFunctions.map((org, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-700 hover:bg-gray-700 transition"
                      >
                        <td className="px-4 py-2">{org.fullname}</td>
                        <td className="px-4 py-2">{org.email}</td>
                        <td className="px-4 py-2">{org.phoneNumber}</td>
                        <td className="px-4 py-2">
                          {org.createdAt
                            ? new Date(org.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
