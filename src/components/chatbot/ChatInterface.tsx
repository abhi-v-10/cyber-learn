
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader, Send } from "lucide-react";
import { ChatMessage } from "@/lib/types";
import Markdown from "react-markdown";

// Gemini API info
const GEMINI_API_KEY = "AIzaSyDzOoVej0pvx85JzW2a3EU0UmWfHriGTo8";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const ChatInterface: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your Cybersecurity AI Tutor powered by Google's Gemini AI. Ask me anything about cybersecurity, ethical hacking, network security, or any other cybersecurity topic you're learning about.",
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
      // Call Gemini API
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a cybersecurity expert assistant. Answer the following question in a helpful, accurate, and concise way, focusing on cybersecurity topics: ${input}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_ONLY_HIGH"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Gemini API response:", data);

      let assistantResponse = "";
      if (data.candidates && data.candidates.length > 0 && 
          data.candidates[0].content && 
          data.candidates[0].content.parts && 
          data.candidates[0].content.parts.length > 0) {
        assistantResponse = data.candidates[0].content.parts[0].text;
      } else {
        assistantResponse = "I apologize, but I couldn't generate a response. Please try asking a different question.";
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: assistantResponse,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please check your network connection and try again later.",
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
              placeholder="Ask me anything about cybersecurity..."
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
