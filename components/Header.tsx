"use client";

import Link from "next/link";
import { options_menu } from "@/utils/options";
import { useState } from "react";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed z-50 w-full flex justify-center pt-4 px-4">
            <nav className="flex items-center gap-1 px-2 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20">
                <Link
                    href="#"
                    className="px-5 py-2 text-sm font-medium text-primary/80 rounded-full transition-all duration-300 hover:text-accent hover:bg-white/5"
                >
                    Home
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    {options_menu.map((option) => (
                        <Link
                            key={option}
                            href={`#${option}`}
                            className="px-5 py-2 text-sm font-medium text-primary/80 rounded-full transition-all duration-300 hover:text-accent hover:bg-white/5 capitalize"
                        >
                            {option}
                        </Link>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 text-primary/80 hover:text-accent transition-colors"
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {mobileOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <>
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </>
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden absolute top-16 left-4 right-4 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-xl">
                    {options_menu.map((option) => (
                        <Link
                            key={option}
                            href={`#${option}`}
                            onClick={() => setMobileOpen(false)}
                            className="px-4 py-3 text-sm font-medium text-primary/80 rounded-xl transition-all duration-300 hover:text-accent hover:bg-white/5 capitalize"
                        >
                            {option}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
