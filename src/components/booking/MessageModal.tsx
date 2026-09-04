"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Host } from '@/lib/types';
import { generateId } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Conversation, Message } from '@/lib/types';
import { useToastContext } from '@/context/ToastContext';

interface MessageModalProps {
  host: Host;
  onClose: () => void;
}

export function MessageModal({ host, onClose }: MessageModalProps) {
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('nestora-messages', []);
  const { addToast } = useToastContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find((c) => c.hostId === host.id);
  const messages = conversation?.messages || [];

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage: Message = {
      id: generateId(),
      conversationId: conversation?.id || generateId(),
      senderId: 'user-me',
      senderName: 'You',
      senderAvatar: 'https://i.pravatar.cc/150?u=me',
      content: message,
      timestamp: new Date().toISOString(),
      read: true,
    };

    const newConversation: Conversation = {
      id: conversation?.id || generateId(),
      propertyId: 'prop-1',
      propertyName: 'Property',
      hostId: host.id,
      hostName: host.name,
      hostAvatar: host.avatar,
      messages: [...messages, newMessage],
      updatedAt: new Date().toISOString(),
    };

    setConversations((prev) => {
      const exists = prev.find((c) => c.hostId === host.id);
      if (exists) return prev.map((c) => c.hostId === host.id ? newConversation : c);
      return [newConversation, ...prev];
    });

    addToast({ type: 'success', title: 'Message sent', message: '📩 Your message has been sent.' });
    setMessage('');
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 50);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-navy/5 p-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <img src={host.avatar} alt={host.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-bold text-navy text-sm">{host.name}</p>
                <p className="text-xs text-navy/50">Usually responds within {host.responseTime}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-cream/50 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">💬</div>
                <p className="text-navy/50 text-sm">Start a conversation with {host.name}</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderId === 'user-me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-3 rounded-2xl ${msg.senderId === 'user-me' ? 'bg-navy text-cream rounded-br-sm' : 'bg-cream/50 text-navy rounded-bl-sm'}`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-[10px] opacity-50 mt-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-white border-t border-navy/5 p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Write a message..."
                className="flex-1 p-3 bg-cream/30 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-navy"
              />
              <button onClick={sendMessage} className="p-3 bg-golden text-navy rounded-xl hover:bg-orange transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
