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
  onChangePassword: (oldPass: string, newPass: string) => Promise<void>;
}

const ChangePasswordModal: React.FC<Props> = ({
  onClose,
  onChangePassword,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      await onChangePassword(data.oldPassword, data.newPassword);
      toast.success("Password changed!");
      onClose();
    } catch (error) {
      toast.error("Password change failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#272a2e] p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Change Password
        </h2>

        <div className="mb-6">
          <label className="block text-white mb-2">Old Password</label>
          <input
            type="password"
            className={`w-full p-2 rounded border ${
              errors.oldPassword ? "border-red-500" : "border-[#b6e82e]"
            } bg-[#272a2e] text-white`}
            {...register("oldPassword")}
            disabled={isSubmitting}
          />
          {errors.oldPassword && (
            <span className="text-red-500 text-sm">
              {errors.oldPassword.message}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2">New Password</label>
          <input
            type="password"
            className={`w-full p-2 rounded border ${
              errors.newPassword ? "border-red-500" : "border-[#b6e82e]"
            } bg-[#272a2e] text-white`}
            {...register("newPassword")}
            disabled={isSubmitting}
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="bg-gray-400 text-white py-2 px-4 rounded w-1/2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#b6e82e] text-black py-2 px-4 rounded w-1/2 hover:bg-white disabled:opacity-60"
          >
            {isSubmitting ? "Changing..." : "Change"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordModal;
