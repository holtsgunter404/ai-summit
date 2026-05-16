import React from 'react';
import { Power, Terminal, Settings2, Cpu, Globe, Zap, Send, ShieldAlert, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProviderIcon = ({ provider, size = 16 }) => {
  switch (provider) {
    case 'Google': return <Cpu size={size} className="text-cyan" />;
    case 'Perplexity': return <Globe size={size} className="text-orange-500" />;
    case 'OpenRouter': return <Zap size={size} className="text-yellow-400" />;
    case 'Moonshot': return <Terminal size={size} className="text-emerald-400" />;
    case 'Anthropic': return <Send size={size} className="text-pink-500 rotate-45" />;
    default: return <Settings2 size={size} />;
  }
};

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'ready':
      return (
        <span className="flex items-center gap-1 text-[8px] text-emerald-400 font-bold tracking-tighter">
          <CheckCircle2 size={8} /> READY
        </span>
      );
    case 'busy':
      return (
        <span className="flex items-center gap-1 text-[8px] text-cyan font-bold tracking-tighter">
          <Loader2 size={8} className="animate-spin" /> BUSY
        </span>
      );
    case 'error':
      return (
        <span className="flex items-center gap-1 text-[8px] text-red-500 font-bold tracking-tighter">
          <AlertTriangle size={8} /> ERROR
        </span>
      );
    case 'no_key':
      return (
        <span className="flex items-center gap-1 text-[8px] text-slate-500 font-bold tracking-tighter italic">
          <ShieldAlert size={8} /> NO_KEY
        </span>
      );
    default:
      return null;
  }
};

const ModelCard = ({ model, onToggle, onPromptChange, onModelSelect, onApplyRole }) => {
  const isApplied = model.prompt === model.activePrompt && model.prompt !== '';
  const isUnconfigured = model.status === 'no_key';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`sidebar-node-card p-3 rounded border transition-all ${
        model.active ? 'border-cyan/30 bg-cyan/5' : 'border-white/5 bg-white/2'
      } ${isUnconfigured ? 'opacity-70 grayscale-[0.5]' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ProviderIcon provider={model.provider} />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white leading-none uppercase tracking-tighter">
              {model.name}
            </span>
            <StatusBadge status={model.status} />
          </div>
        </div>
        <button
          onClick={() => onToggle(model.id)}
          className={`p-1.5 rounded transition-colors ${
            model.active ? 'text-cyan bg-cyan/10' : 'text-slate-600 bg-white/5'
          }`}
          title={isUnconfigured ? "Key Required" : "Toggle Active"}
        >
          <Power size={14} />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex flex-col gap-1">
          <label className="text-[9px] uppercase font-bold text-slate-500 flex justify-between">
            <span>Model_Selection</span>
            <span className="text-slate-700 font-mono">ID: {model.id.split('-')[1]}</span>
          </label>
          <button
            onClick={() => onModelSelect(model.id)}
            className="w-full text-left bg-black/40 border border-white/5 rounded px-2 py-1 text-[9px] font-mono text-slate-400 hover:border-cyan/30 transition-all truncate"
            disabled={isUnconfigured}
          >
            {model.selectedModel === 'default' ? 'AUTO_SELECT' : model.selectedModel}
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="text-[9px] uppercase font-bold text-slate-500">Applied_Role</label>
            {model.prompt !== model.activePrompt && (
              <span className="text-[8px] text-yellow-500/70 italic uppercase">Unsaved_Changes</span>
            )}
          </div>
          <div className="relative">
            <textarea
              value={model.prompt}
              onChange={(e) => onPromptChange(model.id, e.target.value)}
              placeholder="Inject system instructions..."
              disabled={isUnconfigured}
              className="w-full bg-black/40 border border-white/5 rounded p-2 text-[10px] font-mono text-slate-300 placeholder:text-slate-800 focus:outline-none focus:border-cyan/50 h-16 resize-none custom-scrollbar"
            />
            <button
              onClick={() => onApplyRole(model.id)}
              disabled={isUnconfigured || isApplied}
              className={`absolute bottom-2 right-2 px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest transition-all border ${
                isApplied
                  ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/10 opacity-50 cursor-default'
                  : isUnconfigured
                    ? 'border-slate-700 text-slate-700 bg-transparent'
                    : 'border-cyan/50 text-cyan bg-cyan/10 hover:bg-cyan hover:text-black cursor-pointer shadow-[0_0_10px_rgba(0,255,255,0.2)]'
              }`}
            >
              {isApplied ? 'READY' : 'Apply'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModelCard;
