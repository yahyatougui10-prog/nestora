"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Heart,
  Plane,
  MessageSquare,
  User,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Trips', icon: Plane, href: '/dashboard/trips' },
    { label: 'Favorites', icon: Heart, href: '/dashboard/favorites' },
    { label: 'Messages', icon: MessageSquare, href: '/dashboard/messages' },
    { label: 'Profile', icon: User, href: '/dashboard/profile' },
    { label: 'Payments', icon: CreditCard, href: '/dashboard/payments' },
    { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen flex bg-cream/20">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-navy text-cream transition-transform duration-300 flex flex-col",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-golden rounded-lg text-navy font-bold text-sm">N</div>
          <span className="text-xl font-bold tracking-tight text-white">NESTORA</span>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium",
                  isActive
                    ? "bg-golden text-navy"
                    : "text-cream/60 hover:bg-white/10 hover:text-cream"
                )}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-cream/60 hover:bg-white/10 hover:text-white transition-all font-medium">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow md:ml-64 min-h-screen flex flex-col">
        <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-cream/20 sticky top-0 z-40">
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-navy">Alex Johnson</p>
              <p className="text-xs text-navy/50">Premium Member</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-golden flex items-center justify-center text-navy font-bold">AJ</div>
          </div>
        </header>

        <div className="p-8 flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
}
