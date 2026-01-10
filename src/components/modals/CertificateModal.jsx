import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMaximize } from 'react-icons/fi';

const CertificateModal = ({ isOpen, onClose, image, title }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 md:top-0 md:-right-12 p-2 bg-white/10 rounded-full text-white hover:bg-orange hover:text-white transition-colors"
                        >
                            <FiX className="text-2xl" />
                        </button>

                        {/* Image */}
                        <div className="w-full h-full overflow-hidden rounded-lg shadow-2xl border border-white/20">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-contain max-h-[85vh]"
                            />
                        </div>

                        <p className="mt-4 text-text-primary text-lg font-bold">{title}</p>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CertificateModal;
