"use client";

import { useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Favorite } from '@/lib/types';
import { useToastContext } from '@/context/ToastContext';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<Favorite[]>('nestora-favorites', []);
  const { addToast } = useToastContext();

  const addFavorite = useCallback(
    (propertyId: string) => {
      setFavorites((prev) => {
        if (prev.find((f) => f.propertyId === propertyId)) {
          addToast({ type: 'info', title: 'Already saved', message: 'This place is already in your favorites.' });
          return prev;
        }
        addToast({ type: 'success', title: 'Added to favorites', message: '❤️ Saved to your favorites!' });
        return [...prev, { propertyId, addedAt: new Date().toISOString() }];
      });
    },
    [setFavorites, addToast]
  );

  const removeFavorite = useCallback(
    (propertyId: string) => {
      setFavorites((prev) => {
        const exists = prev.find((f) => f.propertyId === propertyId);
        if (exists) {
          addToast({ type: 'info', title: 'Removed', message: 'Removed from favorites.' });
        }
        return prev.filter((f) => f.propertyId !== propertyId);
      });
    },
    [setFavorites, addToast]
  );

  const toggleFavorite = useCallback(
    (propertyId: string) => {
      setFavorites((prev) => {
        const exists = prev.find((f) => f.propertyId === propertyId);
        if (exists) {
          addToast({ type: 'info', title: 'Removed', message: 'Removed from favorites.' });
          return prev.filter((f) => f.propertyId !== propertyId);
        }
        addToast({ type: 'success', title: 'Added to favorites', message: '❤️ Saved to your favorites!' });
        return [...prev, { propertyId, addedAt: new Date().toISOString() }];
      });
    },
    [setFavorites, addToast]
  );

  const isFavorite = useCallback(
    (propertyId: string) => favorites.some((f) => f.propertyId === propertyId),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite };
}
