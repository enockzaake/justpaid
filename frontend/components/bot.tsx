"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import BotContext from "@/context/botContext";
import { BotMessage } from "@/types";
import ChatInput from "./chatInput";

const Bot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  const { messages } = useContext(BotContext)!;

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);

    if (chatWindowRef.current) {
      if (isOpen) {
        chatWindowRef.current.classList.add("opacity-0", "scale-95");
        chatWindowRef.current.classList.remove("opacity-100", "scale-100");
      } else {
        chatWindowRef.current.classList.remove("opacity-0", "scale-95");
        chatWindowRef.current.classList.add("opacity-100", "scale-100");
      }
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-900 text-white z-50 fixed bottom-4 right-4 hover:cursor-pointer"
        onClick={toggleChat}
      >
        Bot
      </div>

      <div
        ref={chatWindowRef}
        className={`fixed bottom-20 right-4 w-96 h-[550px] bg-white shadow-lg rounded-lg z-50 transition-all duration-300 transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full w-full">
          <div className="flex-none p-4 bg-indigo-900 text-white rounded-t-lg">
            Search assistant
          </div>
          <div className="flex-grow p-2 overflow-y-auto bg-green-100 break-words">
            {/* Chat messages */}
            <div className="flex flex-col space-y-1">
              {messages.map((message: BotMessage, index: number) => (
                <div
                  className={`flex ${
                    message.user_type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  key={index}
                >
                  <span
                    className={`p-2 rounded-md max-w-[75%] break-words ${
                      message.user_type === "user"
                        ? "bg-indigo-200"
                        : "bg-blue-200"
                    }`}
                  >
                    {message.content}
                  </span>
                </div>
              ))}
            </div>

            {/* This div ensures scrolling to the bottom */}
            <div ref={endOfMessagesRef} />
          </div>

          <div className="flex-none p-4">
            <ChatInput />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bot;
