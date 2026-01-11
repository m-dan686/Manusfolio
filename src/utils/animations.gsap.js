import gsap from "gsap";

/* =========================================
   FLOAT SYNC (CSS + GSAP)
========================================= */
gsap.utils.toArray(".animate-float").forEach(el => {
    gsap.to(el, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

/* =========================================
   GRADIENT TEXT SWEEP
========================================= */
gsap.from(".text-gradient-orange, .text-gradient-green", {
    backgroundPositionX: "200%",
    duration: 1.5,
    ease: "power3.out"
});

/* =========================================
   STAGGER REVEAL
========================================= */
gsap.from(".animate-fade-up", {
    opacity: 0,
    y: 40,
    stagger: 0.12,
    duration: 0.8,
    ease: "power2.out"
});

/* =========================================
   MAGNETIC BUTTON EFFECT
========================================= */
document.querySelectorAll(".magnetic").forEach(el => {
    el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;

        gsap.to(el, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.4 });
    });
});
