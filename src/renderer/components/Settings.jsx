import React from 'react';
import { X, Key, Shield, Cpu, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = ({ isOpen, onClose, apiKeys, onSaveKey }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="w-full max-w-2xl retro-card retro-border p-8 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-cyan transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-3 mb-8">
            <Shield className="text-cyan" size={28} />
            <h2 className="text-2xl font-bold text-white tracking-tighter uppercase">
              System Configuration
            </h2>
          </div>

          <div className="space-y-6">
            {/* Gemini */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-cyan uppercase tracking-widest">
                <Cpu size={14} />
                Google Gemini API Key
              </label>
              <input
                type="password"
                placeholder="Enter Gemini Key..."
                value={apiKeys.gemini || ''}
                onChange={(e) => onSaveKey('gemini', e.target.value)}
                className="w-full bg-background/50 border border-purple-light/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-cyan transition-all"
              />
            </div>

            {/* Perplexity */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-magenta uppercase tracking-widest">
                <Globe size={14} />
                Perplexity API Key
              </label>
              <input
                type="password"
                placeholder="Enter Perplexity Key..."
                value={apiKeys.perplexity || ''}
                onChange={(e) => onSaveKey('perplexity', e.target.value)}
                className="w-full bg-background/50 border border-purple-light/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-magenta transition-all"
              />
            </div>

            {/* OpenRouter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-yellow uppercase tracking-widest">
                <Key size={14} />
                OpenRouter API Key
              </label>
              <input
                type="password"
                placeholder="Enter OpenRouter Key..."
                value={apiKeys.openrouter || ''}
                onChange={(e) => onSaveKey('openrouter', e.target.value)}
                className="w-full bg-background/50 border border-purple-light/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow transition-all"
              />
            </div>
          </div>

          <div className="mt-10 p-4 rounded-lg bg-cyan/5 border border-cyan/20">
            <p className="text-[10px] text-cyan/70 uppercase leading-relaxed font-mono">
              [SYSTEM NOTICE]: Keys are stored locally on your machine. We never transmit your API keys to our own servers. Always use environment-appropriate security measures.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Settings;
