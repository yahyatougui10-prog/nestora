"use client";

import React from 'react';
import HostDashboard from '@/components/dashboard/HostDashboard';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRouter, usePathname } from 'next/navigation';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TABS = [
  { key: 'dashboard', label: 'Overview', href: '/host/dashboard' },
  { key: 'listings', label: 'Listings', href: '/host/listings' },
  { key: 'reservations', label: 'Reservations', href: '/host/reservations' },
  { key: 'earnings', label: 'Earnings', href: '/host/earnings' },
];

export default function HostDashboardPage() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-8 bg-cream/30 dark:bg-white/5 rounded-2xl p-2 max-w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => router.push(tab.href)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-bold transition-colors",
              pathname === tab.href ? "bg-navy text-cream" : "text-navy/60 hover:text-navy"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <HostDashboard />
    </div>
  );
}