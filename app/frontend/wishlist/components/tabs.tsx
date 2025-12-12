"use client";

import { useState, useEffect } from "react";
import CardList, { WishlistCard } from "./cardList";
import { useWishlist } from "@/app/context/WishlistContext";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  const { wishlist } = useWishlist();

  // Filter wishlist by type
  const moviesData = wishlist.filter((item) => item.type === "movie");
  const booksData = wishlist.filter((item) => item.type === "book");

  return (
    <div className="mt-10">
      <div className="flex gap-4 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("tab1")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "tab1"
              ? "border-b-2 border-[#ff8000] text-black"
              : "text-gray-600"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setActiveTab("tab2")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "tab2"
              ? "border-b-2 border-[#ff8000] text-black"
              : "text-gray-600"
          }`}
        >
          Books
        </button>
      </div>

      {activeTab === "tab1" && (
        <div className="mt-4 p-4">
          <CardList items={moviesData} emptyText="No movies found" cardType="movie" />
        </div>
      )}

      {activeTab === "tab2" && (
        <div className="mt-4 p-4">
          <CardList items={booksData} emptyText="No books found" cardType="book" />
        </div>
      )}
    </div>
  );
}