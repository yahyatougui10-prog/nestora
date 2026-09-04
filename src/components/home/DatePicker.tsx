"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { isPastDate } from '@/lib/utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DatePickerProps {
  onClose: () => void;
  checkIn: string;
  checkOut: string;
  onSelect: (checkIn: string, checkOut: string) => void;
}

export function DatePicker({ onClose, checkIn, checkOut, onSelect }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [tempCheckIn, setTempCheckIn] = useState(checkIn);
  const [tempCheckOut, setTempCheckOut] = useState(checkOut);

  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentMonth, currentYear]);

  const firstDayOfMonth = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentMonth, currentYear]);

  const days = useMemo(() => {
    const result: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      result.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      result.push(i);
    }
    return result;
  }, [firstDayOfMonth, daysInMonth]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const selectDate = (day: number, type: 'checkIn' | 'checkOut') => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (type === 'checkIn') {
      setTempCheckIn(dateStr);
      if (tempCheckOut && dateStr >= tempCheckOut) {
        setTempCheckOut(dateStr);
      }
    } else {
      setTempCheckOut(dateStr);
    }
  };

  const applyDates = () => {
    if (tempCheckIn && tempCheckOut) {
      onSelect(tempCheckIn, tempCheckOut);
    }
  };

  const isDateSelected = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (tempCheckIn && tempCheckOut) {
      return dateStr === tempCheckIn || dateStr === tempCheckOut;
    }
    return dateStr === tempCheckIn;
  };

  const isDateInRange = (day: number) => {
    if (!tempCheckIn || !tempCheckOut) return false;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr > tempCheckIn && dateStr < tempCheckOut;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-navy/10 p-6 z-30"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
              className="p-2 rounded-full hover:bg-cream/50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-bold text-navy text-lg min-w-[120px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
              className="p-2 rounded-full hover:bg-cream/50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={applyDates} className="px-4 py-2 bg-golden text-navy font-bold rounded-xl text-sm hover:bg-orange transition-colors">
              Apply
            </button>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-cream/50 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <span key={d} className="text-xs font-bold text-navy/40 py-2">
              {d}
            </span>
          ))}
          {days.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const past = isPastDate(dateStr);
            const selected = isDateSelected(day);
            const inRange = isDateInRange(day);
            const hovered = hoverDate === dateStr;

            return (
              <button
                key={day}
                onMouseEnter={() => setHoverDate(dateStr)}
                onClick={() => selectDate(day, !tempCheckIn || (tempCheckIn && tempCheckOut) ? 'checkIn' : 'checkIn')}
                disabled={past}
                className={cn(
                  "relative w-full h-10 rounded-full text-sm font-medium transition-all",
                  past && "text-navy/20 cursor-not-allowed",
                  !past && "text-navy hover:bg-cream/50 cursor-pointer",
                  selected && "bg-golden text-navy font-bold shadow-md",
                  inRange && "bg-golden/30 text-navy",
                  hovered && !selected && !past && "bg-golden/20"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}