"use client";

import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noHeaderFooterPaths = ["/dashboard", "/profile"];
  const showHeaderFooter = !noHeaderFooterPaths.some((path) =>
    pathname?.toLowerCase().startsWith(path)
  );

  useEffect(() => {
    const beamsClient = new PusherPushNotifications.Client({
      instanceId: "caf13007-67c2-4abd-b54a-6e91430a4c98",
    });

    beamsClient
      .start()
      .then(() => beamsClient.addDeviceInterest("hello"))
      .catch((error) => console.error("Beams initialization failed:", error));
  }, []);

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
