import { BaseProvider } from './BaseProvider';

export class OpenRouterProvider extends BaseProvider {
  constructor(apiKey) {
    super(apiKey);
  }

  async sendMessage(message, systemPrompt, modelId) {
    if (!this.isConfigured()) {
      throw new Error('OpenRouter API key is missing');
    }

    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: message });

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/jules/ai-summit',
        'X-Title': 'AI Summit'
      },
      body: JSON.stringify({
        model: modelId || 'meta-llama/llama-3-8b-instruct',
        messages: messages
      })
    });

    const data = await this.handleResponse(response);
    return data.choices[0].message.content;
  }

  async getModels() {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models');
      const data = await this.handleResponse(response);
      return data.data.map(m => ({
        id: m.id,
        name: m.name
      }));
    } catch (error) {
      console.error('Failed to fetch OpenRouter models:', error);
      // Fallback if API fails
      return [
        { id: 'meta-llama/llama-3-8b-instruct', name: 'Llama 3 8B (Fallback)' },
        { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku (Fallback)' },
        { id: 'google/gemini-pro-1.5', name: 'Gemini Pro 1.5 (Fallback)' },
      ];
    }
  }
}
