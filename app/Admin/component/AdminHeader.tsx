"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminHeader() {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("adminName");
    if (storedName) setAdminName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");       
    localStorage.removeItem("adminName");
    window.location.href = "/adminlogin";   
  };

  return (
    <div className="mb-8">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-gray-800 rounded-xl shadow-md p-2 mb-4">
        <div className="flex gap-4">
          <Link href="/Admin/adminpage" className="px-6 py-2 rounded-lg hover:bg-lime-400 hover:text-black transition duration-300 font-semibold">
            Admin Details
          </Link>
          <Link href="/Admin/userdetails" className="px-6 py-2 rounded-lg hover:bg-lime-400 hover:text-black transition duration-300 font-semibold">
            Users
          </Link>
          <Link href="/Admin/organizerdetails" className="px-6 py-2 rounded-lg hover:bg-lime-400 hover:text-black transition duration-300 font-semibold">
            Organizers
          </Link>
          <Link href="/Admin/eventdetails" className="px-6 py-2 rounded-lg hover:bg-lime-400 hover:text-black transition duration-300 font-semibold">
            Events
          </Link>
          <Link href="/Admin/requests" className="px-6 py-2 rounded-lg hover:bg-lime-400 hover:text-black transition duration-300 font-semibold">
            Requests
          </Link>
        </div>


        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>


      {adminName && (
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-lime-300">Welcome, {adminName}</h2>
        </div>
      )}
    </div>
  );
}
