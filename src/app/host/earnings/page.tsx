"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, CalendarDays, Download } from 'lucide-react';
import { useToastContext } from '@/context/ToastContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TABS = [
  { key: 'dashboard', label: 'Overview', href: '/host/dashboard' },
  { key: 'listings', label: 'Listings', href: '/host/listings' },
  { key: 'reservations', label: 'Reservations', href: '/host/reservations' },
  { key: 'earnings', label: 'Earnings', href: '/host/earnings' },
];

const TRANSACTIONS = [
  { id: 't1', date: 'Sep 3, 2026', guest: 'Emma Wilson', property: 'Imperial Palace Suite', amount: 1984, status: 'Paid' },
  { id: 't2', date: 'Aug 28, 2026', guest: 'Youssef Alaoui', property: 'Ocean View Villa', amount: 1080, status: 'Paid' },
  { id: 't3', date: 'Aug 21, 2026', guest: 'Maya Haddad', property: 'Desert Oasis Retreat', amount: 1250, status: 'Paid' },
  { id: 't4', date: 'Aug 12, 2026', guest: 'Noah Kim', property: 'Chefchaouen Blue Gem', amount: 980, status: 'Processing' },
];

export default function HostEarningsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToastContext();
  const [period, setPeriod] = useState('This month');
  const totalPaid = TRANSACTIONS.filter((t) => t.status === 'Paid').reduce((s, t) => s + t.amount, 0);

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
        <div>
          <h1 className="text-4xl font-bold text-navy dark:text-cream mb-2">Earnings</h1>
          <p className="text-navy/60 dark:text-cream/60">Track your hosting income and payouts.</p>
        </div>
        <div className="flex gap-2">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="bg-white dark:bg-navy border border-navy/10 dark:border-white/10 rounded-xl px-4 py-2 text-sm font-medium text-navy dark:text-cream outline-none">
            <option>This month</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
          <button onClick={() => addToast({ type: 'info', title: 'Earnings', message: 'Your statement is being prepared.' })} className="flex items-center gap-2 bg-navy text-cream px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange transition-colors">
            <Download size={16} /> Statement
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total earnings', value: `$${(totalPaid + 1250).toLocaleString()}`, icon: DollarSign, color: 'text-golden' },
          { label: 'Paid out', value: `$${totalPaid.toLocaleString()}`, icon: TrendingUp, color: 'text-green-600' },
          { label: 'Next payout', value: '$1,250', icon: CalendarDays, color: 'text-orange' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="bg-white dark:bg-navy/30 rounded-3xl shadow-xl border border-cream/20 p-6">
              <div className={cn("p-3 rounded-2xl bg-cream/20 w-fit mb-4", stat.color)}><Icon size={24} /></div>
              <p className="text-navy/50 dark:text-cream/50 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-navy dark:text-cream mt-1">{stat.value}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* Payout breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white dark:bg-navy/30 rounded-3xl shadow-xl border border-cream/20 p-8">
          <h3 className="text-xl font-bold text-navy dark:text-cream mb-6">Payout history</h3>
          <div className="space-y-3">
            {TRANSACTIONS.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-cream/20 dark:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-golden/20 text-golden flex items-center justify-center"><DollarSign size={18} /></div>
                  <div>
                    <p className="font-bold text-navy dark:text-cream text-sm">{t.guest} · {t.property}</p>
                    <p className="text-navy/50 dark:text-cream/50 text-xs">{t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-navy dark:text-cream">${t.amount.toLocaleString()}</p>
                  <p className={cn("text-xs font-bold", t.status === 'Paid' ? "text-green-600" : "text-amber-600")}>{t.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy text-cream rounded-3xl shadow-xl p-8 flex flex-col justify-between">
          <div>
            <div className="p-3 bg-white/10 rounded-2xl w-fit mb-4"><TrendingUp size={24} className="text-golden" /></div>
            <h3 className="text-2xl font-bold mb-3">Earnings breakdown</h3>
            <div className="space-y-4 text-sm">
              {[
                { label: 'Base nightly income', value: '82%' },
                { label: 'Cleaning fees (your share)', value: '9%' },
                { label: 'Experience add-ons', value: '6%' },
                { label: 'Tax withheld', value: '3%' },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between mb-1"><span className="text-cream/60">{row.label}</span><span className="font-bold">{row.value}</span></div>
                  <div className="h-1.5 bg-white/10 rounded-full"><div className="h-full rounded-full bg-golden" style={{ width: row.value }} /></div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => addToast({ type: 'info', title: 'Payouts', message: 'Payouts typically arrive 2–3 business days after checkout.' })} className="mt-8 w-full py-4 bg-golden text-navy font-bold rounded-2xl hover:bg-orange transition-colors">
            Manage payouts
          </button>
        </div>
      </div>
    </div>
  );
}