import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. Text Entrance
            gsap.from(".about-header", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1
            });

            // 2. Timeline Line Drawing
            gsap.from(".timeline-line", {
                height: 0,
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top 60%",
                    end: "bottom 80%",
                    scrub: 1
                }
            });

            // 3. Timeline Items Pop-in
            const items = gsap.utils.toArray('.timeline-item');
            items.forEach((item, i) => {
                gsap.from(item, {
                    x: i % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // 4. Skills Stagger
            gsap.from(".skill-bar", {
                width: 0,
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".skills-container",
                    start: "top 80%"
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const timelineData = [
        { year: 'Present', role: 'B.Tech Student', desc: 'Specializing in Computer Science & AI', side: 'left' },
        { year: '2022', role: 'Full Stack Journey', desc: 'Started building React applications', side: 'right' },
        { year: '2020', role: 'Schooling', desc: 'Completed Higher Secondary with CS focus', side: 'left' }
    ];

    return (
        <div ref={containerRef} className="container mx-auto px-6 py-12 min-h-screen">

            {/* Intro */}
            <div className="text-center mb-20 max-w-4xl mx-auto">
                <h1 className="about-header text-5xl font-bold mb-6 text-text-primary">
                    My <span className="text-orange">Journey</span>
                </h1>
                <p className="about-header text-lg opacity-70 leading-relaxed text-text-primary">
                    More than just code, it's about the evolution of problem-solving.
                    Here is how I paved my path in the world of technology.
                </p>
            </div>

            {/* Timeline Section */}
            <div className="timeline-container relative max-w-4xl mx-auto mb-24">
                {/* Central Line */}
                <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange to-green h-full rounded-full opacity-30"></div>

                <div className="space-y-12">
                    {timelineData.map((item, idx) => (
                        <div key={idx} className={`timeline-item flex ${item.side === 'left' ? 'flex-row' : 'flex-row-reverse'} items-center justify-between`}>
                            {/* Content */}
                            <div className={`w-[45%] ${item.side === 'left' ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                <h3 className="text-2xl font-bold text-text-primary">{item.role}</h3>
                                <p className="text-orange font-mono text-sm mb-2">{item.year}</p>
                                <p className="opacity-60 text-sm text-text-primary">{item.desc}</p>
                            </div>

                            {/* Dot */}
                            <div className="z-10 w-4 h-4 bg-bg-light border-4 border-green rounded-full shadow-[0_0_10px_var(--green)]"></div>

                            {/* Spacer */}
                            <div className="w-[45%]"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills & Strengths */}
            <div className="grid md:grid-cols-2 gap-16 skills-container">
                <div>
                    <h2 className="text-3xl font-bold mb-8 text-text-primary">Technical <span className="text-green">Arsenal</span></h2>
                    <div className="space-y-6">
                        {[
                            { n: 'React / Next.js', v: '90%' },
                            { n: 'Node.js / Express', v: '80%' },
                            { n: 'Python / AI', v: '75%' },
                            { n: 'UI / UX Design', v: '85%' }
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="flex justify-between mb-2 text-sm font-bold text-text-primary">
                                    <span>{s.n}</span>
                                    <span>{s.v}</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="skill-bar h-full bg-gradient-to-r from-orange to-green" style={{ width: s.v }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-8 text-text-primary">My <span className="text-orange">Superpowers</span></h2>
                    <div className="grid grid-cols-2 gap-4">
                        {['Creative Thinker', 'Rapid Learner', 'Detail Oriented', 'Team Catalyst'].map((p, i) => (
                            <div key={i} className="group perspective">
                                <div className="relative p-6 bg-white/5 border border-orange/20 rounded-xl hover:bg-orange/10 transition-colors duration-300 text-center">
                                    <span className="font-bold text-text-primary group-hover:text-orange transition-colors">{p}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
