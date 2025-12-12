"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type WishlistItem = {
  id: string | number;
  type: "movie" | "book";
  title: string;
  description: string;
  author: string;
  // Additional fields from original data
  [key: string]: any;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string | number, type: "movie" | "book") => void;
  isInWishlist: (id: string | number, type: "movie" | "book") => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load wishlist:", e);
      }
    }
  }, []);

  // Save to localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      // Check if already exists
      const exists = prev.some((w) => w.id === item.id && w.type === item.type);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string | number, type: "movie" | "book") => {
    setWishlist((prev) => prev.filter((item) => !(item.id === id && item.type === type)));
  };

  const isInWishlist = (id: string | number, type: "movie" | "book") => {
    return wishlist.some((item) => item.id === id && item.type === type);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
