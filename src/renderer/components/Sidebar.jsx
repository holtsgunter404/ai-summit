import React from 'react';
import ModelCard from './ModelCard';
import { Cpu } from 'lucide-react';

const Sidebar = ({ models, onToggle, onPromptChange }) => {
  return (
    <div className="w-80 h-screen bg-slate-100/50 border-r border-slate-200 flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
          <Cpu size={20} />
        </div>
        <h1 className="font-bold text-slate-800 tracking-tight">AI Summit</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 flex items-center justify-between px-2">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Models & Agents
          </h2>
          <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">
            {models.filter(m => m.active).length} Active
          </span>
        </div>

        {models.map(model => (
          <ModelCard
            key={model.id}
            model={model}
            onToggle={onToggle}
            onPromptChange={onPromptChange}
          />
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 bg-white/50">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-200" />
          <div>
            <p className="text-xs font-semibold text-slate-800">Demo User</p>
            <p className="text-[10px] text-slate-500">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
