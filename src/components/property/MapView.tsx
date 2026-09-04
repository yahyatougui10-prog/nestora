"use client";

import React from 'react';

export function MapView({ properties }: { properties: { id: string; name: string; price: number; lat?: number; lng?: number }[] }) {
  return (
    <div className="relative h-[600px] bg-[#e8dfc8] rounded-3xl overflow-hidden shadow-inner border border-cream/30">
      {/* Simulated map background */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #021F59 1px, transparent 1px), radial-gradient(circle at 70% 60%, #021F59 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      {/* Roads */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="150" x2="100%" y2="120" stroke="#021F59" strokeWidth="3" opacity="0.15" />
        <line x1="30%" y1="0" x2="35%" y2="100%" stroke="#021F59" strokeWidth="2" opacity="0.15" />
        <line x1="70%" y1="0" x2="65%" y2="100%" stroke="#021F59" strokeWidth="2.5" opacity="0.15" />
        <line x1="0" y1="70%" x2="100%" y2="65%" stroke="#021F59" strokeWidth="3" opacity="0.15" />
      </svg>

      {/* Markers */}
      {properties.map((p, i) => {
        const left = 15 + ((i * 13) % 70);
        const top = 20 + ((i * 17) % 60);
        return (
          <a key={p.id} href={`/properties/${p.id}`} className="absolute group" style={{ left: `${left}%`, top: `${top}%` }}>
            <div className="bg-[#021F59] text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-xl shadow-[#021F59]/30 border-2 border-white group-hover:scale-110 transition-transform whitespace-nowrap">
              ${p.price}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-[#021F59] rotate-45 -mt-1.5 shadow-md" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white rounded-xl px-2 py-1 shadow-xl text-xs font-bold text-[#021F59] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {p.name}
            </div>
          </a>
        );
      })}
    </div>
  );
}
