import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface StaticPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function StaticPage({ title, subtitle, children }: StaticPageProps) {
  return (
    <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-navy/50 hover:text-navy text-sm font-medium mb-8 transition-colors">
        <ArrowLeft size={16} /> Back home
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">{title}</h1>
      {subtitle && <p className="text-lg text-navy/60 mb-10">{subtitle}</p>}
      <div className="bg-white rounded-3xl shadow-xl border border-cream/20 p-8 md:p-10 text-navy/70 leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  );
}