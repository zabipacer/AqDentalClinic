import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckSquare } from 'lucide-react';

const faqs = [
  {
    question: 'Which specialties does Muzzamil Dental Clinic offer?',
    answer: 'We cover maxillofacial surgery, orthodontics, implants & prosthesis, gums treatment, teeth whitening, and family dentistry under one roof.',
  },
  {
    question: 'How can I book an appointment with Dr. Muzzammil?',
    answer: 'Simply call us at +92 312 3456789, WhatsApp that number, or click “Book Appointment” on our site to choose your preferred slot.',
  },
  {
    question: 'Do you provide sedation for anxious patients?',
    answer: 'Yes—oral sedation and nitrous oxide (laughing gas) are available. Let us know during booking so we can prepare.',
  },
  {
    question: 'What are your payment methods?',
    answer: 'We accept cash, all major cards, and mobile wallets. Flexible installment plans through partner banks are also available.',
  },
  {
    question: 'Is parking available at Bahria Town Phase 7?',
    answer: 'Absolutely—a dedicated parking lot right outside Jasmine Plaza makes your visit hassle-free.',
  }
];

const faqVariants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  open:   { height: 'auto', opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
};

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  // scroll-parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useTransform(scrollYProgress, [0,1], ['0%','-20%']);

  // mouse-parallax
  useEffect(() => {
    const handleMouse = e => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - (rect.left + rect.width/2)) / 50);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [x]);

  const toggle = idx => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section
      id="faq"
      ref={containerRef}
      className="relative bg-slate-50 text-slate-800 font-poppins overflow-hidden py-20"
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
      style={{ y }}
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-16 left-16 w-28 h-28 bg-gradient-to-r from-blue-100/50 to-teal-100/50 rounded-full blur-2xl"
          animate={{ y: [-15,15,-15], rotate: [0,10,-10,0], transition:{ duration:6, repeat:Infinity, ease:'easeInOut' } }}
          style={{ x }}
        />
        <motion.div
          className="absolute bottom-16 right-16 w-36 h-36 bg-gradient-to-r from-emerald-100/40 to-blue-100/40 rounded-full blur-3xl"
          animate={{ y: [10,-10,10], rotate: [0,-5,5,0], transition:{ duration:8, repeat:Infinity, ease:'easeInOut' } }}
          style={{ x: useTransform(x,[-1,1],[10,-10]) }}
        />
      </div>

      <motion.h2
        id="faq-heading"
        className="text-4xl md:text-5xl font-extrabold text-center mb-12"
        initial={{ opacity:0, y:-20 }}
        animate={{ opacity:1, y:0, transition:{ duration:0.7 } }}
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-4 px-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white/70 backdrop-blur-lg border border-slate-200 rounded-2xl overflow-hidden shadow-lg"
            itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold hover:bg-white/80 transition-colors"
              itemProp="name"
              aria-expanded={openIndex === idx}
            >
              {faq.question}
              <motion.span
                animate={{ rotate: openIndex===idx?180:0 }}
                transition={{ duration:0.3 }}
              >
                {openIndex === idx
                  ? <ChevronUp className="w-6 h-6 text-teal-500"/>
                  : <ChevronDown className="w-6 h-6 text-teal-500"/>}
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  className="px-6 pb-6 text-slate-700 text-base"
                  variants={faqVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                >
                  <div itemProp="text">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
