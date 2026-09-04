"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Hero from '@/components/home/Hero';
import { SearchBar } from '@/components/home/SearchBar';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import PropertyGrid from '@/components/property/PropertyGrid';
import Destinations from '@/components/home/Destinations';
import FeaturedExperience from '@/components/home/FeaturedExperience';
import PremiumCollection from '@/components/home/PremiumCollection';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      <Hero />

      <div className="bg-cream/30">
        <SearchBar />
        <CategoryCarousel />
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <div aria-hidden className="ornament-divider mb-4">
                <span className="zellige-star text-lg text-golden" />
              </div>
              <h2 className="text-4xl font-bold text-navy mb-4">Stay somewhere unforgettable</h2>
              <p className="text-navy/60 max-w-xl">
                Explore unique homes and extraordinary spaces that inspire your next journey.
              </p>
            </div>
            <Link href="/explore">
              <Button variant="outline" size="sm">
                Explore all stays →
              </Button>
            </Link>
          </div>
          <PropertyGrid />
        </section>
      </div>

      <Destinations />

      <FeaturedExperience />

      <PremiumCollection />

      <RecentlyViewed />

      <section className="relative py-24 px-6 bg-navy text-cream text-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 pattern-zellige-gold opacity-25" />
        <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] glow-gold opacity-30 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto space-y-8">
          <div aria-hidden className="ornament-divider mx-auto justify-center">
            <span className="zellige-star text-xl text-golden" />
          </div>
          <h2 className="text-5xl font-bold leading-tight">
            Ready to find <br />
            <span className="text-golden">your place to belong?</span>
          </h2>
          <p className="text-xl text-cream/60 font-light">
            Discover Morocco. Stay beautifully — hand-picked riads, desert camps and hidden gems across the Kingdom.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/explore">
              <Button size="lg">Start Your Adventure</Button>
            </Link>
            <Link href="/host">
              <Button variant="secondary" size="lg">
                Become a Host
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
