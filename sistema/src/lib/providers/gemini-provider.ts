import { GoogleGenerativeAI } from '@google/generative-ai'
import type { AIProvider, AIStream, ChatMessage, StreamChunk } from '@/lib/ai-provider'

class GeminiStream implements AIStream {
  private stream: AsyncGenerator<any>
  private previousText = ''

  constructor(stream: AsyncGenerator<any>) {
    this.stream = stream
  }

  async *[Symbol.asyncIterator](): AsyncIterator<StreamChunk> {
    for await (const chunk of this.stream) {
      const fullText = chunk.text()
      const delta = fullText.slice(this.previousText.length)
      this.previousText = fullText
      if (delta) {
        yield { type: 'text', text: delta }
      }
    }
  }
}

export class GeminiProvider implements AIProvider {
  private client: GoogleGenerativeAI

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey)
  }

  async streamChat(messages: ChatMessage[], opts?: { system?: string; maxTokens?: number }) {
    const model = this.client.getGenerativeModel({
      model: process.env.AI_MODEL ?? 'gemini-2.5-flash',
      systemInstruction: opts?.system,
      generationConfig: {
        maxOutputTokens: opts?.maxTokens ?? 1024,
      },
    })

    const contents = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))

    const result = await model.generateContentStream({ contents })
    return new GeminiStream(result.stream)
  }
}
