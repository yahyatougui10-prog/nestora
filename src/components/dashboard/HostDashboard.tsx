"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  Users,
  Calendar,
  Star,
  DollarSign,
  Plus,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HostDashboard() {
  const router = useRouter();
  const stats = [
    { label: 'Monthly Revenue', value: '$12,450', icon: DollarSign, trend: '+12%', color: 'text-golden' },
    { label: 'Occupancy Rate', value: '84%', icon: Users, trend: '+5%', color: 'text-orange' },
    { label: 'Total Reservations', value: '142', icon: Calendar, trend: '+18%', color: 'text-navy' },
    { label: 'Average Rating', value: '4.92', icon: Star, trend: '+0.1%', color: 'text-golden' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-navy mb-2">Host Overview</h1>
          <p className="text-navy/60">Manage your properties and track your performance.</p>
        </div>
        <button onClick={() => router.push('/host/listings')} className="flex items-center gap-2 bg-golden hover:bg-orange text-navy font-bold px-6 py-3 rounded-2xl transition-colors shadow-lg">
          <Plus size={20} />
          Add Listing
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl shadow-xl border border-cream/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-2xl bg-cream/20", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                {stat.trend}
              </div>
            </div>
            <p className="text-navy/50 text-sm font-medium">{stat.label}</p>
            <h3 className="text-3xl font-bold text-navy mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-cream/20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-navy">Revenue Growth</h3>
            <select className="bg-cream/20 border-none text-sm font-medium text-navy rounded-lg px-3 py-1 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>

          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[40, 65, 50, 85, 70, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="w-full bg-gradient-to-t from-navy to-golden rounded-t-xl relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-navy">
                    ${(height * 100).toLocaleString()}
                  </div>
                </motion.div>
                <span className="text-xs font-medium text-navy/40">Month {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy text-cream p-8 rounded-3xl shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 bg-white/10 rounded-2xl w-fit">
              <TrendingUp size={24} className="text-golden" />
            </div>
            <h3 className="text-2xl font-bold">Hosting Tips</h3>
            <p className="text-cream/60 leading-relaxed">
              Your occupancy increases by 15% when you provide high-quality professional photos.
              Consider updating your gallery.
            </p>
          </div>
          <button onClick={() => router.push('/support')} className="mt-8 w-full py-4 bg-golden text-navy font-bold rounded-2xl hover:bg-orange transition-colors">
            View Guide
          </button>
        </div>
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-3xl shadow-xl border border-cream/20 overflow-hidden">
        <div className="p-8 border-b border-navy/5 flex justify-between items-center">
          <h3 className="text-xl font-bold text-navy">Recent Reservations</h3>
          <button onClick={() => router.push('/host/reservations')} className="flex items-center gap-1 text-orange font-bold text-sm hover:underline">
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-cream/10 text-navy/50 text-xs uppercase font-bold">
              <tr>
                <th className="px-8 py-4">Guest</th>
                <th className="px-8 py-4">Property</th>
                <th className="px-8 py-4">Dates</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {[
                { guest: 'Sarah Miller', property: 'Villa Azura', dates: 'Oct 12-18', amount: '$1,080', status: 'Confirmed' },
                { guest: 'James Chen', property: 'Desert Oasis', dates: 'Oct 15-20', amount: '$1,250', status: 'Pending' },
                { guest: 'Emma Wilson', property: 'Villa Azura', dates: 'Oct 22-28', amount: '$1,080', status: 'Confirmed' },
              ].map((res, i) => (
                <tr key={i} className="hover:bg-cream/10 transition-colors">
                  <td className="px-8 py-4 font-bold text-navy">{res.guest}</td>
                  <td className="px-8 py-4 text-navy/60">{res.property}</td>
                  <td className="px-8 py-4 text-navy/60">{res.dates}</td>
                  <td className="px-8 py-4 font-bold text-navy">{res.amount}</td>
                  <td className="px-8 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                      res.status === 'Confirmed' ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {res.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
