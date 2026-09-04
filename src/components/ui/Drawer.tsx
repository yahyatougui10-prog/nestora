"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  side?: 'bottom' | 'right';
  maxHeight?: string;
}

export function Drawer({ open, onClose, title, children, side = 'bottom', maxHeight }: DrawerProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const isBottom = side === 'bottom';

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={typeof title === 'string' ? title : 'Dialog'}
            initial={isBottom ? { y: '100%' } : { x: '100%' }}
            animate={isBottom ? { y: 0 } : { x: 0 }}
            exit={isBottom ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className={cn(
              'fixed bg-white dark:bg-navy shadow-2xl flex flex-col',
              isBottom
                ? 'left-0 right-0 bottom-0 rounded-t-3xl max-h-[88vh]'
                : 'top-0 right-0 h-full w-full max-w-md rounded-l-3xl'
            )}
            style={isBottom ? { maxHeight: maxHeight || '88vh' } : undefined}
          >
            {(title || true) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-navy/5 dark:border-white/10">
                <h2 className="text-lg font-bold text-navy dark:text-cream">{title}</h2>
                <button onClick={onClose} aria-label="Close" className="p-2 rounded-full hover:bg-cream/40 dark:hover:bg-white/10 transition-colors text-navy dark:text-cream">
                  <X size={18} />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}