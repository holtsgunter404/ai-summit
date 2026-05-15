import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Settings from './components/Settings';
import { useLocalStorage } from './hooks/useLocalStorage';
import { GeminiProvider } from './lib/providers/GeminiProvider';
import { PerplexityProvider } from './lib/providers/PerplexityProvider';
import { OpenRouterProvider } from './lib/providers/OpenRouterProvider';

const INITIAL_MODELS = [
  {
    id: 'gemini-node',
    provider: 'Google',
    name: 'Gemini 1.5 Pro',
    prompt: 'Analyze this input with extreme precision.',
    active: true,
  },
  {
    id: 'perplexity-node',
    provider: 'Perplexity',
    name: 'Sonar Llama 3.1',
    prompt: 'Search and synthesize real-time data.',
    active: true,
  },
  {
    id: 'openrouter-node',
    provider: 'OpenRouter',
    name: 'Unified Router',
    selectedModel: 'meta-llama/llama-3-8b-instruct',
    prompt: 'Apply specialized logic using selected model.',
    active: true,
  },
];

function App() {
  const [models, setModels] = useLocalStorage('ai-summit-models', INITIAL_MODELS);
  const [apiKeys, setApiKeys] = useLocalStorage('ai-summit-keys', {});
  const [messages, setMessages] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Memoize providers so they only change when API keys or specific configs change
  const providers = useMemo(() => ({
    Google: new GeminiProvider(apiKeys.gemini),
    Perplexity: new PerplexityProvider(apiKeys.perplexity),
    OpenRouter: new OpenRouterProvider(apiKeys.openrouter, models.find(m => m.provider === 'OpenRouter')?.selectedModel)
  }), [apiKeys, models]);

  const handleToggleModel = (id) => {
    setModels(models.map(m =>
      m.id === id ? { ...m, active: !m.active } : m
    ));
  };

  const handlePromptChange = (id, newPrompt) => {
    setModels(models.map(m =>
      m.id === id ? { ...m, prompt: newPrompt } : m
    ));
  };

  const handleModelSelect = (id) => {
    // For now, toggle between a few demo models for OpenRouter
    const orModels = [
      'meta-llama/llama-3-8b-instruct',
      'anthropic/claude-3-haiku',
      'google/gemini-pro-1.5'
    ];

    setModels(models.map(m => {
      if (m.id === id && m.provider === 'OpenRouter') {
        const currentIndex = orModels.indexOf(m.selectedModel);
        const nextIndex = (currentIndex + 1) % orModels.length;
        return { ...m, selectedModel: orModels[nextIndex] };
      }
      return m;
    }));
  };

  const handleSaveKey = (provider, key) => {
    setApiKeys(prev => ({ ...prev, [provider]: key }));
  };

  const handleSendMessage = async (text) => {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const userMessage = {
      role: 'user',
      content: text,
      timestamp
    };
    setMessages(prev => [...prev, userMessage]);

    const activeModels = models.filter(m => m.active);

    // Process each active model through its respective provider
    activeModels.forEach(async (model) => {
      const provider = providers[model.provider];
      if (provider) {
        // Individual prompt + global message
        const response = await provider.sendMessage(text, model.prompt);

        // Add a slight delay to simulate network/processing for the UI feel
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'bot',
            modelName: model.provider === 'OpenRouter' ? `${model.name} (${model.selectedModel})` : model.name,
            content: response,
            timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
          }]);
        }, Math.random() * 1000 + 500);
      }
    });
  };

  return (
    <div className="flex h-screen overflow-hidden text-slate-300 bg-background relative font-sans">
      {/* Visual background elements */}
      <div className="crt-overlay" />

      <Sidebar
        models={models}
        onToggle={handleToggleModel}
        onPromptChange={handlePromptChange}
        onModelSelect={handleModelSelect}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="flex-1 overflow-hidden relative">
        <ChatArea
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </main>

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKeys={apiKeys}
        onSaveKey={handleSaveKey}
      />
    </div>
  );
}

export default App;
