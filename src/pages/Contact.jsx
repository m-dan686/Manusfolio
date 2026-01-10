import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { FiSend, FiCheck, FiLoader } from 'react-icons/fi';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic Validation
        if (!formState.name || !formState.email || !formState.message) {
            gsap.to(formRef.current, { x: 10, duration: 0.1, yoyo: true, repeat: 5 });
            return;
        }

        setStatus('loading');

        // Simulate Network Request
        setTimeout(() => {
            setStatus('success');
            setFormState({ name: '', email: '', message: '' });

            // Reset after success animation
            setTimeout(() => setStatus('idle'), 3000);
        }, 2000);
    };

    return (
        <div className="container mx-auto px-6 py-12 min-h-screen flex flex-col justify-center items-center">

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
                    Let's <span className="text-orange">Collaborate</span>
                </h1>
                <p className="text-text-primary opacity-60">
                    Have an idea? Let's build something amazing together.
                </p>
            </div>

            <div className="w-full max-w-lg bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                {status === 'success' ? (
                    <div className="h-64 flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-green text-white rounded-full flex items-center justify-center text-3xl animate-bounce">
                            <FiCheck />
                        </div>
                        <h3 className="text-2xl font-bold text-text-primary">Message Sent!</h3>
                        <p className="opacity-60 text-text-primary">I'll get back to you shortly.</p>
                    </div>
                ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">

                        {/* Name Input */}
                        <div className="relative group">
                            <input
                                type="text"
                                id="name"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                className="peer w-full bg-transparent border-2 border-orange rounded-xl py-3 px-4 text-text-primary focus:border-green outline-none transition-colors duration-300 placeholder-transparent"
                                placeholder="Name"
                            />
                            <label
                                htmlFor="name"
                                className={`absolute left-4 top-3 text-text-primary transition-all duration-300 pointer-events-none
                  peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-green peer-focus:bg-bg-primary peer-focus:px-2
                  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                  ${formState.name ? '-translate-y-7 scale-90 bg-bg-primary px-2' : ''}
                `}
                            >
                                Your Name
                            </label>
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <input
                                type="email"
                                id="email"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                className="peer w-full bg-transparent border-2 border-orange rounded-xl py-3 px-4 text-text-primary focus:border-green outline-none transition-colors duration-300 placeholder-transparent"
                                placeholder="Email"
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-4 top-3 text-text-primary transition-all duration-300 pointer-events-none
                  peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-green peer-focus:bg-bg-primary peer-focus:px-2
                  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                  ${formState.email ? '-translate-y-7 scale-90 bg-bg-primary px-2' : ''}
                `}
                            >
                                Email Address
                            </label>
                        </div>

                        {/* Message Input */}
                        <div className="relative group">
                            <textarea
                                id="message"
                                rows="4"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="peer w-full bg-transparent border-2 border-orange rounded-xl py-3 px-4 text-text-primary focus:border-green outline-none transition-colors duration-300 placeholder-transparent resize-none"
                                placeholder="Message"
                            ></textarea>
                            <label
                                htmlFor="message"
                                className={`absolute left-4 top-3 text-text-primary transition-all duration-300 pointer-events-none
                  peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-green peer-focus:bg-bg-primary peer-focus:px-2
                  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                  ${formState.message ? '-translate-y-7 scale-90 bg-bg-primary px-2' : ''}
                `}
                            >
                                Your Message
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-4 bg-orange text-white rounded-xl font-bold hover:bg-green transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <>Sending <FiLoader className="animate-spin" /></>
                            ) : (
                                <>Send Message <FiSend /></>
                            )}
                        </button>

                    </form>
                )}
            </div>

        </div>
    );
};

export default Contact;
