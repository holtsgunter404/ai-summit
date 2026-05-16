import { BaseProvider } from './BaseProvider';

export class OpenRouterProvider extends BaseProvider {
  constructor(apiKey) {
    super(apiKey);
  }

  async sendMessage(message, systemPrompt, modelId) {
    if (!this.isConfigured()) {
      throw new Error('OPENROUTER_ERROR: API key not configured. Please add it in System Settings.');
    }

    const messages = [];
    if (systemPrompt && systemPrompt.trim()) {
      messages.push({ role: 'system', content: systemPrompt.trim() });
    }
    messages.push({ role: 'user', content: message });

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey.trim()}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://ai-summit.app', // Using a clean, non-github URL as referer
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

      if (data.error) {
        throw new Error(`OPENROUTER_API_ERROR: ${data.error.message || JSON.stringify(data.error)}`);
      }

      throw new Error('OPENROUTER_ERROR: Unexpected response format from API');
    } catch (error) {
      console.error('OpenRouter sendMessage error:', error);
      throw error;
    }
  }

  async getModels() {
    if (!this.isConfigured()) {
      // Don't throw here, just return empty list to avoid UI crashing on mount
      return [];
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        headers: {
          'Authorization': `Bearer ${this.apiKey.trim()}`,
        }
      });
      const data = await this.handleResponse(response);

      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('OPENROUTER_ERROR: Failed to parse models list');
      }

      return data.data.map(m => ({
        id: m.id,
        name: m.name || m.id
      })).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('OpenRouter getModels error:', error);
      throw new Error(`OPENROUTER_MODELS_ERROR: ${error.message}`);
    }
  }
}
