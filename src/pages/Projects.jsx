import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { projectsData } from '../data/projectsData';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const Projects = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered Entrance
            gsap.from(cardsRef.current, {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (e, index) => {
        const card = cardsRef.current[index];
        gsap.to(card, {
            scale: 1.05,
            borderColor: 'var(--orange)',
            boxShadow: '0 10px 30px -10px rgba(255, 106, 0, 0.3)',
            duration: 0.3
        });
        // Overlay animation
        gsap.to(card.querySelector('.overlay'), {
            opacity: 1,
            y: 0,
            duration: 0.3
        });
    };

    const handleMouseLeave = (e, index) => {
        const card = cardsRef.current[index];
        gsap.to(card, {
            scale: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: 'none',
            duration: 0.3
        });
        gsap.to(card.querySelector('.overlay'), {
            opacity: 0,
            y: 20,
            duration: 0.3
        });
    };

    // 3D Tilt Effect on Move
    const handleMouseMove = (e, index) => {
        const card = cardsRef.current[index];
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.1,
            ease: "none"
        });
    };

    const resetTilt = (index) => {
        const card = cardsRef.current[index];
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    }

    return (
        <div ref={containerRef} className="container mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                    Featured <span className="text-orange">Projects</span>
                </h1>
                <p className="text-text-primary opacity-70 max-w-2xl">
                    A selection of my work in Web Development, AI, and IoT.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project, index) => (
                    <div
                        key={project.id}
                        ref={el => cardsRef.current[index] = el}
                        className="group relative bg-bg-primary rounded-xl overflow-hidden border border-white/10 h-80 cursor-pointer"
                        onMouseEnter={(e) => handleMouseEnter(e, index)}
                        onMouseLeave={(e) => { handleMouseLeave(e, index); resetTilt(index); }}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                    >
                        {/* Image */}
                        <div className="h-full w-full bg-gray-900">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Overlay */}
                        <div className="overlay absolute inset-0 bg-black/80 flex flex-col justify-center items-center p-6 opacity-0 translate-y-4 transition-all duration-300 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-orange mb-2 text-center">{project.title}</h3>
                            <p className="text-sm text-gray-300 mb-4 text-center">{project.description}</p>

                            <div className="flex flex-wrap gap-2 justify-center mb-6">
                                {project.tech.map(t => (
                                    <span key={t} className="text-xs px-2 py-1 border border-green text-green rounded-full">{t}</span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button className="p-3 bg-orange text-white rounded-full hover:bg-white hover:text-orange transition-colors">
                                    <FiExternalLink />
                                </button>
                                <button className="p-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition-colors">
                                    <FiGithub />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
