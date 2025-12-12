import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./frontend/components/navbar";
import { WishlistProvider } from "./context/WishlistContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WishShelf",
  description: "Create and manage your personal wishlist for movies and books all in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <WishlistProvider>
          <div className="sticky top-0 z-50">
        <Navbar />
          </div>
          {children}
        </WishlistProvider>
      </body>
    </html>
  );
}
