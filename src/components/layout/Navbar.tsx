"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, User, Menu, X, Globe, Moon, Sun, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeContext } from '@/context/ThemeContext';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { LANGUAGES } from '@/lib/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setMode, direction } = useThemeContext();
  const { language, setLanguage } = useThemeContext();
  const { user, isAuthenticated, logout } = useAuthContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'Explore', href: '/explore' },
    { label: 'Stays', href: '/explore' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Host', href: '/host' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 py-3",
        isScrolled
          ? "bg-navy/90 backdrop-blur-xl shadow-xl text-cream"
          : "bg-transparent text-white"
      )}
      dir={direction}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="relative w-10 h-10 flex items-center justify-center bg-golden rounded-xl transition-transform group-hover:scale-110">
            <div className="absolute inset-0 border-2 border-navy rounded-xl scale-75 group-hover:scale-90 transition-transform" />
            <span className="text-navy font-bold text-xl">N</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">NESTORA</span>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label + item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-2 rounded-xl text-sm font-medium transition-all",
                pathname === item.href
                  ? "bg-white/10 text-golden"
                  : "text-white/80 hover:text-golden hover:bg-white/5"
              )}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-golden rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMode(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="hidden sm:flex w-10 h-10 p-0 rounded-full"
              aria-label="Toggle theme"
            >
              {mounted ? (resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />) : <Moon size={18} />}
            </Button>

          {isAuthenticated ? (
            <div className="relative" suppressHydrationWarning>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-golden flex items-center justify-center text-navy font-bold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="hidden md:block text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={14} />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-navy rounded-2xl shadow-xl border border-cream/20 py-2 z-50"
                  >
                    <Link href="/profile" onClick={() => { setShowUserMenu(false); setMobileMenuOpen(false); }}>
                      <button className="w-full text-left px-4 py-3 text-sm font-medium text-navy dark:text-cream hover:bg-cream/50 transition-colors">
                        My Profile
                      </button>
                    </Link>
                    <Link href="/trips" onClick={() => { setShowUserMenu(false); setMobileMenuOpen(false); }}>
                      <button className="w-full text-left px-4 py-3 text-sm font-medium text-navy dark:text-cream hover:bg-cream/50 transition-colors">
                        My Trips
                      </button>
                    </Link>
                    <Link href="/favorites" onClick={() => { setShowUserMenu(false); setMobileMenuOpen(false); }}>
                      <button className="w-full text-left px-4 py-3 text-sm font-medium text-navy dark:text-cream hover:bg-cream/50 transition-colors">
                        Favorites
                      </button>
                    </Link>
                    <hr className="border-navy/10 my-2" />
                    <button
                      onClick={() => { logout(); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-golden hover:bg-orange text-navy font-bold rounded-full text-sm transition-all shadow-lg">
              <User size={16} />
              Sign In
            </Link>
          )}

          <button
            className="md:hidden p-2 z-50"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-navy/95 backdrop-blur-xl text-cream p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label + item.href}
              href={item.href}
                  onClick={() => { setMobileMenuOpen(false); setShowUserMenu(false); }}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium",
                    pathname === item.href ? "bg-white/10 text-golden" : "text-cream/80"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-base font-medium text-cream/80">
                    My Profile
                  </Link>
                  <Link href="/trips" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-base font-medium text-cream/80">
                    My Trips
                  </Link>
                  <hr className="border-cream/10 my-2" />
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="px-4 py-3 rounded-xl text-base font-medium text-red-400 text-left">
                    Log Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-base font-medium text-golden bg-white/10 mt-2 text-center">
                  Sign In
                </Link>
              )}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-cream/10">
                <button
                  onClick={() => setMode(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center gap-2 text-cream/80 text-sm"
                >
            <span suppressHydrationWarning>
            {mounted ? (resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />) : <Moon size={18} />}
            </span>
                  {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
                <button
                  onClick={() => {
                    const idx = LANGUAGES.findIndex((l) => l.code === language.code);
                    setLanguage(LANGUAGES[(idx + 1) % LANGUAGES.length]);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-cream/80 text-sm"
                >
                  <Globe size={18} />
                  {language.nativeName}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}