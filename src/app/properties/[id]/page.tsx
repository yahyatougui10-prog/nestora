"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, MapPin, ShieldCheck, User, Heart, Wifi, Wind, Utensils, Car, Monitor, Waves, Scissors, Coffee, Tv, Flame, Droplets, Dumbbell, Bath, ArrowLeft, Calendar, Users, BedSingle, BedDouble, Trash2, MessageSquare, Grid3X3, SearchX, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_PROPERTIES, HOST_DATA, MOCK_REVIEWS } from '@/lib/data';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useAuthContext } from '@/context/AuthContext';
import { getPriceForDates, calculateNights, formatDate } from '@/lib/utils';
import { useToastContext } from '@/context/ToastContext';
import { BookingFlow } from '@/components/booking/BookingFlow';
import { MessageModal } from '@/components/booking/MessageModal';
import { GalleryViewer } from '@/components/property/GalleryViewer';
import { FavoriteButton } from '@/components/property/FavoriteButton';
import { StayMap } from '@/components/property/StayMap';
import { SmartImage } from '@/components/ui/SmartImage';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const amenityIcons: Record<string, React.ElementType> = {
  'Wi-Fi': Wifi, 'Pool': Waves, 'Kitchen': Utensils, 'Parking': Car,
  'Air conditioning': Wind, 'Workspace': Monitor,   'Ocean view': Waves,
  'Washing machine': Scissors, 'Washer': Scissors, 'TV': Tv,
  'Heating': Flame, 'Coffee maker': Coffee, 'Hot tub': Droplets,
  'Gym': Dumbbell, 'Essentials': Bath, 'Hair dryer': Wind,
};

