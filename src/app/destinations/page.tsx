"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const destinations = [
  { name: 'Marrakech', country: 'Morocco', stays: 1240, image: 'https://images.unsplash.com/photo-1597212618440-82c75a67977a?auto=format&fit=crop&q=80&w=1200', desc: 'The Red City enchants with its souks, palaces, and gardens.' },
  { name: 'Essaouira', country: 'Morocco', stays: 320, image: 'https://images.unsplash.com/photo-1539020140153-3737366c696d?auto=format&fit=crop&q=80&w=1200', desc: 'A windswept coastal gem with blue boats and historic medina.' },
  { name: 'Chefchaouen', country: 'Morocco', stays: 450, image: 'https://images.unsplash.com/photo-1548013146-7247976867ad?auto=format&fit=crop&q=80&w=1200', desc: 'The blue pearl of the Rif Mountains.' },
  { name: 'Agadir', country: 'Morocco', stays: 610, image: 'https://images.unsplash.com/photo-1505832018823-50331d70d237?auto=format&fit=crop&q=80&w=1200', desc: 'Sun-soaked beaches and modern luxury resorts.' },
  { name: 'Tangier', country: 'Morocco', stays: 280, image: 'https://images.unsplash.com/photo-1590001158193-7ef69568623b?auto=format&fit=crop&q=80&w=1200', desc: 'Where Africa meets Europe at the gateway to the Mediterranean.' },
  { name: 'Casablanca', country: 'Morocco', stays: 890, image: 'https://images.unsplash.com/photo-1539667468223-7747c338798a?auto=format&fit=crop&q=80&w=1200', desc: 'Morocco\'s largest city blends Art Deco charm with modern style.' },
  { name: 'Paris', country: 'France', stays: 2100, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1200', desc: 'The City of Light awaits with iconic landmarks and culture.' },
  { name: 'Barcelona', country: 'Spain', stays: 1800, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=1200', desc: 'Gaudí architecture, tapas, and Mediterranean vibes.' },
  { name: 'Dubai', country: 'UAE', stays: 1500, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200', desc: 'Futuristic skyline meets Arabian hospitality.' },
];

export default function DestinationsPage() {
  const router = useRouter();

  return (
    <div className="pt-20 pb-12 px-6">
      <section className="max-w-7xl mx-auto pt-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Explore Destinations</h1>
        <p className="text-xl text-navy/60 max-w-2xl">From the blue streets of Chefchaouen to the golden dunes of the Sahara. Find your next unforgettable destination.</p>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <motion.div key={dest.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <button onClick={() => router.push(`/explore?location=${dest.name}`)}
                className="w-full text-left group">
                <div className="relative overflow-hidden rounded-3xl h-[320px]">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white mb-1">{dest.name}, {dest.country}</h3>
                    <p className="text-cream/70 text-sm mb-3">{dest.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cream/60">{dest.stays.toLocaleString()} unique stays</span>
                      <div className="bg-golden text-navy p-2 rounded-full group-hover:bg-orange transition-colors">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
