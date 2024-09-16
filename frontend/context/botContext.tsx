"use client";
import React, { createContext, useState } from "react";
import { BotMessage } from "@/types";

interface BotContextProps {
  messages: BotMessage[];
  addMessage: (new_message: BotMessage) => void;
  setMessages: React.Dispatch<React.SetStateAction<BotMessage[]>>;
  updateMessage: (message_id: string | number, chunk: string) => void;
}

const BotContext = createContext<BotContextProps | null>(null);
export default BotContext;

const defaultMessage: BotMessage = {
  id: "1",
  user_type: "bot",
  content: "Hello",
};

export const BotContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<BotMessage[] | []>([defaultMessage]);

  const updateMessage = (message_id: string | number, chunk: string) => {
    let message = messages.find(
      (message: BotMessage) => message.id === message_id
    );

    message = { ...message, content: "" } as BotMessage;

    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === message_id) {
          return { ...message, content: message.content + chunk };
        }
        return message;
      })
    );
  };

  const addMessage = (new_message: BotMessage) => {
    setMessages((prevMessages) => {
      return [...prevMessages, new_message];
    });
  };

  return (
    <BotContext.Provider
      value={{ messages, setMessages, updateMessage, addMessage }}
    >
      {children}
    </BotContext.Provider>
  );
};
