import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Phone, Menu } from 'lucide-react';

export default function Navbar() {
  const navRef = useRef(null);

  // Scroll & mouse parallax for subtle movement
  const { scrollYProgress } = useScroll({
    target: navRef,
    offset: ['start end', 'end start']
  });
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  useEffect(() => {
    const handleMouse = e => {
      const rect = navRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - (rect.left + rect.width/2)) / 40);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [x]);

  return (
    <motion.nav
      ref={navRef}
      style={{ y }}
      className="fixed top-0 inset-x-0 z-30 bg-transparent backdrop-blur-md shadow-md overflow-hidden"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      role="navigation"
      aria-label="Main"
    >
      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"
        aria-hidden="true"
      />

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-4 left-8 w-12 h-12 bg-gradient-to-r from-blue-100/40 to-teal-100/40 rounded-full blur-lg"
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ translateX: x }}
        />
        <motion.div
          className="absolute bottom-4 right-8 w-16 h-16 bg-gradient-to-r from-emerald-100/30 to-blue-100/30 rounded-full blur-xl"
          animate={{ x: [0, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ translateX: x }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="text-2xl font-extrabold text-blue-600 hover:text-teal-400 transition"
        >
          MDC
        </a>

        {/* Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#services" className="text-blue-600 hover:text-teal-400 font-medium transition">
            Services
          </a>
          <a href="#about" className="text-blue-600 hover:text-teal-400 font-medium transition">
            About
          </a>
          <a href="#faq" className="text-blue-600 hover:text-teal-400 font-medium transition">
            FAQ
          </a>
          <a href="#contact" className="text-blue-600 hover:text-teal-400 font-medium transition">
            Contact
          </a>
        </div>

        {/* CTA & Mobile */}
        <div className="flex items-center space-x-4">
          <a
            href="tel:+923361343567"
            className="hidden md:inline-flex items-center px-4 py-2 bg-teal-500 hover:bg-teal-600 text-blue-600 rounded-md shadow-lg transition"
            aria-label="Call Muzzamil Dental Clinic"
          >
            <Phone className="w-5 text-white h-5 mr-2" />
            Call Us
          </a>
          <button
            className="md:hidden p-2 bg-white/20 rounded-md hover:bg-white/30 transition"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
