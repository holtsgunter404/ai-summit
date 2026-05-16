import React, { useState, useEffect, useMemo } from 'react';
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

  // Memoize providers so they only change when API keys change
  const providers = useMemo(() => ({
    Google: new GeminiProvider(apiKeys.gemini),
    Perplexity: new PerplexityProvider(apiKeys.perplexity),
    OpenRouter: new OpenRouterProvider(apiKeys.openrouter),
    Moonshot: new KimiProvider(apiKeys.kimi),
    Anthropic: new ClaudeProvider(apiKeys.claude)
  }), [apiKeys]);

  const handleAddNode = (nodeType) => {
    const newNode = {
      id: `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      provider: nodeType.provider,
      name: nodeType.name,
      prompt: '', // Current text in editor
      activePrompt: '', // Last applied role
      selectedModel: nodeType.provider === 'OpenRouter' ? 'meta-llama/llama-3-8b-instruct' : 'default',
      active: true,
      status: 'ready'
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

    let orModels = [];
    if (node.provider === 'OpenRouter') {
      orModels = [
        'meta-llama/llama-3-8b-instruct',
        'anthropic/claude-3-haiku',
        'google/gemini-pro-1.5'
      ];
    } else if (node.provider === 'Anthropic') {
      orModels = ['claude-3-5-sonnet-20240620', 'claude-3-opus-20240229'];
    } else if (node.provider === 'Google') {
      orModels = ['gemini-1.5-pro', 'gemini-1.5-flash'];
    } else {
      return;
    }

    setModels(models.map(m => {
      if (m.id === id) {
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

    const activeNodes = models.filter(m => m.active);

    activeNodes.forEach(async (node) => {
      // Update status to busy
      setModels(prev => prev.map(m => m.id === node.id ? { ...m, status: 'busy' } : m));

      try {
        const provider = providers[node.provider];
        if (provider) {
          // Use the ACTIVE role, not the draft text
          const response = await provider.sendMessage(text, node.activePrompt);

          setTimeout(() => {
            setMessages(prev => [...prev, {
              role: 'bot',
              modelName: `${node.provider} Node (${node.selectedModel})`,
              content: response,
              timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
            }]);

            // Set back to ready
            setModels(prev => prev.map(m => m.id === node.id ? { ...m, status: 'ready' } : m));
          }, Math.random() * 1000 + 500);
        }
      } catch (err) {
        setModels(prev => prev.map(m => m.id === node.id ? { ...m, status: 'error' } : m));
      }
    });
  };

  return (
    <div className="flex h-screen overflow-hidden text-slate-300 bg-background relative font-sans">
      <div className="crt-overlay" />

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

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKeys={apiKeys}
        onSaveKey={handleSaveKey}
      />

      <AddNodeModal
        isOpen={isAddNodeOpen}
        onClose={() => setIsAddNodeOpen(false)}
        onAddNode={handleAddNode}
      />
    </div>
  );
}

export default App;
