export interface Message {
  text: string;
  isUser: boolean;
}

export class ChatRequestDto {
  text: string;
  role: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  context: string;
  history: Message[];
}
