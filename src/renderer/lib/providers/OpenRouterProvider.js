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

    // OpenRouter requires specific headers to avoid "User not found" and other errors
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/jules/ai-summit', // Required by some models/OpenRouter
        'X-Title': 'AI Summit Desktop'
      },
      body: JSON.stringify({
        model: modelId || 'meta-llama/llama-3-8b-instruct',
        messages: messages
      })
    });

    const data = await this.handleResponse(response);

    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content;
    }

    throw new Error(data.error?.message || 'Unexpected response format from OpenRouter');
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
      console.error('OpenRouter: Failed to fetch models', error);
      return [
        { id: 'meta-llama/llama-3-8b-instruct', name: 'Llama 3 8B (Fallback)' },
        { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku (Fallback)' }
      ];
    }
  }
}
