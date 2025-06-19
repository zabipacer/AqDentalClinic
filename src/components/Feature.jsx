import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AQDentalServices() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const yMobile = useTransform(() => '0%');
  const opacityMobile = useTransform(() => 1);
  
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
      y: isMobile ? 15 : 50, 
      scale: isMobile ? 0.95 : 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: isMobile ? 200 : 100, 
        damping: 15,
        duration: isMobile ? 0.3 : 0.8
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
    hidden: { opacity: 0, y: isMobile ? -8 : -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isMobile ? 0.3 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    },
  };

  const imageVariants = {
    hidden: { scale: isMobile ? 0.95 : 0, rotate: isMobile ? 0 : -180, opacity: 0 },
    visible: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: isMobile ? 300 : 200,
        damping: 15,
        delay: isMobile ? 0 : 0.1
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
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=400&fit=crop&crop=center',
      title: 'Dental Consultations', 
      desc: 'Comprehensive dental examinations and personalized treatment planning with our experienced dental professionals',
      features: ['Detailed oral examination', 'Treatment planning', 'Expert dental advice'],
      gradient: 'from-amber-50 to-yellow-50',
      border: 'border-amber-200/30'
    },
    { 
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop&crop=center',
      title: 'Tooth Extractions', 
      desc: 'Safe and comfortable tooth removal procedures using modern techniques for minimal discomfort and faster healing',
      features: ['Painless procedures', 'Advanced techniques', 'Post-care guidance'],
      gradient: 'from-yellow-50 to-amber-100',
      border: 'border-yellow-200/30'
    },
    { 
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop&crop=center',
      title: 'Dental Fillings', 
      desc: 'High-quality dental fillings using durable composite materials to restore damaged teeth and prevent further decay',
      features: ['Composite materials', 'Natural appearance', 'Long-lasting results'],
      gradient: 'from-amber-100 to-yellow-100',
      border: 'border-amber-300/30'
    },
    { 
      image: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=400&h=400&fit=crop&crop=center',
      title: 'Root Canal Treatment', 
      desc: 'Advanced endodontic therapy to save infected teeth and eliminate pain with precision care and modern equipment',
      features: ['Pain relief', 'Tooth preservation', 'Modern techniques'],
      gradient: 'from-yellow-100 to-amber-200',
      border: 'border-yellow-300/30'
    },
    { 
      image: 'https://images.unsplash.com/photo-1643297654499-0c297dc4142c?w=400&h=400&fit=crop&crop=center',
      title: 'Scaling & Polishing', 
      desc: 'Professional deep cleaning to remove plaque and tartar buildup for healthier gums and brighter, cleaner teeth',
      features: ['Deep cleaning', 'Plaque removal', 'Gum health improvement'],
      gradient: 'from-amber-200 to-yellow-200',
      border: 'border-amber-400/30'
    },
    { 
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=400&fit=crop&crop=center',
      title: 'Crown & Bridge Work', 
      desc: 'Custom-made crowns and bridges to restore damaged teeth and replace missing ones with natural-looking, durable results',
      features: ['Custom fit', 'Natural appearance', 'Durable materials'],
      gradient: 'from-yellow-200 to-amber-300',
      border: 'border-yellow-400/30'
    },
    { 
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&crop=center',
      title: 'Complete & Partial Dentures', 
      desc: 'Comfortable, well-fitting dentures designed to restore your smile and improve your quality of life and confidence',
      features: ['Custom fitting', 'Comfortable wear', 'Natural appearance'],
      gradient: 'from-amber-300 to-yellow-300',
      border: 'border-amber-500/30'
    },
    { 
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
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
      className={`relative py-16 md:py-32 overflow-hidden ${
        isMobile 
          ? 'bg-white' 
          : 'bg-gradient-to-br from-white via-amber-25/10 to-yellow-25/10'
      }`}
         style={{ 
        y: isMobile ? yMobile : y, 
        opacity: isMobile ? opacityMobile : opacity 
      }}
    >
      {/* Background decorative elements - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-r from-amber-100/30 to-yellow-100/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 left-10 w-60 h-60 bg-gradient-to-r from-yellow-100/25 to-amber-100/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-amber-200/20 to-yellow-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 right-20 w-24 h-24 bg-gradient-to-r from-yellow-200/25 to-amber-200/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
      )}

      {/* Grid Pattern - Much lighter on mobile */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(rgba(218,165,32,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(218,165,32,0.04)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none ${
          isMobile ? 'opacity-5' : 'opacity-40'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.header 
          className="text-center mb-10 md:mb-24"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="inline-block mb-3 md:mb-6"
            animate={!isMobile ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            } : {}}
          >
            <span className={`inline-flex items-center px-3 md:px-6 py-2 md:py-3 text-amber-700 text-xs md:text-sm font-bold rounded-full border-2 shadow-lg ${
              isMobile 
                ? 'bg-amber-50 border-amber-200' 
                : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200/50'
            }`}>
              <span className="mr-2 text-sm md:text-lg">✨</span>
              Premium Dental Care Excellence
            </span>
          </motion.div>
          
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3 md:mb-8 leading-tight">
            Our Professional{' '}
            <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Dental Services
            </span>
          </h2>
          
          <p className="text-base md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            AQ Dental Clinic & Associates delivers world-class dental care with cutting-edge technology, 
            experienced professionals, and a commitment to your oral health and radiant smile.
          </p>
        </motion.header>

        {/* Services Grid */}
        {/* Services Grid */}
<motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-10"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
>
  {services.map(({ image, title, desc, features, gradient, border }, idx) => (
    <motion.article
      key={title}
      className={`group relative bg-white border-2 rounded-xl md:rounded-3xl p-3 md:p-8 cursor-pointer overflow-hidden transition-all duration-300 ${
        isMobile 
          ? 'border-gray-100 shadow-md' 
          : `${border} shadow-xl hover:shadow-2xl duration-500`
      }`}
      variants={cardVariants}
      whileHover={!isMobile ? "hover" : {}}
    >
      {/* Gradient Overlay - Desktop only */}
      {!isMobile && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-80`}
          initial={{ scale: 0, rotate: 45 }}
          whileHover={{ scale: 1.5, rotate: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Shine Effect - Desktop only */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
          initial={{ x: "-150%" }}
          whileHover={{ x: "250%" }}
          transition={{ duration: 0.8 }}
        />
      )}

      {/* Mobile: Horizontal layout */}
      <div className={`relative flex ${isMobile ? 'flex-row items-start gap-3' : 'flex-col items-center text-center'} h-full`}>
        {/* Image */}
        <motion.div
          className={`overflow-hidden shadow-md ring-1 ring-amber-100/50 ${
            isMobile 
              ? 'w-14 h-14 rounded-lg min-w-[56px]' 
              : 'w-20 h-20 md:w-40 md:h-40 rounded-xl md:rounded-3xl mb-3 md:mb-6 md:shadow-2xl'
          }`}
          variants={imageVariants}
          whileHover={!isMobile ? "hover" : {}}
        >
          <img 
            src={image} 
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              !isMobile ? 'group-hover:scale-110 h-[300px] duration-500' : ''
            }`}
            loading="lazy"
            onError={(e) => {
              e.target.src = `data:image/svg+xml;base64,${btoa(`
                <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="400" fill="#f3f4f6"/>
                  <text x="200" y="200" text-anchor="middle" fill="#9ca3af" font-size="48">🦷</text>
                </svg>
              `)}`;
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="flex-grow w-full">
          <div className={`${isMobile ? 'flex items-start justify-between' : ''}`}>
            <motion.h3 className={`font-bold text-gray-900 transition-colors duration-300 ${
              isMobile 
                ? 'text-sm mb-1 flex-grow' 
                : 'text-base md:text-2xl mb-2 md:mb-4'
            } ${!isMobile ? 'group-hover:text-amber-700' : ''}`}>
              {title}
            </motion.h3>
            
            {/* Mobile-only: Card Number */}
            {isMobile && (
              <motion.div
                className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center text-amber-700 text-[8px] font-bold border border-amber-200/50 ml-2 flex-shrink-0"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
              >
                {String(idx + 1).padStart(2, '0')}
              </motion.div>
            )}
          </div>

          <motion.p className={`text-gray-600 font-medium ${
            isMobile 
              ? 'text-xs mb-2 line-clamp-2' 
              : 'text-xs md:text-lg mb-3 md:mb-6 leading-relaxed'
          }`}>
            {desc}
          </motion.p>

          {/* Desktop-only: Features List */}
          {!isMobile && (
            <motion.ul className="space-y-1 md:space-y-3 mb-4 md:mb-8">
              {features.map((feature, featureIdx) => (
                <motion.li
                  key={feature}
                  className="flex items-center justify-center text-xs md:text-base text-gray-700 font-medium"
                  initial={!isMobile ? { opacity: 0, x: -20 } : {}}
                  whileInView={!isMobile ? { opacity: 1, x: 0 } : {}}
                  transition={!isMobile ? { delay: 0.1 * featureIdx, duration: 0.5 } : {}}
                >
                  <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 mr-2 md:mr-3 flex-shrink-0 shadow-sm" />
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>

      {/* Mobile: Features as badges */}
      {isMobile && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {features.map((feature) => (
            <span 
              key={feature} 
              className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-100"
            >
              {feature}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <motion.div
        className={`flex items-center text-amber-600 font-bold transition-colors duration-300 ${
          isMobile 
            ? 'mt-3 text-xs justify-center' 
            : 'text-xs md:text-lg'
        } ${!isMobile ? 'group-hover:text-amber-700' : ''}`}
        initial={!isMobile ? { y: 15, opacity: 0.7 } : {}}
        whileHover={!isMobile ? { y: 0, opacity: 1 } : {}}
        transition={!isMobile ? { duration: 0.3 } : {}}
      >
        <span className="mr-1 md:mr-3">Learn More</span>
        <motion.svg
          className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3 md:w-6 md:h-6'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
          whileHover={!isMobile ? { x: 5 } : {}}
          transition={!isMobile ? { type: 'spring', stiffness: 400 } : {}}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </motion.svg>
      </motion.div>

      {/* Desktop-only: Card Number */}
      {!isMobile && (
        <motion.div
          className="absolute top-2 right-2 md:top-6 md:right-6 w-6 h-6 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center text-amber-700 text-xs md:text-base font-black shadow-lg border-2 border-amber-200/50"
          initial={!isMobile ? { scale: 0, rotate: -180 } : {}}
          whileInView={!isMobile ? { scale: 1, rotate: 0 } : {}}
          transition={!isMobile ? { delay: 0.1 * idx, type: 'spring', stiffness: 200 } : {}}
        >
          {String(idx + 1).padStart(2, '0')}
        </motion.div>
      )}
    </motion.article>
  ))}
</motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 md:mt-28"
          initial={{ opacity: 0, y: isMobile ? 10 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: isMobile ? 0.3 : 0.8 }}
        >
          <motion.button
            className="inline-flex items-center px-6 md:px-12 py-3 md:py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-black rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl transition-all duration-300 text-sm md:text-xl hover:shadow-amber-200/50"
            whileHover={!isMobile ? { 
              scale: 1.05,
            } : {}}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('tel:03323811434', '_blank')}
          >
            <span>Book Your Premium Appointment</span>
            <motion.svg
              className="ml-2 md:ml-3 w-4 h-4 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              whileHover={!isMobile ? { x: 5 } : {}}
              transition={!isMobile ? { type: 'spring', stiffness: 400 } : {}}
            >
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </motion.svg>
          </motion.button>

          <motion.div 
            className="mt-4 md:mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-gray-700 text-sm md:text-xl mb-2 md:mb-4 font-semibold">Contact us today for your dental consultation</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-sm md:text-xl">
              <div className="flex items-center gap-2 md:gap-3 text-amber-600 font-bold bg-amber-50 px-3 md:px-6 py-2 md:py-3 rounded-full shadow-lg">
                <span className="text-base md:text-xl">📞</span>
                <span>0332 3811434</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-gray-700 font-semibold bg-gray-50 px-3 md:px-6 py-2 md:py-3 rounded-full shadow-lg">
                <span className="text-base md:text-xl">📍</span>
                <span>Alamdar Road, Quetta</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}