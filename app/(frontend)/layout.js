// components/Layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "/app/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalButton from "@/components/GlobalButton";
import AIChatPopup from "@/components/Aibot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      {children}
      <GlobalButton />
      <AIChatPopup />
      <Footer />
    </div>
  );
}
