"use client";

import React from 'react';
import PropertyCard from './PropertyCard';
import { MOCK_PROPERTIES } from '@/lib/data';

export default function PropertyGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
      {MOCK_PROPERTIES.map((prop) => (
        <PropertyCard key={prop.id} property={prop} />
      ))}
    </div>
  );
}
