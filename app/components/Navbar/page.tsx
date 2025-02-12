"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import "@/app/styles/Navbar.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Create refs for the navbar and mobile menu with proper typing
    const navbarRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close the mobile menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                navbarRef.current &&
                !navbarRef.current.contains(event.target as Node) &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false); // Close the menu
            }
        };

        // Attach the event listener when the menu is open
        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        // Clean up the event listener when the component is unmounted or the menu is closed
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]); // Re-run the effect when `isOpen` changes

    return (
        <nav className="navbar" ref={navbarRef}>
            <div className="navbar-container">
                <Link href="/" className="navbar-logo font-bold">AloEan</Link>

                {/* Desktop Navigation (Right-Aligned) */}
                <div className="navbar-links font-bold lg:flex">
                    <Link href="/mayibeyours">MIBY?</Link>
                    <Link href="/valentines">VALENTINE&apos;S</Link>
                </div>

                {/* Mobile Menu Button (Right-Aligned) */}
                <button onClick={() => setIsOpen(!isOpen)} className="menu-icon font-bold lg:hidden">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu font-bold lg:hidden" ref={menuRef}>
                    <Link href="/mayibeyours" onClick={() => setIsOpen(false)}>MIBY?</Link>
                    <Link href="/valentines" onClick={() => setIsOpen(false)}>VALENTINE&apos;S</Link>
                </div>
            )}
        </nav>
    );
}