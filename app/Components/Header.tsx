import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="nav-container">
          <div className="nav-logo">
            <Link href="/">EvenBoo</Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="#cart-scroll">Event</Link>
            </li>
            <li>
              <Link href="/refund">Refund</Link>
            </li>
            <li>
              <Link href="#news-blog">Blog</Link>
            </li>
            <li>
              <Link href="/ContactUs">Contact us</Link>
            </li>
          </ul>
          <div className="nav-btn">
            <Link href="/login">
              <button className="btn-get-started">Get Started</button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
