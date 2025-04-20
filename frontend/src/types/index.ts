export const ROLES = [
  'barista',
  'interviewer',
  'tour guide',
  'hotel receptionist',
  'doctor',
  'shop assistant',
] as const;
export type Role = typeof ROLES[number];

export const LEVELS = [
  'beginner',
  'intermediate',
  'advanced',
] as const;
export type Level = typeof LEVELS[number];

export const CONTEXTS = [
  'ordering food',
  'job interview',
  'traveling abroad',
  'shopping',
  'medical consultation',
  'hotel booking',
] as const;
export type Context = typeof CONTEXTS[number];

export interface Message {
  text: string;
  isUser: boolean;
}

export interface ChatRequest {
  text: string;
  role: Role;
  level: Level;
  context: Context;
  history: Message[];
}

export interface ChatResponse {
  response: string;
}
