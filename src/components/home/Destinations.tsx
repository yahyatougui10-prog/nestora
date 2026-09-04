"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DestinationProps {
  name: string;
  stays: string;
  image: string;
  className?: string;
}

function DestinationCard({ name, stays, image, className }: DestinationProps) {
  const router = useRouter();
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => router.push(`/explore?location=${encodeURIComponent(name)}`)}
      className={cn(
        "relative overflow-hidden rounded-3xl cursor-pointer group h-full min-h-[300px]",
        className
      )}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

      <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
        <div className="text-white">
          <h3 className="text-2xl font-bold mb-1">{name}</h3>
          <p className="text-sm text-cream/70">{stays} unique stays</p>
        </div>

        <motion.div
          whileHover={{ x: 5 }}
          className="bg-golden text-navy p-3 rounded-full shadow-lg"
        >
          <ArrowRight size={20} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Destinations() {
  const destinations = [
    {
      name: 'Marrakech',
      stays: '1,240',
      image: 'https://images.unsplash.com/photo-1597212618440-82c75a67977a?auto=format&fit=crop&q=80&w=800',
      className: 'md:col-span-2 md:row-span-2',
    },
    {
      name: 'Chefchaouen',
      stays: '450',
      image: 'https://images.unsplash.com/photo-1548013146-7247976867ad?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Essaouira',
      stays: '320',
      image: 'https://images.unsplash.com/photo-1539020140153-3737366c696d?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Agadir',
      stays: '610',
      image: 'https://images.unsplash.com/photo-1505832018823-50331d70d237?auto=format&fit=crop&q=80&w=800',
      className: 'md:row-span-2',
    },
    {
      name: 'Tangier',
      stays: '280',
      image: 'https://images.unsplash.com/photo-1590001158193-7ef69568623b?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Casablanca',
      stays: '890',
      image: 'https://images.unsplash.com/photo-1539667468223-7747c338798a?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-navy mb-4">Explore the Wonders</h2>
        <p className="text-navy/60 max-w-2xl mx-auto">
          From the blue streets of Chefchaouen to the golden dunes of the Sahara.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {destinations.map((dest) => (
          <DestinationCard key={dest.name} {...dest} />
        ))}
      </div>
    </section>
  );
}
