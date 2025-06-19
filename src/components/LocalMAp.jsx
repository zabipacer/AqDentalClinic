import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Star } from 'lucide-react';

const LOCAL_INFO = {
  name: 'AQ Dental Clinic & Associates',
  subtitle: 'Premium Dental Care in Quetta',
  address: '52VC+JG9, Alamdar Road, Quetta, Pakistan',
  phone: '+923323811434',
  hours: 'Monday to Sunday 10:00–21:00',
  rating: 5.0,
  reviewCount: 6,
  category: 'Dental Clinic',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.519362140135!2d67.02157390185243!3d30.193720908330928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed2dfa06d9c129d%3A0x1df17baa8020b116!2sAQ%20Dental%20Clinic%20%26%20Associates!5e0!3m2!1sen!2s!4v1750089209718!5m2!1sen!2s',
};

export default function LocalSEOSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section
      id="location"
      className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-white text-gray-900 relative overflow-hidden"
      aria-labelledby="location-title"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Map Embed */}
        <motion.div
          className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <iframe
            title={`${LOCAL_INFO.name} Location`}
            src={LOCAL_INFO.mapEmbedUrl}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Info Panel */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <h2
            id="location-title"
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-600 bg-clip-text text-transparent"
          >
            {LOCAL_INFO.name}
          </h2>
          <p className="text-gray-600 italic">{LOCAL_INFO.subtitle}</p>

          <ul className="space-y-4 text-gray-700 text-lg">
            <li className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-amber-500" />
              <address className="not-italic">{LOCAL_INFO.address}</address>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-yellow-500" />
              <a href={`tel:${LOCAL_INFO.phone}`} className="underline">
                {LOCAL_INFO.phone.replace('+', '')}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              <span>
                {LOCAL_INFO.rating.toFixed(1)} ★ ({LOCAL_INFO.reviewCount} reviews)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 text-purple-500">⚡</span>
              <span>{LOCAL_INFO.category}</span>
            </li>
            <li className="flex items-start gap-3">
              <strong>Hours:</strong>
              <span>{LOCAL_INFO.hours}</span>
            </li>
          </ul>

          {/* JSON‑LD Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Dentist',
                name: LOCAL_INFO.name,
                telephone: LOCAL_INFO.phone,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: LOCAL_INFO.address,
                  addressLocality: 'Quetta',
                  addressCountry: 'PK',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 30.1937209,
                  longitude: 67.0215739,
                },
                openingHours: LOCAL_INFO.hours,
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: LOCAL_INFO.rating.toFixed(1),
                  reviewCount: LOCAL_INFO.reviewCount.toString(),
                },
              }),
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
