"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Props {
  property: {
    id: string;
    name: string;
    image: string;
    images?: string[];
    rating: number;
    reviews: number;
    location: string;
    country: string;
    type: string;
    beds: number;
    bedrooms: number;
    price: number;
    isGuestFavorite?: boolean;
  };
}

export default function PropertyCard({ property }: Props) {
  const [liked, setLiked] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const images = property.images || [property.image];

  useEffect(() => {
    const saved = localStorage.getItem('nestora_favs');
    if (saved) {
      const arr = JSON.parse(saved);
      setLiked(arr.includes(property.id));
    }
  }, [property.id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = localStorage.getItem('nestora_favs');
    let arr = saved ? JSON.parse(saved) : [];
    if (liked) arr = arr.filter((id: string) => id !== property.id);
    else arr.push(property.id);
    localStorage.setItem('nestora_favs', JSON.stringify(arr));
    setLiked(!liked);
  };

  const prev = (e: React.MouseEvent) => { e.preventDefault(); setImgIdx((i) => (i === 0 ? images.length - 1 : i - 1)); };
  const next = (e: React.MouseEvent) => { e.preventDefault(); setImgIdx((i) => (i === images.length - 1 ? 0 : i + 1)); };

  return (
    <Link href={`/properties/${property.id}`} className="group block bg-white rounded-3xl overflow-hidden shadow-lg border border-cream/20 hover:shadow-2xl transition-all hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={images[imgIdx]} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Carousel dots/arrows */}
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100" aria-label="Previous"><ChevronLeft size={14} /></button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100" aria-label="Next"><ChevronRight size={14} /></button>
            <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/40 text-white text-[10px] font-bold rounded-full backdrop-blur-sm">{imgIdx + 1} / {images.length}</div>
          </>
        )}

        <button onClick={toggleLike} className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg hover:scale-110 transition-transform active:scale-95" aria-label="Favorite">
          <svg className={`w-5 h-5 ${liked ? 'fill-[#FB8605] text-[#FB8605]' : 'text-navy/50'}`} viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        </button>

        {property.isGuestFavorite && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
            <span className="text-[10px] font-black text-[#021F59] uppercase tracking-wider">Guest Favorite</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-[#021F59] text-base leading-snug group-hover:text-[#FB8605] transition-colors">{property.name}</h3>
          <div className="flex items-center gap-0.5 shrink-0 mt-0.5">
            <Star className="w-3.5 h-3.5 fill-[#FFB909] text-[#FFB909]" />
            <span className="text-sm font-bold text-[#021F59]">{property.rating}</span>
          </div>
        </div>
        <p className="text-xs text-navy/50 mb-1">{property.location}, {property.country}</p>
        <p className="text-[11px] text-navy/40 mb-2">{property.type} · {property.bedrooms} bed · {property.beds} guests</p>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-black text-[#021F59]">${property.price}</span>
          <span className="text-xs text-navy/40">/ night</span>
        </div>
      </div>
    </Link>
  );
}
