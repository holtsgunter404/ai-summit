import React from 'react';
import { Settings2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ModelCard = ({ model, onToggle, onPromptChange }) => {
  return (
    <div className={cn(
      "p-4 rounded-xl border transition-all duration-200 mb-4",
      model.active
        ? "bg-white border-slate-200 shadow-sm"
        : "bg-slate-50/50 border-transparent opacity-60"
    )}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {model.provider}
          </p>
          <h3 className="text-sm font-semibold text-slate-800">
            {model.name}
          </h3>
        </div>
        <button
          onClick={() => onToggle(model.id)}
          className={cn(
            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none",
            model.active ? "bg-indigo-600" : "bg-slate-200"
          )}
        >
          <span
            className={cn(
              "inline-block h-3 w-3 transform rounded-full bg-white transition-transform",
              model.active ? "translate-x-5" : "translate-x-1"
            )}
          />
        </button>
      </div>

      <div className="relative group">
        <div className="absolute left-3 top-2.5 text-slate-400">
          <Settings2 size={14} />
        </div>
        <textarea
          placeholder="Individual prompt..."
          value={model.prompt}
          onChange={(e) => onPromptChange(model.id, e.target.value)}
          className="w-full bg-slate-50 border-none rounded-lg py-2 pl-9 pr-3 text-xs text-slate-600 placeholder:text-slate-400 focus:ring-1 focus:ring-indigo-500/20 min-h-[60px] resize-none"
        />
      </div>
    </div>
  );
};

export default ModelCard;
