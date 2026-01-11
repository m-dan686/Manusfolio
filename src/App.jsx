import React from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import AppRoutes from './router';
import ScrollToTop from './components/utils/ScrollToTop';
import CursorFollower from './components/animations/CursorFollower';
import PageLoader from './components/animations/PageLoader';
import './utils/animations.gsap';

function App() {
    return (
        <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary transition-colors duration-300 overflow-x-hidden cursor-none md:cursor-auto">
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
