"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { LANGUAGES, LanguageConfig } from '@/lib/types';

interface ThemeContextType {
  mode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
  language: LanguageConfig;
  setLanguage: (lang: LanguageConfig) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  direction: 'ltr' | 'rtl';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
}

function getInitialMode(): 'light' | 'dark' | 'system' {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem('nestora-theme');
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return 'system';
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<'light' | 'dark' | 'system'>(getInitialMode);
  const [language, setLanguage] = useState<LanguageConfig>(() => {
    if (typeof window === 'undefined') return LANGUAGES[0];
    const storedLang = localStorage.getItem('nestora-language');
    const found = storedLang ? LANGUAGES.find((l) => l.code === storedLang) : undefined;
    return found || LANGUAGES[0];
  });
  const [currency, setCurrency] = useState(() => {
    if (typeof window === 'undefined') return 'USD';
    return localStorage.getItem('nestora-currency') || 'USD';
  });

  const resolvedTheme: 'light' | 'dark' = mode === 'system' ? getSystemTheme() : mode;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nestora-theme', mode);
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  }, [mode, resolvedTheme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      document.documentElement.classList.toggle('dark', mq.matches);
    };
    if (mode === 'system') handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nestora-language', language.code);
    document.documentElement.dir = language.rtl ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nestora-currency', currency);
  }, [currency]);

  const setMode = useCallback((next: 'light' | 'dark' | 'system') => {
    setModeState(next);
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, resolvedTheme, language, setLanguage, currency, setCurrency, direction: language.rtl ? 'rtl' as const : 'ltr' as const }),
    [mode, setMode, resolvedTheme, language, currency]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
