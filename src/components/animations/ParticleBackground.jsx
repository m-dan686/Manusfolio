import React from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
    // Simple particle system using Framer Motion
    // In a real heavy app, we might use react-tsparticles, but user asked for Framer Motion background.
    // We will generate a few random circles that float around.

    const particles = Array.from({ length: 20 });

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-orange opacity-10 dark:opacity-20"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: [1, 1.5, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: Math.random() * 20 + 10,
                        height: Math.random() * 20 + 10,
                    }}
                />
            ))}

            {/* Green Particles for contrast */}
            {particles.map((_, i) => (
                <motion.div
                    key={`g-${i}`}
                    className="absolute rounded-full bg-green opacity-10 dark:opacity-20"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                    }}
                    transition={{
                        duration: Math.random() * 25 + 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: Math.random() * 15 + 5,
                        height: Math.random() * 15 + 5,
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleBackground;
