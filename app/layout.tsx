import type { Metadata } from "next";
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "EvenBoo | Book Your Event",
  description: "Book Your Spot at the Hottest Events Around You",
};

//RootLayout pass layout to all my pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <Header />
        {/* All page of mine is referring as children */}
        {children}
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
