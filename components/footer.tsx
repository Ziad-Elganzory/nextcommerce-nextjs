import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-[#1B004D] to-[#2E0A6F] text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    <span className="text-2xl font-bold">NextCommerce</span>
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    Providing the best products and services to our customers.
                </p>
            </div>
            <div className="border-t border-[#3B1A7A]">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <Link href="/">NextCommerce</Link> ©2026. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
