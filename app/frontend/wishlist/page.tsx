"use client";

import { useState } from "react";
import { useWishlist } from "@/app/context/WishlistContext";
import Tabs from "../wishlist/components/tabs";

export default function WishlistPage() {
    return (
        <div className="ml-30 mr-30">
            <div className="flex items-center justify-between mt-10 mb-10">
                <h1 className="text-2xl font-bold text-[#364c84]">Virgillia Yeala's Wishlist</h1>
            </div>
            <Tabs />
        </div>
    );
}
