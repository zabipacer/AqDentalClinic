import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  FaClinicMedical,
  FaTooth,
  FaShieldAlt,
  FaSmile,
  FaRegLaughBeam,
  FaProcedures,
} from 'react-icons/fa';

export default function FeaturedServices() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.8,
      rotateX: -15 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        type: 'spring', 
        stiffness: 120, 
        damping: 20,
        duration: 0.8
      },
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      rotateX: 5,
      z: 50,
      boxShadow: '0px 25px 50px rgba(59, 130, 246, 0.25)',
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 20
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.6 }
    }
  };

  const services = [
    { 
      icon: FaClinicMedical, 
      title: 'Comprehensive Dental Checkups', 
      desc: 'Thorough oral health evaluations using advanced diagnostic technology for early detection and prevention',
      features: ['Digital X-rays', 'Oral cancer screening', 'Gum health assessment'],
      link: '/services/checkups',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: FaTooth, 
      title: 'Professional Teeth Cleaning', 
      desc: 'Deep scaling and polishing treatments that remove plaque, tartar, and stains for optimal oral hygiene',
      features: ['Ultrasonic cleaning', 'Stain removal', 'Fluoride application'],
      link: '/services/cleaning',
      color: 'from-emerald-500 to-teal-500'
    },
    { 
      icon: FaShieldAlt, 
      title: 'Advanced Fluoride Therapy', 
      desc: 'Strengthen tooth enamel and prevent cavities with our professional-grade fluoride treatments',
      features: ['Enamel strengthening', 'Cavity prevention', 'Sensitivity reduction'],
      link: '/services/fluoride',
      color: 'from-teal-500 to-blue-500'
    },
    { 
      icon: FaSmile, 
      title: 'Professional Teeth Whitening', 
      desc: 'Achieve a brilliant smile up to 8 shades brighter with our safe, effective whitening systems',
      features: ['Same-day results', 'Long-lasting effects', 'Safe for enamel'],
      link: '/services/whitening',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      icon: FaRegLaughBeam, 
      title: 'Complete Smile Makeovers', 
      desc: 'Transform your smile with personalized treatment plans including veneers, bonding, and orthodontics',
      features: ['Custom treatment plans', 'Porcelain veneers', 'Orthodontic options'],
      link: '/services/smile-makeover',
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      icon: FaProcedures, 
      title: 'Digital Dentistry Solutions', 
      desc: 'Experience precision dental care with 3D imaging, digital impressions, and computer-guided treatments',
      features: ['3D imaging', 'Digital impressions', 'Precise diagnostics'],
      link: '/services/digital-dentistry',
      color: 'from-teal-500 to-emerald-500'
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="dental-services"
      aria-labelledby="services-heading"
      className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-24 overflow-hidden"
      style={{ y, opacity, scale }}
      itemScope
      itemType="https://schema.org/Dentist"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-100/30 to-teal-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-emerald-100/20 to-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-teal-100/40 to-cyan-100/40 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.header 
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 text-sm font-semibold rounded-full border border-blue-200/50">
              ✨ Premium Dental Care
            </span>
          </motion.div>
          
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-teal-700 bg-clip-text text-transparent mb-6 leading-tight"
            itemProp="name"
          >
            Comprehensive Dental Services
          </h2>
          
          <p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            itemProp="description"
          >
            Experience exceptional dental care with our full range of services, from preventive treatments 
            to advanced cosmetic procedures, all delivered with cutting-edge technology and personalized attention.
          </p>
        </motion.header>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          role="list"
          aria-label="Dental services offered"
        >
          {services.map(({ icon: Icon, title, desc, features, link, color }, idx) => (
            <motion.article
              key={title}
              className="group relative bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 cursor-pointer overflow-hidden shadow-lg"
              variants={cardVariants}
              whileHover="hover"
              style={{ 
                transformStyle: 'preserve-3d',
              }}
              role="listitem"
              itemScope
              itemType="https://schema.org/Service"
            >
              {/* Hover Gradient Overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5`}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.6 }}
                aria-hidden="true"
              />

              <div className="relative flex flex-col items-start text-left h-full">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-6 shadow-lg`}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                </motion.div>

                {/* Content */}
                <div className="flex-grow">
                  <motion.h3
                    className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors duration-300"
                    itemProp="name"
                  >
                    <a
                      href={link}
                      className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                      aria-label={`Learn more about ${title}`}
                    >
                      {title}
                    </a>
                  </motion.h3>

                  <motion.p
                    className="text-slate-600 text-base mb-4 leading-relaxed"
                    itemProp="description"
                  >
                    {desc}
                  </motion.p>

                  {/* Features List */}
                  <motion.ul 
                    className="space-y-2 mb-6"
                    itemProp="hasOfferCatalog"
                    itemScope 
                    itemType="https://schema.org/OfferCatalog"
                  >
                    {features.map((feature, featureIdx) => (
                      <motion.li
                        key={feature}
                        className="flex items-center text-sm text-slate-600"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIdx, duration: 0.5 }}
                        itemProp="itemListElement"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color} mr-3 flex-shrink-0`} />
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* CTA */}
                <motion.div
                  className="flex items-center text-blue-600 font-semibold group-hover:text-teal-600 transition-colors duration-300"
                  initial={{ x: -10, opacity: 0.7 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="mr-2">Learn More</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </div>

              {/* Card Number */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100/50 flex items-center justify-center text-slate-400 text-sm font-bold"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1 * idx, type: 'spring' }}
                aria-hidden="true"
              >
                {String(idx + 1).padStart(2, '0')}
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Schedule Your Consultation</span>
            <motion.svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Professional Dental Services",
            "description": "Comprehensive dental care including checkups, cleaning, whitening, and digital dentistry",
            "serviceType": services.map(service => service.title),
            "areaServed": {
              "@type": "City",
              "name": "Your City"
            }
          })
        }}
      />
    </motion.section>
  );
}