interface Idea {
    content: string;
  }
  interface Message {
    sender: 'user' | 'bot';
    content: string;
  }


export const addIdea = (ideas: Idea[], content: string): Idea[] => [...ideas, { content }];

export const resetIdea = (ideas: Idea[]): Idea[] => [];

export const getIdeas = (ideas: Idea[]): Idea[] => ideas;

export const addMessage = (messages: Message[], sender: 'user' | 'bot', content: string): Message[] => [...messages, { sender, content }];

export const getMessages = (messages: Message[]): Message[] => messages;