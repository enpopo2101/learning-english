import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { ChatRequestDto } from '../dto/chat-request.dto';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateResponse(chatRequest: ChatRequestDto): Promise<string> {
    const systemPrompt = this.generatePrompt(chatRequest);
    
    // Convert history into OpenAI message format
    const historyMessages = chatRequest.history.map(msg => ({
      role: msg.isUser ? 'user' as const : 'assistant' as const,
      content: msg.text,
    })) as ChatCompletionMessageParam[];

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...historyMessages,
        {
          role: 'user',
          content: chatRequest.text,
        },
      ],
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  }

  private generatePrompt(chatRequest: ChatRequestDto): string {
    return `You are now playing the role of: ${chatRequest.role}.

This conversation is part of a voice-chat feature in an English-learning application built with Node.js (backend) and React (frontend), all written in TypeScript.

Engage in a voice-based English conversation with the user, who is practicing their English speaking skills. The user's proficiency level is: ${chatRequest.level}.

Speak in a way that suits the user's level. Use clear, natural English and maintain a friendly, conversational tone. The conversation context is: ${chatRequest.context}.

Do not correct the user unless they ask for it. Just respond naturally to keep the conversation flowing. Your responses will be converted to voice, so keep them concise and easy to follow.

Keep the conversation engaging and ask short questions when appropriate to encourage the user to keep talking.`;
  }
}
