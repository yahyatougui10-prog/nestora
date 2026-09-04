"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeContext } from '@/context/ThemeContext';
import { useAuthContext } from '@/context/AuthContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Moon, Sun, Bell, Mail, MessageSquare, Globe, Lock, Shield, Trash2, ArrowLeft } from 'lucide-react';
import { LANGUAGES } from '@/lib/types';
import Link from 'next/link';

export default function SettingsPage() {
  const router = useRouter();
  const { resolvedTheme, setMode } = useThemeContext();
  const { logout } = useAuthContext();
  const [notifications, setNotifications] = useLocalStorage('nestora-notifications', { email: true, booking: true, message: true });
  const [language, setLanguage] = React.useState('en');
  const [twoFactor, setTwoFactor] = useLocalStorage('nestora-2fa', true);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [showChangePassword, setShowChangePassword] = React.useState(false);

  const toggleSetting = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDelete = () => {
    setConfirmDelete(false);
    logout();
    router.push('/login');
  };

  return (
    <div className="pt-20 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-cream/50 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-navy">Settings</h1>
        </div>

        {/* Appearance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl border border-cream/20 p-8 mb-6">
          <h3 className="text-xl font-bold text-navy mb-6">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {resolvedTheme === 'dark' ? <Moon size={20} className="text-navy" /> : <Sun size={20} className="text-navy" />}
              <span className="font-medium text-navy">Dark mode</span>
            </div>
            <button onClick={() => setMode(resolvedTheme === 'dark' ? 'light' : 'dark')} className="w-14 h-8 bg-cream rounded-full relative">
              <div className={`absolute top-1 w-6 h-6 bg-navy rounded-full shadow transition-all ${resolvedTheme === 'dark' ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl shadow-xl border border-cream/20 p-8 mb-6">
          <h3 className="text-xl font-bold text-navy mb-6">Notifications</h3>
          <div className="space-y-4">
            {[
              { key: 'email' as const, label: 'Email notifications', icon: Mail },
              { key: 'booking' as const, label: 'Booking notifications', icon: Bell },
              { key: 'message' as const, label: 'Message notifications', icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-navy/40" />
                    <span className="font-medium text-navy">{item.label}</span>
                  </div>
                  <button onClick={() => toggleSetting(item.key)} className={`w-14 h-8 rounded-full relative transition-colors ${notifications[item.key] ? 'bg-golden' : 'bg-cream'}`}>
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-all ${notifications[item.key] ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Language */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-xl border border-cream/20 p-8 mb-6">
          <h3 className="text-xl font-bold text-navy mb-6">Language</h3>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full bg-cream text-navy rounded-xl px-4 py-3 outline-none focus:border-golden/40">
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name} ({lang.nativeName})</option>
            ))}
          </select>
        </motion.div>

        {/* Account */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl shadow-xl border border-cream/20 p-8 mb-6">
          <h3 className="text-xl font-bold text-navy mb-6">Account</h3>
          <div className="space-y-4">
            <Link href="/profile" className="flex items-center justify-between p-4 rounded-2xl hover:bg-cream/30 transition-colors">
              <span className="font-medium text-navy">Edit profile</span>
              <svg className="w-5 h-5 text-navy/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <button onClick={() => setConfirmDelete(true)} className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-red-50 transition-colors text-left">
              <span className="flex items-center gap-3 font-medium text-red-500">
                <Trash2 size={20} /> Delete account
              </span>
              <svg className="w-5 h-5 text-red-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-3xl shadow-xl border border-cream/20 p-8 mb-6">
          <h3 className="text-xl font-bold text-navy mb-6">Security</h3>
          <div className="space-y-4">
            <button onClick={() => setShowChangePassword(true)} className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-cream/30 transition-colors text-left">
              <span className="flex items-center gap-3 font-medium text-navy"><Shield size={20} className="text-navy/40" /> Change password</span>
              <svg className="w-5 h-5 text-navy/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-cream/30 transition-colors">
              <span className="flex items-center gap-3 font-medium text-navy"><Lock size={20} className="text-navy/40" /> Two-factor authentication</span>
              <button onClick={() => setTwoFactor(!twoFactor)} className={`w-14 h-8 rounded-full relative transition-colors ${twoFactor ? 'bg-golden' : 'bg-cream'}`}>
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-all ${twoFactor ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Delete Account Confirmation */}
      {confirmDelete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setConfirmDelete(false)}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
            <div className="text-5xl mb-4">🗑️</div>
            <h3 className="text-2xl font-bold text-navy mb-2">Delete your account?</h3>
            <p className="text-navy/60 mb-6">This action cannot be undone. All your bookings, messages and data will be permanently removed.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmDelete(false)}>Cancel</Button>
              <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={handleDelete}>Delete</Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowChangePassword(false)}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-navy mb-4">Change password</h3>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-cream/50 border border-navy/10 rounded-xl text-navy outline-none focus:border-golden/40 mb-6"
            />
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => { setShowChangePassword(false); setPassword(''); }}>Cancel</Button>
              <Button className="flex-1" onClick={() => { setShowChangePassword(false); setPassword(''); }}>Save</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}