"use client";

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'priceLow', label: 'Price: Low to High' },
  { value: 'priceHigh', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
];

export function SortMenu() {
  const { searchParams, updateSearch } = useSearch();
  const router = useRouter();
  const [sortBy, setSortBy] = useState<string>(searchParams.sortBy || 'recommended');

  const handleSort = useCallback((value: string) => {
    setSortBy(value);
    const params = new URLSearchParams();
    params.set('sortBy', value);
    if (searchParams?.location) params.set('location', searchParams.location);
    if (searchParams?.checkIn) params.set('checkIn', searchParams.checkIn);
    if (searchParams?.checkOut) params.set('checkOut', searchParams.checkOut);
    params.set('guests', String(searchParams?.guests || 2));
    if (searchParams?.priceRange) params.set('priceRange', searchParams.priceRange.join(','));
    router.push(`/explore?${params.toString()}`);
  }, [searchParams, router]);

  return (
    <div className="relative">
      <Button
        className="w-full justify-start"
      >
        <span className="font-medium text-navy">{sortBy}</span>
        <ChevronDown size={12} className="ml-2 opacity-70" />
      </Button>
      <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-xl py-2 z-10">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSort(option.value)}
            className={cn(
              "w-full px-3 py-1.5 text-sm font-medium transition-colors",
              sortBy === option.value ? "bg-golden text-navy" : "text-navy/60 hover:bg-cream/20"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}