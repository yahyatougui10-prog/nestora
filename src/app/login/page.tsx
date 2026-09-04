"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const { login, signup, isAuthenticated } = useAuthContext();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('alex@nestora.com');
  const [password, setPassword] = useState('password');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (isAuthenticated) {
    router.push('/profile');
    return null;
  }

  const handleSocialLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const success = await login(email || 'guest@nestora.com', 'password');
      if (!success) setError('Unable to sign in with this provider.');
      else router.push('/profile');
    } catch {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  const handleForgot = async () => {
    if (!resetEmail.trim()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setResetSent(true);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        const success = await login(email, password);
        if (!success) setError('Invalid email or password.');
        else router.push('/profile');
      } else {
        if (!name.trim()) {
          setError('Name is required.');
          setLoading(false);
          return;
        }
        const success = await signup(name, email, password);
        if (!success) setError('Something went wrong.');
        else router.push('/profile');
      }
    } catch {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-6 bg-cream/20 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-golden rounded-2xl mb-4 shadow-xl">
            <span className="text-navy font-bold text-2xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-navy">NESTORA</h1>
          <p className="text-navy/60 mt-2">{isLogin ? 'Welcome back' : 'Create your account'}</p>
        </div>

        <motion.div
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-cream/20 p-8"
        >
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-bold text-navy uppercase block mb-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-navy" placeholder="Your name" required />
                </div>
              </div>
            )}
            <div>
              <label className="text-xs font-bold text-navy uppercase block mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-navy" placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-navy uppercase block mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-12 py-4 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-navy" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/40">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-navy/60 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-navy/20 text-golden focus:ring-golden" />
                  Remember me
                </label>
                <button type="button" onClick={() => setShowForgot(true)} className="text-navy font-bold hover:text-orange transition-colors">Forgot password?</button>
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full mt-6">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-grow border-t border-navy/10" />
            <span className="text-navy/40 text-sm">or</span>
            <div className="flex-grow border-t border-navy/10" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" onClick={handleSocialLogin} disabled={loading} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-navy/10 text-navy font-medium hover:bg-cream/50 transition-colors disabled:opacity-60">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button type="button" onClick={handleSocialLogin} disabled={loading} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-navy/10 text-navy font-medium hover:bg-cream/50 transition-colors disabled:opacity-60">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              Apple
            </button>
          </div>
        </motion.div>

        <div className="text-center mt-6">
          <p className="text-navy/60 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => setIsLogin(!isLogin)} className="text-navy font-bold hover:text-orange transition-colors ml-1">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setShowForgot(false); setResetSent(false); }}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            {resetSent ? (
              <div className="text-center">
                <div className="text-5xl mb-4">✉️</div>
                <h3 className="text-2xl font-bold text-navy mb-2">Check your email</h3>
                <p className="text-navy/60 mb-6">We sent a password reset link to <span className="font-semibold text-navy">{resetEmail}</span></p>
                <Button className="w-full" onClick={() => { setShowForgot(false); setResetSent(false); }}>Done</Button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-navy mb-2">Reset your password</h3>
                <p className="text-navy/60 mb-6">Enter your email and we&apos;ll send you a reset link.</p>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full p-4 bg-cream/50 border border-navy/10 rounded-xl text-navy outline-none focus:border-golden/40 mb-6"
                />
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => { setShowForgot(false); setResetSent(false); }}>Cancel</Button>
                  <Button className="flex-1" loading={loading} onClick={handleForgot}>Send link</Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}