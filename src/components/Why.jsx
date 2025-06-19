import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Phone, Star, Clock } from 'lucide-react';

export default function AboutSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll-parallax setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 1.1], [1, 0]);

  // Mouse-parallax springs
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // Dependent transform (must be outside conditional)
  const mouseXShifted = useTransform(mouseX, [-1, 1], [15, -15]);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse-movement effect
  useEffect(() => {
    if (isMobile) return;
    const handleMouse = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) / 50);
      mouseY.set((e.clientY - cy) / 50);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [isMobile, mouseX, mouseY]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 40, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: isMobile ? 0.6 : 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative bg-white overflow-hidden py-24"
      style={!isMobile ? { y, opacity } : {}}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="about"
      aria-labelledby="about-title"
      itemScope
      itemType="https://schema.org/Dentist"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-16 right-16 w-28 h-28 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full blur-xl"
          initial={{ opacity: 0 }}
          animate={
            isMobile
              ? { opacity: 1, y: [-5, 5, -5], transition: { delay: 1, duration: 4, repeat: Infinity, ease: 'easeInOut' } }
              : { opacity: 1, y: [-15, 15, -15], rotate: [0, 3, -3, 0], transition: { delay: 1, duration: 8, repeat: Infinity, ease: 'easeInOut' } }
          }
          style={!isMobile ? { x: mouseX, y: mouseY } : {}}
        />
        <motion.div
          className="absolute bottom-24 left-24 w-40 h-40 bg-gradient-to-br from-amber-400/10 to-yellow-600/10 rounded-full blur-2xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: isMobile ? [-10, 10, -10] : [25, -25, 25],
            rotate: [0, -8, 8, 0],
            scale: [1, 1.1, 1],
            transition: { delay: 1.5, duration: isMobile ? 6 : 10, repeat: Infinity, ease: 'easeInOut' }
          }}
          style={!isMobile ? { x: mouseXShifted } : {}}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-10 h-10 border-2 border-amber-400/30 rotate-45"
          animate={{
            rotate: [45, 225, 45],
            scale: [1, 1.2, 1],
            transition: { duration: isMobile ? 8 : 12, repeat: Infinity, ease: 'linear', delay: 2 }
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Content */}
      <motion.div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div className="space-y-8 text-center lg:text-left" variants={containerVariants}>
          <motion.h2
            id="about-title"
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            variants={itemVariants}
          >
            About <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">AQ Dental</span>
          </motion.h2>
          <motion.p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0" variants={itemVariants}>
            At <strong className="text-amber-600">AQ Dental Clinic & Associates</strong> in Quetta, we deliver premium dental services—from routine checkups to advanced treatments—blending cutting‑edge technology with gentle care.
          </motion.p>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6" variants={itemVariants}>
            {[
              { icon: MapPin, text: '52VC+JG9, Alamdar Road, Quetta', color: 'from-blue-700 to-amber-500', prop: 'address' },
              { icon: Phone, text: '0332 3811434', color: 'from-amber-500 to-yellow-600', link: 'tel:+923323811434', prop: 'telephone' },
              { icon: Clock, text: 'Open ⋅ Monday to Saturday 10am to 9pm', color: 'from-blue-700 to-amber-500', prop: 'openingHours' },
              { icon: Star, text: '5.0 ★ (6 reviews)', color: 'from-amber-500 to-yellow-600', prop: 'aggregateRating' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                variants={itemVariants}
                itemProp={item.prop}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-xl`}>
                  <item.icon className="w-6 h-6" />
                </div>
                {item.link
                  ? <a href={item.link} className="font-medium text-gray-800 hover:text-amber-600">{item.text}</a>
                  : <span className="font-medium text-gray-800">{item.text}</span>
                }
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div className="relative w-full max-w-md mx-auto" variants={itemVariants} style={{ x: mouseX, y: mouseY }}>
          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.03, rotateY: 5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <img src="/aboutimg.jpg" alt="AQ Dental Clinic" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-100/20 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
