import { BaseProvider } from './BaseProvider';

export class GeminiProvider extends BaseProvider {
  constructor(apiKey) {
    super(apiKey);
  }

  async sendMessage(message, systemPrompt, modelId = 'models/gemini-1.5-flash') {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key is missing');
    }

    // Google Gemini v1beta endpoint
    // Model ID should already contain 'models/' prefix if from getModels
    const modelPath = modelId.startsWith('models/') ? modelId : `models/${modelId}`;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${this.apiKey}`;

    const body = {
      contents: [{
        parts: [{ text: message }]
      }],
      generationConfig: {
        maxOutputTokens: 2048,
      }
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

  async getModels() {
    if (!this.isConfigured()) return [];

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`);
      const data = await this.handleResponse(response);

      // Filter for models that support generateContent
      return data.models
        .filter(m => m.supportedGenerationMethods.includes('generateContent'))
        .map(m => ({
          id: m.name, // e.g. "models/gemini-1.5-flash"
          name: m.displayName
        }));
    } catch (error) {
      console.error('Gemini: Failed to fetch models', error);
      return [
        { id: 'models/gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
        { id: 'models/gemini-1.5-pro', name: 'Gemini 1.5 Pro' }
      ];
    }
  }
}
