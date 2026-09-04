"use client";

import { useCallback } from 'react';
import { Property } from '@/lib/types';
import { MOCK_PROPERTIES } from '@/lib/data';
import { useLocalStorage } from './useLocalStorage';

const MAX_RECENT = 8;

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useLocalStorage<string[]>('nestora-recent', []);

  const recordView = useCallback(
    (propertyId: string) => {
      setRecentIds((prev) => {
        const next = [propertyId, ...prev.filter((id) => id !== propertyId)];
        return next.slice(0, MAX_RECENT);
      });
    },
    [setRecentIds]
  );

  const clearRecent = useCallback(() => setRecentIds([]), [setRecentIds]);

  const recentProperties: Property[] = recentIds
    .map((id) => MOCK_PROPERTIES.find((p) => p.id === id))
    .filter((p): p is Property => Boolean(p));

  return { recentIds, recentProperties, recordView, clearRecent };
}