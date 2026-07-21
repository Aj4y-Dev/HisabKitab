import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/home/navbar";

export const metadata: Metadata = {
  title: "hisabKitab: Business Management for Nepali SMEs",
  description: "Manage inventory, sales, khata, and staff all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-charcoal antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
