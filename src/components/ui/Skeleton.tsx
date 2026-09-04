"use client";

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = 'rect', width, height }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
      className={`bg-gradient-to-r from-cream/40 via-navy/5 to-cream/40 bg-[length:200%_100%] animate-shimmer rounded-lg ${
        variant === 'circle' ? 'rounded-full' : ''
      } ${className || ''}`}
      style={{ width, height }}
    />
  );
}

export function PropertySkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-cream/20">
      <Skeleton className="aspect-[4/5]" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between items-center pt-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 p-8">
      <Skeleton className="h-10 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-cream/20">
            <Skeleton className="h-12 w-12 rounded-2xl mb-4" />
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
      </div>
      <Skeleton className="h-64 w-full rounded-3xl" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-cream/20 p-6 space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-16 w-full rounded-2xl" />
      <Skeleton className="h-10 w-full rounded-2xl" />
    </div>
  );
}

export function StayCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-cream/20 shadow-sm">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="p-4 space-y-2.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}

export function SearchBarSkeleton() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-cream/30 p-2">
      <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
        <Skeleton className="md:flex-1 h-12 m-2 rounded-xl" />
        <Skeleton className="md:flex-1 h-12 m-2 rounded-xl" />
        <Skeleton className="md:flex-1 h-12 m-2 rounded-xl" />
        <Skeleton className="md:w-28 h-12 m-2 rounded-2xl" />
      </div>
    </div>
  );
}