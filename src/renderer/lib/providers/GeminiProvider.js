import { BaseProvider } from './BaseProvider';

export class GeminiProvider extends BaseProvider {
  constructor(apiKey) {
    super(apiKey);
  }

  async sendMessage(message, systemPrompt, modelId = 'gemini-1.5-pro') {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key is missing');
    }

    // Google Gemini uses a slightly different structure
    // Endpoint: https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${this.apiKey}`;

    const contents = [];
    if (systemPrompt) {
      // For Gemini, system instructions are often passed separately or as a specific role
      // In v1beta, they have a system_instruction field.
    }

    const body = {
      contents: [{
        parts: [{ text: message }]
      }]
    };

    if (systemPrompt) {
      body.system_instruction = {
        parts: [{ text: systemPrompt }]
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await this.handleResponse(response);

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error('Unexpected response format from Gemini');
  }
}
