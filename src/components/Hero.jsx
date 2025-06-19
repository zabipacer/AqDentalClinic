import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function AQDentalHero() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const springConfig = { stiffness: 120, damping: 20 };
  const mx = useSpring(0, springConfig);
  const my = useSpring(0, springConfig);
  useEffect(() => {
    if (isMobile) return;
    const moveHandler = e => {
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mx.set((e.clientX - cx) / 50);
      my.set((e.clientY - cy) / 50);
    };
    window.addEventListener('mousemove', moveHandler);
    return () => window.removeEventListener('mousemove', moveHandler);
  }, [isMobile, mx, my]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden py-16 flex items-center justify-center text-center"
      style={!isMobile ? { y, opacity } : {}}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-0" />

      <motion.div className="relative z-10 max-w-3xl px-6 space-y-6" variants={itemVariants}>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
          <span className="block">Excellence in</span>
          <span className="block  text-white text-stroke-white ">
            Dental Care
          </span>
        </h1>
        <p className="text-lg text-white max-w-xl mx-auto">
          Experience warm, modern dental services at AQ Dental Clinic & Associates in Quetta. From routine cleanings to advanced implants, we craft perfect smiles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            className="px-8 py-4 bg-[#5e3b1f] text-white font-semibold rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: '#3a2412' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => window.open('tel:03323811434')}
          >
            Book Appointment
          </motion.button>
          <motion.button
            className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold transition"
            whileHover={{ scale: 1.05, backgroundColor: 'white', color: '#5e3b1f' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => {
              const section = document.getElementById('services');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Our Services
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
}