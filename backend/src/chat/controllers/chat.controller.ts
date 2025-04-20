import { Body, Controller, Post } from '@nestjs/common';
import { ChatRequestDto } from '../dto/chat-request.dto';
import { OpenAIService } from '../services/openai.service';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Post()
  async chat(@Body() chatRequest: ChatRequestDto): Promise<{ response: string }> {
    const response = await this.openaiService.generateResponse(chatRequest);
    return { response };
  }
}
