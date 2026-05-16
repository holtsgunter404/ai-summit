import { BaseProvider } from './BaseProvider';

export class ClaudeProvider extends BaseProvider {
  constructor(apiKey) {
    super(apiKey);
  }

  async sendMessage(message, systemPrompt, modelId = 'claude-3-5-sonnet-20240620') {
    if (!this.isConfigured()) {
      throw new Error('Claude API key is missing');
    }

    // Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'dangerously-allow-browser': 'true' // Note: In production this should be proxied
      },
      body: JSON.stringify({
        model: modelId,
        max_tokens: 4096,
        system: systemPrompt,
        messages: [
          { role: 'user', content: message }
        ]
      })
    });

    const data = await this.handleResponse(response);
    return data.content[0].text;
  }
}
