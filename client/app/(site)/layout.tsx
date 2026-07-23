import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/fotter";

export const metadata: Metadata = {
  title: "HisabKitab",
  description: "Business Management System",
};

const geist = Geist({ subsets: ["latin"] });

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geist.className} flex min-h-screen flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
