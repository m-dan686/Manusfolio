import React, { useRef, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import gsap from 'gsap';
import { FiMenu, FiX } from 'react-icons/fi';
import ManufolioLogo from './ManufolioLogo';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollY = useRef(0);
    const navRef = useRef(null);
    const linksRef = useRef([]);

    useEffect(() => {
        // Initial Slide-in
        const tl = gsap.timeline();
        tl.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
        );

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = (e) => {
        gsap.to(e.target, { color: 'var(--green)', duration: 0.3 });
        // Underline effect could be added here
    };

    const handleMouseLeave = (e) => {
        gsap.to(e.target, { color: 'var(--text-primary)', duration: 0.3 });
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'} bg-opacity-90 backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-white/10 shadow-lg`}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <ManufolioLogo />
                    <span className="hidden sm:block text-[var(--text-primary)] font-semibold text-lg">
                        Manufolio
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            ref={el => linksRef.current[index] = el}
                            className={({ isActive }) =>
                                `relative text-[15px] font-medium transition-colors duration-300 ${isActive ? 'text-orange' : 'text-[var(--text-primary)]'}`
                            }
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={(e) => {
                                // Reset color if not active, otherwise keep orange? 
                                // Actually, NavLink isActive handles the active state class.
                                // GSAP override might conflict. 
                                // Better to use CSS hover or more complex GSAP logic.
                                // For now, let's trust CSS for basic hover and GSAP for entrance.
                                gsap.to(e.target, { clearProps: "color" });
                            }}
                        >
                            {link.name}
                            {/* Active Indicator (Glow or Underline) */}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green transition-all duration-300 opacity-0 group-hover:w-full group-hover:opacity-100"></span>
                        </NavLink>
                    ))}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-[var(--text-primary)]">
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[var(--bg-primary)] absolute top-full left-0 w-full border-b border-white/10 shadow-xl py-4 flex flex-col items-center gap-4">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-lg font-medium ${isActive ? 'text-orange' : 'text-[var(--text-primary)]'}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
