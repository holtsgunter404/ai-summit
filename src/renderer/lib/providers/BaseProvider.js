export class BaseProvider {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
  }

  async sendMessage(message, systemPrompt) {
    throw new Error('sendMessage must be implemented by subclass');
  }

  isConfigured() {
    return !!this.apiKey;
  }
}
