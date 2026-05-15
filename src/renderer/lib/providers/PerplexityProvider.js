import { BaseProvider } from './BaseProvider';

export class PerplexityProvider extends BaseProvider {
  async sendMessage(message, systemPrompt) {
    if (!this.isConfigured()) {
      return `[PERPLEXITY MOCK] System: ${systemPrompt}\n\nNo API key provided. Falling back to mock response for: ${message}`;
    }
    // Future implementation: call Perplexity API
    return `[PERPLEXITY REAL (Mocked)] Search results for "${message}" using system prompt "${systemPrompt}"`;
  }
}
