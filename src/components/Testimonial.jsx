import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  { quote: "Newly started AQ Dental Clinic is very good of it's kind, the place is so clean, doctors are professional and humble. Equipment and service is too good. Doctors treated me very professionally.", author: "Syed Salman Haider", rating: 5 },
  { quote: "Totally recommended one of the best dental clinic in Quetta. Doctors are very cooperative n highly qualified. 👍 The clinic is organized n clean.", author:"Tahira Moiz" , rating: 5 },
  { quote: "I got veneers here and my confidence soared. Highly recommend!", author: "M.T.", rating: 5 },
  { quote: "Professional, punctual, and gentle care. My go‑to dentist in Abbottabad.", author: "A.H.", rating: 5 },
  { quote: "Exceptional implants and follow‑up. Definitely worth every penny.", author: "Z.F.", rating: 5 },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  // Cycle every 7s
  useEffect(() => {
    const iv = setInterval(() => setIndex(i => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(iv);
  }, []);

  const prev = () => setIndex(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIndex(i => (i + 1) % TESTIMONIALS.length);

  // Scroll‑parallax + mouse‑parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const x = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });
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
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  };

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-white text-gray-900 overflow-hidden py-20"
      aria-labelledby="testimonials-title"
    >
      {/* Golden Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-16 left-16 w-24 h-24 bg-gradient-to-br from-yellow-100/50 to-amber-100/50 rounded-full blur-xl"
          animate={floating}
          style={{ x }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-amber-100/40 to-yellow-100/40 rounded-full blur-2xl"
          animate={{
            y: [15, -15, 15],
            rotate: [0, -5, 5, 0],
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ x: useTransform(x, [-1, 1], [10, -10]) }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Content */}
      <motion.div className="relative z-10 max-w-3xl mx-auto px-4" style={{ y }}>
        <h2
          id="testimonials-title"
          className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-amber-800 via-yellow-600 to-amber-600 bg-clip-text text-transparent"
        >
          What Our Patients Say
        </h2>

        <AnimatePresence initial={false} mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: 'easeIn' } }}
            className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 mb-8 text-center shadow-xl"
            itemScope
            itemType="https://schema.org/Review"
          >
            <p itemProp="reviewBody" className="text-lg leading-relaxed mb-4">
              “{TESTIMONIALS[index].quote}”
            </p>
            <div className="flex justify-center mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              {[...Array(TESTIMONIALS[index].rating)].map((_, i) => (
                <Star key={i} size={20} className="text-yellow-500 fill-yellow-500 mx-0.5" />
              ))}
              <meta itemProp="ratingValue" content={`${TESTIMONIALS[index].rating}`} />
            </div>
            <cite itemProp="author" className="font-semibold text-gray-800">
              — {TESTIMONIALS[index].author}
            </cite>
          </motion.blockquote>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-full shadow-lg hover:opacity-90 transition"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition ${i === index ? 'bg-yellow-500' : 'bg-white/40'}`}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="p-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-full shadow-lg hover:opacity-90 transition"
          >
            ›
          </button>
        </div>
      </motion.div>

      {/* JSON‑LD for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          "name": "AQ Dental Clinic Abbottabad",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": 5,
            "reviewCount": TESTIMONIALS.length
          },
          "review": TESTIMONIALS.map(t => ({
            "@type": "Review",
            "reviewBody": t.quote,
            "author": { "@type": "Person", "name": t.author },
            "reviewRating": { "@type": "Rating", "ratingValue": t.rating }
          }))
        })}
      </script>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