export default function PropertyPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { isAuthenticated } = useAuthContext();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { recordView } = useRecentlyViewed();
  const { addToast } = useToastContext();
  const property = MOCK_PROPERTIES.find((p) => p.id === id);
  const reviews = MOCK_REVIEWS.filter((r) => r.propertyId === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryKey, setGalleryKey] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ checkIn: string; checkOut: string } | null>(null);
  const heroTouchX = React.useRef<number | null>(null);

  const stepHero = (dir: 1 | -1) => {
    const imgs = property?.images ?? [];
    if (imgs.length <= 1) return;
    setSelectedImage((i) =>
      dir === 1
        ? i === imgs.length - 1 ? 0 : i + 1
        : i === 0 ? imgs.length - 1 : i - 1
    );
  };

  const openGallery = (index: number) => {
    setGalleryKey((k) => k + 1);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (id) recordView(id as string);
  }, [id, recordView]);

  if (!property) {
    return (
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto grid place-items-center rounded-full bg-cream/50 mb-5">
          <SearchX size={40} className="text-navy/40" />
        </div>
        <h2 className="text-3xl font-bold text-navy mb-2">Property not found</h2>
        <p className="text-navy/60 mb-6">This property may have been removed.</p>
        <Link href="/explore">
          <Button>Back to Explore</Button>
        </Link>
      </div>
    );
  }

  const priceCalc = selectedDates
    ? getPriceForDates(property, selectedDates.checkIn, selectedDates.checkOut)
    : null;

  const isFav = isFavorite(property.id);

  return (
    <div className="pt-20 pb-24 lg:pb-12">
      {/* Gallery */}
      <div
        className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-6"
        onTouchStart={(e) => { heroTouchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (heroTouchX.current === null) return;
          const dx = e.changedTouches[0].clientX - heroTouchX.current;
          heroTouchX.current = null;
          if (Math.abs(dx) > 40) stepHero(dx < 0 ? 1 : -1);
        }}
      >
        <SmartImage
          src={property.images[selectedImage]}
          alt={property.name}
          eager
          sizes="100vw"
          className="w-full h-full"
          imgClassName="transition-opacity duration-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <button
              onClick={() => stepHero(-1)}
              aria-label="Previous photo"
              className="hidden sm:grid place-items-center w-11 h-11 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-golden"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="px-2.5 py-1 bg-black/45 text-white text-xs font-bold rounded-full backdrop-blur-md">
              {selectedImage + 1} / {property.images.length}
            </span>
            <button
              onClick={() => stepHero(1)}
              aria-label="Next photo"
              className="hidden sm:grid place-items-center w-11 h-11 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-golden"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <button
          onClick={() => openGallery(selectedImage)}
          aria-label="View all photos"
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-black/40 backdrop-blur-md rounded-full text-white text-sm font-medium hover:bg-black/60 transition-colors hidden sm:flex focus:outline-none focus-visible:ring-2 focus-visible:ring-golden"
        >
          <Grid3X3 size={16} /> View all photos ({property.gallery.length})
        </button>
        <button onClick={() => router.back()} aria-label="Go back" className="absolute top-4 left-4 grid place-items-center w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-golden">
          <ArrowLeft size={20} />
        </button>
        <div className="absolute top-4 right-4">
          <FavoriteButton propertyId={property.id} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-6 mb-8">
        {property.images.map((img, i) => (
          <button key={i} onClick={() => { setSelectedImage(i); openGallery(i); }} className={cn("aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-golden", i === selectedImage ? "border-golden" : "border-transparent hover:border-navy/20")}>
            <SmartImage src={img} alt={`${property.name} photo ${i + 1}`} className="w-full h-full" imgClassName="transition-transform duration-300" sizes="(max-width: 768px) 50vw, 25vw" />
          </button>
        ))}
      </div>

      <div className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10">
        {/* Property Info */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">{property.name}</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-navy/60">
                <span className="flex items-center gap-1"><MapPin size={16} />{property.location}, {property.country}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Star size={14} fill="#FFB909" className="text-golden" />{property.rating} · {property.reviews} reviews</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowMessage(true)} className="p-3 bg-navy text-cream rounded-xl hover:bg-orange transition-colors">
                <MessageSquare size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="px-3 py-1 bg-navy/5 text-navy rounded-full text-xs font-bold">{property.type}</span>
            {property.isVerified && (
              <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold">
                <ShieldCheck size={14} /> Verified
              </span>
            )}
            {property.isInstantBook && (
              <span className="px-3 py-1 bg-orange/10 text-orange rounded-full text-xs font-bold">Instant Book</span>
            )}
            {property.isGuestFavorite && (
              <span className="px-3 py-1 bg-golden/10 text-golden rounded-full text-xs font-bold">Guest Favorite</span>
            )}
          </div>

          <p className="text-navy/70 leading-relaxed text-lg mb-8">{property.description}</p>

          {/* Host */}
          <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-cream/20 mb-8">
            <img src={property.host.avatar} alt={property.host.name} className="w-16 h-16 rounded-full object-cover shadow-lg" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-navy">{property.host.name}</h3>
                {property.host.isSuperhost && (
                  <span className="px-2 py-0.5 bg-golden/10 text-golden rounded-full text-[10px] font-bold uppercase">Superhost</span>
                )}
              </div>
              <p className="text-navy/50 text-sm">Hosting since {property.host.hostingSince} · ⭐ {property.host.rating} ({property.host.reviews} reviews)</p>
              <p className="text-navy/40 text-xs">Response rate: {property.host.responseRate}% · {property.host.responseTime}</p>
            </div>
            <button onClick={() => setShowMessage(true)} className="px-6 py-3 bg-navy text-cream rounded-full font-bold hover:bg-orange transition-colors">
              Contact Host
            </button>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-navy mb-4">What this place offers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {property.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity];
                return (
                  <div key={amenity} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-cream/20 text-navy font-medium">
                    {Icon && <Icon size={18} className="text-golden shrink-0" />}
                    {amenity}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location map */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-navy mb-1">Where you&apos;ll be</h3>
            <p className="text-navy/60 mb-4">{property.location}, {property.country}</p>
            <StayMap properties={MOCK_PROPERTIES} activeId={property.id} />
          </div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-navy mb-6">Reviews</h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="p-6 bg-white rounded-3xl border border-cream/20">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-navy text-sm">{review.userName}</p>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} size={12} fill={s <= review.rating ? "#FFB909" : "transparent"} className={s <= review.rating ? "text-golden" : "text-navy/20"} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-navy/70 text-sm leading-relaxed">{review.comment}</p>
                    {review.verified && <span className="text-xs text-green-600 font-bold mt-2 inline-block flex items-center gap-1"><ShieldCheck size={12} /> Verified stay</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Card (desktop right column) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 bg-white p-8 rounded-3xl shadow-2xl border border-cream/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-black text-navy">${property.price}</span>
                <span className="text-navy/60 ml-1">/ night</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} fill="#FFB909" className="text-golden" />
                <span className="font-bold text-navy">{property.rating}</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-navy/60">
                <Users size={16} /> {property.guests} guests · {property.bedrooms} bedrooms · {property.beds} beds · {property.baths} baths
              </div>
              <div className="flex items-center gap-2 text-sm text-navy/60">
                <Calendar size={16} /> Flexible cancellation
              </div>
            </div>

            <button
              onClick={() => setShowBooking(true)}
              className="w-full bg-golden hover:bg-orange text-navy font-black py-4 rounded-2xl text-lg shadow-lg transition-all hover:shadow-xl active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
            >
              Reserve
            </button>

            {priceCalc && (
              <div className="mt-4 pt-4 border-t border-navy/10 space-y-2">
                <div className="flex justify-between text-sm text-navy/60">
                  <span>${property.price} × {priceCalc.nights} nights</span>
                  <span>${priceCalc.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-navy/60">
                  <span>Cleaning fee</span>
                  <span>${priceCalc.cleaningFee}</span>
                </div>
                <div className="flex justify-between text-sm text-navy/60">
                  <span>Service fee</span>
                  <span>${priceCalc.serviceFee}</span>
                </div>
                <div className="flex justify-between font-bold text-navy text-lg pt-2 border-t border-navy/10">
                  <span>Total</span>
                  <span>${priceCalc.total}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>

        {/* Mobile sticky booking CTA */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-cream/30 px-5 py-3 flex items-center justify-between gap-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <div>
            <span className="text-2xl font-black text-navy">${property.price}</span>
            <span className="text-navy/50 text-sm"> / night</span>
          </div>
          <button
            onClick={() => setShowBooking(true)}
            className="px-7 py-3.5 bg-golden hover:bg-orange text-navy font-black rounded-2xl text-base shadow-lg transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
          >
            Reserve
          </button>
        </div>
      </div>

      {showBooking && <BookingFlow property={property} onClose={() => setShowBooking(false)} />}
      {showMessage && <MessageModal host={property.host} onClose={() => setShowMessage(false)} />}

      <GalleryViewer key={galleryKey} open={lightboxOpen} onClose={() => setLightboxOpen(false)} gallery={property.gallery} initialIndex={lightboxIndex} />
    </div>
  );
}
