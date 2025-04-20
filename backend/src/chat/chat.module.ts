import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatController } from './controllers/chat.controller';
import { OpenAIService } from './services/openai.service';

@Module({
  imports: [ConfigModule],
  controllers: [ChatController],
  providers: [OpenAIService],
})
export class ChatModule {}
