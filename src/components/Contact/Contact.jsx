import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./contact.css";

export default function Contact() {
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const cursorRef = useRef(null);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        // Wrapped in context for React Strict Mode safety
        let ctx = gsap.context(() => {
            gsap.from([leftRef.current, rightRef.current], {
                opacity: 0,
                y: 40,
                duration: 0.9,
                stagger: 0.2,
                ease: "power2.out",
            });
        });

        // Cursor glow
        const move = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX - 40,
                y: e.clientY - 40,
                duration: 0.3,
                ease: "power2.out",
            });
        };
        window.addEventListener("mousemove", move);

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", move);
            ctx.revert();
        };
    }, []);

    return (
        <section className="contact-section">
            <div className="contact-wrapper">
                {/* LEFT */}
                <div ref={leftRef} className="contact-left">
                    <h2>
                        Let’s <span className="orange">Collaborate</span>
                    </h2>

                    <h3>
                        Get In <span className="green">Touch</span>
                    </h3>

                    <p className="subtitle">
                        Let’s build something impactful together.
                    </p>

                    <div className="info">
                        <div className="info-item">
                            <span className="icon">📞</span>
                            <div>
                                <small>PHONE: </small>
                                <a href="tel:9342770249" className="contact-link">9342770249</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="icon">✉️</span>
                            <div>
                                <small>EMAIL: </small>
                                <a href="mailto:43manuanandan12a@gmail.com" className="contact-link">43manuanandan12a@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div ref={rightRef} className="contact-right">
                    {!sent ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setSent(true);
                            }}
                        >
                            <input placeholder="Your Name" required />
                            <input type="email" placeholder="Email Address" required />
                            <textarea
                                rows={6}
                                className="min-h-[180px] resize-none"
                                placeholder="How can I help you?"
                                required
                            />
                            <button type="submit">Send Message</button>
                        </form>
                    ) : (
                        <div className="success">
                            <div className="check">✓</div>
                            <p>Message Sent Successfully</p>
                        </div>
                    )}
                </div>
            </div>

            {/* CURSOR GLOW */}
            <div ref={cursorRef} className="cursor-glow" />
        </section>
    );
}
