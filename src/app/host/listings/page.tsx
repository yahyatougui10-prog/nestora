"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Home, MapPin, Users, BedDouble, Bath, Camera, FileText, DollarSign, Eye, Plus, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PropertyType } from '@/lib/types';
import { useToastContext } from '@/context/ToastContext';
import { generateId } from '@/lib/utils';

const STEPS = [
  { label: 'Type', icon: Home },
  { label: 'Location', icon: MapPin },
  { label: 'Guests', icon: Users },
  { label: 'Rooms', icon: BedDouble },
  { label: 'Amenities', icon: CheckCircle },
  { label: 'Photos', icon: Camera },
  { label: 'Description', icon: FileText },
  { label: 'Price', icon: DollarSign },
  { label: 'Preview', icon: Eye },
];

const PROPERTY_TYPES: PropertyType[] = [
  'Apartment', 'Villa', 'House', 'Cabin', 'Riad', 'Hotel', 'Guesthouse', 'Resort',
];

const AMENITY_OPTIONS = [
  'Wi-Fi', 'Pool', 'Kitchen', 'Parking', 'Air conditioning', 'Workspace',
  'Ocean view', 'Washing machine', 'TV', 'Heating', 'Coffee maker',
  'Hair dryer', 'Iron', 'Essentials', 'Hangers', 'Hot tub', 'Gym',
];

