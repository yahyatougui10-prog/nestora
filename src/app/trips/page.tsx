"use client";

import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plane, Heart, MessageSquare, User, Users, Clock, ArrowLeft, CheckCircle, XCircle, Clock9, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Trip } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { useToastContext } from '@/context/ToastContext';
import { generateId } from '@/lib/utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const statusConfig: Record<Trip['status'], { label: string; color: string; icon: React.ElementType }> = {
  confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: XCircle },
  pending: { label: 'Pending', color: 'bg-orange-100 text-orange-700', icon: Clock9 },
  completed: { label: 'Completed', color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
};

export default function TripsPage() {
  const router = useRouter();
  const [trips, setTrips] = useLocalStorage<Trip[]>('nestora-trips', []);
  const { addToast } = useToastContext();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const filteredTrips = trips.filter((t) => {
    if (activeTab === 'upcoming') return t.status === 'confirmed';
    if (activeTab === 'past') return t.status === 'completed' || t.status === 'cancelled';
    return t.status === 'cancelled';
  });

  const cancelTrip = (id: string) => {
    setTrips((prev) => prev.map((t) => t.id === id ? { ...t, status: 'cancelled' as const } : t));
    addToast({ type: 'warning', title: 'Reservation cancelled', message: '✕ Your trip has been cancelled.' });
    setCancellingId(null);
  };

  const confirmedCount = trips.filter((t) => t.status === 'confirmed').length;

  return (
    <div className="pt-20 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-cream/50 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-navy">My Trips</h1>
          {confirmedCount > 0 && (
            <span className="bg-golden/10 text-golden px-3 py-1 rounded-full text-sm font-bold">{confirmedCount} upcoming</span>
          )}
        </div>

        <div className="flex gap-2 mb-8 bg-cream/30 rounded-xl p-1">
          {(['upcoming', 'past', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn("flex-1 py-2.5 rounded-xl text-sm font-bold transition-all capitalize", activeTab === tab ? "bg-navy text-cream shadow-md" : "text-navy/50 hover:text-navy")}
            >
              {tab === 'upcoming' ? 'Upcoming' : tab === 'past' ? 'Past' : 'Cancelled'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {filteredTrips.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-24">
              <div className="text-6xl mb-4">{activeTab === 'upcoming' ? '🧳' : activeTab === 'past' ? '📸' : '📭'}</div>
              <h3 className="text-2xl font-bold text-navy mb-2">
                {activeTab === 'upcoming' ? 'Your next adventure is waiting' : activeTab === 'past' ? 'No past trips yet' : 'No cancelled trips'}
              </h3>
              <p className="text-navy/60 mb-6">
                {activeTab === 'upcoming' ? 'Start planning your next journey.' : activeTab === 'past' ? 'Completed trips will appear here.' : 'You haven\'t cancelled any trips.'}
              </p>
              <Button onClick={() => router.push('/explore')}>Explore stays</Button>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {filteredTrips.map((trip, index) => {
                const config = statusConfig[trip.status];
                const StatusIcon = config.icon;
                return (
                  <motion.div key={trip.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-white rounded-3xl border border-cream/20 shadow-lg p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img src={trip.propertyImage} alt={trip.propertyName} className="w-full md:w-48 h-40 md:h-32 rounded-2xl object-cover shrink-0" />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-navy">{trip.propertyName}</h3>
                            <p className="text-navy/60 text-sm flex items-center gap-1">{trip.location}</p>
                          </div>
                          <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 shrink-0", config.color)}>
                            <StatusIcon size={12} /> {config.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-navy/60">
                          <span className="flex items-center gap-1"><Calendar size={14} />{formatDate(trip.checkIn)} – {formatDate(trip.checkOut)}</span>
                          <span className="flex items-center gap-1"><Users size={14} />{trip.guests} guests</span>
                          <span className="font-bold text-navy">${trip.totalPrice}</span>
                        </div>
                        {trip.status === 'confirmed' && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Button variant="outline" size="sm" onClick={() => router.push(`/messages`)} className="flex items-center gap-1">
                              <MessageSquare size={14} /> Message Host
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setCancellingId(trip.id)} className="flex items-center gap-1 text-red-500 border-red-200 hover:bg-red-50">
                              <Trash2 size={14} /> Cancel
                            </Button>
                          </div>
                        )}
                        {trip.status === 'cancelled' && (
                          <p className="text-xs text-red-500 flex items-center gap-1"><XCircle size={14} />Cancelled by you</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {cancellingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setCancellingId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <XCircle size={48} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">Cancel reservation?</h3>
              <p className="text-navy/60 mb-6">Are you sure you want to cancel this reservation? This action can be undone.</p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setCancellingId(null)}>Keep reservation</Button>
                <Button variant="danger" className="flex-1" onClick={() => cancelTrip(cancellingId)}>Cancel reservation</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
