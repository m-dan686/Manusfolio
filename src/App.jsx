import React from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import AppRoutes from './router';
import gsap from 'gsap';
import ScrollToTop from './components/utils/ScrollToTop';
import CursorFollower from './components/animations/CursorFollower';
import PageLoader from './components/animations/PageLoader';
import './utils/animations.gsap';

function App() {
    // Cursor Glow Init
    React.useEffect(() => {
        const glow = document.createElement("div");
        glow.className = "cursor-glow";
        document.body.appendChild(glow);

        const moveGlow = (e) => {
            gsap.to(glow, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.25,
                ease: "power3.out",
            });
        };

        window.addEventListener("mousemove", moveGlow);

        return () => {
            window.removeEventListener("mousemove", moveGlow);
            glow.remove();
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 overflow-x-hidden cursor-none md:cursor-auto">
            <PageLoader />
            <CursorFollower />
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow pt-24 min-h-screen">
                <AppRoutes />
            </main>
            <Footer />
        </div>
    );
}

export default App;
