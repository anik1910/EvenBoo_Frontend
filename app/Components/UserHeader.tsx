"use client";

import Link from "next/link";

interface HeaderProps {
  fname: string;
}

export default function UserHeader({ fname }: HeaderProps) {
  return (
    <header className="border-b border-[#b6e82e14]  bg-[#14171c]">
      <nav className="container mx-auto flex items-center justify-between px-24 py-5">
        <div className="nav-logo text-[28px] font-bold text-[#b6e82e]">
          <Link href="/landing_page.html">EvenBoo</Link>
        </div>
        <div className="flex items-center gap-8">
          <div className="user-info flex items-center gap-2 text-white font-medium">
            <span>Welcome</span>
            <Link
              href="/Profile"
              className="text-[#b6e82e] font-semibold hover:underline"
            >
              {fname}
            </Link>
          </div>
          <div className="nav-icon flex gap-6 text-white text-xl">
            <Link href="#">
              <i className="fas fa-bell hover:text-[#b6e82e] cursor-pointer"></i>
            </Link>
            <Link href="#">
              <i className="fas fa-gear hover:text-[#b6e82e] cursor-pointer"></i>
            </Link>
            <Link href="/logout.php">
              <i className="fas fa-right-from-bracket hover:text-[#b6e82e] cursor-pointer"></i>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
