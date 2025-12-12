"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/frontend/wishlist', label: 'Your Wishlist' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-[#364c84] p-4 text-[#fffdf5]">
            <div className="flex items-center justify-between ml-8 mr-8">
                <div>
                    <h1 className="text-base font-semibold">
                        <Link href="/" className="text-[#fffdf5]">WishShelf</Link>
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-base font-semibold pb-1 transition-colors ${
                                    isActive ? 'text-[#fffdf5]' : 'text-gray-300 hover:text-[#fffdf5]'
                                }`}
                            >
                                {link.label}
                                <span
                                    className={`absolute left-0 bottom-0 h-[2px] w-full origin-left transition-transform duration-200 ${
                                        isActive ? 'scale-x-100 bg-[#fffdf5]' : 'scale-x-0 bg-[#fffdf5]'
                                    }`}
                                />
                            </Link>
                        );
                    })}
                </div>
                <div>
                    <h1 className="text-base font-semibold">Hi, Virgillia Yeala!</h1>
                </div>
            </div>
        </nav>
    );
}