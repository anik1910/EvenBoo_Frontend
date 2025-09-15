"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Admin {
  id?: number;
  userName: string;
  fullName: string;
  password: string;
  isActive: boolean;
}

export default function AdminDetails() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState<Admin>({
    id: undefined,
    userName: "",
    fullName: "",
    password: "",
    isActive: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Admin/alladmins");
      setAdmins(res.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleRowClick = (a: Admin) => {
    setFormData(a);
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.userName) {
      newErrors.userName = "Admin Name is required";
    } else if (!/^[A-Za-z0-9]+$/.test(formData.userName)) {
  newErrors.userName = "Admin Name must contain only letters and numbers";
}


    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
      newErrors.fullName = "Full Name must contain only letters and spaces";
    }

    // if (!formData.password) {
    //   newErrors.password = "Password is required";
    // } else if (formData.password.length < 6 || formData.password.length > 32) {
    //   newErrors.password = "Password must be 6–32 characters long";
    // } else if (!/[A-Z]/.test(formData.password)) {
    //   newErrors.password = "Password must contain at least one uppercase letter";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    if (!validate()) return;
    try {
      await axios.post("http://localhost:3000/Admin/createadmin", formData);
      fetchAdmins();
      setFormData({ id: undefined, userName: "", fullName: "", password: "", isActive: false });
    } catch (err) {
      console.error("Error adding admin:", err);
    }
  };

  const handleUpdate = async () => {
    if (!formData.id) {
      alert("Select an admin to update!");
      return;
    }
    if (!validate()) return;
    try {
      await axios.put(`http://localhost:3000/Admin/updateadmin/${formData.id}`, formData);
      fetchAdmins();
    } catch (err) {
      console.error("Error updating admin:", err);
    }
  };

  const handleDelete = async () => {
    if (!formData.id) {
      alert("Select an admin to delete!");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/Admin/deleteadmin/${formData.id}`);
      fetchAdmins();
      setFormData({ id: undefined, userName: "", fullName: "", password: "", isActive: false });
    } catch (err) {
      console.error("Error deleting admin:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-start justify-center p-6 gap-6">
      {/* Table */}
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-3xl shadow-lg">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by Admin Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-4 py-2 rounded-lg"
            onClick={() =>
              setAdmins((prev) =>
                search ? prev.filter((a) => a.userName.toLowerCase().includes(search.toLowerCase())) : prev
              )
            }
          >
            Search
          </button>
          <button
            className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-4 py-2 rounded-lg"
            onClick={fetchAdmins}
          >
            Load
          </button>
        </div>

        <table className="w-full text-left border-collapse overflow-hidden rounded-xl">
          <thead>
            <tr className="bg-lime-400 text-black font-bold">
              <th className="p-3">ID</th>
              <th className="p-3">Admin Name</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr
                key={a.id}
                className="border-b border-gray-700 text-white hover:bg-gray-700 cursor-pointer"
                onClick={() => handleRowClick(a)}
              >
                <td className="p-3">{a.id}</td>
                <td className="p-3">{a.userName}</td>
                <td className="p-3">{a.fullName}</td>
                <td className="p-3">{a.isActive ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-lg flex flex-col">
        <h2 className="text-lime-400 text-xl font-bold mb-4">Admin Details</h2>
        <form className="flex flex-col gap-4 flex-1">
          <input type="text" name="id" value={formData.id ?? ""} readOnly className="w-full p-2 rounded-md bg-gray-700 text-white" placeholder="ID" />
          <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} className={`w-full p-2 rounded-md bg-gray-700 text-white ${errors.userName ? "border border-red-500" : ""}`} placeholder="Admin Name" />
          {errors.userName && <p className="text-red-400 text-sm">{errors.userName}</p>}
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={`w-full p-2 rounded-md bg-gray-700 text-white ${errors.fullName ? "border border-red-500" : ""}`} placeholder="Full Name" />
          {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} className={`w-full p-2 rounded-md bg-gray-700 text-white ${errors.password ? "border border-red-500" : ""}`} placeholder="Password" />
          {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
          <label className="flex items-center gap-2 text-gray-300">
            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4 text-lime-400 bg-gray-700 border-gray-600 rounded" />
            <span>Activate Admin</span>
          </label>
        </form>

        <div className="flex gap-2 mt-4">
          <button onClick={handleAdd} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg">Add</button>
          <button onClick={handleUpdate} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">Update</button>
          <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
}
