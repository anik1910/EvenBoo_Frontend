import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#14171c] text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-10 gap-12">
        {/* Left Section */}
        <div className="flex flex-col items-start gap-4">
          <span className="text-[#b6e82e] text-lg font-semibold">
            Follow Us
          </span>
          <div className="flex gap-6">
            {["facebook", "github", "youtube", "instagram"].map((network) => (
              <a
                key={network}
                href={`https://www.${network}.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={network.charAt(0).toUpperCase() + network.slice(1)}
                className="bg-white text-black p-3 rounded-full hover:bg-[#b6e82e] hover:text-white transition flex items-center justify-center"
              >
                <i className={`fab fa-${network}`}></i>
              </a>
            ))}
          </div>
          <div className="text-[#a0d10a] text-2xl font-bold">EvenBoo</div>
        </div>

        {/* Right Section */}
        <div className="mt-14">
          <nav className="flex gap-10 mb-4 text-lg font-medium">
            <Link href="/" className="hover:text-[#b6e82e] transition">
              Home
            </Link>
            <Link
              href="#cart-scroll"
              className="hover:text-[#b6e82e] transition"
            >
              Event
            </Link>
            <Link href="/refund" className="hover:text-[#b6e82e] transition">
              Refund
            </Link>
            <Link href="#news-blog" className="hover:text-[#b6e82e] transition">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-[#b6e82e] transition">
              Contact Us
            </Link>
          </nav>
          <div className="text-white text-sm">
            © 2025 evenboo. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
