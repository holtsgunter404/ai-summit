import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Settings from './components/Settings';
import AddNodeModal from './components/AddNodeModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { GeminiProvider } from './lib/providers/GeminiProvider';
import { PerplexityProvider } from './lib/providers/PerplexityProvider';
import { OpenRouterProvider } from './lib/providers/OpenRouterProvider';
import { KimiProvider } from './lib/providers/KimiProvider';
import { ClaudeProvider } from './lib/providers/ClaudeProvider';

const INITIAL_MODELS = [];

function App() {
  const [models, setModels] = useLocalStorage('ai-summit-models', INITIAL_MODELS);
  const [apiKeys, setApiKeys] = useLocalStorage('ai-summit-keys', {});
  const [messages, setMessages] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false);
  const [openRouterModels, setOpenRouterModels] = useState([]);

  // Memoize providers
  const providers = useMemo(() => ({
    Google: new GeminiProvider(apiKeys.gemini),
    Perplexity: new PerplexityProvider(apiKeys.perplexity),
    OpenRouter: new OpenRouterProvider(apiKeys.openrouter),
    Moonshot: new KimiProvider(apiKeys.kimi),
    Anthropic: new ClaudeProvider(apiKeys.claude)
  }), [apiKeys]);

  // Fetch OpenRouter models on mount and when key changes
  useEffect(() => {
    const fetchORModels = async () => {
      try {
        const orModels = await providers.OpenRouter.getModels();
        setOpenRouterModels(orModels);
      } catch (err) {
        console.error('App: Failed to fetch OpenRouter models', err);
      }
    };
    fetchORModels();
  }, [providers.OpenRouter]);

  // Update node statuses based on API key availability
  useEffect(() => {
    const updatedModels = models.map(node => {
      const provider = providers[node.provider];
      const hasKey = provider?.isConfigured();

      if (!hasKey && node.status !== 'no_key') {
        return { ...node, status: 'no_key' };
      } else if (hasKey && node.status === 'no_key') {
        return { ...node, status: 'ready' };
      }
      return node;
    });

    if (JSON.stringify(updatedModels) !== JSON.stringify(models)) {
      setModels(updatedModels);
    }
  }, [apiKeys, providers, models, setModels]);

  const handleAddNode = (nodeType) => {
    const provider = providers[nodeType.provider];
    const hasKey = provider?.isConfigured();

    const newNode = {
      id: `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      provider: nodeType.provider,
      name: nodeType.name,
      prompt: '',
      activePrompt: '',
      selectedModel: nodeType.provider === 'OpenRouter' ? 'meta-llama/llama-3-8b-instruct' : 'default',
      active: true,
      status: hasKey ? 'ready' : 'no_key'
    };
    setModels([...models, newNode]);
  };

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

  const handleApplyRole = (id) => {
    setModels(models.map(m =>
      m.id === id ? { ...m, activePrompt: m.prompt } : m
    ));
  };

  const handleModelSelect = (id) => {
    const node = models.find(m => m.id === id);
    if (!node) return;

    let availableModels = [];
    if (node.provider === 'OpenRouter') {
      availableModels = openRouterModels.length > 0
        ? openRouterModels.map(m => m.id)
        : ['meta-llama/llama-3-8b-instruct', 'anthropic/claude-3-haiku', 'google/gemini-pro-1.5'];
    } else if (node.provider === 'Anthropic') {
      availableModels = ['claude-3-5-sonnet-20240620', 'claude-3-opus-20240229', 'claude-3-haiku-20240307'];
    } else if (node.provider === 'Google') {
      availableModels = ['gemini-1.5-pro', 'gemini-1.5-flash'];
    } else if (node.provider === 'Perplexity') {
      availableModels = ['llama-3.1-sonar-small-128k-online', 'llama-3.1-sonar-large-128k-online', 'llama-3.1-sonar-huge-128k-online'];
    } else if (node.provider === 'Moonshot') {
      availableModels = ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'];
    }

    if (availableModels.length === 0) return;

    setModels(models.map(m => {
      if (m.id === id) {
        const currentIndex = availableModels.indexOf(m.selectedModel);
        const nextIndex = (currentIndex + 1) % availableModels.length;
        return { ...m, selectedModel: availableModels[nextIndex] };
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

    // Only nodes that are active AND have keys
    const activeNodes = models.filter(m => m.active && m.status !== 'no_key');

    activeNodes.forEach(async (node) => {
      setModels(prev => prev.map(m => m.id === node.id ? { ...m, status: 'busy' } : m));

      try {
        const provider = providers[node.provider];
        if (provider) {
          const response = await provider.sendMessage(text, node.activePrompt, node.selectedModel);

          setMessages(prev => [...prev, {
            role: 'bot',
            modelName: `${node.provider} Node (${node.selectedModel})`,
            content: response,
            timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
          }]);

          setModels(prev => prev.map(m => m.id === node.id ? { ...m, status: 'ready' } : m));
        }
      } catch (err) {
        console.error(`Error from ${node.name}:`, err);
        setMessages(prev => [...prev, {
          role: 'bot',
          modelName: `${node.provider} Node (${node.selectedModel})`,
          content: `ERROR: ${err.message}`,
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }]);
        setModels(prev => prev.map(m => m.id === node.id ? { ...m, status: 'error' } : m));
      }
    });
  };

  return (
    <div className="flex h-screen overflow-hidden text-slate-300 bg-[#0d0221] relative font-sans">
      <div className="crt-overlay pointer-events-none" />

      <Sidebar
        models={models}
        onToggle={handleToggleModel}
        onPromptChange={handlePromptChange}
        onModelSelect={handleModelSelect}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAddNode={() => setIsAddNodeOpen(true)}
        onApplyRole={handleApplyRole}
      />

      <main className="flex-1 overflow-hidden relative">
        <ChatArea
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </main>

      <AnimatePresence>
        {isSettingsOpen && (
          <Settings
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            apiKeys={apiKeys}
            onSaveKey={handleSaveKey}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAddNodeOpen && (
          <AddNodeModal
            isOpen={isAddNodeOpen}
            onClose={() => setIsAddNodeOpen(false)}
            onAddNode={handleAddNode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
