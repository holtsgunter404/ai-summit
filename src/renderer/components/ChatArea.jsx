import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Terminal, Activity, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ChatArea = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-light rounded-full blur-[120px]" />
      </div>

      {/* CRT Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'radial-gradient(#9d4edd 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10 custom-scrollbar"
      >
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-purple-deep border-2 border-cyan/30 flex items-center justify-center text-cyan shadow-[0_0_30px_rgba(0,245,212,0.2)]">
                  <Terminal size={48} strokeWidth={2.5} />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-magenta border-2 border-background flex items-center justify-center text-[10px] font-black text-white"
                >
                  AI
                </motion.div>
              </div>
              <div className="max-w-md space-y-2">
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                  Neural_Link_Established
                </h2>
                <p className="text-purple-light font-mono text-xs tracking-widest uppercase">
                  Ready to parallel process your request
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan/5 border border-cyan/20 text-[10px] font-bold text-cyan uppercase tracking-tighter">
                  <Zap size={10} /> 3 Nodes Ready
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-magenta/5 border border-magenta/20 text-[10px] font-bold text-magenta uppercase tracking-tighter">
                  <Activity size={10} /> Latency: 45ms
                </div>
              </div>
            </motion.div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex gap-4 max-w-4xl mx-auto group",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Avatar */}
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center border-2 flex-shrink-0 mt-1 shadow-lg",
                  msg.role === 'user'
                    ? "bg-purple-deep border-magenta text-magenta shadow-magenta/20"
                    : "bg-purple-deep border-cyan text-cyan shadow-cyan/20"
                )}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>

                {/* Content */}
                <div className={cn(
                  "flex flex-col space-y-1.5 min-w-0 flex-1",
                  msg.role === 'user' ? "items-end text-right" : "items-start text-left"
                )}>
                  <div className="flex items-center gap-3 px-1">
                     <span className="text-[10px] font-black text-purple-light uppercase tracking-[0.2em]">
                       {msg.role === 'user' ? 'OPERATOR' : msg.modelName || 'SYSTEM_CORE'}
                     </span>
                     <span className="text-[9px] font-mono text-slate-700">
                       {msg.timestamp}
                     </span>
                  </div>

                  <div className={cn(
                    "px-5 py-4 rounded-xl text-sm leading-relaxed border relative overflow-hidden",
                    msg.role === 'user'
                      ? "bg-magenta/10 border-magenta/30 text-white shadow-[0_0_15px_rgba(251,86,7,0.05)]"
                      : "bg-purple-deep/40 border-cyan/20 text-slate-200 shadow-[0_0_15px_rgba(0,245,212,0.05)]"
                  )}>
                    {/* Retro pulse for bot messages */}
                    {msg.role !== 'user' && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-cyan/20 animate-pulse" />
                    )}

                    <div className="relative z-10 font-medium whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-8 border-t border-purple-light/10 bg-sidebar-bg/80 backdrop-blur-xl relative z-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan/20 via-magenta/20 to-yellow/20 rounded-2xl blur opacity-30 group-focus-within:opacity-60 transition-opacity" />

          <div className="relative flex items-center bg-background border-2 border-purple-light/20 rounded-2xl overflow-hidden focus-within:border-cyan/50 transition-all shadow-2xl">
            <div className="pl-6 text-cyan/50">
              <Terminal size={20} />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="COMMAND_INPUT_PROMPT > _"
              className="flex-1 bg-transparent border-none py-5 px-4 text-white focus:outline-none placeholder:text-slate-700 text-sm font-mono tracking-wide"
            />
            <div className="pr-4 py-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-12 h-12 bg-cyan hover:bg-cyan/80 disabled:bg-slate-800 disabled:text-slate-600 text-background rounded-xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(0,245,212,0.3)] hover:scale-105 active:scale-95"
              >
                <Send size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </form>
        <div className="max-w-4xl mx-auto mt-4 flex items-center justify-between px-2 text-[9px] font-black text-slate-700 uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-cyan" /> ENCRYPTION: ACTIVE</span>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-magenta" /> NODE_PARALLEL: ENABLED</span>
          </div>
          <span className="font-mono">AI_SUMMIT_PROTOCOL_v2.0.4</span>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
