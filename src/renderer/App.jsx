import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

const INITIAL_MODELS = [
  {
    id: '1',
    provider: 'OpenAI',
    name: 'GPT-4o',
    prompt: 'You are a helpful assistant specialized in coding.',
    active: true,
  },
  {
    id: '2',
    provider: 'Anthropic',
    name: 'Claude 3.5 Sonnet',
    prompt: 'You are a creative writer with a focus on concise prose.',
    active: true,
  },
  {
    id: '3',
    provider: 'Google',
    name: 'Gemini 1.5 Pro',
    prompt: 'You are a data analyst who explains complex topics simply.',
    active: false,
  },
];

function App() {
  const [models, setModels] = useState(INITIAL_MODELS);
  const [messages, setMessages] = useState([]);

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

  const handleSendMessage = (text) => {
    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);

    // Simulate responses for each active model
    const activeModels = models.filter(m => m.active);

    activeModels.forEach((model, index) => {
      setTimeout(() => {
        const botResponse = {
          role: 'bot',
          modelName: model.name,
          content: `[MOCK RESPONSE from ${model.name}]\n\nI received your message: "${text}".\n\nMy individual system prompt is: "${model.prompt}"`,
        };
        setMessages(prev => [...prev, botResponse]);
      }, 500 * (index + 1));
    });
  };

  return (
    <div className="flex h-screen overflow-hidden text-slate-900">
      <Sidebar
        models={models}
        onToggle={handleToggleModel}
        onPromptChange={handlePromptChange}
      />
      <main className="flex-1 overflow-hidden">
        <ChatArea
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
}

export default App;
