import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AQDentalServices() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCards, setExpandedCards] = useState([]);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Initialize expandedCards state
  useEffect(() => {
    setExpandedCards(Array(services.length).fill(false));
  }, []);

  const yMobile = useTransform(() => '0%');
  const opacityMobile = useTransform(() => 1);
  
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

  const toggleExpand = (index) => {
    const newExpanded = [...expandedCards];
    newExpanded[index] = !newExpanded[index];
    setExpandedCards(newExpanded);
  };

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
// Updated with high-quality dental and teeth stock images
  const services = [
    { 
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop&crop=center',
      title: 'Comprehensive Dental Consultations', 
      desc: 'Experience thorough oral health assessments by our skilled dentists who take time to understand your unique needs and create personalized treatment plans.',
      features: ['Complete oral health evaluation', 'Personalized treatment roadmap', 'Professional dental guidance', 'Digital X-ray analysis'],
      gradient: 'from-amber-50 to-yellow-50',
      border: 'border-amber-200/30',
      icon: '🔍'
    },
    { 
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop&crop=center',
      title: 'Gentle Tooth Extractions', 
      desc: 'When tooth removal becomes necessary, our gentle approach ensures maximum comfort with minimal discomfort using advanced pain management techniques.',
      features: ['Pain-free extraction procedures', 'Advanced anesthesia techniques', 'Comprehensive aftercare support', 'Rapid healing protocols'],
      gradient: 'from-yellow-50 to-amber-100',
      border: 'border-yellow-200/30',
      icon: '🦷'
    },
    { 
      image: 'https://images.pexels.com/photos/6529120/pexels-photo-6529120.jpeg',
      title: 'Premium Dental Fillings', 
      desc: 'Restore your teeth to their natural beauty and function with our high-quality composite fillings that blend seamlessly with your natural tooth color.',
      features: ['Tooth-colored composite materials', 'Natural-looking results', 'Durable and long-lasting', 'Mercury-free options'],
      gradient: 'from-amber-100 to-yellow-100',
      border: 'border-amber-300/30',
      icon: '🔧'
    },
    { 
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=400&fit=crop&crop=center',
      title: 'Advanced Root Canal Therapy', 
      desc: 'Save your natural teeth with our modern endodontic treatments that eliminate infection and pain while preserving your tooth structure.',
      features: ['Tooth-saving procedures', 'Complete pain elimination', 'State-of-the-art equipment', 'Infection control expertise'],
      gradient: 'from-yellow-100 to-amber-200',
      border: 'border-yellow-300/30',
      icon: '🎯'
    },
    { 
      image: 'https://images.pexels.com/photos/4269684/pexels-photo-4269684.jpeg',
      title: 'Professional Teeth Cleaning', 
      desc: 'Maintain optimal oral health with our comprehensive scaling and polishing services that remove harmful plaque and tartar buildup.',
      features: ['Deep plaque removal', 'Tartar elimination', 'Gum health improvement', 'Preventive care focus'],
      gradient: 'from-amber-200 to-yellow-200',
      border: 'border-amber-400/30',
      icon: '✨'
    },
    { 
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop&crop=center',
      title: 'Custom Crowns & Bridges', 
      desc: 'Restore damaged teeth and replace missing ones with our precision-crafted crowns and bridges that look, feel, and function like natural teeth.',
      features: ['Precision-crafted restorations', 'Natural tooth appearance', 'Superior durability', 'Perfect fit guarantee'],
      gradient: 'from-yellow-200 to-amber-300',
      border: 'border-yellow-400/30',
      icon: '👑'
    },
    { 
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=center',
      title: 'Comfortable Denture Solutions', 
      desc: 'Regain your confidence with our custom-fitted complete and partial dentures designed for maximum comfort and natural appearance.',
      features: ['Custom-fitted design', 'Enhanced comfort', 'Natural smile restoration', 'Improved speech clarity'],
      gradient: 'from-amber-300 to-yellow-300',
      border: 'border-amber-500/30',
      icon: '😊'
    },
    { 
      image: 'https://images.pexels.com/photos/6528864/pexels-photo-6528864.jpeg',
      title: 'Modern Orthodontic Treatment', 
      desc: 'Transform your smile with our comprehensive orthodontic solutions that straighten teeth and correct bite issues for lasting oral health.',
      features: ['Teeth straightening expertise', 'Bite correction therapy', 'Confidence enhancement', 'Long-term oral health'],
      gradient: 'from-yellow-300 to-amber-400',
      border: 'border-yellow-500/30',
      icon: '🎪'
    },
  ];
  return (
    <motion.section
      ref={sectionRef}
      id="dental-services"
      className={`relative py-16 md:py-32 overflow-hidden ${
        isMobile 
          ? 'bg-white' 
          : 'bg-gradient-to-br from-white via-amber-25/10 to-yellow-25/10'
      }`}
      style={{ 
        y: isMobile ? yMobile : y, 
        opacity: isMobile ? opacityMobile : opacity 
      }}
      role="main"
      aria-label="Dental Services at AQ Dental Clinic"
    >
      {/* Background decorative elements - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
        aria-hidden="true"
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
              <span className="mr-2 text-sm md:text-lg" aria-hidden="true">✨</span>
              Excellence in Dental Care
            </span>
          </motion.div>
          
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3 md:mb-8 leading-tight">
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Dental Services
            </span>
          </h1>
          
          <p className="text-base md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            At AQ Dental Clinic & Associates, we provide exceptional dental care using the latest technology and techniques. 
            Our experienced team is dedicated to helping you achieve optimal oral health and a beautiful, confident smile.
          </p>
        </motion.header>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          role="list"
          aria-label="Our dental services"
        >
          {services.map(({ image, title, desc, features, gradient, border, icon }, idx) => (
            <motion.article
              key={title}
              className={`group relative bg-white border-2 rounded-xl md:rounded-3xl overflow-hidden transition-all duration-300 ${
                isMobile 
                  ? 'border-gray-100 shadow-md p-3' 
                  : `${border} shadow-xl hover:shadow-2xl duration-500 p-8`
              }`}
              variants={cardVariants}
              whileHover={!isMobile ? "hover" : {}}
              role="listitem"
              aria-label={`${title} - Dental service`}
            >
              {/* Gradient Overlay - Desktop only */}
              {!isMobile && (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-80`}
                  initial={{ scale: 0, rotate: 45 }}
                  whileHover={{ scale: 1.5, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                />
              )}

              {/* Shine Effect - Desktop only */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-150%" }}
                  whileHover={{ x: "250%" }}
                  transition={{ duration: 0.8 }}
                  aria-hidden="true"
                />
              )}

              {/* Card Content */}
              <div className={`relative flex ${isMobile ? 'flex-col' : 'flex-col items-center text-center'} h-full`}>
                {/* Mobile: Header Row */}
                {isMobile && (
                  <div className="flex items-start gap-3 mb-3">
                    {/* Image */}
                    <motion.div
                      className="w-14 h-14 rounded-lg min-w-[56px] overflow-hidden shadow-md ring-1 ring-amber-100/50"
                      variants={imageVariants}
                    >
                      <img 
                        src={image} 
                        alt={`${title} at AQ Dental Clinic`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml;base64,${btoa(`
                            <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                              <rect width="400" height="400" fill="#f3f4f6"/>
                              <text x="200" y="200" text-anchor="middle" fill="#9ca3af" font-size="48">${icon}</text>
                            </svg>
                          `)}`;
                        }}
                      />
                    </motion.div>

                    {/* Title and Card Number */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <h2 className="text-sm font-bold text-gray-900 mb-1 flex-grow">
                          {title}
                        </h2>
                        <motion.div
                          className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center text-amber-700 text-[8px] font-bold border border-amber-200/50 ml-2 flex-shrink-0"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          aria-label={`Service ${idx + 1}`}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Desktop: Image */}
                {!isMobile && (
                  <motion.div
                    className="w-20 h-20 md:w-40 md:h-40 rounded-xl md:rounded-3xl mb-3 md:mb-6 md:shadow-2xl overflow-hidden shadow-md ring-1 ring-amber-100/50"
                    variants={imageVariants}
                    whileHover={!isMobile ? "hover" : {}}
                  >
                    <img 
                      src={image} 
                      alt={`${title} at AQ Dental Clinic`}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        !isMobile ? 'group-hover:scale-110 duration-500' : ''
                      }`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                            <rect width="400" height="400" fill="#f3f4f6"/>
                            <text x="200" y="200" text-anchor="middle" fill="#9ca3af" font-size="48">${icon}</text>
                          </svg>
                        `)}`;
                      }}
                    />
                  </motion.div>
                )}

                {/* Desktop: Title */}
                {!isMobile && (
                  <motion.h2 className="text-base md:text-2xl font-bold text-gray-900 mb-2 md:mb-4 transition-colors duration-300 group-hover:text-amber-700">
                    {title}
                  </motion.h2>
                )}

                {/* Description */}
                <motion.p className={`text-gray-600 font-medium flex-grow ${
                  isMobile 
                    ? 'text-xs mb-3' 
                    : 'text-xs md:text-lg mb-3 md:mb-6 leading-relaxed'
                }`}>
                  {desc}
                </motion.p>

                {/* Features */}
                <div className="w-full">
                  {!isMobile ? (
                    // Desktop: Features List
                    <motion.ul className="space-y-1 md:space-y-3 mb-6">
                      {features
                        .slice(0, expandedCards[idx] ? features.length : 3)
                        .map((feature, featureIdx) => (
                          <motion.li
                            key={feature}
                            className="flex items-center justify-center text-xs md:text-base text-gray-700 font-medium"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * featureIdx, duration: 0.5 }}
                          >
                            <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 mr-2 md:mr-3 flex-shrink-0 shadow-sm" />
                            {feature}
                          </motion.li>
                        ))}
                      
                      {!expandedCards[idx] && features.length > 3 && (
                        <motion.li 
                          className="text-amber-600 font-medium text-sm text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          +{features.length - 3} more benefits
                        </motion.li>
                      )}
                    </motion.ul>
                  ) : (
                    // Mobile: Features as badges
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {features
                        .slice(0, expandedCards[idx] ? features.length : 2)
                        .map((feature) => (
                          <span 
                            key={feature} 
                            className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-100"
                          >
                            {feature}
                          </span>
                        ))}
                      
                      {!expandedCards[idx] && features.length > 2 && (
                        <span 
                          className="text-[10px] bg-amber-100 text-amber-800 px-2 py-1 rounded-full border border-amber-200"
                        >
                          +{features.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Show More/Less Button - Fixed positioning */}
                  <motion.button
                    className={`flex items-center justify-center w-full text-amber-600 font-bold transition-colors duration-300 ${
                      isMobile 
                        ? 'text-xs py-2 px-3 bg-amber-50 rounded-lg border border-amber-200' 
                        : 'text-xs md:text-lg group-hover:text-amber-700'
                    }`}
                    initial={!isMobile ? { y: 15, opacity: 0.7 } : {}}
                    whileHover={!isMobile ? { y: 0, opacity: 1 } : {}}
                    transition={!isMobile ? { duration: 0.3 } : {}}
                    onClick={() => toggleExpand(idx)}
                    aria-expanded={expandedCards[idx]}
                    aria-controls={`features-${idx}`}
                  >
                    <span className="mr-1 md:mr-3">
                      {expandedCards[idx] ? 'Show Less' : 'Learn More'}
                    </span>
                    <motion.svg
                      className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3 md:w-6 md:h-6'} transition-transform`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      animate={{ rotate: expandedCards[idx] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      aria-hidden="true"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </motion.button>
                </div>
              </div>

              {/* Desktop-only: Card Number */}
              {!isMobile && (
                <motion.div
                  className="absolute top-2 right-2 md:top-6 md:right-6 w-6 h-6 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center text-amber-700 text-xs md:text-base font-black shadow-lg border-2 border-amber-200/50"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1 * idx, type: 'spring', stiffness: 200 }}
                  aria-label={`Service ${idx + 1}`}
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
            aria-label="Call AQ Dental Clinic to book an appointment"
          >
            <span>Book Your Dental Appointment Today</span>
            <motion.svg
              className="ml-2 md:ml-3 w-4 h-4 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              whileHover={!isMobile ? { x: 5 } : {}}
              transition={!isMobile ? { type: 'spring', stiffness: 400 } : {}}
              aria-hidden="true"
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
            <p className="text-gray-700 text-sm md:text-xl mb-2 md:mb-4 font-semibold">Ready to transform your smile? Contact us today for a consultation</p>
            <address className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-sm md:text-xl not-italic">
              <a 
                href="tel:03323811434" 
                className="flex items-center gap-2 md:gap-3 text-amber-600 font-bold bg-amber-50 px-3 md:px-6 py-2 md:py-3 rounded-full shadow-lg hover:bg-amber-100 transition-colors"
                aria-label="Call AQ Dental Clinic"
              >
                <span className="text-base md:text-xl" aria-hidden="true">📞</span>
                <span>0332 3811434</span>
              </a>
              <div className="flex items-center gap-2 md:gap-3 text-gray-700 font-semibold bg-gray-50 px-3 md:px-6 py-2 md:py-3 rounded-full shadow-lg">
                <span className="text-base md:text-xl" aria-hidden="true">📍</span>
                <span>Alamdar Road, Quetta, Pakistan</span>
              </div>
            </address>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}