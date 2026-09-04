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
    <footer className="relative bg-navy text-cream pt-16 pb-8 px-6 overflow-hidden">
      <div aria-hidden className="pattern-zellige-gold absolute inset-x-0 top-0 h-px opacity-100" />
      <div aria-hidden className="absolute -top-24 right-0 w-[560px] h-[560px] glow-gold opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-14">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-golden text-navy font-bold flex items-center justify-center text-sm shadow-lg">N</div>
              <span className="text-2xl font-bold tracking-tight text-white">NESTORA</span>
            </div>
            <div className="ornament-divider mb-4">
              <span className="zellige-star text-lg text-golden" />
            </div>
            <p className="text-cream/60 text-sm leading-relaxed">
              Discover Morocco. Stay beautifully. Hand-picked riads, desert camps and
              one-of-a-kind homes across the Kingdom and beyond.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 flex-1 md:max-w-3xl">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-bold text-golden mb-4 uppercase tracking-widest">{section.title}</h3>
                <ul className="flex flex-col gap-3">
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
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-sm text-cream/60">© 2026 NESTORA — Discover Morocco. Stay beautifully.</span>
          <div className="flex gap-4 text-sm text-cream/60">
            <Link href="/privacy" className="hover:text-golden transition-colors">Privacy</Link>
            <span aria-hidden className="text-golden/40">·</span>
            <Link href="/terms" className="hover:text-golden transition-colors">Terms</Link>
            <span aria-hidden className="text-golden/40">·</span>
            <Link href="/support" className="hover:text-golden transition-colors">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}