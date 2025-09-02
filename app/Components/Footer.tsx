import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <span>Follow Us</span>

          <div className="social-icon">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          <div className="footer-brand-title">
            <p>EvenBoo</p>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-nav-items">
            <Link href="/">Home</Link>
            <Link href="#cart-scroll">Event</Link>
            <Link href="/refund">Refund</Link>
            <Link href="#news-blog">Blog</Link>
            <Link href="/contact">Contact Us</Link>
          </div>

          <div className="footer-copyright">
            <p>© 2025 evenboo. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
