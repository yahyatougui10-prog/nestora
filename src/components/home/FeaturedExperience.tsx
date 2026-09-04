"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FeaturedExperience() {
  const experiences = [
    'Moroccan cooking classes',
    'Desert adventures',
    'Surf lessons',
    'Traditional workshops',
    'Mountain excursions',
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <motion.img
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1539635278303-d40027563669?auto=format&fit=crop&q=80&w=1000"
            alt="Moroccan Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
        </div>

        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-navy leading-tight">
              More than a <span className="text-orange">stay.</span>
            </h2>
            <p className="text-xl text-navy/60 font-light leading-relaxed">
              Discover experiences created by local hosts. Immerse yourself in the culture,
              learn ancient crafts, and explore hidden gems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {experiences.map((exp) => (
              <motion.div
                key={exp}
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-cream/20 text-navy font-medium transition-all hover:shadow-md"
              >
                <div className="w-2 h-2 rounded-full bg-golden" />
                {exp}
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-golden hover:bg-orange text-navy font-bold px-8 py-4 rounded-2xl w-fit transition-colors shadow-lg"
          >
            Explore experiences
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
