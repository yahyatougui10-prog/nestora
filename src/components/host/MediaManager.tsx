"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Plus, Trash2, ArrowUpDown } from 'lucide-react';
import { useToastContext } from '@/context/ToastContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface MediaItem {
  id: string;
  url: string;
  caption?: string;
  isCover: boolean;
}

interface HostMediaManagerProps {
  onUpload: (items: MediaItem[]) => void;
  initialItems?: MediaItem[];
}

export function HostMediaManager({ onUpload, initialItems = [] }: HostMediaManagerProps) {
  const { addToast } = useToastContext();
  const [items, setItems] = useState<MediaItem[]>(initialItems);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const valid = Array.from(files).filter(
      (f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE
    );
    if (valid.length === 0) {
      addToast({ type: 'error', title: 'Invalid file', message: 'Please upload JPEG, PNG or WebP files under 5MB.' });
      return;
    }
    const urls = valid.map((f) => URL.createObjectURL(f));
    const newItems = valid.map((f, i) => ({
      id: `temp-${Date.now() + i}`,
      url: urls[i],
      caption: '',
      isCover: i === 0,
    }));
    setItems((prev) => [...prev, ...newItems]);
    // Clean up object URLs after a moment
    setTimeout(() => urls.forEach((u) => URL.revokeObjectURL(u)), 5000);
  }, [addToast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (!files) return;
    const valid = Array.from(files).filter(
      (f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE
    );
    if (valid.length === 0) {
      addToast({ type: 'error', title: 'Invalid file', message: 'Please upload valid images.' });
      return;
    }
    const urls = valid.map((f) => URL.createObjectURL(f));
    const newItems = valid.map((f, i) => ({
      id: `temp-${Date.now() + i}`,
      url: urls[i],
      caption: '',
      isCover: i === 0,
    }));
    setItems((prev) => [...prev, ...newItems]);
    setTimeout(() => urls.forEach((u) => URL.revokeObjectURL(u)), 5000);
  }, [addToast]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    addToast({ type: 'success', title: 'Removed', message: 'Image removed.' });
  }, [addToast]);

  const setAsCover = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => ({ ...item, isCover: item.id === id }))
    );
    addToast({ type: 'success', title: 'Cover updated', message: 'Cover image set.' });
  }, [addToast]);

  const reorderItem = useCallback(
    (id: string, direction: 'up' | 'down') => {
      setItems((prev) => {
        const idx = prev.findIndex((item) => item.id === id);
        if (idx < 0 || idx === prev.length - 1 && direction === 'down') return prev;
        const nextIdx = direction === 'up' ? idx - 1 : idx + 1;
        const newItems = [...prev];
        [newItems[idx], newItems[nextIdx]] = [newItems[nextIdx], newItems[idx]];
        return newItems;
      });
      addToast({ type: 'success', title: 'Reordered', message: 'Image order updated.' });
    }
  , [addToast]);

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div
        className={cn(
          'border-2 border-dashed border-navy/20 rounded-3xl p-8 text-center cursor-pointer',
          dragging ? 'border-golden bg-golden/10' : ''
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-3">
          <Plus size={24} className="text-navy/40 mx-auto d-block" />
        </div>
        <p className="text-navy/60 text-sm mb-2">Drag & drop images here</p>
        <p className="text-navy/50 text-xs">
          JPEG, PNG, WebP — max 5MB each
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <button
          className="mt-3 w-full py-2 bg-navy text-cream rounded-full text-sm font-bold hover:bg-orange transition-colors"
          onClick={() => // @ts-ignore
fileInputRef.current?.click()}
        >
          Select from device
        </button>
      </div>

      {/* Manager grid */}
      {items.length === 0 ? (
        <div className="text-center text-navy/40 py-8">
          <span className="text-3xl">📷</span>
          <p>No images yet</p>
          <p className="mt-1 text-navy/50">Add your first property photo</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={cn(
                'relative rounded-lg overflow-hidden bg-white dark:bg-navy/30 p-3 shadow-sm',
                item.isCover && 'border-2 border-golden'
              )}
            >
              <img
                src={item.url}
                alt={item.caption || 'Property image'}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={() => setAsCover(item.id)}
                  className="p-1 rounded-full bg-white/10 text-golden text-xs hover:bg-golden/20 transition-colors"
                  aria-label="Set as cover"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M4 5h16v2H4zm0 3h16v2H4zm0 3h16v2H4z" /></svg>
                </button>
                <button onClick={() => removeItem(item.id)} className="p-1 rounded bg-white/10 text-navy/60 text-xs hover:text-navy transition-colors" aria-label="Remove">
                  <Trash2 size={12} />
                </button>
              </div>
              <input
                type="text"
                value={item.caption || ''}
                onChange={(e) => {
                  setItems(
                    items.map((it) =>
                      it.id === item.id ? { ...it, caption: e.target.value } : it
                    )
                  );
                }}
                className="w-full p-1 rounded border border-navy/20 text-sm mt-2"
                placeholder="Caption"
                readOnly
              />
            </div>
          ))}
          <div className="flex gap-2 mt-4">
            <button onClick={() => setAsCover(items[items.length - 1]?.id ?? '')} className="flex-1 py-2 bg-golden text-navy rounded-full text-sm font-bold hover:bg-orange transition-colors">
              Set as cover
            </button>
          </div>
        </div>
      )}

      {/* Reorder controls */}
      {items.length > 1 && (
        <div className="flex gap-2 pt-3">
          <button onClick={() => reorderItem(items[0].id, 'up')} className="flex-1 py-2 bg-white/10 rounded-full text-sm text-navy/60 hover:bg-white/20 transition-colors" disabled={items[0].id === items[1]?.id}>
            <ArrowUpDown size={14} /> Up
          </button>
          <button onClick={() => reorderItem(items[items.length - 1].id, 'down')} className="flex-1 py-2 bg-white/10 rounded-full text-sm text-navy/60 hover:bg-white/20 transition-colors" disabled={items[items.length - 2]?.id === items[items.length - 1]?.id}>
            Down
          </button>
        </div>
      )}
    </div>
  );
}