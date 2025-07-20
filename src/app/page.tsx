'use client';

import { useEffect, useRef } from "react";

export default function JeremyKitchenBook() {
  const resumeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector("section.relative.h-screen");
      const kitchenBook = document.getElementById("kitchen-book");

      if (!hero || !kitchenBook) return;

      const triggerPoint = hero.clientHeight * 0.5;

      if (window.scrollY > triggerPoint) {
        kitchenBook.classList.add("opacity-100", "translate-y-0");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = document.querySelector('.overflow-x-auto.snap-x');
    if (!container) return;

    let scrollInterval: NodeJS.Timeout;
    let scrollPosition = 0;

    const scrollCards = () => {
      const cardWidth = container.scrollWidth / container.childElementCount;
      scrollPosition += cardWidth;

      if (scrollPosition >= container.scrollWidth - container.clientWidth) {
        scrollPosition = 0; // Reset to start
      }

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    };

    scrollInterval = setInterval(scrollCards, 5000); // Scroll every 5 seconds

    return () => clearInterval(scrollInterval);
  }, []);

  useEffect(() => {
    const button = resumeRef.current;
    const hero = document.querySelector("section.relative.h-screen") as HTMLElement | null;
    if (!button || !hero) return;
    const video = document.querySelector("video");
    if (!video) return;

    button.style.position = 'fixed';
    button.style.opacity = '1';
    button.style.display = 'block';
    button.style.zIndex = '9999';
    button.style.transform = 'translate(100px, 100px)';

    let animationFrameId: number;
    let animationStopped = false;

    let animationTimeoutId: NodeJS.Timeout;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const moveRandomly = () => {
      if (animationStopped || !button || !hero) return;

      const heroRect = hero.getBoundingClientRect();
      const maxX = heroRect.width - button.offsetWidth;
      const maxY = heroRect.height - button.offsetHeight;
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;

      button.style.left = `${heroRect.left + x}px`;
      button.style.top = `${heroRect.top + y}px`;

      const buttonCenterX = heroRect.left + x + button.offsetWidth / 2;
      const buttonCenterY = heroRect.top + y + button.offsetHeight / 2;
      const dist = Math.hypot(mouseX - buttonCenterX, mouseY - buttonCenterY);

      const maxDelay = 2000; // max delay = slower
      const minDelay = 300;  // min delay = faster
      const normalizedDist = Math.min(dist / 500, 1);
      const delay = maxDelay - (normalizedDist * (maxDelay - minDelay));

      animationTimeoutId = setTimeout(moveRandomly, delay);
    };

    const pause = () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(animationTimeoutId);
    };
    const resume = () => moveRandomly();
    const stopAnimation = () => {
      animationStopped = true;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(animationTimeoutId);
      button.style.position = 'fixed';
      button.style.top = '80%';
      button.style.left = '50%';
      button.style.transform = 'translate(-50%, -50%)';
    };

    button.addEventListener("mouseenter", pause);
    button.addEventListener("mouseleave", resume);
    video.addEventListener("ended", stopAnimation);

    console.log("Resume animation script running");
    moveRandomly();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(animationTimeoutId);
      document.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", pause);
      button.removeEventListener("mouseleave", resume);
      video.removeEventListener("ended", stopAnimation);
    };
  }, []);

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        <video
          autoPlay
          muted
          playsInline
          onEnded={() => {
            const el = document.getElementById('kitchen-book');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/50.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-black/50 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hi, I'm Jeremy</h1>
          <p className="text-lg md:text-2xl">Chef turned Dev – building things that work and look good doing it.</p>
          <a
            ref={resumeRef}
            href="/JeremyClegg_Resume.pdf"
            download
            className="fixed w-max px-6 py-3 bg-white text-black border border-gray-400 font-bold rounded-lg shadow-lg pointer-events-auto z-[9999] transition-transform duration-500 ease-in-out"
          >
            Download Resume
          </a>
        </div>
      </section>

      <main id="kitchen-book" className="opacity-100 translate-y-0 min-h-screen">
        <div className="max-w-5xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg relative font-serif">

          <div className="overflow-x-auto snap-x snap-mandatory flex space-x-4 scroll-smooth px-6">
            {/* Chef Image Page */}
            <div
              className="min-w-[85%] snap-center relative flex justify-center items-center bg-gray-600 bg-center bg-no-repeat bg-contain rounded-lg shadow-lg"
            >
              <div className="absolute inset-0 bg-black/60 rounded-lg" />
              <img
                src="/chef-jeremy.jpg"
                alt="Chef Jeremy"
                className="relative z-10 w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg"
              />
            </div>

            {/* Origins Page */}
            <div
              className="min-w-[85%] snap-center relative p-8 rounded-lg shadow-md bg-cover bg-center text-white flex flex-col justify-center"
              style={{ backgroundImage: "url('/luca-bravo-XJXWbfSo2f0-unsplash.jpg')" }}
            >
              <div className="absolute inset-0 bg-black/60 rounded-lg" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 drop-shadow-lg">Origins: From Grit to Grits</h3>
                <p className="text-lg leading-relaxed drop-shadow">
                  I was homeless at 14 when a group of chefs took me in. The kitchen wasn’t just a job—it was home.
                  I learned discipline, teamwork, and the sacred art of showing up no matter what. I chopped onions with a purpose and grilled with heart.
                  <br /><br />
                  Cooking saved my life, and that same fire drives everything I build today.
                </p>
              </div>
            </div>

            <div
              className="min-w-[85%] snap-center relative p-8 rounded-lg shadow-md bg-cover bg-center text-white flex flex-col justify-center"
              style={{ backgroundImage: "url('/aitubo.jpg')" }}
            >
              <div className="absolute inset-0 bg-black/60 rounded-lg" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 drop-shadow-lg">From Kitchen to Code</h3>
                <p className="text-lg leading-relaxed drop-shadow">
                  Two decades in scratch kitchens taught me how to think fast, work clean, and solve real problems.
                  Now, I do the same thing with code.
                  <br /><br />
                  As a full-stack developer, I craft digital experiences with the same care I used to plate a dish—clean, balanced, intentional.
                  React, TypeScript, and Node.js are my new knives.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-500 text-sm animate-pulse">
            ← swipe to explore →
          </div>
        </div>
      </main>
      <section id="contact" className="bg-gray-100 dark:bg-gray-800 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Let’s Connect</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Whether you're building something delicious or something digital — let's chat.
          </p>
          <form action="mailto:Jeremytclegg@gmail.com" method="POST" encType="text/plain" className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            ></textarea>
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-400">
            or email me directly at <a href="mailto:Jeremytclegg@gmail.com" className="underline">Jeremytclegg@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
