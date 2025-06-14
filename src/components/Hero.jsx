import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const mouseX = e.clientX - centerX;
        x.set(mouseX / 50);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const floatingAnimation = {
    y: [-20, 20, -20],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-hidden text-slate-800"
      style={{ y, opacity, scale }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-100/50 to-teal-100/50 rounded-full blur-xl"
          animate={floatingAnimation}
          style={{ x }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-r from-emerald-100/40 to-blue-100/40 rounded-full blur-2xl"
          animate={{
            y: [20, -20, 20],
            rotate: [0, -5, 5, 0],
            scale: [1, 1.1, 1],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{ x: useTransform(x, [-1, 1], [10, -10]) }}
        />
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-16 h-16 border-2 border-teal-200/60 rotate-45"
          animate={{
            rotate: [45, 225, 45],
            scale: [1, 1.2, 1],
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-gradient-to-r from-blue-200/40 to-teal-200/40 rounded-full"
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <motion.div 
        className="container mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10 min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Text Section */}
        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-teal-700 bg-clip-text text-transparent leading-tight"
              style={{ 
                textShadow: '0 2px 20px rgba(59, 130, 246, 0.1)',
                transform: 'perspective(1000px) rotateX(2deg)'
              }}
            >
              Smile with
              <motion.span 
                className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                Confidence
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p 
            className="text-xl text-slate-600 max-w-2xl leading-relaxed"
            variants={itemVariants}
          >
            Expert care, cutting-edge technology, and personalized dental solutions 
            in a warm, welcoming environment that transforms your smile.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
          <motion.button
            className="relative mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl font-semibold text-lg text-white shadow-2xl overflow-hidden group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            onClick={() => window.open('https://api.whatsapp.com/send?phone=923361343567', '_blank')}
          >
            <span className="relative z-10">Chat on WhatsApp</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>}

            <motion.button
              className="relative px-8 py-4 border-2 border-blue-600 text-blue-700 rounded-xl font-semibold text-lg backdrop-blur-sm bg-white/60 group overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgb(20, 184, 166)",
                color: "rgb(20, 184, 166)",
                backgroundColor: "rgba(255,255,255,0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <span className="relative z-10">Explore Services</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            variants={itemVariants}
          >
            {[
              { icon: "⭐", text: "5.0 Rating", color: "from-amber-400 to-orange-400" },
              { icon: "✓", text: "Certified Dentists", color: "from-emerald-400 to-teal-500" },
              { icon: "⚡", text: "Modern Equipment", color: "from-blue-400 to-cyan-500" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm bg-white/70 border border-slate-200/50 shadow-sm"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.85)",
                  borderColor: "rgba(148,163,184,0.3)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <span className="text-slate-700 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div 
          className="relative"
          variants={itemVariants}
        >
          <motion.div
            className="relative w-full max-w-lg mx-auto"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'perspective(1000px)'
            }}
            animate={{
              rotateY: [0, 5, -5, 0],
              rotateX: [0, 2, -2, 0],
              transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {/* Floating Badge */}
            <motion.div
              className="absolute -top-8 -right-8 z-20 bg-gradient-to-r from-blue-500 to-teal-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-2xl"
              animate={{
                y: [-5, 5, -5],
                rotate: [0, 5, -5, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ scale: 1.1 }}
            >
              Popular Choice ✨
            </motion.div>

            {/* Main Image Container */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                rotateX: 5
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ 
                transformStyle: 'preserve-3d',
                boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 50px rgba(59, 130, 246, 0.1)'
              }}
            >
              <img
                src="/muzzamil.webp"
                alt="Smiling Patient"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-teal-900/10 pointer-events-none" />
              
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-200/40 to-teal-200/40 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            
            <motion.div
              className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-emerald-200/50 to-blue-200/50 rounded-full blur-lg"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-100/30 to-transparent pointer-events-none" />
    </motion.section>
  );
}