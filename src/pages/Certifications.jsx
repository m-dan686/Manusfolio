import React, { useState, useEffect } from "react";
import { certificatesData } from "../data/certificatesData";
import CertificateModal from "../components/modals/CertificateModal";
import gsap from "gsap";

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        gsap.fromTo(
            ".cert-card",
            { opacity: 0, y: 60, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
            }
        );

        gsap.to(".cert-orbit", {
            rotate: 360,
            duration: 30,
            repeat: -1,
            ease: "linear",
        });
    }, []);

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                    My <span className="text-orange">Certifications</span>
                </h1>
                <p className="text-text-primary opacity-70">
                    Professional credentials and course completions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {certificatesData.map((cert) => (
                    <div
                        key={cert.id}
                        className="cert-card relative cursor-pointer rounded-2xl overflow-hidden group"
                        onClick={() => setSelectedCert(cert)}
                    >
                        {/* SVG ORBIT */}
                        <svg className="cert-orbit absolute inset-0 w-full h-full pointer-events-none">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="48%"
                                stroke="rgba(255,115,0,0.25)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="6 14"
                            />
                        </svg>

                        {/* IMAGE */}
                        <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-cover aspect-video transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                            <div className="text-center px-4">
                                <p className="text-white font-bold text-lg mb-2">
                                    {cert.title}
                                </p>
                                <span className="text-orange text-sm tracking-widest">
                                    VIEW CERTIFICATE
                                </span>
                            </div>
                        </div>

                        {/* GLOW */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_60px_rgba(255,115,0,0.6)]"></div>
                    </div>
                ))}
            </div>

            <CertificateModal
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
                pdf={selectedCert?.pdf}
                title={selectedCert?.title}
            />
        </div>
    );
};

export default Certifications;
