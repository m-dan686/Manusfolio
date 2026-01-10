import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import ParticleBackground from '../components/animations/ParticleBackground';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(MotionPathPlugin);

const Home = () => {
    const containerRef = useRef(null);
    const nameRef = useRef(null);
    const orbitalRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Split Text Entrance for "Manu Anandan"
            const chars = nameRef.current.innerText.split('');
            nameRef.current.innerHTML = chars.map(char => `<span class="inline-block opacity-0 translate-y-10 class-char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');

            tl.to(".class-char", {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.8,
                ease: "back.out(1.7)"
            });

            // 2. Subtext Fade In
            tl.from(".hero-subtext", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.2
            }, "-=0.4");

            // 3. CTA Buttons Magnetic Entrance
            tl.from(".hero-cta", {
                scale: 0.8,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "back.out(1.5)"
            }, "-=0.4");

            // 4. Orbiting Stats Animation
            // Creating a circular path for orbit
            gsap.to(".orbiting-stat", {
                motionPath: {
                    path: [
                        { x: 100, y: 0 },
                        { x: 0, y: 100 },
                        { x: -100, y: 0 },
                        { x: 0, y: -100 },
                        { x: 100, y: 0 }
                    ],
                    curviness: 1.5,
                    autoRotate: false
                },
                duration: 10,
                repeat: -1,
                ease: "linear"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMagneticHover = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.3;
        const y = (clientY - (top + height / 2)) * 0.3;

        gsap.to(currentTarget, { x, y, duration: 0.2 });
    };

    const handleMagneticLeave = (e) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.2 });
    };

    return (
        <div ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
            <ParticleBackground />

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">

                {/* Left: Text Content */}
                <div className="text-left space-y-6 md:pl-8">
                    <p className="hero-subtext text-green text-xl font-medium tracking-wide">Hello, I'm</p>

                    <h1 ref={nameRef} className="text-6xl md:text-8xl font-bold text-text-primary tracking-tight leading-none">
                        Manu Anandan
                    </h1>

                    <h2 className="hero-subtext text-2xl md:text-4xl text-text-primary opacity-80 font-light">
                        <span className="text-orange">Frontend</span> Developer
                    </h2>

                    <p className="hero-subtext text-lg text-text-primary opacity-60 max-w-lg leading-relaxed pt-4">
                        Transforming ideas into premium, motion-driven digital experiences.
                        Focused on performance, aesthetics, and user engagement.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-8">
                        <Link
                            to="/projects"
                            onMouseMove={handleMagneticHover}
                            onMouseLeave={handleMagneticLeave}
                            className="hero-cta px-8 py-4 bg-orange text-white rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 group shadow-lg shadow-orange/20"
                        >
                            View Work <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/downloads"
                            onMouseMove={handleMagneticHover}
                            onMouseLeave={handleMagneticLeave}
                            className="hero-cta px-8 py-4 border-2 border-green text-green rounded-full font-bold hover:bg-green hover:text-white transition-all flex items-center gap-2"
                        >
                            Resume <FiDownload />
                        </Link>
                    </div>
                </div>

                {/* Right: Visual System */}
                <div className="relative flex justify-center items-center h-[500px]">
                    {/* Central Rotating Rings */}
                    <div className="absolute w-[300px] h-[300px] border border-orange/20 rounded-full animate-spin-slow"></div>
                    <div className="absolute w-[450px] h-[450px] border border-green/10 rounded-full animate-spin-reverse-slow"></div>
                    <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full opacity-50"></div>

                    {/* Main Visual */}
                    <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-bg-light shadow-2xl z-10 bg-gradient-to-tr from-gray-900 to-black">
                        {/* Fallback pattern or User Image */}
                        <div className="w-full h-full flex items-center justify-center bg-black">
                            <span className="text-6xl">�</span>
                        </div>
                    </div>

                    {/* Orbiting Stats */}
                    <div ref={orbitalRef} className="absolute inset-0 pointer-events-none">
                        <div className="orbiting-stat absolute left-1/2 top-1/2 -ml-8 -mt-8 bg-bg-light border border-orange shadow-lg p-3 rounded-xl flex flex-col items-center w-24 z-20">
                            <span className="text-xl font-bold text-orange">10+</span>
                            <span className="text-[10px] uppercase tracking-wider opacity-70">Projects</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
