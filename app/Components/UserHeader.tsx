"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserHeader() {
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      alert("An error occurred during logout");
    }
  };

  return (
    <header className="border-b border-[#b6e82e14] bg-[#14171c]">
      <nav className="container mx-auto flex items-center justify-between px-24 py-5">
        <div className="nav-logo text-[28px] font-bold text-[#b6e82e]">
          <Link href="/landing_page.html">EvenBoo</Link>
        </div>
        <div className="flex items-center gap-8">
          <div className="nav-icon flex gap-6 text-white text-xl">
            <Link href="#">
              <i className="fas fa-bell hover:text-[#b6e82e] cursor-pointer"></i>
            </Link>
            <Link href="/Profile">
              <i className="fas fa-gear hover:text-[#b6e82e] cursor-pointer"></i>
            </Link>
            <a href="#" onClick={handleLogout}>
              <i className="fas fa-right-from-bracket hover:text-[#b6e82e] cursor-pointer"></i>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
