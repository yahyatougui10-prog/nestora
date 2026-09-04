"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MessageSquare, Check, X, Calendar } from 'lucide-react';
import { useToastContext } from '@/context/ToastContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLocalStorage } from '@/hooks/useLocalStorage';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HostReservation {
  id: string;
  guest: string;
  avatar: string;
  property: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

const INITIAL_RESERVATIONS: HostReservation[] = [
  { id: 'r1', guest: 'Sarah Miller', avatar: 'https://i.pravatar.cc/80?img=47', property: 'Ocean View Villa', checkIn: 'Oct 12', checkOut: 'Oct 18', amount: 1080, status: 'confirmed' },
  { id: 'r2', guest: 'James Chen', avatar: 'https://i.pravatar.cc/80?img=12', property: 'Desert Oasis Retreat', checkIn: 'Oct 15', checkOut: 'Oct 20', amount: 1250, status: 'pending' },
  { id: 'r3', guest: 'Emma Wilson', avatar: 'https://i.pravatar.cc/80?img=25', property: 'Imperial Palace Suite', checkIn: 'Sep 28', checkOut: 'Oct 3', amount: 1984, status: 'completed' },
  { id: 'r4', guest: 'Liam Johnson', avatar: 'https://i.pravatar.cc/80?img=68', property: 'Chefchaouen Blue Gem', checkIn: 'Nov 2', checkOut: 'Nov 9', amount: 980, status: 'cancelled' },
];

const TABS = [
  { key: 'dashboard', label: 'Overview', href: '/host/dashboard' },
  { key: 'listings', label: 'Listings', href: '/host/listings' },
  { key: 'reservations', label: 'Reservations', href: '/host/reservations' },
  { key: 'earnings', label: 'Earnings', href: '/host/earnings' },
];

const STATUS_META: Record<HostReservation['status'], { label: string; cls: string; dot: string }> = {
  confirmed: { label: 'Confirmed', cls: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  pending: { label: 'Pending', cls: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  completed: { label: 'Completed', cls: 'bg-navy/10 text-navy', dot: 'bg-navy' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-100 text-red-600', dot: 'bg-red-500' },
};

export default function HostReservationsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToastContext();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [reservations, setReservations] = useLocalStorage<HostReservation[]>('nestora-host-reservations', INITIAL_RESERVATIONS);

  const upcoming = reservations.filter((r) => r.status === 'confirmed' || r.status === 'pending');
  const past = reservations.filter((r) => r.status === 'completed' || r.status === 'cancelled');

  const visible = filter === 'upcoming' ? upcoming : filter === 'past' ? past : reservations;

  const updateStatus = (id: string, status: HostReservation['status'], msg: string) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    addToast({ type: 'success', title: 'Reservation', message: msg });
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-8 bg-cream/30 dark:bg-white/5 rounded-2xl p-2 max-w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => router.push(tab.href)}
            className={cn("px-4 py-2 rounded-xl text-sm font-bold transition-colors", pathname === tab.href ? "bg-navy text-cream" : "text-navy/60 hover:text-navy dark:text-cream/60 dark:hover:text-cream")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-navy dark:text-cream">Reservations</h1>
        <div className="flex gap-2">
          {(['all', 'upcoming', 'past'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn("px-4 py-2 rounded-full text-sm font-bold capitalize transition-colors", filter === f ? "bg-navy text-cream" : "bg-cream/40 text-navy/60 dark:bg-white/5 dark:text-cream/60 hover:bg-cream/70")}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-navy/30 rounded-3xl border border-cream/20">
          <div aria-hidden className="ornament-divider mx-auto justify-center mb-5">
            <span className="zellige-star text-xl text-golden" />
          </div>
          <h3 className="text-2xl font-bold text-navy dark:text-cream mb-2">No reservations here</h3>
          <p className="text-navy/60 dark:text-cream/60">Reservations from guests will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((res) => {
            const meta = STATUS_META[res.status];
            return (
              <div key={res.id} className="bg-white dark:bg-navy/30 rounded-3xl border border-cream/20 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <img src={res.avatar} alt={res.guest} className="w-14 h-14 rounded-full object-cover shrink-0" loading="lazy" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-navy dark:text-cream">{res.guest}</h3>
                    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase", meta.cls)}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", meta.dot)} />
                      {meta.label}
                    </span>
                  </div>
                  <p className="text-navy/60 dark:text-cream/60 text-sm mt-0.5">{res.property}</p>
                  <p className="flex items-center gap-1 text-navy/50 dark:text-cream/50 text-xs mt-1">
                    <Calendar size={12} /> {res.checkIn} – {res.checkOut}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-navy dark:text-cream">${res.amount.toLocaleString()}</span>
                  <div className="flex gap-2">
                    {res.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(res.id, 'confirmed', 'Reservation confirmed')} className="p-2.5 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors" aria-label="Confirm">
                          <Check size={16} />
                        </button>
                        <button onClick={() => updateStatus(res.id, 'cancelled', 'Reservation declined')} className="p-2.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors" aria-label="Decline">
                          <X size={16} />
                        </button>
                      </>
                    )}
                    <button onClick={() => addToast({ type: 'info', title: 'Messages', message: `Messaging ${res.guest}...` })} className="p-2.5 rounded-full bg-cream/40 text-navy hover:bg-cream/70 dark:bg-white/5 dark:text-cream dark:hover:bg-white/10 transition-colors" aria-label="Message guest">
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}