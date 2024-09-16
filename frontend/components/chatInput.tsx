"use client";
import React, { FormEvent, useRef, useState } from "react";
import { useContext } from "react";
import BotContext from "@/context/botContext";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { BotMessage } from "@/types";

// Get current user id for context
// make calls to streaming endpoint here
const ChatInput = () => {
  const { addMessage, updateMessage } = useContext(BotContext)!;
  const [input, setInput] = useState<string>("");
  let botIdRef = useRef<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (input.trim()) {
      const user_message: BotMessage = {
        id: nanoid(),
        user_type: "user",
        content: input,
      };
      addMessage(user_message);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/streaming`,
          {
            method: "POST",
            body: JSON.stringify({ input: input }),
          }
        );

        const reader = res.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        while (true) {
          if (reader) {
            const { done, value } = await reader.read();
            if (done) {
              botIdRef.current = null;
              break;
            }
            if (!botIdRef.current) {
              botIdRef.current = nanoid();
              const bot_message: BotMessage = {
                id: botIdRef.current,
                user_type: "bot",
                content: decoder.decode(value),
              };
              addMessage(bot_message);
            } else {
              updateMessage(botIdRef.current, decoder.decode(value));
            }
          }
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setInput("");
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name="message"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Type a message..."
      />
    </form>
  );
};

export default ChatInput;
