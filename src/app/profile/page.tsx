"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '@/context/AuthContext';
import { useThemeContext } from '@/context/ThemeContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, MapPin, Globe, Moon, Sun, LogOut, Settings, Bell, Shield, Star, Heart } from 'lucide-react';
import { LANGUAGES, CURRENCIES } from '@/lib/types';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuthContext();
  const { resolvedTheme, setMode, language, setLanguage, currency, setCurrency } = useThemeContext();
  const [editing, setEditing] = React.useState<'name' | 'email' | 'phone' | null>(null);
  const [editValue, setEditValue] = React.useState('');
  const [userData, setUserData] = useLocalStorage<{ email: string; phone: string }>(user?.id ? `nestora-user-${user.id}` : '', { email: user?.email || '', phone: user?.phone || '' });

  if (!user) {
    return (
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto text-center">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-3xl font-bold text-navy mb-2">Please sign in</h2>
        <p className="text-navy/60 mb-6">Access your profile to manage your account.</p>
        <Link href="/login"><Button size="lg">Sign In</Button></Link>
      </div>
    );
  }

  const sections = [
    { icon: User, label: 'Personal Information', color: 'text-navy', field: 'name' as const, placeholder: 'Full name' },
    { icon: Mail, label: 'Email', color: 'text-navy', field: 'email' as const, placeholder: 'Email address' },
    { icon: Phone, label: 'Phone', color: 'text-navy', field: 'phone' as const, placeholder: 'Phone number' },
    { icon: Heart, label: 'Favorites', color: 'text-golden', href: '/favorites' },
    { icon: Bell, label: 'Notifications', color: 'text-navy', href: '/settings' },
    { icon: Shield, label: 'Privacy & Security', color: 'text-navy', href: '/settings' },
    { icon: Settings, label: 'Settings', color: 'text-navy', href: '/settings' },
  ];

  const openEdit = (field: 'name' | 'email' | 'phone', current: string) => {
    setEditing(field);
    setEditValue(current);
  };

  const saveEdit = (field: 'name' | 'email' | 'phone') => {
    if (field === 'name') updateUser({ name: editValue || user.name });
    if (field === 'email') { updateUser({ email: editValue || user.email }); setUserData((prev) => ({ ...prev, email: editValue })); }
    if (field === 'phone') setUserData((prev) => ({ ...prev, phone: editValue }));
    setEditing(null);
  };

  return (
    <div className="pt-20 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl border border-cream/20 p-8 mb-6 text-center">
          <div className="w-24 h-24 rounded-full bg-golden flex items-center justify-center mx-auto mb-4 text-white font-bold text-3xl shadow-xl">
            {user.name.charAt(0)}
          </div>
          <h1 className="text-3xl font-bold text-navy mb-1">{user.name}</h1>
          <p className="text-navy/60">{user.email}</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="px-3 py-1 bg-golden/10 text-golden rounded-full text-xs font-bold">⭐ Premium Member</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">✓ Verified</span>
          </div>
        </motion.div>

        {/* Menu Sections */}
        <div className="bg-white rounded-3xl shadow-xl border border-cream/20 overflow-hidden">
          {sections.map((section) => {
            const Icon = section.icon;
            const hasHref = !!section.href;
            const isEditable = 'field' in section;
            const currentValue = isEditable
              ? section.field === 'name' ? user.name : section.field === 'email' ? userData.email : userData.phone
              : '';
            const content = (
              <button
                key={section.label}
                onClick={() => {
                  if (isEditable) openEdit((section as { field: 'name' | 'email' | 'phone' }).field, currentValue || '');
                }}
                className="w-full flex items-center justify-between p-5 border-b border-navy/5 hover:bg-cream/30 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${section.color === 'text-golden' ? 'bg-golden/10' : 'bg-cream/30'}`}>
                    <Icon size={20} className={section.color} />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-navy block">{section.label}</span>
                    {isEditable && <span className="text-xs text-navy/40">{currentValue}</span>}
                  </div>
                </div>
                <svg className="w-5 h-5 text-navy/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            );
            if (hasHref) return <Link key={section.label} href={section.href}>{content}</Link>;
            return content;
          })}

          <button onClick={() => { logout(); }} className="w-full p-5 text-left flex items-center gap-4 hover:bg-red-50 transition-colors border-t border-navy/5">
            <div className="p-3 rounded-xl bg-red-50">
              <LogOut size={20} className="text-red-500" />
            </div>
            <span className="font-medium text-red-500">Log Out</span>
          </button>
        </div>

        {/* Theme & Language */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 bg-white rounded-3xl shadow-xl border border-cream/20 p-8">
          <h3 className="text-xl font-bold text-navy mb-6">Preferences</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {resolvedTheme === 'dark' ? <Moon size={20} className="text-navy" /> : <Sun size={20} className="text-navy" />}
                <span className="font-medium text-navy">Dark mode</span>
              </div>
              <button onClick={() => setMode(resolvedTheme === 'dark' ? 'light' : 'dark')} className="w-14 h-8 bg-cream rounded-full relative">
                <div className={`absolute top-1 w-6 h-6 bg-navy rounded-full shadow transition-all ${resolvedTheme === 'dark' ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-navy">Language</span>
              <select value={language.code} onChange={(e) => setLanguage(LANGUAGES.find((l) => l.code === e.target.value) || LANGUAGES[0])} className="bg-cream text-navy rounded-xl px-3 py-2 text-sm font-medium outline-none focus:border-golden/40">
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-navy">Currency</span>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-cream text-navy rounded-xl px-3 py-2 text-sm font-medium outline-none focus:border-golden/40">
                {Object.keys(CURRENCIES).map((cur) => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Edit Modal */}
      {editing && (() => {
        const section = sections.find((s) => 'field' in s && s.field === editing);
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditing(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
              <h3 className="text-2xl font-bold text-navy mb-4">Edit {section?.label}</h3>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={section?.placeholder}
                className="w-full p-4 bg-cream/50 border border-navy/10 rounded-xl text-navy outline-none focus:border-golden/40 mb-6"
              />
              <div className="flex gap-3">
                <Button variant="outline" size="md" className="flex-1" onClick={() => setEditing(null)}>Cancel</Button>
                <Button size="md" className="flex-1" onClick={() => editing && saveEdit(editing)}>Save</Button>
              </div>
            </motion.div>
          </motion.div>
        );
      })()}
    </div>
  );
}
