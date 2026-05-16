import { BaseProvider } from './BaseProvider';

export class ClaudeProvider extends BaseProvider {
  constructor(apiKey, modelId = 'claude-3-5-sonnet-20240620') {
    super(apiKey);
    this.modelId = modelId;
  }

  async sendMessage(message, systemPrompt) {
    if (!this.isConfigured()) {
      return `[CLAUDE MOCK] Model: ${this.modelId}\nRole: ${systemPrompt}\n\nKey missing. Fallback for: ${message}`;
    }
    return `[CLAUDE REAL (Mocked)] Model: ${this.modelId}\nRole "${systemPrompt}" applied to "${message}"`;
  }
}
