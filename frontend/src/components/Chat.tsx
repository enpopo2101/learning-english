import { useState } from 'react';
import { sendChatRequest } from '../api/chat';
import { useSpeech } from '../hooks/useSpeech';
import { CONTEXTS, Context, LEVELS, Level, ROLES, Role } from '../types';

export function Chat() {
  const [role, setRole] = useState<Role>(ROLES[0]);
  const [level, setLevel] = useState<Level>(LEVELS[0]);
  const [context, setContext] = useState<Context>(CONTEXTS[0]);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isListening,
    startListening,
    stopListening,
    speak,
    transcript,
    error,
  } = useSpeech();

  const handleStopListening = async () => {
    stopListening();
    if (transcript) {
      setIsLoading(true);
      try {
        setMessages(prev => [...prev, { text: transcript, isUser: true }]);
        
        const response = await sendChatRequest({
          text: transcript,
          role,
          level,
          context,
          history: messages
        });

        setMessages(prev => [...prev, { text: response.response, isUser: false }]);
        speak(response.response);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to get response from AI');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full p-2 border rounded"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as Level)}
            className="w-full p-2 border rounded"
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Context</label>
          <select
            value={context}
            onChange={(e) => setContext(e.target.value as Context)}
            className="w-full p-2 border rounded"
          >
            {CONTEXTS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-96 border rounded-lg mb-4 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              message.isUser
                ? 'bg-blue-100 ml-auto max-w-[80%]'
                : 'bg-gray-100 mr-auto max-w-[80%]'
            }`}
          >
            {message.text}
          </div>
        ))}
        {isListening && (
          <div className="text-blue-500 animate-pulse">Listening... {transcript}</div>
        )}
        {isLoading && <div className="text-gray-500">AI is thinking...</div>}
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        onClick={isListening ? handleStopListening : startListening}
        className={`w-full p-4 rounded-lg ${
          isListening
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-medium`}
      >
        {isListening ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}
