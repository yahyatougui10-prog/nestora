"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Heart, Briefcase, MessageCircle, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { label: 'Explore', icon: Compass, href: '/explore' },
  { label: 'Favorites', icon: Heart, href: '/favorites' },
  { label: 'Trips', icon: Briefcase, href: '/trips' },
  { label: 'Messages', icon: MessageCircle, href: '/messages' },
  { label: 'Profile', icon: User, href: '/profile' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-cream/10 px-2 py-2 pb-4">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 transition-all",
                isActive ? "text-golden" : "text-cream/40"
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}