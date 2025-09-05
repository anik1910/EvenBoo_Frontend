"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ChangePasswordModal from "./ChangePassword";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function Profile({ params }: { params: { userId: string } }) {
  const router = useRouter();

  const [profile, setProfile] = useState<{
    fullName: string;
    email: string;
    phone: string;
  }>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [editingField, setEditingField] = useState<"fullname" | "phone" | null>(
    null
  );
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phonenumber: "",
      myfile: null,
    },
  });

  // Load profile data
  async function loadProfile() {
    try {
      const res = await fetch("http://localhost:8080/profile", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      const user = data.Profile_Info || {};
      setProfile({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      reset({
        fullname: user.fullName || "",
        email: user.email || "",
        phonenumber: user.phone || "",
        myfile: null,
      });
    } catch {
      router.push("/login");
    }
  }

  useEffect(() => {
    loadProfile();
  }, [router]);

  async function saveField(field: "fullname" | "phone") {
    const value = watch(field === "fullname" ? "fullname" : "phonenumber");
    if (!value || !value.trim()) {
      toast.error(
        `${field === "fullname" ? "Full name" : "Phone number"} cannot be empty`
      );
      return;
    }
    if (field === "phone" && !/^\d{11}$/.test(value)) {
      toast.error("Phone number must be exactly 11 digits");
      return;
    }
    const body: any = {};
    body[field === "fullname" ? "fullName" : "phone"] = value;

    try {
      const res = await fetch("http://localhost:8080/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast.success(
          `${field === "fullname" ? "Full name" : "Phone number"} updated`
        );
        setEditingField(null);
        await loadProfile(); // refresh data
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Update failed");
    }
  }

  function cancelEdit(field: "fullname" | "phone") {
    setEditingField(null);
    setValue(
      field === "fullname" ? "fullname" : "phonenumber",
      profile[field === "fullname" ? "fullName" : "phone"]
    );
  }

  async function onSubmit(formData: any) {
    if (!formData.myfile || formData.myfile.length === 0) {
      toast.error("No new profile picture selected");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("profilePic", formData.myfile[0]);

    try {
      const res = await fetch("http://localhost:8080/profile", {
        method: "PATCH",
        credentials: "include",
        body: formDataToSend,
      });
      if (res.ok) {
        toast.success("Profile picture updated");
        loadProfile();
      } else {
        toast.error("Profile picture update failed");
      }
    } catch {
      toast.error("Profile picture update failed");
    }
  }

  async function handleDeleteAccount() {
    if (!confirm("Are you sure you want to delete your account?")) return;
    try {
      const res = await fetch("http://localhost:8080/profile", {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Account deleted");
        router.push("/login");
      } else {
        toast.error("Could not delete account");
      }
    } catch {
      toast.error("Could not delete account");
    }
  }

  return (
    <div className="bg-[#14171c]">
      {/* Form only for profile pic */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="max-w-md mx-auto rounded-xl bg-[#1f2229] p-6 shadow-lg font-poppins flex flex-col gap-6"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Profile Information
        </h2>

        {/* Profile Picture Section skipped */}

        <div>
          <label
            htmlFor="fullname"
            className="mb-1 block text-white font-medium"
          >
            Full Name
          </label>
          <div className="relative">
            <input
              id="fullname"
              {...register("fullname", { required: "Full name is required" })}
              disabled={editingField !== "fullname"}
              className={`w-full rounded border px-3 py-2 bg-gray-700 text-white placeholder-gray-400 ${
                editingField === "fullname"
                  ? "cursor-text"
                  : "cursor-not-allowed"
              }`}
            />
            <div className="absolute right-2 top-2 flex space-x-2">
              {editingField === "fullname" ? (
                <>
                  <button type="button" onClick={() => saveField("fullname")}>
                    <FaSave className="text-[#b6e82e]" />
                  </button>
                  <button type="button" onClick={() => cancelEdit("fullname")}>
                    <FaTimes className="text-red-500 hover:text-red-700" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingField("fullname")}
                >
                  <FaEdit className="text-[#b6e82e]" />
                </button>
              )}
            </div>
          </div>
          {errors.fullname && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-white font-medium">
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            disabled
            className="w-full rounded border px-3 py-2 bg-gray-700 text-gray-400 cursor-not-allowed"
          />
        </div>

        <div>
          <label
            htmlFor="phonenumber"
            className="mb-1 block text-white font-medium"
          >
            Phone Number
          </label>
          <div className="relative">
            <input
              id="phonenumber"
              {...register("phonenumber", {
                required: "Phone number is required",
              })}
              disabled={editingField !== "phone"}
              className={`w-full rounded border px-3 py-2 bg-gray-700 text-white placeholder-gray-400 ${
                editingField === "phone" ? "cursor-text" : "cursor-not-allowed"
              }`}
            />
            <div className="absolute right-2 top-2 flex space-x-2">
              {editingField === "phone" ? (
                <>
                  <button type="button" onClick={() => saveField("phone")}>
                    <FaSave className="text-[#b6e82e]" />
                  </button>
                  <button type="button" onClick={() => cancelEdit("phone")}>
                    <FaTimes className="text-red-500 hover:text-red-700" />
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => setEditingField("phone")}>
                  <FaEdit className="text-[#b6e82e]" />
                </button>
              )}
            </div>
          </div>
          {errors.phonenumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phonenumber.message}
            </p>
          )}
        </div>

        <div className="flex space-x-4 items-center">
          <button
            type="button"
            className="bg-[#b6e82e] text-black font-semibold px-4 py-2 rounded hover:bg-red-700 hover:text-white transition"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </button>

          {/* Remove Save All button as per request */}
        </div>

        <button
          type="button"
          className="mt-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </form>

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          onChangePassword={async (oldPass: string, newPass: string) => {
            try {
              const res = await fetch(
                "http://localhost:8080/profile/change-password",
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    oldPassword: oldPass,
                    newPassword: newPass,
                  }),
                  credentials: "include",
                }
              );
              if (res.ok) {
                toast.success("Password changed");
                setShowPasswordModal(false);
              } else {
                toast.error("Password change failed");
              }
            } catch {
              toast.error("Password change error");
            }
          }}
        />
      )}
    </div>
  );
}
