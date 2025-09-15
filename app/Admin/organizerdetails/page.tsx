"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Organizer {
  id?: number;
  oname: string;
  oemail: string;
  ogender: string;
  opnumber: string;
  opassword: string;
  admin?: {
    adminId?: number;
  };
}

export default function OrganizerDetails() {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState<Organizer>({
    id: undefined,
    oname: "",
    oemail: "",
    ogender: "",
    opnumber: "",
    opassword: "",
    admin: {},
  });

  const fetchOrganizers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Admin/allorganizers");
      setOrganizers(res.data);
    } catch (err) {
      console.error("Error fetching organizers:", err);
    }
  };

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const handleSearch = () => {
    if (!search) {
      fetchOrganizers();
    } else {
      setOrganizers((prev) =>
        prev.filter((o) =>
          o.oemail.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  const handleRowClick = (o: Organizer) => {
    setFormData(o);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "adminId") {
      setFormData((prev) => ({
        ...prev,
        admin: { adminId: Number(value) },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:3000/Admin/addorg",formData);
      fetchOrganizers();
      setFormData({
        id: undefined,
        oname: "",
        oemail: "",
        ogender: "",
        opnumber: "",
        opassword: "",
        admin: {},
      });
    } catch (err) {
      console.error("Error adding organizer:", err);
    }
  };

  const handleUpdate = async () => {
    if (!formData.id) {
      alert("Select an organizer to update!");
      return;
    }
    try {
      await axios.put(
        `http://localhost:3000/Admin/updateorganizer/${formData.id}`,
        formData
      );
      fetchOrganizers();
    } catch (err) {
      console.error("Error updating organizer:", err);
    }
  };

  const handleDelete = async () => {
    if (!formData.id) {
      alert("Select an organizer to delete!");
      return;
    }
    try {
      await axios.delete(
        `http://localhost:3000/Admin/deleteorganizer/${formData.id}`
      );
      fetchOrganizers();
      setFormData({
        id: undefined,
        oname: "",
        oemail: "",
        ogender: "",
        opnumber: "",
        opassword: "",
        admin: {},
      });
    } catch (err) {
      console.error("Error deleting organizer:", err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 flex items-start justify-center p-6 gap-6">
      {/* Table Panel */}
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-3xl shadow-lg">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter email to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-4 py-2 rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-4 py-2 rounded-lg"
            onClick={fetchOrganizers}
          >
            Load
          </button>
        </div>

        <table className="w-full text-left border-collapse overflow-hidden rounded-xl">
          <thead>
            <tr className="bg-lime-400 text-black font-bold">
              <th className="p-3">ID</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Phone Number</th>
              {/* <th className="p-3">Password</th> */}
              <th className="p-3">Admin ID</th>
            </tr>
          </thead>
          <tbody>
            {organizers.map((o) => (
              <tr
                key={o.id}
                className="border-b border-gray-700 text-white hover:bg-gray-700 cursor-pointer"
                onClick={() => handleRowClick(o)}
              >
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.oname}</td>
                <td className="p-3">{o.oemail}</td>
                <td className="p-3">{o.ogender}</td>
                <td className="p-3">{o.opnumber}</td>
                {/* <td className="p-3">{o.opassword}</td> */}
                <td className="p-3">{o.admin?.adminId ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Panel */}
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-lg flex flex-col">
        <h2 className="text-lime-400 text-xl font-bold mb-4">Organizer Details</h2>
        <form className="flex flex-col gap-4 flex-1">
          <input type="text" name="id" value={formData.id ?? ""} readOnly className="w-full p-2 rounded-md bg-gray-700 text-white" placeholder="ID"/>
          <input type="text" name="oname" value={formData.oname} onChange={handleInputChange} className="w-full p-2 rounded-md bg-gray-700 text-white" placeholder="Full Name"/>
          <input type="text" name="oemail" value={formData.oemail} onChange={handleInputChange} className="w-full p-2 rounded-md bg-gray-700 text-white" placeholder="Email"/>
          <input type="text" name="ogender" value={formData.ogender} onChange={handleInputChange} className="w-full p-2 rounded-md bg-gray-700 text-white" placeholder="Gender"/>
          <input type="text" name="opnumber" value={formData.opnumber} onChange={handleInputChange} className="w-full p-2 rounded-md bg-gray-700 text-white" placeholder="Phone Number"/>
          <input type="text" name="opassword" value={formData.opassword} onChange={handleInputChange} className="w-full p-2 rounded-md bg-gray-700 text-white" placeholder="Password"/>
          <input type="text" name="adminId" value={formData.admin?.adminId ?? ""} onChange={handleInputChange} className="w-full p-2 rounded-md bg-gray-700 text-white" placeholder="Admin ID"/>
        </form>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button onClick={handleAdd} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg">Add</button>
          <button onClick={handleUpdate} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">Update</button>
          <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
}
