import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Phone, Star, Clock, CheckSquare } from 'lucide-react';

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  useEffect(() => {
    setVisible(true);
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      x.set((e.clientX - centerX) / 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } },
  };
  const floatingAnimation = {
    y: [-20, 20, -20],
    rotate: [0, 5, -5, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  };
  const specialties = [
    'Maxillofacial Surgery',
    'Orthodontics',
    'Implants & Prosthesis',
    'Gums Treatment & Oral Hygiene',
    'Teeth Whitening',
    'Family Dentistry',
  ];

  return (
    <motion.section
      ref={containerRef}
      id="about"
      className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 text-slate-800 overflow-hidden py-0"
      aria-labelledby="about-title"
      itemScope
      itemType="https://schema.org/Dentist"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* floating elements */}
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Inner content with scroll-parallax */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24"
        variants={containerVariants}
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        style={{ y }}
      >
        {/* Photo Column */}
        <motion.div className="relative w-full" variants={itemVariants} itemProp="image">
          <motion.div
            className="relative w-full max-w-lg mx-auto"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            animate={{ rotateY: [0, 3, -3, 0], rotateX: [0, 1, -1, 0], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 50px rgba(59, 130, 246, 0.1)' }}
            >
              <img
                src="/mu.webp"
                alt="Dr. Muzzamil Shabbir smiling"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-teal-900/10 pointer-events-none" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Info Column */}
        <motion.div variants={itemVariants} className="space-y-8">
          <motion.h2
            id="about-title"
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-teal-700 bg-clip-text text-transparent leading-tight"
            itemProp="name"
            variants={itemVariants}
          >
            Muzzamil Dental
            <motion.span
              className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
            >
              Clinic
            </motion.span>
          </motion.h2>

          <motion.p className="text-xl text-slate-600 max-w-2xl leading-relaxed" itemProp="description" variants={itemVariants}>
            Led by <strong className="text-blue-700">Dr. Muzzamil Shabbir</strong>, our Latifabad Unit 6 clinic in Hyderabad provides top-tier dental care—spanning maxillofacial surgery, orthodontics, implants, gums treatment, prosthesis, teeth whitening, and family dentistry.
          </motion.p>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={itemVariants}>
            {[
              { icon: MapPin, text: 'Latifabad Unit 6, Latifabad, Hyderabad, 71000, Pakistan', color: 'from-blue-400 to-cyan-500', itemProp: 'address' },
              { icon: Phone, text: '033123456789', color: 'from-teal-400 to-emerald-500', link: 'tel:+9233123456789', itemProp: 'telephone' },
              { icon: Clock, text: 'Open ⋅ Closes 10 PM', color: 'from-blue-400 to-cyan-500', itemProp: 'openingHours' },
              { icon: Star, text: '4.9 ★ (84 Google reviews)', color: 'from-amber-400 to-orange-500', itemProp: 'aggregateRating' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl backdrop-blur-sm bg-white/70 border border-slate-200/50 shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                itemProp={item.itemProp}
              >
                <motion.div className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                  <item.icon className="w-5 h-5" />
                </motion.div>
                {item.link ? (
                  <a href={item.link} className="text-slate-700 font-medium hover:text-blue-600 transition-colors">{item.text}</a>
                ) : (
                  <span className="text-slate-700 font-medium">{item.text}</span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Specialties and footer cards unchanged */}
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-100/30 to-transparent pointer-events-none" />
    </motion.section>
  );
}
