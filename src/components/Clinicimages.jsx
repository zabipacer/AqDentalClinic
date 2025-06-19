import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clinicImages = [
  "/aq1.jpg",
  "/aq2.jpg",
  "/aq3.jpg",
  "/aq4.jpg",
  "/aq5.jpg",
];

export default function ClinicCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((current - 1 + clinicImages.length) % clinicImages.length);
  const next = () => setCurrent((current + 1) % clinicImages.length);

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white py-12 px-4 rounded-2xl shadow-xl">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">
          Inside AQ Dental Clinic Quetta
        </h2>
        <p className="text-gray-300 mb-8">
          A calm, clean and modern clinic space — designed for your comfort,
          care, and confidence.
        </p>

        <div className="relative">
          <img
            src={clinicImages[current]}
            alt={`Clinic view ${current + 1}`}
            className="rounded-2xl w-[300px] mx-auto object-cover transition-all duration-500 shadow-lg"
          />

          <button
            onClick={prev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {clinicImages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
