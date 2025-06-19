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

const columnVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // scroll‑parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
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
      style={{ transform: y }}
      className="relative bg-white text-gray-900 pt-16 pb-8 font-poppins overflow-hidden"
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-yellow-100/50 to-amber-100/50 rounded-full blur-xl"
          animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ x }}
        />
        <motion.div
          className="absolute bottom-24 right-24 w-48 h-48 bg-gradient-to-br from-amber-100/40 to-yellow-100/40 rounded-full blur-2xl"
          animate={{ y: [20, -20, 20], rotate: [0, -5, 5, 0], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ x: useTransform(x, [-1, 1], [10, -10]) }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 z-10">
        {/* Clinic Info */}
        <motion.div
          initial="initial"
          animate={visible ? 'animate' : 'initial'}
          variants={columnVariants}
        >
          <h4 className="text-lg font-bold mb-4">AQ Dental Clinic & Associates</h4>
          <p className="text-sm mb-3 flex items-start gap-2">
            <FaMapMarkerAlt className="text-yellow-500 mt-1" />
            52VC+JG9, Alamdar Road, Quetta
          </p>
          <p className="text-sm mb-3 flex items-center gap-2">
            <FaPhone className="text-yellow-500" />
            <a href="tel:+923323811434" className="hover:underline">
              0332 3811434
            </a>
          </p>
          <p className="text-sm flex items-center gap-2">
            <FaEnvelope className="text-yellow-500" />
            <a href="mailto:info@aqdental.com" className="hover:underline">
              info@aqdental.com
            </a>
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.nav
          aria-label="Quick Links"
          initial="initial"
          animate={visible ? 'animate' : 'initial'}
          variants={columnVariants}
        >
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#hero" className="hover:text-gray-700">Home</a></li>
            <li><a href="#about" className="hover:text-gray-700">About Us</a></li>
            <li><a href="#services" className="hover:text-gray-700">Services</a></li>
            <li><a href="#location" className="hover:text-gray-700">Location</a></li>
          </ul>
        </motion.nav>

        {/* Services */}
        <motion.nav
          aria-label="Top Services"
          initial="initial"
          animate={visible ? 'animate' : 'initial'}
          variants={columnVariants}
        >
          <h4 className="text-lg font-bold mb-4">Our Services</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#services" className="hover:text-gray-700">General Dentistry</a></li>
            <li><a href="#services" className="hover:text-gray-700">Implants & Prosthesis</a></li>
            <li><a href="#services" className="hover:text-gray-700">Orthodontics</a></li>
            <li><a href="#services" className="hover:text-gray-700">Teeth Whitening</a></li>
            <li><a href="#services" className="hover:text-gray-700">Emergency Care</a></li>
          </ul>
        </motion.nav>

        {/* Social & Connect */}
        <motion.div
          initial="initial"
          animate={visible ? 'animate' : 'initial'}
          variants={columnVariants}
        >
          <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
          <div className="flex space-x-4 mb-4">
            <a href="https://www.facebook.com/AQDentalQuetta" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="text-lg hover:text-blue-600" />
            </a>
            <a href="https://www.instagram.com/AQDentalQuetta" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-lg hover:text-pink-600" />
            </a>
            <a href="https://wa.me/923323811434" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="text-lg hover:text-green-600" />
            </a>
          </div>
          <p className="text-sm">
            Serving Quetta families with expert, gentle dental care—visit us today!
          </p>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-12 text-xs text-gray-600 border-t border-gray-200 pt-4 z-10 relative">
        © {new Date().getFullYear()} AQ Dental Clinic & Associates. All rights reserved.
      </div>
    </footer>
  );
}
