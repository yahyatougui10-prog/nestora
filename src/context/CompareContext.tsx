"use client";

import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Property } from '@/lib/types';
import { MOCK_PROPERTIES } from '@/lib/data';

interface CompareContextType {
  compareIds: string[];
  compareProperties: Property[];
  toggleCompare: (id: string) => void;
  isCompared: (id: string) => boolean;
  clearCompare: () => void;
  canAdd: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE = 3;

export function useCompareContext() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompareContext must be used within CompareProvider');
  }
  return context;
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }, []);

  const isCompared = useCallback((id: string) => compareIds.includes(id), [compareIds]);

  const clearCompare = useCallback(() => setCompareIds([]), []);

  const compareProperties = useMemo(
    () => MOCK_PROPERTIES.filter((p) => compareIds.includes(p.id)),
    [compareIds]
  );

  const value = useMemo(
    () => ({ compareIds, compareProperties, toggleCompare, isCompared, clearCompare, canAdd: compareIds.length < MAX_COMPARE }),
    [compareIds, compareProperties, toggleCompare, isCompared, clearCompare]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}