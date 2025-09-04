import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#14171c] border-b border-[#b6e82e14]">
      <nav className="container mx-auto flex items-center justify-between px-24 py-5">
        <div className="nav-logo">
          <Link
            href="/"
            className="text-[#b6e82e] text-3xl font-bold no-underline"
          >
            EvenBoo
          </Link>
        </div>
        <ul className="flex gap-10 text-white font-medium">
          <li>
            <Link href="/" className="hover:text-[#b6e82e] transition">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#cart-scroll"
              className="hover:text-[#b6e82e] transition"
            >
              Event
            </Link>
          </li>
          <li>
            <Link href="/refund" className="hover:text-[#b6e82e] transition">
              Refund
            </Link>
          </li>
          <li>
            <Link href="#news-blog" className="hover:text-[#b6e82e] transition">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/ContactUs" className="hover:text-[#b6e82e] transition">
              Contact us
            </Link>
          </li>
        </ul>
        <div className="nav-btn">
          <Link href="/login">
            <button className="btn-get-started bg-[#b6e82e] text-black px-6 py-2 rounded-lg font-semibold hover:bg-white transition">
              Get Started
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
