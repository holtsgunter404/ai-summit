import { BaseProvider } from './BaseProvider';

export class KimiProvider extends BaseProvider {
  async sendMessage(message, systemPrompt) {
    if (!this.isConfigured()) {
      return `[KIMI MOCK] Role: ${systemPrompt}\n\nKey missing. Fallback for: ${message}`;
    }
    return `[KIMI REAL (Mocked)] Role "${systemPrompt}" applied to "${message}"`;
  }
}
