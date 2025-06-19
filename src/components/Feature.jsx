import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AQDentalServices() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.9]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 30 : 50, 
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15,
        duration: isMobile ? 0.6 : 0.8
      },
    },
    hover: !isMobile ? {
      scale: 1.05,
      y: -8,
      boxShadow: '0px 25px 50px rgba(218, 165, 32, 0.2)',
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 20
      },
    } : {},
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    },
  };

  const imageVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.1
      }
    },
    hover: !isMobile ? {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    } : {}
  };

  const services = [
    { 
      image: 'polish.webp',
      title: 'Dental Consultations', 
      desc: 'Comprehensive dental examinations and personalized treatment planning with our experienced dental professionals',
      features: ['Detailed oral examination', 'Treatment planning', 'Expert dental advice'],
      gradient: 'from-amber-50 to-yellow-50',
      border: 'border-amber-200/30'
    },
    { 
      image: '/images/T1.jpg',
      title: 'Tooth Extractions', 
      desc: 'Safe and comfortable tooth removal procedures using modern techniques for minimal discomfort and faster healing',
      features: ['Painless procedures', 'Advanced techniques', 'Post-care guidance'],
      gradient: 'from-yellow-50 to-amber-100',
      border: 'border-yellow-200/30'
    },
    { 
      image: '/images/df.png',
      title: 'Dental Fillings', 
      desc: 'High-quality dental fillings using durable composite materials to restore damaged teeth and prevent further decay',
      features: ['Composite materials', 'Natural appearance', 'Long-lasting results'],
      gradient: 'from-amber-100 to-yellow-100',
      border: 'border-amber-300/30'
    },
    { 
      image: '/images/root-canal.png',
      title: 'Root Canal Treatment', 
      desc: 'Advanced endodontic therapy to save infected teeth and eliminate pain with precision care and modern equipment',
      features: ['Pain relief', 'Tooth preservation', 'Modern techniques'],
      gradient: 'from-yellow-100 to-amber-200',
      border: 'border-yellow-300/30'
    },
    { 
      image: '/images/Scp.png',
      title: 'Scaling & Polishing', 
      desc: 'Professional deep cleaning to remove plaque and tartar buildup for healthier gums and brighter, cleaner teeth',
      features: ['Deep cleaning', 'Plaque removal', 'Gum health improvement'],
      gradient: 'from-amber-200 to-yellow-200',
      border: 'border-amber-400/30'
    },
    { 
      image: '/images/crowns-bridges.png',
      title: 'Crown & Bridge Work', 
      desc: 'Custom-made crowns and bridges to restore damaged teeth and replace missing ones with natural-looking, durable results',
      features: ['Custom fit', 'Natural appearance', 'Durable materials'],
      gradient: 'from-yellow-200 to-amber-300',
      border: 'border-yellow-400/30'
    },
    { 
      image: '/images/v.png',
      title: 'Complete & Partial Dentures', 
      desc: 'Comfortable, well-fitting dentures designed to restore your smile and improve your quality of life and confidence',
      features: ['Custom fitting', 'Comfortable wear', 'Natural appearance'],
      gradient: 'from-amber-300 to-yellow-300',
      border: 'border-amber-500/30'
    },
    { 
      image: '/images/jaw.png',
      title: 'Orthodontic Braces', 
      desc: 'Straighten your teeth and improve your bite with our modern orthodontic treatment options for a perfect smile',
      features: ['Teeth alignment', 'Bite correction', 'Improved confidence'],
      gradient: 'from-yellow-300 to-amber-400',
      border: 'border-yellow-500/30'
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="services"
      className="relative bg-gradient-to-br from-white via-amber-25/10 to-yellow-25/10 py-20 md:py-32 overflow-hidden"
      style={!isMobile ? { y, opacity } : {}}
    >
      {/* Enhanced Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-r from-amber-100/30 to-yellow-100/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-10 w-60 h-60 bg-gradient-to-r from-yellow-100/25 to-amber-100/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-amber-200/20 to-yellow-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-20 w-24 h-24 bg-gradient-to-r from-yellow-200/25 to-amber-200/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Elegant Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(218,165,32,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(218,165,32,0.04)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.header 
          className="text-center mb-16 md:mb-24"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={!isMobile ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            } : {}}
          >
            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 text-sm font-bold rounded-full border-2 border-amber-200/50 shadow-lg">
              <span className="mr-2 text-lg">✨</span>
              Premium Dental Care Excellence
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 md:mb-8 leading-tight">
            Our Professional{' '}
            <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Dental Services
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            AQ Dental Clinic & Associates delivers world-class dental care with cutting-edge technology, 
            experienced professionals, and a commitment to your oral health and radiant smile.
          </p>
        </motion.header>

        {/* Enhanced Services Grid with Larger Images */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map(({ image, title, desc, features, gradient, border }, idx) => (
            <motion.article
              key={title}
              className={`group relative bg-white ${border} border-2 rounded-3xl p-8 cursor-pointer overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500`}
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Enhanced Gradient Overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-80`}
                initial={{ scale: 0, rotate: 45 }}
                whileHover={!isMobile ? { scale: 1.5, rotate: 0 } : {}}
                transition={{ duration: 0.5 }}
              />

              {/* Premium Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                initial={{ x: "-150%" }}
                whileHover={!isMobile ? { x: "250%" } : {}}
                transition={{ duration: 0.8 }}
              />

              <div className="relative flex flex-col items-center text-center h-full">
                {/* Larger Professional Image */}
                <motion.div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden mb-6 shadow-2xl ring-4 ring-amber-100/50"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <img 
                    src={image} 
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </motion.div>

                {/* Enhanced Content */}
                <div className="flex-grow">
                  <motion.h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                    {title}
                  </motion.h3>

                  <motion.p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed font-medium">
                    {desc}
                  </motion.p>

                  {/* Enhanced Features List */}
                  <motion.ul className="space-y-3 mb-8">
                    {features.map((feature, featureIdx) => (
                      <motion.li
                        key={feature}
                        className="flex items-center justify-center text-sm md:text-base text-gray-700 font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIdx, duration: 0.5 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 mr-3 flex-shrink-0 shadow-sm" />
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Enhanced CTA */}
                <motion.div
                  className="flex items-center text-amber-600 font-bold group-hover:text-amber-700 transition-colors duration-300 text-base md:text-lg"
                  initial={{ y: 15, opacity: 0.7 }}
                  whileHover={!isMobile ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <span className="mr-3">Learn More</span>
                  <motion.svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    whileHover={!isMobile ? { x: 5 } : {}}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </div>

              {/* Elegant Card Number */}
              <motion.div
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center text-amber-700 text-sm md:text-base font-black shadow-lg border-2 border-amber-200/50"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1 * idx, type: 'spring', stiffness: 200 }}
              >
                {String(idx + 1).padStart(2, '0')}
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          className="text-center mt-20 md:mt-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.button
            className="inline-flex items-center px-10 md:px-12 py-4 md:py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-black rounded-2xl shadow-2xl transition-all duration-300 text-lg md:text-xl hover:shadow-amber-200/50"
            whileHover={!isMobile ? { 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(218, 165, 32, 0.4)"
            } : {}}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('tel:03323811434', '_blank')}
          >
            <span>Book Your Premium Appointment</span>
            <motion.svg
              className="ml-3 w-6 h-6 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              whileHover={!isMobile ? { x: 5 } : {}}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </motion.svg>
          </motion.button>

          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-gray-700 text-lg md:text-xl mb-4 font-semibold">Contact us today for your dental consultation</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg md:text-xl">
              <div className="flex items-center gap-3 text-amber-600 font-bold bg-amber-50 px-6 py-3 rounded-full shadow-lg">
                <span className="text-xl">📞</span>
                <span>0332 3811434</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-semibold bg-gray-50 px-6 py-3 rounded-full shadow-lg">
                <span className="text-xl">📍</span>
                <span>Alamdar Road, Quetta</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}