import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';

const columns = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  useEffect(() => {
    setVisible(true);
    const handleMouse = e => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - (rect.left + rect.width / 2)) / 50);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [x]);

  return (
    <footer
      ref={ref}
      style={{ y }}
      className="relative bg-white text-gray-900 pt-16 pb-8 font-poppins overflow-hidden"
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-100/50 to-teal-100/50 rounded-full blur-xl"
          animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ x }}
        />
        <motion.div
          className="absolute bottom-24 right-24 w-48 h-48 bg-gradient-to-r from-emerald-100/40 to-blue-100/40 rounded-full blur-2xl"
          animate={{ y: [20, -20, 20], rotate: [0, -5, 5, 0], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ x: useTransform(x, [-1, 1], [10, -10]) }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 z-10">
        {/* Clinic Info */}
        <motion.div {...columns}>
          <h4 className="text-lg font-bold mb-4">Muzzamil Dental Clinic</h4>
          <p className="text-sm mb-3 flex items-start gap-2">
            <FaMapMarkerAlt className="text-teal-400 mt-1" />
            Shop #2, Jasmine Plaza, Bahria Town Phase 7, Rawalpindi
          </p>
          <p className="text-sm mb-3 flex items-center gap-2">
            <FaPhone className="text-teal-400" />
            <a href="tel:+923335551234" className="hover:underline">0333 555 1234</a>
          </p>
          <p className="text-sm flex items-center gap-2">
            <FaEnvelope className="text-teal-400" />
            <a href="mailto:info@muzzamildental.com" className="hover:underline">info@muzzamildental.com</a>
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.nav {...columns} aria-label="Quick Links">
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#hero" className="hover:text-gray-700">Home</a></li>
            <li><a href="#about" className="hover:text-gray-700">About Us</a></li>
            <li><a href="#services" className="hover:text-gray-700">Services</a></li>
            <li><a href="#contact" className="hover:text-gray-700">Contact</a></li>
          </ul>
        </motion.nav>

        {/* Services */}
        <motion.nav {...columns} aria-label="Top Services">
          <h4 className="text-lg font-bold mb-4">Our Services</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#services" className="hover:text-gray-700">Maxillofacial Surgery</a></li>
            <li><a href="#services" className="hover:text-gray-700">Orthodontics</a></li>
            <li><a href="#services" className="hover:text-gray-700">Implants & Prosthesis</a></li>
            <li><a href="#services" className="hover:text-gray-700">Teeth Whitening</a></li>
          </ul>
        </motion.nav>

        {/* Social & Connect */}
        <motion.div {...columns}>
          <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
          <div className="flex space-x-4 mb-4">
            <a href="https://www.facebook.com/MuzzamilDental" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="text-lg hover:text-blue-600" />
            </a>
            <a href="https://www.instagram.com/MuzzamilDental" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-lg hover:text-pink-600" />
            </a>
            <a href="https://wa.me/923335551234" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="text-lg hover:text-green-600" />
            </a>
          </div>
          <p className="text-sm">
            Serving Rawalpindi families with expert, gentle dental care. Visit us today!
          </p>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-12 text-xs text-gray-600 border-t border-gray-200 pt-4 z-10 relative">
        © {new Date().getFullYear()} Muzzamil Dental Clinic. All rights reserved.
      </div>
    </footer>
  );
}
