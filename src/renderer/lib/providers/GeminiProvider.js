import { BaseProvider } from './BaseProvider';

export class GeminiProvider extends BaseProvider {
  async sendMessage(message, systemPrompt) {
    if (!this.isConfigured()) {
      return `[GEMINI MOCK] System: ${systemPrompt}\n\nNo API key provided. Falling back to mock response for: ${message}`;
    }
    // Future implementation: call Gemini API
    return `[GEMINI REAL (Mocked)] Processed "${message}" with system prompt "${systemPrompt}"`;
  }
}
