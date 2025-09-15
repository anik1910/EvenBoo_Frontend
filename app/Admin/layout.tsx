"use client";
import { ReactNode } from "react";
import AdminHeader from "./component/AdminHeader";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <AdminHeader />
      {children}
    </div>
  );
}
