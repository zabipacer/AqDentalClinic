import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  { quote: "Pain-free cleaning and friendly staff—best experience ever!", author: "R.A.", rating: 5 },
  { quote: "Modern clinic, caring doctors. My kids actually looked forward to their checkup!", author: "S.K.", rating: 5 },
  { quote: "I got veneers here and my confidence soared. Highly recommend!", author: "M.T.", rating: 5 },
  { quote: "Professional, punctual, and gentle care. My go-to dentist in Multan.", author: "A.H.", rating: 5 },
  { quote: "Exceptional implants and follow-up. Definitely worth every penny.", author: "Z.F.", rating: 5 },
  { quote: "Beautiful office, warm staff, and Dr. Bucha is truly an artist with smiles.", author: "L.N.", rating: 5 },
  { quote: "Fast service and amazing results for whitening—my teeth have never looked better!", author: "K.P.", rating: 5 },
  { quote: "Clear explanations, no surprise bills. I felt comfortable every step of the way.", author: "T.R.", rating: 5 },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  // auto-cycle
  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setIndex(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIndex(i => (i + 1) % TESTIMONIALS.length);

  // scroll‐parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  useEffect(() => {
    const handleMouse = e => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - (rect.left + rect.width/2)) / 50);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [x]);

  const floating = {
    y: [-20, 20, -20],
    rotate: [0, 5, -5, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
  };

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 text-slate-800 overflow-hidden py-0"
      aria-labelledby="testimonials-title"
    >
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-16 left-16 w-24 h-24 bg-gradient-to-r from-blue-100/50 to-teal-100/50 rounded-full blur-xl"
          animate={floating}
          style={{ x }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-emerald-100/40 to-blue-100/40 rounded-full blur-2xl"
          animate={{
            y: [15, -15, 15],
            rotate: [0, -5, 5, 0],
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }}
          style={{ x: useTransform(x, [-1,1], [10,-10]) }}
        />
        {/* Decorative triangles */}
        <motion.svg
          className="absolute top-8 right-16 w-16 h-16 opacity-30"
          animate={{ rotate: [0,8,0,-8,0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          viewBox="0 0 100 100"
        >
          <polygon points="0,100 50,0 100,100" fill="#ffffff20" />
        </motion.svg>
        <motion.svg
          className="absolute bottom-8 left-12 w-20 h-20 opacity-20"
          animate={{ rotate: [0,-8,0,8,0] }}
          transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 0.3 }}
          viewBox="0 0 100 100"
        >
          <polygon points="0,100 50,0 100,100" fill="#ffffff30" />
        </motion.svg>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Inner Content with Parallax */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-4 py-20"
        style={{ y }}
      >
        <h2
          id="testimonials-title"
          className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-slate-800 via-blue-700 to-teal-700 bg-clip-text text-transparent leading-tight"
        >
          What Our Patients Say
        </h2>

        <AnimatePresence initial={false} mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: 'easeIn' } }}
            className="bg-white/70 backdrop-blur-lg border border-slate-200/50 rounded-2xl p-8 mb-8 flex flex-col items-center text-center shadow-xl"
          >
            <p className="text-lg md:text-xl leading-relaxed mb-4">
              “{TESTIMONIALS[index].quote}”
            </p>
            <div className="flex mb-4">
              {[...Array(TESTIMONIALS[index].rating)].map((_, i) => (
                <Star key={i} size={20} className="text-amber-400 fill-amber-400 mx-0.5" />
              ))}
            </div>
            <cite className="font-semibold text-slate-800">
              — {TESTIMONIALS[index].author}
            </cite>
          </motion.blockquote>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full shadow-lg hover:opacity-90 transition"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition ${i === index ? 'bg-teal-500' : 'bg-white/40'}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full shadow-lg hover:opacity-90 transition"
          >
            ›
          </button>
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-blue-50 to-transparent pointer-events-none" />
    </section>
  );
}
