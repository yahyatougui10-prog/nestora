"use client";

import { useState, useMemo, useCallback } from 'react';
import { SearchParams, Property } from '@/lib/types';
import { MOCK_PROPERTIES } from '@/lib/data';
import { debounce } from '@/lib/utils';

export function useSearch() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
    priceRange: [0, 1000],
    propertyTypes: [],
    ratings: [],
    amenities: [],
    sortBy: 'recommended',
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const locations = [
    'Marrakech, Morocco',
    'Casablanca, Morocco',
    'Tangier, Morocco',
    'Agadir, Morocco',
    'Essaouira, Morocco',
    'Chefchaouen, Morocco',
    'Paris, France',
    'Barcelona, Spain',
    'Dubai, UAE',
    'Marrakech',
    'Casablanca',
    'Tangier',
    'Agadir',
    'Essaouira',
    'Chefchaouen',
    'Paris',
    'Barcelona',
    'Dubai',
  ];

  const debouncedSearch = useMemo(() => debounce((query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const filtered = locations.filter((loc) =>
      loc.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
  }, 150), []);

  const updateSearch = useCallback((updates: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...updates }));
  }, []);

  const performSearch = useCallback(() => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);
  }, []);

  const filteredProperties = useMemo(() => {
    let results = [...MOCK_PROPERTIES];

    if (searchParams.location) {
      const loc = searchParams.location.toLowerCase();
      results = results.filter(
        (p) =>
          p.location.toLowerCase().includes(loc) ||
          p.city.toLowerCase().includes(loc) ||
          p.country.toLowerCase().includes(loc) ||
          p.category.toLowerCase().includes(loc)
      );
    }

    if (searchParams.priceRange[0] > 0) {
      results = results.filter((p) => p.price >= searchParams.priceRange[0]);
    }
    if (searchParams.priceRange[1] < 1000) {
      results = results.filter((p) => p.price <= searchParams.priceRange[1]);
    }

    if (searchParams.propertyTypes.length > 0) {
      results = results.filter((p) => searchParams.propertyTypes.includes(p.type));
    }

    if (searchParams.ratings.length > 0) {
      const minRating = Math.min(...searchParams.ratings);
      results = results.filter((p) => p.rating >= minRating);
    }

    if (searchParams.amenities.length > 0) {
      results = results.filter((p) =>
        searchParams.amenities.every((a) => p.amenities.includes(a))
      );
    }

    switch (searchParams.sortBy) {
      case 'priceLow':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        results.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return results;
  }, [searchParams]);

  const searchByLocation = useCallback(
    (query: string) => {
      debouncedSearch(query);
      setSearchParams((prev) => ({ ...prev, location: query }));
    },
    [debouncedSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchParams((prev) => ({
      ...prev,
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 2,
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0,
      priceRange: [0, 1000],
      propertyTypes: [],
      ratings: [],
      amenities: [],
      sortBy: 'recommended',
    }));
    setSuggestions([]);
  }, []);

  return {
    searchParams,
    updateSearch,
    performSearch,
    filteredProperties,
    suggestions,
    isSearching,
    searchByLocation,
    clearSearch,
  };
}
