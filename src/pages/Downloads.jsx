import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiUnlock, FiDownload, FiFileText } from 'react-icons/fi';
import gsap from 'gsap';

const downloadableFiles = [
    { name: 'resume.pdf', path: '/files/resume.pdf', label: 'My Resume' },
    { name: '10th-marksheet.pdf', path: '/files/academics/school/10th-marksheet.pdf', label: '10th Marksheet' },
    { name: '11th-marksheet.pdf', path: '/files/academics/school/11th-marksheet.pdf', label: '11th Marksheet' },
    { name: '12th-marksheet.pdf', path: '/files/academics/school/12th-marksheet.pdf', label: '12th Marksheet' },
    { name: 'sem1-marksheet.pdf', path: '/files/academics/college/sem1-marksheet.pdf', label: 'Sem 1 Marksheet' },
    { name: 'sem2-marksheet.pdf', path: '/files/academics/college/sem2-marksheet.pdf', label: 'Sem 2 Marksheet' },
];

const Downloads = () => {
    const [unlockedFiles, setUnlockedFiles] = useState([]);
    const [passwordInput, setPasswordInput] = useState({});
    const [shakeState, setShakeState] = useState({});

    const handleUnlock = (file) => {
        const entered = passwordInput[file.name] || '';
        const expected = `${file.name}@manu`; // Simple frontend check logic

        if (entered === expected) {
            setUnlockedFiles(prev => [...prev, file.name]);
        } else {
            // Trigger Shake Animation
            setShakeState(prev => ({ ...prev, [file.name]: true }));
            setTimeout(() => {
                setShakeState(prev => ({ ...prev, [file.name]: false }));
            }, 500);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                    Secure <span className="text-orange">Vault</span>
                </h1>
                <p className="text-text-primary opacity-60 max-w-lg mx-auto mb-8">
                    Access protected documents using the specific credentials provided.
                </p>

                {/* Security Disclaimer */}
                <div className="inline-block bg-orange/10 border border-orange/30 rounded-lg px-4 py-2">
                    <p className="text-xs text-orange font-mono">
                        ⚠️ Demonstration Only: Password protection is UI-level and not cryptographically secure.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {downloadableFiles.map((file) => {
                    const isUnlocked = unlockedFiles.includes(file.name);
                    const isShaking = shakeState[file.name] || false;

                    return (
                        <motion.div
                            key={file.name}
                            className={`bg-white/5 border ${isUnlocked ? 'border-green' : 'border-white/10'} rounded-2xl p-6 relative overflow-hidden transition-colors duration-300`}
                            animate={{ x: isShaking ? [-10, 10, -10, 10, 0] : 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-4 rounded-full ${isUnlocked ? 'bg-green/10 text-green' : 'bg-orange/10 text-orange'}`}>
                                    {isUnlocked ? <FiUnlock className="text-2xl" /> : <FiLock className="text-2xl" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-text-primary">{file.label}</h3>
                                    <p className="text-xs text-text-primary opacity-50 font-mono">{file.name}</p>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {isUnlocked ? (
                                    <motion.div
                                        key="unlocked"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <a
                                            href={file.path}
                                            download
                                            className="w-full py-3 bg-green text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                        >
                                            <FiDownload /> Download File
                                        </a>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="locked"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="relative">
                                            <input
                                                type="password"
                                                placeholder="Enter Password"
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-orange transition-colors"
                                                onChange={(e) => setPasswordInput(prev => ({ ...prev, [file.name]: e.target.value }))}
                                                value={passwordInput[file.name] || ''}
                                            />
                                        </div>
                                        <button
                                            onClick={() => handleUnlock(file)}
                                            className="w-full py-3 bg-white/10 text-text-primary border border-white/10 rounded-xl font-bold hover:bg-orange hover:text-white hover:border-orange transition-all"
                                        >
                                            Unlock Vault
                                        </button>
                                        <p className="text-[10px] text-center text-text-primary opacity-30">
                                            Hint: filename@manu
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Downloads;
