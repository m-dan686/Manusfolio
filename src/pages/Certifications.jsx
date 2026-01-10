import React, { useState } from 'react';
import CertificateModal from '../components/modals/CertificateModal';
import { certificatesData } from '../data/certificatesData';
import { FiEye } from 'react-icons/fi';

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificatesData.map((cert) => (
                    <div
                        key={cert.id}
                        className="group relative cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-bg-primary aspect-video"
                        onClick={() => setSelectedCert(cert)}
                    >
                        {/* Image */}
                        <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <FiEye className="text-4xl text-orange mb-2 mx-auto" />
                                <p className="text-white font-bold text-center px-4">{cert.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <CertificateModal
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
                image={selectedCert?.image}
                title={selectedCert?.title}
            />
        </div>
    );
};

export default Certifications;
