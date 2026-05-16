export class BaseProvider {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
  }

  async sendMessage(message, systemPrompt, model) {
    throw new Error('sendMessage must be implemented by subclass');
  }

  isConfigured() {
    return !!this.apiKey && this.apiKey.trim().length > 0;
  }

  // Common helper for API responses
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
}
