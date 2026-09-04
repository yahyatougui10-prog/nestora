"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Footer() {
  const pathname = usePathname();

  const footerSections = [
    {
      title: 'Explore',
      links: [
        { label: 'Stays', href: '/explore' },
        { label: 'Explore all', href: '/explore' },
        { label: 'Destinations', href: '/destinations' },
        { label: 'Guest favorites', href: '/favorites' },
      ],
    },
    {
      title: 'Host',
      links: [
        { label: 'Become a host', href: '/host' },
        { label: 'Start hosting', href: '/host' },
        { label: 'Your listings', href: '/host/listings' },
        { label: 'Host dashboard', href: '/host/listings' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Support', href: '/support' },
        { label: 'Safety', href: '/safety' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Help center', href: '/support' },
        { label: 'Account', href: '/profile' },
      ],
    },
  ];

  return (
    <footer className="bg-navy text-cream pt-16 pb-8 px-6 border-t border-cream/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-bold text-golden mb-6">{section.title}</h3>
              <ul className="flex flex-col gap-4">
                {section.links.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-cream/70 hover:text-golden transition-colors text-sm",
                          isActive && "text-golden font-bold"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center bg-golden rounded-lg text-navy font-bold text-xs">N</div>
            <span className="text-lg font-bold tracking-tight text-white">NESTORA</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-cream/60">
            <span>© 2026 NESTORA — Discover places worth remembering.</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-golden transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-golden transition-colors">Terms</Link>
              <Link href="/support" className="hover:text-golden transition-colors">Help</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}