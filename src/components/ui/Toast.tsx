"use client";

import { useToastContext } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-orange-50 border-orange-200 text-orange-800',
};

const iconColorMap = {
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-orange-500',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className="fixed top-20 right-4 z-[300] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl ${colorMap[toast.type]}`}
            >
              <Icon size={20} className={`mt-0.5 ${iconColorMap[toast.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{toast.title}</p>
                <p className="text-sm opacity-80">{toast.message}</p>
              </div>
              <button onClick={() => removeToast(toast.id)} className="p-1 rounded-full hover:bg-black/5 transition-colors">
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}