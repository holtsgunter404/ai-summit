import React from 'react';
import { X, Key, Shield, Cpu, Globe, Zap, Send, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = ({ isOpen, onClose, apiKeys, onSaveKey }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-2xl retro-card retro-border p-8 relative flex flex-col max-h-[85vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-cyan transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-8 flex-shrink-0">
          <Shield className="text-cyan" size={28} />
          <h2 className="text-2xl font-bold text-white tracking-tighter uppercase italic">
            System_Configuration
          </h2>
        </div>

        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
          {/* Gemini */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-cyan uppercase tracking-widest">
              <Cpu size={14} />
              Google_Gemini_Protocol
            </label>
            <input
              type="password"
              placeholder="Enter Gemini Key..."
              value={apiKeys.gemini || ''}
              onChange={(e) => onSaveKey('gemini', e.target.value)}
              className="w-full bg-background/50 border border-purple-light/30 rounded-lg py-3 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan transition-all font-mono text-sm"
            />
          </div>

          {/* Perplexity */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-magenta uppercase tracking-widest">
              <Globe size={14} />
              Perplexity_AI_Protocol
            </label>
            <input
              type="password"
              placeholder="Enter Perplexity Key..."
              value={apiKeys.perplexity || ''}
              onChange={(e) => onSaveKey('perplexity', e.target.value)}
              className="w-full bg-background/50 border border-purple-light/30 rounded-lg py-3 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-magenta transition-all font-mono text-sm"
            />
          </div>

          {/* OpenRouter */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-yellow uppercase tracking-widest">
              <Zap size={14} />
              OpenRouter_Gateway
            </label>
            <input
              type="password"
              placeholder="Enter OpenRouter Key..."
              value={apiKeys.openrouter || ''}
              onChange={(e) => onSaveKey('openrouter', e.target.value)}
              className="w-full bg-background/50 border border-purple-light/30 rounded-lg py-3 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-yellow transition-all font-mono text-sm"
            />
          </div>

          {/* Kimi */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-cyan uppercase tracking-widest">
              <Terminal size={14} className="text-cyan" />
              Moonshot_Kimi_Processor
            </label>
            <input
              type="password"
              placeholder="Enter Kimi Key..."
              value={apiKeys.kimi || ''}
              onChange={(e) => onSaveKey('kimi', e.target.value)}
              className="w-full bg-background/50 border border-purple-light/30 rounded-lg py-3 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-cyan transition-all font-mono text-sm"
            />
          </div>

          {/* Claude */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-magenta uppercase tracking-widest">
              <Send size={14} className="rotate-45" />
              Anthropic_Claude_Neural_Link
            </label>
            <input
              type="password"
              placeholder="Enter Claude Key..."
              value={apiKeys.claude || ''}
              onChange={(e) => onSaveKey('claude', e.target.value)}
              className="w-full bg-background/50 border border-purple-light/30 rounded-lg py-3 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-magenta transition-all font-mono text-sm"
            />
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-cyan/5 border border-cyan/20 flex-shrink-0">
          <p className="text-[10px] text-cyan/70 uppercase leading-relaxed font-mono tracking-tighter">
            [SYSTEM_NOTICE]: Local encryption active. Keys are stored in secure local storage. Node instances will automatically inherit these credentials.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
