import { Request, Response } from 'express';
import { resetIdea, getIdeas, addMessage, getMessages} from '../models/Chat';

interface Idea {
  content: string;
}

interface Message {
  sender: 'user' | 'bot';
  content: string;
}

let ideaList: Idea[] = [];
let messageList: Message[] = [];

export const chat = (req: Request, res: Response) => {
  const message = req.body.message;
  const action = req.body.action;

  if (action === 'save') {
    saveIdea(req, res);
    return;
  }

  if(action === 'continue') {
    continueChat(req, res);
    return;
  }

  const response = `You said: ${message}. Would you like to save this idea or continue?`;

  if (action === 'initial') {
    res.json({ response, chatHistory: getMessages(messageList) });
    return;
  }

  addMessage(messageList, 'bot', response);
  res.json({response, ideas: getIdeas(ideaList), chatHistory: getMessages(messageList) });
};

export const saveIdea = (req: Request, res: Response) => {
  const idea = req.body.idea;
  if (!ideaList.find((existingIdea) => existingIdea.content === idea)) {
    ideaList = [...ideaList, { content: idea }];
  } else {
    console.log('Idea already exists');
  }
  res.json({ success: true, ideas: getIdeas(ideaList), chatHistory: getMessages(messageList) });
};
  
export const continueChat = (req: Request, res: Response) => {
    const botResponse = `Add new idea`;
    addMessage(messageList, 'bot', botResponse);
    res.json({ botResponse, ideas: getIdeas(ideaList), chatHistory: getMessages(messageList) });
};

export const resetIdeas = (req: Request, res: Response) => {
  ideaList = resetIdea(ideaList);
  res.json({ success: true, ideas: getIdeas(ideaList), chatHistory: getMessages(messageList) });
};

export const resetChat = (req: Request, res: Response) => {
    messageList = [];
    ideaList = resetIdea(ideaList);
    res.json({ success: true, ideas: getIdeas(ideaList), chatHistory: getMessages(messageList) });
  };