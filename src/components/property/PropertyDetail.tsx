"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Wifi, Wind, Utensils, Car, MapPin, ShieldCheck, User, Heart } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PropertyDetailsProps {
  property: {
    name: string;
    location: string;
    rating: number;
    reviews: number;
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
    description: string;
    price: number;
    images: string[];
    host: {
      name: string;
      avatar: string;
      isSuperhost: boolean;
    };
    amenities: { name: string; icon: React.ElementType }[];
  };
}

export default function PropertyDetail({ property }: PropertyDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-navy mb-2">{property.name}</h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm font-medium text-navy">
            <div className="flex items-center gap-1">
              <Star size={16} fill="#FFB909" className="text-golden" />
              <span>{property.rating} · {property.reviews} reviews</span>
            </div>
            <span className="text-navy/30">|</span>
            <span className="flex items-center gap-1"><MapPin size={16} /> {property.location}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-navy/20 hover:bg-navy/5 transition-colors text-sm font-bold text-navy"
            >
              <Heart
                size={18}
                fill={isFavorite ? "#FFB909" : "transparent"}
                className={cn(isFavorite ? "text-golden" : "text-navy")}
              />
              {isFavorite ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] rounded-3xl overflow-hidden mb-12">
        <div className="md:col-span-2 md:row-span-2 relative overflow-hidden cursor-pointer group">
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="relative overflow-hidden cursor-pointer group">
          <img src={property.images[1]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="relative overflow-hidden cursor-pointer group">
          <img src={property.images[2]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="relative overflow-hidden cursor-pointer group">
          <img src={property.images[3]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="relative overflow-hidden cursor-pointer group">
          <img src={property.images[4]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Property Overview */}
          <div className="flex items-center justify-between pb-8 border-b border-navy/10">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-1">Entire villa hosted by {property.host.name}</h2>
              <p className="text-navy/60">
                {property.guests} guests · {property.bedrooms} bedrooms · {property.beds} beds · {property.baths} baths
              </p>
            </div>
            {property.host.isSuperhost && (
              <div className="flex items-center gap-2 px-3 py-1 bg-golden/10 text-golden rounded-full text-xs font-bold uppercase tracking-widest">
                <ShieldCheck size={14} />
                Superhost
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-navy">About this place</h3>
            <p className="text-navy/70 leading-relaxed text-lg">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-navy">What this place offers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity.name} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-cream/20 text-navy font-medium">
                  <amenity.icon size={20} className="text-golden" />
                  {amenity.name}
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-2xl border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition-all">
              Show all amenities
            </button>
          </div>

          {/* Host Section */}
          <div className="pt-12 border-t border-navy/10 flex flex-col sm:flex-row items-center gap-8">
            <img
              src={property.host.avatar}
              alt={property.host.name}
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
            <div className="text-center sm:text-left space-y-2">
              <h3 className="text-2xl font-bold text-navy">Hosted by {property.host.name}</h3>
              <p className="text-navy/60 max-w-md">
                Passionate about sharing the beauty of Morocco. I&apos;m here to make your stay unforgettable.
              </p>
              <button className="mt-4 px-6 py-2 bg-navy text-cream rounded-full font-bold hover:bg-orange transition-colors">
                Contact Host
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Booking Card */}
        <div className="relative">
          <div className="sticky top-32 bg-white p-8 rounded-3xl shadow-2xl border border-cream/20 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-3xl font-bold text-navy">${property.price}</span>
                <span className="text-navy/60 ml-1">/ night</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-navy">
                <Star size={16} fill="#FFB909" className="text-golden" />
                {property.rating}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-2 border-navy/10 rounded-2xl overflow-hidden">
              <div className="p-3 border-r border-b border-navy/10 cursor-pointer hover:bg-cream/20">
                <span className="block text-[10px] font-bold text-navy uppercase">Check-in</span>
                <span className="text-sm text-navy/60">Add date</span>
              </div>
              <div className="p-3 border-b border-navy/10 cursor-pointer hover:bg-cream/20">
                <span className="block text-[10px] font-bold text-navy uppercase">Check-out</span>
                <span className="text-sm text-navy/60">Add date</span>
              </div>
              <div className="p-3 col-span-2 cursor-pointer hover:bg-cream/20">
                <span className="block text-[10px] font-bold text-navy uppercase">Guests</span>
                <span className="text-sm text-navy/60">Add guests</span>
              </div>
            </div>

            <Link
              href="/reserve"
              className="block w-full text-center bg-golden hover:bg-orange text-navy font-bold py-4 rounded-2xl shadow-lg transition-colors"
            >
              Reserve
            </Link>

            <div className="space-y-3 pt-6 border-t border-navy/10">
              <div className="flex justify-between text-navy/60">
                <span>${property.price} x 3 nights</span>
                <span>${property.price * 3}</span>
              </div>
              <div className="flex justify-between text-navy/60">
                <span>Cleaning fee</span>
                <span>$45</span>
              </div>
              <div className="flex justify-between text-navy/60">
                <span>Service fee</span>
                <span>$25</span>
              </div>
              <div className="flex justify-between font-bold text-navy text-lg pt-4 border-t border-navy/10">
                <span>Total</span>
                <span>${property.price * 3 + 70}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
