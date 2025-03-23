
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Markdown from "react-markdown";
import { ChatMessage as ChatMessageType } from "@/lib/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessageItem: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex space-x-3 max-w-[85%] ${
          message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        <Avatar className="h-8 w-8">
          {message.role === "user" ? (
            <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
          ) : (
            <AvatarFallback className="bg-cyan-600 text-white">AI</AvatarFallback>
          )}
        </Avatar>
        <div
          className={`p-4 rounded-lg ${
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          <div className="prose max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:p-2">
            <Markdown>{message.content}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};
