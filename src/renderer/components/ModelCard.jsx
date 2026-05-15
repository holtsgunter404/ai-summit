import React from 'react';
import { Settings2, Zap, Wifi, WifiOff, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ModelCard = ({ model, onToggle, onPromptChange, onModelSelect }) => {
  const isGemini = model.provider === 'Google';
  const isOpenRouter = model.provider === 'OpenRouter';
  const isPerplexity = model.provider === 'Perplexity';

  const accentColor = isGemini ? 'text-cyan' : isPerplexity ? 'text-magenta' : 'text-yellow';
  const accentBorder = isGemini ? 'border-cyan/30' : isPerplexity ? 'border-magenta/30' : 'border-yellow/30';
  const accentBg = isGemini ? 'bg-cyan' : isPerplexity ? 'bg-magenta' : 'bg-yellow';

  return (
    <div className={cn(
      "relative group transition-all duration-300 rounded-lg p-4 border",
      model.active
        ? cn("bg-purple-deep/40", accentBorder, "shadow-[0_0_10px_rgba(157,78,221,0.1)]")
        : "bg-background/40 border-purple-light/10 grayscale opacity-40 hover:opacity-60"
    )}>
      {/* Active Indicator */}
      {model.active && (
        <div className={cn("absolute -left-[2px] top-4 bottom-4 w-[3px] rounded-full shadow-[0_0_8px_currentColor]", accentColor.replace('text-', 'bg-'))} />
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={cn("text-[9px] font-black uppercase tracking-tighter", accentColor)}>
              {model.provider}
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-[9px] font-mono text-slate-500 uppercase">
              ID: {model.id}
            </span>
          </div>
          <h3 className="text-sm font-black text-white tracking-tight uppercase truncate">
            {model.name}
          </h3>
        </div>

        <button
          onClick={() => onToggle(model.id)}
          className={cn(
            "relative inline-flex h-5 w-9 items-center rounded-sm transition-all focus:outline-none border",
            model.active ? cn(accentBorder, "bg-background") : "bg-background border-slate-700"
          )}
        >
          <span
            className={cn(
              "inline-block h-3 w-3 transform transition-all duration-300",
              model.active ? cn("translate-x-5", accentBg, "shadow-[0_0_8px_currentColor]") : "translate-x-1 bg-slate-700"
            )}
          />
        </button>
      </div>

      {/* OpenRouter Model Selection */}
      {isOpenRouter && model.active && (
        <div className="mb-3">
           <button
             onClick={() => onModelSelect && onModelSelect(model.id)}
             className="w-full flex items-center justify-between bg-background/60 border border-yellow/20 rounded px-2 py-1.5 hover:border-yellow/40 transition-colors"
           >
             <span className="text-[10px] font-mono text-yellow/80 truncate">
               {model.selectedModel || 'Select Model...'}
             </span>
             <ChevronDown size={12} className="text-yellow/60" />
           </button>
        </div>
      )}

      <div className="relative">
        <div className="absolute left-2.5 top-2.5 text-slate-500 group-hover:text-purple-light transition-colors">
          <Settings2 size={12} />
        </div>
        <textarea
          placeholder="System Prompt Override..."
          value={model.prompt}
          onChange={(e) => onPromptChange(model.id, e.target.value)}
          className={cn(
            "w-full bg-background/80 border border-purple-light/10 rounded py-2 pl-8 pr-2 text-[10px] font-mono leading-relaxed text-slate-400 placeholder:text-slate-700 focus:outline-none focus:border-purple-light/30 min-h-[50px] resize-none transition-all",
            model.active && "text-slate-300"
          )}
        />
      </div>

      {/* Status Bar */}
      <div className="mt-3 flex items-center justify-between text-[8px] font-bold tracking-widest text-slate-600 uppercase">
        <div className="flex items-center gap-1.5">
          {model.active ? (
            <>
              <Zap size={8} className="text-yellow animate-pulse" />
              <span>STABLE</span>
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <span>STANDBY</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {model.active ? <Wifi size={8} className="text-cyan" /> : <WifiOff size={8} />}
          <span>{model.active ? 'CONNECTED' : 'DISCONNECTED'}</span>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
