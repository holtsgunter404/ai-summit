import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Zap, Info, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatArea = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0221]">
      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/20">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-cyan" />
          <span className="text-xs font-black tracking-[0.2em] uppercase italic text-white">
            MASTER_COMM_LINK_V2.0
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase">Secure</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-[10px] font-mono text-slate-500">SESSION: {Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none grid-lines opacity-10" />

        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30">
            <Zap size={48} className="text-cyan animate-pulse" />
            <p className="text-xs font-mono tracking-widest uppercase italic">Waiting for Uplink...</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {msg.role === 'bot' && <span className="text-[9px] font-black text-cyan uppercase tracking-tighter">{msg.modelName}</span>}
                <span className="text-[8px] font-mono text-slate-600">{msg.timestamp}</span>
                {msg.role === 'user' && <span className="text-[9px] font-black text-magenta uppercase tracking-tighter">OPERATOR</span>}
              </div>

              <div className={`max-w-[85%] px-4 py-3 rounded-lg font-mono text-sm relative group ${
                msg.role === 'user'
                  ? 'bg-magenta/10 border border-magenta/20 text-magenta-light'
                  : msg.isError
                    ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                    : 'bg-cyan/5 border border-cyan/20 text-cyan-light'
              }`}>
                {msg.isError && <AlertTriangle size={14} className="inline-block mr-2 mb-0.5" />}
                {msg.content}

                <div className={`absolute top-0 ${msg.role === 'user' ? 'right-0' : 'left-0'} w-2 h-2 border-t border-l ${msg.role === 'user' ? 'border-magenta/40 rotate-90' : 'border-cyan/40'}`} />
                <div className={`absolute bottom-0 ${msg.role === 'user' ? 'left-0' : 'right-0'} w-2 h-2 border-b border-r ${msg.role === 'user' ? 'border-magenta/40 rotate-90' : 'border-cyan/40'}`} />
              </div>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 pt-0">
        <form
          onSubmit={handleSubmit}
          className="relative group"
        >
          <div className="absolute inset-0 bg-cyan/5 rounded-xl blur-xl group-focus-within:bg-cyan/10 transition-all pointer-events-none" />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="BROADCAST SIGNAL TO ACTIVE NODES..."
            className="w-full bg-black/60 border border-white/10 rounded-xl py-4 pl-6 pr-16 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 transition-all font-mono text-sm min-h-[60px] max-h-32 resize-none relative z-10 custom-scrollbar shadow-2xl"
          />
          <button
            type="submit"
            className="absolute right-3 bottom-3 p-3 bg-cyan text-black rounded-lg hover:bg-cyan-light transition-all z-20 shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:scale-105 active:scale-95"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="mt-3 flex items-center justify-between px-2">
          <div className="flex gap-4">
            <span className="text-[8px] text-slate-600 font-mono flex items-center gap-1">
              <Info size={10} /> MULTI-CHANNEL BROADCAST ACTIVE
            </span>
            <span className="text-[8px] text-slate-600 font-mono flex items-center gap-1">
              <ShieldCheck size={10} /> END-TO-END ENCRYPTED
            </span>
          </div>
          <span className="text-[8px] text-slate-700 font-mono uppercase tracking-widest">
            Ready for Transmission
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
