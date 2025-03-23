
import React, { useRef, useEffect } from "react";
import { ChatMessage as ChatMessageType } from "@/lib/types";
import { ChatMessageItem } from "./ChatMessage";
import { LoadingIndicator } from "./LoadingIndicator";

interface MessageListProps {
  messages: ChatMessageType[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="space-y-6">
        {messages.map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
