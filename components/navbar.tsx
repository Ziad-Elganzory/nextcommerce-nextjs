"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CartDialog from "@/components/cartDialog";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartCount = 3;
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        router.push("/login");
    };

    return (
        <div className="text-sm text-white w-full">
            <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
                <p>
                    Exclusive Price Drop! Hurry,{" "}
                    <span className="underline underline-offset-2">Offer Ends Soon!</span>
                </p>
            </div>

            <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow">
                <Link href="/">
                    <span className="text-2xl font-bold">NextCommerce</span>
                </Link>

                <ul className="hidden md:flex items-center space-x-8 md:pl-28">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about-us">About Us</Link></li>
                </ul>

                <div className="hidden md:flex items-center gap-4 ml-20">
                    <button
                        type="button"
                        onClick={() => setIsCartOpen(true)}
                        aria-label={`Cart with ${cartCount} items`}
                        className="relative inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 hover:bg-gray-50 transition-all active:scale-95"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386a1.5 1.5 0 0 1 1.45 1.118L5.91 7.5m0 0h12.84a1.5 1.5 0 0 1 1.45 1.882l-1.2 4.5a1.5 1.5 0 0 1-1.45 1.118H8.13a1.5 1.5 0 0 1-1.45-1.118L5.91 7.5Zm0 0L4.5 4.5M9 19.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-indigo-600 text-white text-[11px] font-semibold flex items-center justify-center leading-none">
                            {cartCount}
                        </span>
                    </button>

                    {isAuthenticated ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all"
                        >
                            Logout
                        </button>
                    ) : (
                        <button className="bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all">
                            <Link href={"/login"}>Login</Link>
                        </button>
                    )}
                </div>

                <button
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="inline-block md:hidden active:scale-90 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                        <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
                    </svg>
                </button>

                <div
                    id="mobile-menu"
                    className={`absolute top-[70px] left-0 w-full bg-white shadow-sm p-6 md:hidden ${isMenuOpen ? "block" : "hidden"}`}
                >
                    <ul className="flex flex-col space-y-4 text-lg">
                        <li><Link href="/" className="text-sm">Home</Link></li>
                        <li><Link href="/about-us" className="text-sm">About Us</Link></li>
                        <li>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCartOpen(true);
                                    setIsMenuOpen(false);
                                }}
                                className="text-sm inline-flex items-center gap-2"
                            >
                                Cart
                                <span className="min-w-5 h-5 px-1 rounded-full bg-indigo-600 text-white text-[11px] font-semibold flex items-center justify-center leading-none">
                                    {cartCount}
                                </span>
                            </button>
                        </li>
                    </ul>

                    {isAuthenticated ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="bg-white text-gray-700 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
                        >
                            Logout
                        </button>
                    ) : (
                        <button type="button" className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full">
                            <Link href={"/login"}>Login</Link>
                        </button>
                    )}
                </div>
            </nav>
            <CartDialog isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
}