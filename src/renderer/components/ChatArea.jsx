import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ChatArea = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-white">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Sparkles size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Welcome to AI Summit</h2>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">
                Ask anything. Your active models will respond simultaneously.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={cn(
              "flex gap-4 max-w-3xl mx-auto",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}>
              {msg.role !== 'user' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-1">
                  <Bot size={18} />
                </div>
              )}

              <div className={cn(
                "space-y-1",
                msg.role === 'user' ? "items-end" : "items-start"
              )}>
                {msg.modelName && (
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1">
                    {msg.modelName}
                  </p>
                )}
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'user'
                    ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-200"
                    : "bg-slate-100 text-slate-800 rounded-tl-none"
                )}>
                  {msg.content}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-white flex-shrink-0 mt-1">
                  <User size={18} />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-slate-100 bg-white">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto relative group"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-sm shadow-sm"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-2 bottom-2 w-10 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl flex items-center justify-center transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-400 mt-3">
          AI Summit can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default ChatArea;
