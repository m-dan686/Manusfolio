import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ================= JOURNEY (UNCHANGED) ================= */

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
      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
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

      /* ================= TECH ARSENAL (UNCHANGED) ================= */

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

      /* ================= NEW SECTIONS ================= */

      // Vision (Keep Vision separate as it wasn't in the update list, but decouple custom goal animation)
      gsap.from(".vision-card", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".vision-section",
          start: "top 85%"
        }
      });

      /* ================= ENHANCED ANIMATIONS ================= */

      /* FUN FACTS – Flip + Float */
      gsap.from(".fun-fact-card", {
        rotateX: -80,
        opacity: 0,
        y: 40,
        transformOrigin: "top center",
        stagger: 0.12,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".fun-facts-section",
          start: "top 85%",
        },
      });

      // subtle floating loop
      gsap.utils.toArray(".fun-fact-card").forEach((card, i) => {
        gsap.to(card, {
          y: -6,
          duration: 2 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* ACHIEVEMENTS – Scale + Focus */
      gsap.from(".achievement-card", {
        scale: 0.85,
        opacity: 0,
        filter: "blur(6px)",
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".achievements-section",
          start: "top 85%",
        },
      });

      /* FUTURE GOALS – Forward Motion */
      gsap.from(".goal-card", {
        x: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vision-section:last-of-type",
          start: "top 85%",
        },
      });

      // Hover lift (cards only) - ENHANCED
      gsap.utils.toArray(".hover-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            boxShadow: "0 15px 40px rgba(0,255,150,0.25)",
            duration: 0.25,
            ease: "power2.out"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const timelineData = [
    { year: 'Present', role: 'B.Tech Student', desc: 'Sri Krishna College Of Technology', side: 'left' },
    { year: '2022 - 2024', role: 'HSC Student', desc: 'Carmel Garden Matriculation Higher Secondary School', side: 'right' },
    { year: '2010 - 2022', role: 'Schooling', desc: 'Carmel Garden Matriculation Higher Secondary School', side: 'left' }
  ];

  const skills = [
    { n: 'React / Next.js', v: '90%' },
    { n: 'Node.js / Express', v: '80%' },
    { n: 'Python / AI & ML', v: '75%' },
    { n: 'UI / UX Design', v: '85%' },
    { n: 'Spring Boot (JWT, RBAC)', v: '85%' },
    { n: 'Three.js & GSAP', v: '80%' },
    { n: 'Tailwind CSS', v: '90%' },
    { n: 'Databases (MySQL, MongoDB)', v: '80%' }
  ];

  return (
    <div ref={containerRef} className="container mx-auto px-6 py-12 min-h-screen">

      {/* JOURNEY */}
      <div className="text-center mb-20 max-w-4xl mx-auto">
        <h1 className="about-header text-5xl font-bold mb-6 text-text-primary">
          My <span className="text-orange">Journey</span>
        </h1>
        <p className="about-header text-lg opacity-70 leading-relaxed text-text-primary">
          More than just code, it's about the evolution of problem-solving.
          Here is how I paved my path in the world of technology.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="timeline-container relative max-w-4xl mx-auto mb-24">
        <div className="timeline-line absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-orange to-green h-full rounded-full opacity-30" />
        <div className="space-y-12">
          {timelineData.map((item, idx) => (
            <div
              key={idx}
              className={`timeline-item flex ${item.side === 'left' ? 'flex-row' : 'flex-row-reverse'} items-center justify-between`}
            >
              <div className={`w-[45%] ${item.side === 'left' ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <h3 className="text-2xl font-bold text-text-primary">{item.role}</h3>
                <p className="text-orange font-mono text-sm mb-2">{item.year}</p>
                <p className="opacity-60 text-sm text-text-primary">{item.desc}</p>
              </div>
              <div className="z-10 w-4 h-4 bg-bg-light border-4 border-green rounded-full shadow-[0_0_10px_var(--green)]" />
              <div className="w-[45%]" />
            </div>
          ))}
        </div>
      </div>

      {/* SKILLS & SUPERPOWERS */}
      <div className="grid md:grid-cols-2 gap-16 skills-container mb-24">

        {/* TECH ARSENAL */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-text-primary">
            Technical <span className="text-green">Arsenal</span>
          </h2>

          <div className="space-y-6">
            {skills.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2 text-sm font-bold text-text-primary">
                  <span>{s.n}</span>
                  <span>{s.v}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="skill-bar h-full bg-gradient-to-r from-orange to-green"
                    style={{ width: s.v }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUPERPOWERS */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-text-primary">
            My <span className="text-orange">Superpowers</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              'Creative Thinker',
              'Rapid Learner',
              'Detail Oriented',
              'Team Catalyst'
            ].map((p, i) => (
              <div key={i} className="hover-card p-6 bg-white/5 border border-orange/20 rounded-xl text-center">
                <span className="font-bold text-text-primary">{p}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FUN FACTS */}
      <div className="fun-facts-section max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl font-bold mb-8 text-text-primary">
          Fun <span className="text-orange">Facts</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Favorite Tech Stack: React + Spring Boot",
            "Favorite GSAP Plugin: ScrollTrigger",
            "Debugging Snack: Coffee ☕",
            "Motto: Clarity is power",
            "Passion: Animated UI design",
            "Hobby: Mentoring peers"
          ].map((fact, i) => (
            <div key={i} className="fun-fact-card hover-card p-5 bg-white/5 rounded-lg text-center">
              {fact}
            </div>
          ))}
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <div className="achievements-section max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl font-bold mb-8 text-text-primary">
          Key <span className="text-green">Achievements</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Class Representative & Peer Leader",
            "Department Third Rank",
            "Built Digital Warranty Tracker",
            "Animated Portfolio Websites",
            "Resolved Deployment Issues",
            "Organized Mandatory Course Registrations"
          ].map((a, i) => (
            <div key={i} className="achievement-card hover-card p-6 bg-white/5 rounded-xl">
              {a}
            </div>
          ))}
        </div>
      </div>

      {/* VISION */}
      <div className="vision-section max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl font-bold mb-8 text-text-primary">
          My <span className="text-green">Vision</span>
        </h2>
        <div className="vision-card p-6 bg-white/5 rounded-xl text-text-primary opacity-80">
          I aspire to become a full-stack innovator who blends secure backend systems with delightful,
          animated frontends, while mentoring peers and building technology that balances security,
          usability, and creativity.
        </div>
      </div>

      {/* FUTURE GOALS */}
      <div className="vision-section max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-text-primary">
          Future <span className="text-orange">Goals</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Master scalable backend architectures and cloud-native systems",
            "Build production-grade animated frontends with React, GSAP & Three.js",
            "Contribute to impactful open-source projects",
            "Mentor juniors and grow into a technical leader"
          ].map((goal, i) => (
            <div key={i} className="goal-card hover-card p-6 bg-white/5 rounded-xl">
              {goal}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;
