"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, User, Calendar, CreditCard, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Property } from '@/lib/types';
import { getPriceForDates, calculateNights, formatDate, generateId } from '@/lib/utils';
import { useAuthContext } from '@/context/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useToastContext } from '@/context/ToastContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Trip } from '@/lib/types';

interface BookingFlowProps {
  property: Property;
  onClose: () => void;
}

export function BookingFlow({ property, onClose }: BookingFlowProps) {
  const { isAuthenticated, user } = useAuthContext();
  const { toggleFavorite } = useFavorites();
  const { addToast } = useToastContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState('');
  const [trips, setTrips] = useLocalStorage<Trip[]>('nestora-trips', []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nights = calculateNights(checkIn, checkOut);
  const priceCalc = useMemo(() => {
    if (!checkIn || !checkOut || nights <= 0) return null;
    return getPriceForDates(property, checkIn, checkOut);
  }, [checkIn, checkOut, nights, property]);

  const totalGuests = adults + children + infants + pets;

  const validate = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!checkIn) newErrors.checkIn = 'Required';
      if (!checkOut) newErrors.checkOut = 'Required';
      if (!checkIn || !checkOut || new Date(checkOut) <= new Date(checkIn)) {
        newErrors.dates = 'Check-out must be after check-in';
      }
    }
    if (step === 1) {
      if (totalGuests < 1) newErrors.guests = 'At least 1 guest';
    }
    if (step === 2) {
      if (!guestName.trim()) newErrors.name = 'Name is required';
      if (!guestEmail.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(guestEmail)) newErrors.email = 'Invalid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate(currentStep)) {
      if (currentStep < 4) setCurrentStep(currentStep + 1);
      else handleConfirm();
    }
  };

  const handleConfirm = () => {
    if (!priceCalc) return;
    const trip: Trip = {
      id: generateId(),
      propertyId: property.id,
      propertyName: property.name,
      propertyImage: property.image,
      location: `${property.location}, ${property.country}`,
      hostName: property.host.name,
      hostAvatar: property.host.avatar,
      checkIn,
      checkOut,
      guests: totalGuests,
      totalPrice: priceCalc.total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setTrips((prev) => [...prev, trip]);
    addToast({ type: 'success', title: 'Reservation confirmed 🎉', message: `Your trip to ${property.location} is booked!` });
    onClose();
  };

  const steps = [
    { id: 'dates', label: 'Dates', icon: Calendar },
    { id: 'guests', label: 'Guests', icon: Users },
    { id: 'review', label: 'Review', icon: CheckCircle },
    { id: 'info', label: 'Details', icon: User },
    { id: 'confirm', label: 'Confirm', icon: CheckCircle },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-navy/5 p-6 flex items-center justify-between z-10">
            <button onClick={onClose} className="p-2 rounded-full hover:bg-cream/50 transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-navy">Book {property.name}</h2>
            <div />
          </div>

          {/* Steps */}
          <div className="flex items-center justify-center gap-1 p-6 pb-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isCompleted = i < currentStep;
              const isActive = i === currentStep;
              return (
                <React.Fragment key={step.id}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isCompleted ? 'bg-golden text-navy' : isActive ? 'bg-navy text-cream' : 'bg-cream text-navy/30'}`}>
                    {isCompleted ? <CheckCircle size={16} /> : <Icon size={16} />}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-12 h-1 rounded-full transition-all ${i < currentStep ? 'bg-golden' : 'bg-cream'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                {currentStep === 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-navy mb-6">Select dates</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-navy uppercase block mb-2">Check-in</label>
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full p-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-navy" />
                        {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-bold text-navy uppercase block mb-2">Check-out</label>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full p-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-navy" />
                        {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
                      </div>
                    </div>
                    {errors.dates && <p className="text-red-500 text-xs mt-1">{errors.dates}</p>}
                    {nights > 0 && (
                      <p className="mt-3 text-sm text-navy/60">{nights} night{nights > 1 ? 's' : ''}</p>
                    )}
                  </div>
                )}

                {currentStep === 1 && (
                  <div>
                    <h3 className="text-2xl font-bold text-navy mb-6">Who&apos;s coming?</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Adults', sub: '18+', count: adults, setCount: setAdults, min: 1, max: 20 },
                        { label: 'Children', sub: '2–17', count: children, setCount: setChildren, min: 0, max: 10 },
                        { label: 'Infants', sub: 'Under 2', count: infants, setCount: setInfants, min: 0, max: 5 },
                        { label: 'Pets', sub: 'Allowed', count: pets, setCount: setPets, min: 0, max: 3 },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl border border-navy/10">
                          <div>
                            <p className="font-medium text-navy">{item.label}</p>
                            <p className="text-xs text-navy/50">{item.sub}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={() => item.setCount(Math.max(item.min, item.count - 1))} disabled={item.count <= item.min} className="w-9 h-9 rounded-full bg-cream text-navy font-bold hover:bg-navy hover:text-cream transition-colors disabled:opacity-30">−</button>
                            <span className="w-8 text-center font-bold text-navy">{item.count}</span>
                            <button onClick={() => item.setCount(Math.min(item.max, item.count + 1))} disabled={item.count >= item.max} className="w-9 h-9 rounded-full bg-golden text-navy font-bold hover:bg-orange transition-colors disabled:opacity-30">+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                    <p className="mt-3 text-sm text-navy/60">{totalGuests} {totalGuests === 1 ? 'guest' : 'guests'} total</p>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h3 className="text-2xl font-bold text-navy mb-6">Review your booking</h3>
                    <div className="space-y-4">
                      <div className="p-5 bg-cream/30 rounded-2xl space-y-3">
                        <div className="flex justify-between">
                          <span className="text-navy/60">{property.name}</span>
                          <span className="font-bold text-navy">${property.price}/night</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy/60">{checkIn} → {checkOut}</span>
                          <span className="font-bold text-navy">{nights} nights</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy/60">Guests</span>
                          <span className="font-bold text-navy">{totalGuests}</span>
                        </div>
                      </div>
                      {priceCalc && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-navy/60">
                            <span>Subtotal</span>
                            <span>${priceCalc.subtotal}</span>
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
                )}

                {currentStep === 3 && (
                  <div>
                    <h3 className="text-2xl font-bold text-navy mb-6">Guest information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-navy uppercase block mb-2">Full Name</label>
                        <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full p-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-navy" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-bold text-navy uppercase block mb-2">Email</label>
                        <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} className="w-full p-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-navy" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-bold text-navy uppercase block mb-2">Phone</label>
                        <input type="tel" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} className="w-full p-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-navy" />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="text-center space-y-6 py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12 }}
                      className="w-20 h-20 bg-golden rounded-full flex items-center justify-center mx-auto shadow-xl"
                    >
                      <CheckCircle size={48} className="text-navy" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold text-navy mb-2">Reservation confirmed!</h3>
                      <p className="text-navy/60">Your trip to {property.location} is booked.</p>
                    </div>
                    <div className="bg-cream/30 p-6 rounded-2xl text-left space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-navy/50">Reservation ID</span>
                        <span className="font-mono font-bold text-navy">#NST-{generateId().toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-navy/50">Property</span>
                        <span className="font-bold text-navy">{property.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-navy/50">Dates</span>
                        <span className="font-bold text-navy">{formatDate(checkIn)} → {formatDate(checkOut)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-navy/50">Guests</span>
                        <span className="font-bold text-navy">{totalGuests}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-navy/50">Total</span>
                        <span className="font-bold text-golden">${priceCalc?.total}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          {currentStep < 4 && (
            <div className="sticky bottom-0 bg-white border-t border-navy/5 p-6 flex justify-between items-center">
              <button onClick={() => setCurrentStep((s) => Math.max(0, s - 1))} disabled={currentStep === 0} className={`flex items-center gap-2 px-4 py-2 font-bold transition-colors ${currentStep === 0 ? 'text-navy/20 cursor-not-allowed' : 'text-navy hover:text-orange'}`}>
                <ChevronLeft size={18} /> Back
              </button>
              <Button onClick={handleNext}>
                {currentStep === 3 ? 'Confirm Booking' : 'Continue'}
                {currentStep < 3 && <ChevronRight size={18} />}
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
