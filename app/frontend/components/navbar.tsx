"use client";

export default function Navbar() {
    return (
        <nav className="bg-black p-4 text-white">
            <div className="flex items-center justify-between ml-8 mr-8">
                <div>
                    <h1 className="text-base font-semibold">WishShelf</h1>
                </div>
                <div className="flex items-center gap-6">
                    <h1 className="text-base font-semibold">Home</h1>
                    <h1 className="text-base font-semibold">Your Wishlist</h1>
                </div>
                <div>
                    <h1 className="text-base font-semibold">Hi, Virgillia Yeala !</h1>
                </div>
            </div>
        </nav>
    );
}