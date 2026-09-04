"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, MessageSquare, Clock, ArrowRight, Star } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function UserDashboard() {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-navy mb-2">Welcome back, Alex!</h1>
          <p className="text-navy/60">Your next adventure is just a few clicks away.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Upcoming Trip Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-3xl shadow-xl border border-cream/20 space-y-6"
        >
          <div className="flex justify-between items-center">
            <div className="p-3 bg-golden/10 text-golden rounded-2xl">
              <Calendar size={24} />
            </div>
            <span className="text-xs font-bold text-navy/40 uppercase tracking-widest">Next Trip</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-navy mb-1">Villa Azura</h3>
            <p className="text-navy/60 text-sm">Essaouira, Morocco · Oct 12-18</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-navy/5">
            <span className="text-sm font-medium text-navy/60">3 nights remaining</span>
            <button className="text-orange font-bold text-sm hover:underline flex items-center gap-1">
              Details <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Saved Homes Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-3xl shadow-xl border border-cream/20 space-y-6"
        >
          <div className="flex justify-between items-center">
            <div className="p-3 bg-orange/10 text-orange rounded-2xl">
              <Heart size={24} />
            </div>
            <span className="text-xs font-bold text-navy/40 uppercase tracking-widest">Favorites</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-navy mb-1">12 Saved Homes</h3>
            <p className="text-navy/60 text-sm">Curate your dream destinations</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-navy/5">
            <span className="text-sm font-medium text-navy/60">Last updated 2 days ago</span>
            <button className="text-orange font-bold text-sm hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Messages Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-3xl shadow-xl border border-cream/20 space-y-6"
        >
          <div className="flex justify-between items-center">
            <div className="p-3 bg-navy/10 text-navy rounded-2xl">
              <MessageSquare size={24} />
            </div>
            <span className="text-xs font-bold text-navy/40 uppercase tracking-widest">Inbox</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-navy mb-1">3 New Messages</h3>
            <p className="text-navy/60 text-sm">Chat with your hosts</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-navy/5">
            <span className="text-sm font-medium text-navy/60">Last message from Yasmine</span>
            <button className="text-orange font-bold text-sm hover:underline flex items-center gap-1">
              Open Chat <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Past Trips Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
            <Clock size={24} className="text-golden" />
            Past Adventures
          </h2>
          <button className="text-orange font-bold hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white p-4 rounded-3xl border border-cream/20 flex gap-4 items-center shadow-sm">
              <img
                src={`https://images.unsplash.com/photo-${i === 1 ? '1502672260266-1c1ef2d93688' : '1542314831-068cd1ef6ec7'}?auto=format&fit=crop&q=80&w=200`}
                alt="Past trip"
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div>
                <h4 className="font-bold text-navy">Desert Oasis {i}</h4>
                <p className="text-xs text-navy/60">Merzouga · June 2025</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} fill="#FFB909" className="text-golden" />
                  <span className="text-xs font-bold text-navy">5.0</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
