import React from 'react';
import ModelCard from './ModelCard';
import { Terminal, Settings as SettingsIcon, LogOut, Cpu, Plus, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ models, onToggle, onPromptChange, onModelSelect, onOpenSettings, onOpenAddNode, onApplyRole }) => {
  return (
    <aside className="w-80 h-screen bg-sidebar-bg border-r border-purple-light/20 flex flex-col relative z-50">
      {/* Scanline decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="w-full h-[2px] bg-cyan animate-scanline shadow-[0_0_10px_#00f5d4]" />
      </div>

      {/* Header */}
      <div className="p-6 border-b border-purple-light/20 bg-purple-deep/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-cyan flex items-center justify-center text-background shadow-[0_0_15px_#00f5d4]">
            <Terminal size={24} strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">
              AI SUMMIT
            </h1>
            <p className="text-[10px] text-cyan font-mono font-bold tracking-[0.2em]">
              V.2.0_CORE
            </p>
          </div>
        </div>
      </div>

      {/* Model List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative">
        <div className="flex items-center justify-between px-2 mb-2 sticky top-0 bg-sidebar-bg/80 backdrop-blur-sm z-10 py-1">
          <h2 className="text-[10px] font-bold text-purple-light uppercase tracking-widest">
            Neural Nodes
          </h2>
          <button
            onClick={onOpenAddNode}
            className="w-6 h-6 rounded bg-purple-light/20 flex items-center justify-center text-cyan hover:bg-cyan hover:text-background transition-all shadow-[0_0_10px_rgba(0,245,212,0.1)]"
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>

        <div className="space-y-4">
          {models.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-purple-light/20 flex items-center justify-center mx-auto text-purple-light/30">
                <Layers size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">No Nodes Detected</p>
                <p className="text-[10px] text-slate-600 font-mono mt-1 leading-relaxed">
                  Press [+] to instantiate your first neural processor
                </p>
              </div>
              <button
                onClick={onOpenAddNode}
                className="text-[10px] font-black text-cyan uppercase border-b border-cyan/30 hover:border-cyan transition-all pb-0.5"
              >
                Initialize Node
              </button>
            </div>
          ) : (
            models.map(model => (
              <ModelCard
                key={model.id}
                model={model}
                onToggle={onToggle}
                onPromptChange={onPromptChange}
                onModelSelect={onModelSelect}
                onApplyRole={onApplyRole}
              />
            ))
          )}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-purple-light/20 bg-purple-deep/20">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-background border border-purple-light/20 text-slate-400 hover:text-cyan hover:border-cyan/50 hover:bg-cyan/5 transition-all group"
        >
          <SettingsIcon size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-xs font-bold uppercase tracking-widest">System Settings</span>
        </button>

        <div className="mt-4 flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-md bg-purple-deep border border-purple-light/30 flex items-center justify-center text-magenta">
            <Cpu size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-white uppercase truncate">Operator_Alpha</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_5px_#00f5d4]" />
              <p className="text-[9px] text-slate-500 font-mono uppercase tracking-tighter">STABLE_LINK</p>
            </div>
          </div>
          <button className="text-slate-600 hover:text-magenta transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
