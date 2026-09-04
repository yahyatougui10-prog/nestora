"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, User, Calendar, CreditCard } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STEPS = [
  { id: 'dates', label: 'Dates', icon: Calendar },
  { id: 'guests', label: 'Guests', icon: User },
  { id: 'info', label: 'Details', icon: User },
  { id: 'payment', label: 'Payment', icon: CreditCard },
];

export default function ReservationFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isComplete) {
    return (
      <div className="fixed inset-0 z-[200] bg-navy text-cream flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="w-24 h-24 bg-golden rounded-full flex items-center justify-center mx-auto text-navy shadow-2xl"
            >
              <CheckCircle size={48} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full border-4 border-golden opacity-20"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold">You&apos;re all set! 🎉</h2>
            <p className="text-cream/60 text-lg">
              Your stay at <span className="text-golden font-bold">Villa Azura</span> is confirmed.
              A confirmation email has been sent to your inbox.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-3xl border border-white/10 text-left space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-cream/50">Reservation ID</span>
              <span className="font-mono">#NST-8291-X</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cream/50">Check-in</span>
              <span>Oct 12, 2026</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cream/50">Total Paid</span>
              <span className="text-golden font-bold">$1,150</span>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/dashboard/trips'}
            className="w-full py-4 bg-golden text-navy font-bold rounded-2xl hover:bg-orange transition-colors"
          >
            Go to My Trips
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-cream flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar / Progress */}
        <div className="w-full md:w-72 bg-navy text-cream p-8 flex flex-col">
          <h2 className="text-2xl font-bold mb-12">Booking</h2>
          <div className="flex-grow space-y-8">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;

              return (
                <div key={step.id} className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    isCompleted ? "bg-golden text-navy" : isActive ? "bg-white/20 text-white" : "bg-navy/50 text-cream/30"
                  )}>
                    {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                  </div>
                  <span className={cn(
                    "font-medium transition-colors",
                    isActive ? "text-white" : "text-cream/40"
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-12 p-4 bg-white/5 rounded-2xl text-xs text-cream/50 text-center">
            Secure encrypted payment
          </div>
        </div>

        {/* Form Area */}
        <div className="flex-grow p-12 flex flex-col">
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full space-y-8"
              >
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-navy">Select your dates</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-navy uppercase">Check-in</label>
                        <input type="date" className="w-full p-4 rounded-2xl border border-navy/10 outline-none focus:border-golden" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-navy uppercase">Check-out</label>
                        <input type="date" className="w-full p-4 rounded-2xl border border-navy/10 outline-none focus:border-golden" />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-navy">Who&apos;s coming?</h3>
                    <div className="space-y-4">
                      {['Adults', 'Children', 'Infants', 'Pets'].map((type) => (
                        <div key={type} className="flex items-center justify-between p-4 rounded-2xl border border-navy/10">
                          <span className="font-medium text-navy">{type}</span>
                          <div className="flex items-center gap-4">
                            <button className="w-8 h-8 rounded-full bg-cream text-navy font-bold">-</button>
                            <span className="font-bold text-navy">1</span>
                            <button className="w-8 h-8 rounded-full bg-golden text-navy font-bold">+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-navy">Guest details</h3>
                    <div className="space-y-4">
                      <input type="text" placeholder="Full Name" className="w-full p-4 rounded-2xl border border-navy/10 outline-none focus:border-golden" />
                      <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl border border-navy/10 outline-none focus:border-golden" />
                      <textarea placeholder="Message to host" rows={4} className="w-full p-4 rounded-2xl border border-navy/10 outline-none focus:border-golden" />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-navy">Payment method</h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl border-2 border-golden bg-golden/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="text-golden" />
                          <span className="font-bold text-navy">Visa ending in 4242</span>
                        </div>
                        <div className="w-5 h-5 rounded-full border-4 border-golden" />
                      </div>
                      <button className="w-full py-3 rounded-2xl border-2 border-dashed border-navy/20 text-navy/50 font-medium hover:border-golden transition-colors">
                        + Add new payment method
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={cn(
                "flex items-center gap-2 px-6 py-3 font-bold transition-colors",
                currentStep === 0 ? "text-navy/20 cursor-not-allowed" : "text-navy hover:text-orange"
              )}
            >
              <ChevronLeft size={20} />
              Back
            </button>

            <button
              onClick={nextStep}
              className="bg-golden hover:bg-orange text-navy font-bold px-10 py-4 rounded-2xl shadow-lg transition-all flex items-center gap-2"
            >
              {currentStep === STEPS.length - 1 ? 'Confirm & Pay' : 'Continue'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
