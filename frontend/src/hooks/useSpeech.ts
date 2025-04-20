import { useCallback, useRef, useState } from 'react';
import type { SpeechRecognition } from '../types/speech';

interface UseSpeechResult {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  transcript: string;
  error: string | null;
}

export function useSpeech(): UseSpeechResult {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize speech recognition
  const initializeRecognition = useCallback(() => {
    if (recognitionRef.current) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    const instance = new SpeechRecognition();
    instance.continuous = true;
    instance.interimResults = true;
    instance.lang = 'en-US';

    instance.onresult = (event) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);
    };

    instance.onerror = (event) => {
      console.log("🚀 ~ recognition ~ event:", event.error)
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    instance.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = instance;
  }, []);

  // Start listening
  const startListening = useCallback(() => {
    setError(null);
    setTranscript('');
    
    // Initialize recognition if not already done
    initializeRecognition();
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
        // If recognition is already started, stop it first then start again
        if (error instanceof Error && error.message.includes('already started')) {
          recognitionRef.current.stop();
          setTimeout(() => {
            recognitionRef.current?.start();
            setIsListening(true);
          }, 100);
        }
      }
    }
  }, [initializeRecognition]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  // Text-to-speech
  const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }, []);

  return {
    isListening,
    startListening,
    stopListening,
    speak,
    transcript,
    error,
  };
}
