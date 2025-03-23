
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader, Send } from "lucide-react";
import { ChatMessage } from "@/lib/types";
import Markdown from "react-markdown";
import { toast } from "sonner";
import { getChatbotResponse } from "@/lib/chatbot-utils";

export const ChatInterface: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your Cybersecurity AI Tutor. Ask me anything about cybersecurity, platform features, or any other questions you might have about the learning platform.",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Get response from our local chatbot utility
      const response = await getChatbotResponse(input);
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      toast.error("Sorry, I encountered an error processing your request.");
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "I apologize, but I encountered an error processing your request. Please try again with a different question.",
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex flex-col flex-1 overflow-hidden bg-card rounded-lg border shadow-sm">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
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
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-[85%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-cyan-600 text-white">AI</AvatarFallback>
                  </Avatar>
                  <div className="p-4 rounded-lg bg-secondary text-secondary-foreground">
                    <Loader className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about cybersecurity or the platform..."
              className="flex-1 min-h-[60px] resize-none"
              maxLength={500}
            />
            <Button
              onClick={handleSendMessage}
              disabled={input.trim() === "" || isLoading}
              className="h-auto"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground text-right">
            {500 - input.length} characters remaining
          </div>
        </div>
      </div>
    </div>
  );
};
