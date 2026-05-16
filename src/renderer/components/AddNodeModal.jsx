import React from 'react';
import { X, Cpu, Globe, Zap, Terminal, Send, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NODE_TYPES = [
  {
    provider: 'Google',
    name: 'Gemini 1.5 Pro',
    icon: Cpu,
    color: 'text-cyan',
    borderColor: 'border-cyan/30',
    bgColor: 'bg-cyan/10'
  },
  {
    provider: 'Perplexity',
    name: 'Sonar Llama 3.1',
    icon: Globe,
    color: 'text-magenta',
    borderColor: 'border-magenta/30',
    bgColor: 'bg-magenta/10'
  },
  {
    provider: 'OpenRouter',
    name: 'Unified Router',
    icon: Zap,
    color: 'text-yellow',
    borderColor: 'border-yellow/30',
    bgColor: 'bg-yellow/10'
  },
  {
    provider: 'Moonshot',
    name: 'Kimi-V1',
    icon: Terminal,
    color: 'text-cyan',
    borderColor: 'border-cyan/30',
    bgColor: 'bg-cyan/10'
  },
  {
    provider: 'Anthropic',
    name: 'Claude 3.5 Sonnet',
    icon: Send,
    color: 'text-magenta',
    borderColor: 'border-magenta/30',
    bgColor: 'bg-magenta/10'
  }
];

const AddNodeModal = ({ isOpen, onClose, onAddNode }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-xl retro-card retro-border p-8 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-cyan transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-3 mb-8">
            <Plus className="text-cyan" size={28} />
            <h2 className="text-2xl font-bold text-white tracking-tighter uppercase italic">
              Deploy_New_Node
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {NODE_TYPES.map((node, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onAddNode(node);
                  onClose();
                }}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:scale-[1.02] active:scale-[0.98] group bg-background/40 ${node.borderColor} hover:bg-white/5`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded flex items-center justify-center ${node.bgColor} ${node.color}`}>
                    <node.icon size={20} />
                  </div>
                  <div className="text-left">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${node.color}`}>
                      {node.provider}
                    </p>
                    <h3 className="text-sm font-bold text-white uppercase">
                      {node.name}
                    </h3>
                  </div>
                </div>
                <div className="text-slate-700 group-hover:text-cyan transition-colors">
                  <Plus size={20} />
                </div>
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            Select an architecture to instantiate a new parallel node
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddNodeModal;
