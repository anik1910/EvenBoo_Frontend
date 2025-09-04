import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";

const schema = z.object({
  oldPassword: z.string().min(6, "Old password required"),
  newPassword: z.string().min(8, "New password must be at least 8 chars"),
});

type FormValues = z.infer<typeof schema>;
interface Props {
  onClose: () => void;
}

const ChangePasswordModal: React.FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      // Handle password change (API code here)
      toast.success("Password changed!");
      onClose();
    } catch {
      toast.error("Password change failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#272a2e] p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-[#b6e82e] mb-6 text-center">
          Change Password
        </h2>
        <div className="mb-4">
          <label className="block text-[#b6e82e] mb-1">Old Password</label>
          <input
            type="password"
            className={`w-full p-2 rounded ${
              errors.oldPassword ? "border-red-500" : "border-[#b6e82e]"
            }`}
            {...register("oldPassword")}
          />
          {errors.oldPassword && (
            <span className="text-red-500">{errors.oldPassword.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-[#b6e82e] mb-1">New Password</label>
          <input
            type="password"
            className={`w-full p-2 rounded ${
              errors.newPassword ? "border-red-500" : "border-[#b6e82e]"
            }`}
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <span className="text-red-500">{errors.newPassword.message}</span>
          )}
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white py-2 px-4 rounded w-1/2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#b6e82e] text-black py-2 px-4 rounded w-1/2 font-bold hover:bg-white"
          >
            Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordModal;
