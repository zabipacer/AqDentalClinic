import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Star } from 'lucide-react';

const LOCAL_INFO = {
  name: 'Muzzamil Dental Clinic',
  subtitle: 'Dr. Muzzamil Shabbir',
  address: 'Latifabad Unit 6, Latifabad, Hyderabad, 71000, Pakistan',
  phone: '+923123456789',
  hours: 'Open ⋅ Closes 10 PM',
  rating: 4.9,
  reviewCount: 84,
  category: 'Dental Clinic',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3605.1347176627205!2d68.34643307538741!3d25.366801077602133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDIyJzAwLjUiTiA2OMKwMjAnNTYuNCJF!5e0!3m2!1sen!2s!4v1749919568324!5m2!1sen!2s'
};

export default function LocalSEOSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section
      id="location"
      className="py-20 bg-white text-gray-900 font-poppins relative overflow-hidden"
      aria-labelledby="location-title"
    >
      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Map Embed */}
        <motion.div
          className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200"
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
          <h2 id="location-title" className="text-3xl md:text-4xl font-bold text-gray-900">
            {LOCAL_INFO.name}
          </h2>
          <p className="text-gray-500 italic">{LOCAL_INFO.subtitle}</p>

          <ul className="space-y-4 text-gray-700 text-lg">
            <li className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-blue-500 animate-bounce" />
              <address className="not-italic">{LOCAL_INFO.address}</address>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-green-500 animate-pulse" />
              <a href={`tel:${LOCAL_INFO.phone}`} className="underline">
                {LOCAL_INFO.phone.replace('+', '')}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              <span>
                {LOCAL_INFO.rating} ★ ({LOCAL_INFO.reviewCount} Google reviews)
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

          {/* JSON-LD Schema Markup */}
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
                  addressLocality: 'Hyderabad',
                  postalCode: '71000',
                  addressCountry: 'PK'
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 25.3668011,
                  longitude: 68.349008
                },
                openingHours: LOCAL_INFO.hours,
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: LOCAL_INFO.rating.toString(),
                  reviewCount: LOCAL_INFO.reviewCount.toString()
                }
              })
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
