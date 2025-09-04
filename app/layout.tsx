"use client";

import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noHeaderFooterPaths = ["/Dashboard"];
  const showHeaderFooter = !noHeaderFooterPaths.includes(pathname);

  return (
    <html lang="en">
      <head>
        {/* Load Font Awesome CSS globally */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {showHeaderFooter && <Header />}
        {children}
        {showHeaderFooter && <Footer />}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
