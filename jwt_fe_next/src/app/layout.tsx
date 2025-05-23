import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "./_components/Navbar";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auth next app",
  description: "Auth next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
