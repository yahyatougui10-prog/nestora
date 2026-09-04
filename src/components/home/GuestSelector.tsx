"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GuestSelectorProps {
  onClose: () => void;
  guests: number;
  adults: number;
  childCount: number;
  infants: number;
  pets: number;
  onSelect: (guests: number, adults: number, childCount: number, infants: number, pets: number) => void;
}

export function GuestSelector({ onClose, guests, adults, childCount, infants, pets, onSelect }: GuestSelectorProps) {
  const [tempAdults, setTempAdults] = React.useState(adults);
  const [tempChildren, setTempChildren] = React.useState(childCount);
  const [tempInfants, setTempInfants] = React.useState(infants);
  const [tempPets, setTempPets] = React.useState(pets);

  const total = tempAdults + tempChildren + tempInfants + tempPets;

  const updateGuest = (type: 'adults' | 'children' | 'infants' | 'pets', delta: number) => {
    switch (type) {
      case 'adults':
        setTempAdults(Math.max(0, Math.min(20, tempAdults + delta)));
        break;
      case 'children':
        setTempChildren(Math.max(0, Math.min(10, tempChildren + delta)));
        break;
      case 'infants':
        setTempInfants(Math.max(0, Math.min(5, tempInfants + delta)));
        break;
      case 'pets':
        setTempPets(Math.max(0, Math.min(3, tempPets + delta)));
        break;
    }
  };

  const handleApply = () => {
    onSelect(total, tempAdults, tempChildren, tempInfants, tempPets);
    onClose();
  };

  const guestTypes = [
    {
      label: 'Adults',
      sublabel: '18+',
      count: tempAdults,
      min: 1,
      max: 20,
      onChange: (d: number) => updateGuest('adults', d),
    },
    {
      label: 'Children',
      sublabel: '2–17',
      count: tempChildren,
      min: 0,
      max: 10,
      onChange: (d: number) => updateGuest('children', d),
    },
    {
      label: 'Infants',
      sublabel: 'Under 2',
      count: tempInfants,
      min: 0,
      max: 5,
      onChange: (d: number) => updateGuest('infants', d),
    },
    {
      label: 'Pets',
      sublabel: 'Allowed',
      count: tempPets,
      min: 0,
      max: 3,
      onChange: (d: number) => updateGuest('pets', d),
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-navy/10 p-6 z-30"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-navy">Guests</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-cream/50 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {guestTypes.map((type) => (
            <div key={type.label} className="flex items-center justify-between py-3 border-b border-navy/5">
              <div>
                <p className="font-medium text-navy">{type.label}</p>
                <p className="text-xs text-navy/50">{type.sublabel}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => type.onChange(-1)}
                  disabled={type.count <= type.min}
                  className="w-8 h-8 rounded-full bg-cream text-navy font-bold hover:bg-navy hover:text-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-navy">{type.count}</span>
                <button
                  onClick={() => type.onChange(1)}
                  disabled={type.count >= type.max}
                  className="w-8 h-8 rounded-full bg-golden text-navy font-bold hover:bg-orange transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-navy/10 flex items-center justify-between">
          <span className="text-navy/60 text-sm">
            {total === 1 ? '1 guest' : `${total} guests`}
          </span>
          <Button variant="primary" size="sm" onClick={handleApply}>
            Done
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}