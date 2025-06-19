import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransformationGallery() {
  const galleryImages = [
    '/transformatin1.jpg',
    '/transformatin2.jpg',
    '/transformatin3.jpg',
    '/transformation4.jpg',
    '/transformation5.jpg',
    '/transformation6.jpg',
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImage((prev) => (prev === src ? null : src));
  };

  return (
    <section
      id="transformations"
      className="py-20 bg-white"
      aria-labelledby="transformations-heading"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          id="transformations-heading"
          className="text-3xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Smile Transformations
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Witness the life-changing results at AQ Dental Clinic & Associates. Our expert team uses advanced technology and gentle techniques to deliver stunning smile makeovers, boosting your confidence and oral health.
        </motion.p>

        {/* Gallery Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12"
          aria-label="Smile transformation gallery"
        >
          {galleryImages.map((src, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl shadow-md cursor-pointer"
              onClick={() => handleImageClick(src)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <img
                src={src}
                alt={`Smile transformation ${idx + 1}`}
                className="w-full h-72 object-cover transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal Viewer */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Enlarged transformation"
              className="max-w-[90vw] max-h-[80vh] rounded-2xl shadow-lg"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEO JSON-LD Fix */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "AQ Dental Clinic Smile Transformations",
          "description":
            "Before and after images showcasing smile makeovers at AQ Dental Clinic & Associates in Quetta.",
          "image": galleryImages.map((img) => `https://yourdomain.com${img}`), // replace with actual domain
        })}
      </script>
    </section>
  );
}
