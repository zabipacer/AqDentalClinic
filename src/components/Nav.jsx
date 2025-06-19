import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Phone, Menu } from 'lucide-react';
import Logo from '/logo.png'; // Path to your logo file

export default function Navbar() {
  const navRef = useRef(null);

  // Scroll & mouse parallax for subtle movement
  const { scrollYProgress } = useScroll({
    target: navRef,
    offset: ['start end', 'end start'],
  });
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  useEffect(() => {
    const handleMouse = e => {
      const rect = navRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - (rect.left + rect.width / 2)) / 40);
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
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(193,154,107,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(193,154,107,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
        aria-hidden="true"
      />

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-4 left-8 w-12 h-12 bg-gradient-to-br from-[rgba(193,154,107,0.4)] to-[rgba(255,215,0,0.4)] rounded-full blur-lg"
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ translateX: x }}
        />
        <motion.div
          className="absolute bottom-4 right-8 w-16 h-16 bg-gradient-to-br from-[rgba(193,154,107,0.3)] to-[rgba(255,215,0,0.3)] rounded-full blur-xl"
          animate={{ x: [0, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ translateX: x }}
        />
      </div>

      <div className="relative my-5 max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Brand */}
        <a href="/" className="flex items-center space-x-2" aria-label="Home">
          <motion.img
            src={Logo}
            alt="AQ Dental Clinic Logo"
            className="h-30 object-contain"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
          <motion.span
            className="text-2xl ml-[-30px] font-extrabold text-[rgb(193,154,107)] hover:text-[rgb(255,215,0)] transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Dental Clinic
          </motion.span>
        </a>

        {/* Links */}
        <div className="hidden md:flex space-x-8">
          {['services', 'about', 'faq', 'location'].map(id => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[rgb(193,154,107)] hover:text-[rgb(255,215,0)] font-medium transition"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>

        {/* CTA & Mobile */}
        <div className="flex items-center space-x-4">
          <a
            href="tel:03323811434"
            className="hidden md:inline-flex items-center px-4 py-2 bg-gradient-to-r from-[rgb(193,154,107)] to-[rgb(255,215,0)] text-white rounded-md shadow-lg transition"
            aria-label="Call AQ Dental Clinic"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Us
          </a>
         <button
  className="md:hidden p-2 bg-[rgba(193,154,107,0.4)] rounded-md hover:bg-[rgba(193,154,107,0.6)] transition"
  aria-label="Open menu"
>
  <Menu className="w-6 h-6 text-[rgb(168,126,86)]" />
</button>

        </div>
      </div>
    </motion.nav>
  );
}