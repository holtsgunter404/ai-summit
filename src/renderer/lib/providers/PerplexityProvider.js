import { BaseProvider } from './BaseProvider';

export class PerplexityProvider extends BaseProvider {
  constructor(apiKey) {
    super(apiKey);
  }

  async sendMessage(message, systemPrompt, modelId = 'llama-3.1-sonar-small-128k-online') {
    if (!this.isConfigured()) {
      throw new Error('Perplexity API key is missing');
    }

    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: message });

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelId,
        messages: messages
      })
    });

    const data = await this.handleResponse(response);
    return data.choices[0].message.content;
  }
}
