import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What treatments are available at AQ Dental Clinic & Associates?',
    answer: 'We offer everything from routine cleanings and fillings to advanced cosmetics (veneers, whitening), implants & prosthesis, orthodontics, gum therapy, and emergency care—all under one roof.',
  },
  {
    question: 'How do I book an appointment?',
    answer: 'Just call or WhatsApp us at 0332 3811434, or click “Book Appointment” on our website. We’ll confirm your preferred date and time right away.',
  },
  {
    question: 'Are you open on weekends?',
    answer: 'Yes—we’re open Monday through Sunday from 10 AM to 9 PM to accommodate busy schedules.',
  },
  {
    question: 'Do you offer sedation or pain‑management options?',
    answer: 'Absolutely. We provide oral sedation and nitrous oxide (laughing gas) for anxious patients—just let us know when booking.',
  },
  {
    question: 'Is there parking available at the clinic?',
    answer: 'Yes—a dedicated parking area is right outside our Alamdar Road entrance, making your visit stress‑free.',
  },
];

const faqVariants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  open:   { height: 'auto', opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
};

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  // scroll‑parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const x = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  // mouse‑parallax
  useEffect(() => {
    const handleMouse = e => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - (rect.left + rect.width / 2)) / 50);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [x]);

  const toggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      ref={containerRef}
      className="relative bg-white text-gray-900 overflow-hidden py-20"
      aria-labelledby="faq-heading"
      style={{ transform: y }}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
        aria-hidden="true"
      />

      {/* floating amber orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-16 left-16 w-28 h-28 bg-gradient-to-br from-amber-100/50 to-yellow-100/50 rounded-full blur-2xl"
          animate={{ y: [-15, 15, -15], rotate: [0, 10, -10, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ x }}
        />
        <motion.div
          className="absolute bottom-16 right-16 w-36 h-36 bg-gradient-to-br from-yellow-100/40 to-amber-100/40 rounded-full blur-3xl"
          animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ x: useTransform(x, [-1, 1], [10, -10]) }}
        />
      </div>

      <motion.h2
        id="faq-heading"
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      >
        FAQs about AQ Dental Clinic & Associates
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-4 px-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-amber-50 border border-amber-100 rounded-2xl overflow-hidden shadow"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold hover:bg-amber-100 transition-colors"
              itemProp="name"
              aria-expanded={openIndex === idx}
            >
              {faq.question}
              <motion.span
                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openIndex === idx
                  ? <ChevronUp className="w-6 h-6 text-yellow-600" />
                  : <ChevronDown className="w-6 h-6 text-yellow-600" />}
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  className="px-6 pb-6 text-gray-800 text-base"
                  variants={faqVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
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
