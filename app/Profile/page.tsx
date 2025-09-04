"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import ChangePasswordModal from "./ChangePassword"; // For modal, if you use it

const schema = z.object({
  fullname: z.string().min(3, "Name required"),
  phonenumber: z.string().min(10, "Phone required").max(15, "Invalid number"),
  uaddress: z.string().min(3, "Address required"),
  myfile: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof schema>;

const ProfileForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string>(
    "/asset/image/udi.png"
  );
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: "",
      phonenumber: "",
      uaddress: "",
      myfile: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setValue("myfile", file as any);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // Place your API call here
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#14171c] font-poppins">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1f2229] max-w-md w-full mx-auto mt-10 rounded-xl shadow-lg p-8 flex flex-col gap-6"
        noValidate
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-center mb-4">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-36 h-36 object-cover rounded-full border-[4px] border-[#b6e82e] shadow"
          />
          <input
            type="file"
            accept="image/*"
            {...register("myfile")}
            onChange={handleFileChange}
            className="mt-2 block text-xs w-full"
          />
        </div>
        <div>
          <label
            htmlFor="pmfullName"
            className="block text-white text-[15px] mb-1"
          >
            Full Name
          </label>
          <input
            id="pmfullName"
            {...register("fullname")}
            placeholder="Your full name"
            className="w-full px-3 py-2 rounded border border-[#b6e82e] bg-[#b6e82e33] text-white placeholder:text-[#f0ecec] focus:outline-none focus:ring-2 focus:ring-[#b6e82e]"
          />
          {errors.fullname && (
            <span className="text-red-500 text-xs">
              {errors.fullname.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="pmemail"
            className="block text-white text-[15px] mb-1"
          >
            Email
          </label>
          <input
            id="pmemail"
            type="email"
            disabled
            value="demo@email.com"
            className="w-full px-3 py-2 rounded border border-[#b6e82e] bg-gray-300 text-gray-700 opacity-80 cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="pmphone"
            className="block text-white text-[15px] mb-1"
          >
            Phone Number
          </label>
          <input
            id="pmphone"
            {...register("phonenumber")}
            placeholder="01XXXXXXXXX"
            className="w-full px-3 py-2 rounded border border-[#b6e82e] bg-[#b6e82e33] text-white placeholder:text-[#f0ecec] focus:outline-none focus:ring-2 focus:ring-[#b6e82e]"
          />
          {errors.phonenumber && (
            <span className="text-red-500 text-xs">
              {errors.phonenumber.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="pmaddress"
            className="block text-white text-[15px] mb-1"
          >
            Address
          </label>
          <input
            id="pmaddress"
            {...register("uaddress")}
            placeholder="Your address"
            className="w-full px-3 py-2 rounded border border-[#b6e82e] bg-[#b6e82e33] text-white placeholder:text-[#f0ecec] focus:outline-none focus:ring-2 focus:ring-[#b6e82e]"
          />
          {errors.uaddress && (
            <span className="text-red-500 text-xs">
              {errors.uaddress.message}
            </span>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="w-1/2 py-2 bg-[#b6e82e] text-black rounded font-bold hover:bg-[#d0ff40] transition"
          >
            Change Password
          </button>
          <input
            id="pmsubmit"
            type="submit"
            value="Save Changes"
            className="w-1/2 py-2 bg-[#b6e82e] text-black rounded font-bold hover:bg-[#d0ff40] cursor-pointer transition"
          />
        </div>
        {/* Uncomment this when your modal is ready */}
        {/* {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />} */}
      </form>
    </div>
  );
};

export default ProfileForm;