export default function ListingWizardPage() {
  const router = useRouter();
  const { addToast } = useToastContext();
  const [step, setStep] = useState(0);
  const [listing, setListing] = useState({
    type: '' as PropertyType | '',
    location: '',
    city: '',
    country: 'Morocco',
    guests: 2,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    amenities: [] as string[],
    images: [] as string[],
    description: '',
    price: 100,
    cleaningFee: 50,
  });

  const update = <K extends keyof typeof listing>(field: K, value: (typeof listing)[K]) => setListing((prev) => ({ ...prev, [field]: value }));

  const canProceed = () => {
    switch (step) {
      case 0: return !!listing.type;
      case 1: return !!listing.location && !!listing.city;
      case 2: return listing.guests >= 1;
      case 3: return listing.bedrooms >= 1 && listing.beds >= 1;
      case 4: return true;
      case 5: return true;
      case 6: return listing.description.length >= 20;
      case 7: return listing.price >= 10;
      default: return true;
    }
  };

  const handlePublish = () => {
    addToast({ type: 'success', title: 'Listing published!', message: '🎉 Your property is now live on NESTORA.' });
    router.push('/host');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-cream/20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-white/50 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-navy">Create Listing</h1>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-3xl shadow-xl border border-cream/20 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = i < step;
              const active = i === step;
              return (
                <React.Fragment key={s.label}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${done ? 'bg-golden text-navy' : active ? 'bg-navy text-cream shadow-lg' : 'bg-cream text-navy/30'}`}>
                    {done ? <CheckCircle size={18} /> : <Icon size={18} />}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${done ? 'bg-golden' : 'bg-cream'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-navy/40 font-medium">
            {STEPS.map((s) => <span key={s.label} className="w-10 text-center">{s.label}</span>)}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl border border-cream/20 p-8 min-h-[400px]">
            {step === 0 && (
              <div>
                <h3 className="text-2xl font-bold text-navy mb-2">What type of property is this?</h3>
                <p className="text-navy/60 mb-6">Select the category that best describes your property.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {PROPERTY_TYPES.map((type) => (
                    <button key={type} onClick={() => update('type', type)}
                      className={`p-4 rounded-2xl border-2 text-center font-medium transition-all ${listing.type === type ? 'border-golden bg-golden/10 text-navy' : 'border-navy/10 text-navy/60 hover:border-navy/20'}`}>
                      <span className="text-2xl mb-2 block">{type === 'Villa' ? '🏠' : type === 'Apartment' ? '🏢' : type === 'Riad' ? '🕌' : type === 'Cabin' ? '🛖' : type === 'Hotel' ? '🏨' : type === 'Resort' ? '🌴' : type === 'Guesthouse' ? '🏡' : '🏘️'}</span>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-navy mb-2">Where is your property located?</h3>
                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-2">City / Area</label>
                  <input type="text" value={listing.city} onChange={(e) => update('city', e.target.value)} placeholder="e.g. Marrakech" className="w-full p-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40" />
                </div>
                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-2">Address / Neighborhood</label>
                  <input type="text" value={listing.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g. Medina, Rue Riad Zitoun" className="w-full p-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40" />
                </div>
                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-2">Country</label>
                  <input type="text" value={listing.country} onChange={(e) => update('country', e.target.value)} className="w-full p-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-navy mb-2">How many guests can stay?</h3>
                <p className="text-navy/60 mb-6">Set the maximum number of guests.</p>
                <div className="space-y-4 max-w-md">
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-navy/10">
                    <div><p className="font-medium text-navy">Guests</p><p className="text-xs text-navy/50">Total maximum</p></div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => update('guests', Math.max(1, listing.guests - 1))} className="w-9 h-9 rounded-full bg-cream text-navy font-bold hover:bg-navy hover:text-cream transition-colors">−</button>
                      <span className="w-8 text-center font-bold text-navy">{listing.guests}</span>
                      <button onClick={() => update('guests', Math.min(30, listing.guests + 1))} className="w-9 h-9 rounded-full bg-golden text-navy font-bold hover:bg-orange transition-colors">+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-navy mb-2">Room details</h3>
                <p className="text-navy/60 mb-6">Specify bedrooms, beds, and bathrooms.</p>
                <div className="space-y-4 max-w-md">
                  {[
                    { label: 'Bedrooms', sub: 'Sleeping rooms', value: listing.bedrooms, field: 'bedrooms' as const, min: 1 },
                    { label: 'Beds', sub: 'Total beds', value: listing.beds, field: 'beds' as const, min: 1 },
                    { label: 'Bathrooms', sub: 'Full and half', value: listing.baths, field: 'baths' as const, min: 1 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl border border-navy/10">
                      <div><p className="font-medium text-navy">{item.label}</p><p className="text-xs text-navy/50">{item.sub}</p></div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => update(item.field, Math.max(item.min, item.value - 1))} className="w-9 h-9 rounded-full bg-cream text-navy font-bold hover:bg-navy hover:text-cream transition-colors">−</button>
                        <span className="w-8 text-center font-bold text-navy">{item.value}</span>
                        <button onClick={() => update(item.field, Math.min(20, item.value + 1))} className="w-9 h-9 rounded-full bg-golden text-navy font-bold hover:bg-orange transition-colors">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-2xl font-bold text-navy mb-2">What amenities do you offer?</h3>
                <p className="text-navy/60 mb-6">Select all that apply.</p>
                <div className="flex flex-wrap gap-2">
                  {AMENITY_OPTIONS.map((amenity) => {
                    const selected = listing.amenities.includes(amenity);
                    return (
                      <button key={amenity} onClick={() => {
                        update('amenities', selected ? listing.amenities.filter((a) => a !== amenity) : [...listing.amenities, amenity]);
                      }}
                        className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${selected ? 'border-golden bg-golden/10 text-navy' : 'border-navy/10 text-navy/50 hover:border-navy/20'}`}>
                        {selected && '✓ '}{amenity}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-sm text-navy/40">{listing.amenities.length} amenities selected</p>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="text-2xl font-bold text-navy mb-2">Add photos</h3>
                <p className="text-navy/60 mb-6">Upload at least 5 high-quality photos of your property.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {listing.images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-cream">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => update('images', listing.images.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {listing.images.length < 10 && (
                    <button onClick={() => {
                      const mockUrls = [
                        'https://images.unsplash.com/photo-1580587771525-78475757f8c2?auto=format&fit=crop&q=80&w=600',
                        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
                        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600',
                      ];
                      update('images', [...listing.images, mockUrls[listing.images.length % mockUrls.length]]);
                    }} className="aspect-square rounded-xl border-2 border-dashed border-navy/20 flex flex-col items-center justify-center text-navy/30 hover:border-golden hover:text-golden transition-all cursor-pointer">
                      <Upload size={24} />
                      <span className="text-xs mt-1">Add photo</span>
                    </button>
                  )}
                </div>
                <p className="text-sm text-navy/40">{listing.images.length}/10 photos (demo uses sample images)</p>
              </div>
            )}

            {step === 6 && (
              <div>
                <h3 className="text-2xl font-bold text-navy mb-2">Describe your property</h3>
                <p className="text-navy/60 mb-6">Write a compelling description that highlights what makes your place special.</p>
                <textarea
                  value={listing.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder="Tell guests about the unique experience your property offers..."
                  rows={8}
                  className="w-full p-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40 resize-none"
                />
                <div className="flex justify-between mt-2">
                  <p className={`text-sm ${listing.description.length < 20 ? 'text-red-500' : 'text-green-600'}`}>{listing.description.length}/500</p>
                  <p className="text-sm text-navy/40">Minimum 20 characters</p>
                </div>
              </div>
            )}

            {step === 7 && (
              <div>
                <h3 className="text-2xl font-bold text-navy mb-2">Set your price</h3>
                <p className="text-navy/60 mb-6">Set a competitive nightly rate.</p>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="text-xs font-bold text-navy uppercase block mb-2">Price per night (USD)</label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-navy">$</span>
                      <input type="number" value={listing.price} onChange={(e) => update('price', Number(e.target.value))} min={10} max={10000} className="w-full p-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-2xl font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-navy uppercase block mb-2">Cleaning fee (USD)</label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-navy">$</span>
                      <input type="number" value={listing.cleaningFee} onChange={(e) => update('cleaningFee', Number(e.target.value))} min={0} max={500} className="w-full p-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-2xl font-bold" />
                    </div>
                  </div>
                  <div className="p-5 bg-cream/30 rounded-2xl">
                    <p className="text-sm text-navy/60">Estimated weekly earnings</p>
                    <p className="text-3xl font-bold text-navy">${(listing.price * 7 * 0.85).toLocaleString()}<span className="text-sm font-normal text-navy/60">/week</span></p>
                    <p className="text-xs text-navy/40 mt-1">Based on 85% occupancy</p>
                  </div>
                </div>
              </div>
            )}

            {step === 8 && (
              <div>
                <h3 className="text-2xl font-bold text-navy mb-2">Preview your listing</h3>
                <p className="text-navy/60 mb-6">Review your listing before publishing.</p>
                <div className="bg-cream/30 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden">
                    {listing.images.slice(0, 3).map((img, i) => (
                      <div key={i} className="aspect-square bg-white"><img src={img} alt="" className="w-full h-full object-cover" /></div>
                    ))}
                  </div>
                  <h4 className="text-xl font-bold text-navy">{listing.type || 'Property'}</h4>
                  <p className="text-navy/60 text-sm">{listing.city}, {listing.country}</p>
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.slice(0, 5).map((a) => (
                      <span key={a} className="px-2 py-1 bg-golden/10 text-golden rounded-lg text-xs font-bold">{a}</span>
                    ))}
                    {listing.amenities.length > 5 && <span className="px-2 py-1 bg-cream text-navy/60 rounded-lg text-xs">+{listing.amenities.length - 5} more</span>}
                  </div>
                  <p className="text-navy/70 text-sm leading-relaxed">{listing.description || 'No description yet.'}</p>
                  <div className="flex items-baseline gap-1 pt-2 border-t border-navy/10">
                    <span className="text-3xl font-bold text-navy">${listing.price}</span>
                    <span className="text-navy/60">/ night</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className={`flex items-center gap-2 px-4 py-3 font-bold transition-colors ${step === 0 ? 'text-navy/20 cursor-not-allowed' : 'text-navy hover:text-orange'}`}>
            <ArrowLeft size={18} /> Back
          </button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}>
              Continue <ArrowRight size={18} />
            </Button>
          ) : (
            <Button onClick={handlePublish}>Publish Listing 🎉</Button>
          )}
        </div>
      </div>
    </div>
  );
}
