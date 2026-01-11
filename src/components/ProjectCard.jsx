import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, onClick }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const el = cardRef.current;

        /* SCROLL FADE IN */
        gsap.fromTo(
            el,
            { opacity: 0, y: 80, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                },
            }
        );

        /* FLOATING GLOW MOTION */
        gsap.to(el, {
            y: -8,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2,
        });
    }, []);

    return (
        <div
            ref={cardRef}
            className="project-card relative h-80 rounded-xl overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            {/* IMAGE */}
            <img
                src={project.image}
                alt={project.title}
                className="project-image w-full h-full object-cover"
            />

            {/* GLOW LAYER */}
            <span className="project-glow-ring" />

            {/* OVERLAY */}
            <div className="project-overlay">
                <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <button className="view-project-btn">
                        View Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
