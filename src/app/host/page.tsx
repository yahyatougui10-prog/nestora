"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Home, Star, DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HOST_DATA } from '@/lib/data';

export default function HostLandingPage() {
  const router = useRouter();

  return (
    <div className="pt-20 pb-12 px-6">
      {/* Hero */}
      <section className="bg-navy rounded-[40px] overflow-hidden relative px-6 md:px-16 py-16 md:py-24 mb-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-golden rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 bg-golden/20 text-golden rounded-full text-xs font-bold uppercase tracking-widest mb-4">Become a Host</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Share your space with <span className="text-golden">the world</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl text-white/60 font-light mb-10 max-w-xl mx-auto">
            Join thousands of hosts earning extra income while welcoming travelers from around the globe.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => router.push('/host/listings')}>Start Hosting</Button>
            <Button variant="outline" size="lg" onClick={() => router.push('/host/dashboard')}>View Dashboard</Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Hosts', value: '12,000+', icon: Home, color: 'text-golden' },
            { label: 'Reservations', value: '500K+', icon: Calendar, color: 'text-orange' },
            { label: 'Earnings', value: '$50M+', icon: DollarSign, color: 'text-navy' },
            { label: 'Guests', value: '2M+', icon: Users, color: 'text-golden' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-3xl shadow-xl border border-cream/20 text-center">
                <div className={`w-12 h-12 rounded-2xl bg-cream/30 flex items-center justify-center mx-auto mb-4 ${stat.color}`}><Icon size={24} /></div>
                <p className="text-2xl font-bold text-navy">{stat.value}</p>
                <p className="text-navy/60 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-navy mb-12 text-center">How hosting works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Set up your listing', desc: 'Add photos, details, and pricing. It\'s easy and free.', icon: '📝' },
            { step: '02', title: 'Welcome guests', desc: 'Manage reservations, communicate, and earn.', icon: '🤝' },
            { step: '03', title: 'Get paid', desc: 'Keep what you earn with flexible payout options.', icon: '💰' },
          ].map((item, i) => (
            <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center p-8 bg-white rounded-3xl border border-cream/20 shadow-xl">
              <div className="text-5xl mb-4">{item.icon}</div>
              <span className="text-golden font-bold text-sm uppercase tracking-wider">{item.step}</span>
              <h3 className="text-2xl font-bold text-navy mt-2 mb-3">{item.title}</h3>
              <p className="text-navy/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why host */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-navy mb-12 text-center">Why host with NESTORA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Star, title: 'Reach millions', desc: 'Your listing appears on the most trusted travel platform.' },
            { icon: DollarSign, title: 'Set your price', desc: 'You control pricing, availability, and house rules.' },
            { icon: TrendingUp, title: 'Grow your income', desc: 'Earn up to 97% of the booking amount.' },
            { icon: Calendar, title: 'Flexible scheduling', desc: 'Choose when you host and for how long.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-cream/20 hover:shadow-lg transition-shadow">
                <div className="p-3 bg-golden/10 rounded-xl shrink-0"><Icon size={22} className="text-golden" /></div>
                <div><h3 className="font-bold text-navy mb-1">{item.title}</h3><p className="text-navy/60 text-sm">{item.desc}</p></div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-navy mb-12 text-center">What hosts say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOST_DATA && Object.values(HOST_DATA).slice(0, 3).map((host, i) => (
            <motion.div key={host.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl border border-cream/20 text-center">
              <img src={host.avatar} alt={host.name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
              <h4 className="font-bold text-navy">{host.name}</h4>
              <p className="text-golden text-sm mb-3">Superhost since {host.hostingSince}</p>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className={`w-4 h-4 ${j < 5 ? 'fill-golden' : 'fill-navy/20'}`} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                ))}
              </div>
              <p className="text-navy/60 text-sm">{host.reviews} reviews · {host.responseRate}% response rate</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Button size="lg" onClick={() => router.push('/host/listings')}>Start hosting today</Button>
      </div>
    </div>
  );
}