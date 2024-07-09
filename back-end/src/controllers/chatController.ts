import { Request, Response } from 'express';
import Message, { IMessage } from '../models/messageModel';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ room: req.params.room });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message:" No messages found "});
  }
};

export const addMessage = async (req: Request, res: Response) => {
  const { user, text, room } = req.body;

  const newMessage: IMessage = new Message({ user, text, room });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: "Internal server error while saving message "});
  }
};
