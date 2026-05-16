import React from 'react';
import { X, Shield, Cpu, Globe, Zap, Send, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = ({ isOpen, onClose, apiKeys, onSaveKey }) => {
  // If we want to ensure it's always rendered correctly when open,
  // we check the isOpen prop, although AnimatePresence in App.jsx handles mounting.

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl retro-card retro-border p-6 relative flex flex-col max-h-[90vh] bg-[#0d0221]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-cyan transition-colors z-10 p-2"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6 flex-shrink-0">
          <Shield className="text-cyan animate-pulse" size={24} />
          <h2 className="text-xl font-bold text-white tracking-widest uppercase italic">
            SYSTEM_CONFIGURATION
          </h2>
        </div>

        <div className="space-y-6 overflow-y-auto pr-3 custom-scrollbar flex-1 pb-4">
          {/* Gemini */}
          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-[10px] font-black text-cyan uppercase tracking-[0.2em] group-hover:text-cyan/100 transition-colors">
              <Cpu size={14} />
              GOOGLE_GEMINI_PROTOCOL
            </label>
            <input
              type="password"
              placeholder="Enter Gemini Key..."
              value={apiKeys?.gemini || ''}
              onChange={(e) => onSaveKey('gemini', e.target.value)}
              className="w-full bg-black/40 border border-cyan/20 rounded py-2.5 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan/30 transition-all font-mono text-sm"
            />
          </div>

          {/* Perplexity */}
          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] group-hover:text-orange-400 transition-colors">
              <Globe size={14} />
              PERPLEXITY_AI_PROTOCOL
            </label>
            <input
              type="password"
              placeholder="Enter Perplexity Key..."
              value={apiKeys?.perplexity || ''}
              onChange={(e) => onSaveKey('perplexity', e.target.value)}
              className="w-full bg-black/40 border border-orange-500/20 rounded py-2.5 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all font-mono text-sm"
            />
          </div>

          {/* OpenRouter */}
          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-[10px] font-black text-yellow-400 uppercase tracking-[0.2em] group-hover:text-yellow-300 transition-colors">
              <Zap size={14} />
              OPENROUTER_GATEWAY
            </label>
            <input
              type="password"
              placeholder="Enter OpenRouter Key..."
              value={apiKeys?.openrouter || ''}
              onChange={(e) => onSaveKey('openrouter', e.target.value)}
              className="w-full bg-black/40 border border-yellow-400/20 rounded py-2.5 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all font-mono text-sm"
            />
          </div>

          {/* Kimi */}
          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] group-hover:text-emerald-300 transition-colors">
              <Terminal size={14} />
              MOONSHOT_KIMI_PROCESSOR
            </label>
            <input
              type="password"
              placeholder="Enter Kimi Key..."
              value={apiKeys?.kimi || ''}
              onChange={(e) => onSaveKey('kimi', e.target.value)}
              className="w-full bg-black/40 border border-emerald-400/20 rounded py-2.5 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-all font-mono text-sm"
            />
          </div>

          {/* Claude */}
          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-[10px] font-black text-pink-500 uppercase tracking-[0.2em] group-hover:text-pink-400 transition-colors">
              <Send size={14} className="rotate-45" />
              ANTHROPIC_CLAUDE_NEURAL_LINK
            </label>
            <input
              type="password"
              placeholder="Enter Claude Key..."
              value={apiKeys?.claude || ''}
              onChange={(e) => onSaveKey('claude', e.target.value)}
              className="w-full bg-black/40 border border-pink-500/20 rounded py-2.5 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-all font-mono text-sm"
            />
          </div>
        </div>

        <div className="mt-6 p-4 rounded bg-cyan/5 border border-cyan/20 flex-shrink-0">
          <p className="text-[10px] text-cyan/70 uppercase leading-relaxed font-mono tracking-tight">
            [SYSTEM_NOTICE]: Local encryption active. Keys are stored in secure local storage. Node instances will automatically inherit these credentials.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
