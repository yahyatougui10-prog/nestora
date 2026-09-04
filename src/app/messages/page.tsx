"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Conversation, Message } from '@/lib/types';
import { generateId } from '@/lib/utils';
import { MOCK_CONVERSATIONS } from '@/lib/data';

export default function MessagesPage() {
  const router = useRouter();
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('nestora-messages', MOCK_CONVERSATIONS);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedConv && scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [selectedConv?.messages.length]);

  const sendMessage = () => {
    if (!message.trim() || !selectedConv) return;
    const newMsg: Message = {
      id: generateId(),
      conversationId: selectedConv.id,
      senderId: 'user-me',
      senderName: 'You',
      senderAvatar: 'https://i.pravatar.cc/150?u=me',
      content: message,
      timestamp: new Date().toISOString(),
      read: true,
    };

    const updatedConv = {
      ...selectedConv,
      messages: [...selectedConv.messages, newMsg],
      updatedAt: new Date().toISOString(),
    };

    setConversations((prev) => prev.map((c) => c.id === selectedConv.id ? updatedConv : c));
    setSelectedConv(updatedConv);
    setMessage('');

    setTimeout(() => {
      const autoReply: Message = {
        id: generateId(),
        conversationId: selectedConv.id,
        senderId: selectedConv.hostId,
        senderName: selectedConv.hostName,
        senderAvatar: selectedConv.hostAvatar,
        content: 'Thank you for your message! I will get back to you shortly. 😊',
        timestamp: new Date().toISOString(),
        read: true,
      };
      setConversations((prev) => {
        const existing = prev.find((c) => c.id === selectedConv.id);
        if (!existing) return prev;
        return prev.map((c) => c.id === selectedConv.id
          ? { ...c, messages: [...c.messages, autoReply], updatedAt: new Date().toISOString() }
          : c
        );
      });
      setSelectedConv((prev) => prev ? { ...prev, messages: [...prev.messages, autoReply] } : null);
    }, 2000);
  };

  return (
    <div className="pt-20 pb-12 px-6 h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto h-full flex gap-4">
        {/* Sidebar */}
        <div className={`w-full md:w-80 bg-white rounded-3xl shadow-xl border border-cream/20 flex flex-col shrink-0 ${selectedConv ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-navy/5">
            <h2 className="text-xl font-bold text-navy">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-8 text-center">
                <div aria-hidden className="ornament-divider mx-auto justify-center mb-4">
                  <span className="zellige-star text-lg text-golden" />
                </div>
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-golden/10" />
                  <MessageCircle size={48} className="text-golden/50 mx-auto relative" />
                </div>
                <p className="text-navy/50 text-sm font-semibold">No conversations yet</p>
                <p className="text-navy/30 text-xs mt-1">Message a host from a property page</p>
              </div>
            ) : (
              conversations.map((conv) => {
                const lastMsg = conv.messages[conv.messages.length - 1];
                const isActive = selectedConv?.id === conv.id;
                const unread = conv.messages.filter((m) => m.senderId !== 'user-me' && !m.read).length;
                return (
                  <button key={conv.id} onClick={() => setSelectedConv(conv)}
                    className={`w-full text-left p-4 border-b border-navy/5 transition-colors ${isActive ? 'bg-golden/10' : 'hover:bg-cream/30'}`}>
                    <div className="flex items-center gap-3">
                      <img src={conv.hostAvatar} alt={conv.hostName} className="w-12 h-12 rounded-full object-cover shrink-0" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-navy text-sm truncate">{conv.hostName}</p>
                          <span className="text-[10px] text-navy/40 shrink-0">{lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                        </div>
                        <p className="text-navy/40 text-xs truncate">{conv.propertyName}</p>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <p className={`text-xs truncate ${unread ? 'font-bold text-navy' : 'text-navy/60'}`}>{lastMsg?.content || 'No messages yet'}</p>
                          {unread > 0 && (
                            <span className="grid place-items-center min-w-5 h-5 px-1 rounded-full bg-orange text-white text-[10px] font-bold shrink-0">{unread}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat */}
        <div className={`flex-1 bg-white rounded-3xl shadow-xl border border-cream/20 flex flex-col ${!selectedConv ? 'hidden md:flex' : 'flex'}`}>
          {selectedConv ? (
            <>
              <div className="p-4 border-b border-navy/5 flex items-center gap-3">
                <button onClick={() => setSelectedConv(null)} className="md:hidden p-1">
                  <ArrowLeft size={20} />
                </button>
                <img src={selectedConv.hostAvatar} alt={selectedConv.hostName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-navy text-sm">{selectedConv.hostName}</p>
                  <p className="text-xs text-navy/40">{selectedConv.propertyName}</p>
                </div>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConv.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === 'user-me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-2xl ${msg.senderId === 'user-me' ? 'bg-navy text-cream rounded-br-sm' : 'bg-cream/50 text-navy rounded-bl-sm'}`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-[10px] opacity-50 mt-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-navy/5">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Write a message..."
                    className="flex-1 p-3 bg-cream/30 rounded-xl border border-navy/10 outline-none focus:border-golden/40 text-navy text-sm"
                  />
                  <button onClick={sendMessage} className="p-3 bg-golden text-navy rounded-xl hover:bg-orange transition-colors">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 items-center justify-center text-center p-8">
              <div>
                <div aria-hidden className="ornament-divider mx-auto justify-center mb-5">
                  <span className="zellige-star text-xl text-golden" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">Your conversations</h3>
                <p className="text-navy/50 text-sm">Select a conversation to start messaging.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
