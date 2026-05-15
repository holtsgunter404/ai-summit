import { BaseProvider } from './BaseProvider';

export class OpenRouterProvider extends BaseProvider {
  constructor(apiKey, modelId = 'meta-llama/llama-3-8b-instruct') {
    super(apiKey);
    this.modelId = modelId;
  }

  async sendMessage(message, systemPrompt) {
    if (!this.isConfigured()) {
      return `[OPENROUTER MOCK] Model: ${this.modelId}\nSystem: ${systemPrompt}\n\nNo API key. Falling back to mock for: ${message}`;
    }
    // Future implementation: call OpenRouter API with this.modelId
    return `[OPENROUTER REAL (Mocked)] Model: ${this.modelId}\nProcessed "${message}"`;
  }

  async getModels() {
    // Future implementation: fetch from OpenRouter /models endpoint
    return [
      { id: 'meta-llama/llama-3-8b-instruct', name: 'Llama 3 8B' },
      { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku' },
      { id: 'google/gemini-pro-1.5', name: 'Gemini Pro 1.5' },
    ];
  }
}
