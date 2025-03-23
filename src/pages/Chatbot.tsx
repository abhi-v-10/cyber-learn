
import React from "react";
import { Layout } from "@/components/Layout";
import { ChatInterface } from "@/components/chatbot/ChatInterface";

const Chatbot = () => {
  return (
    <Layout requireAuth>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-4">Cybersecurity AI Tutor</h1>
          <p className="text-muted-foreground text-lg">
            Get instant answers to your cybersecurity questions and platform information.
            Ask about security concepts, courses, quizzes, or any other questions you might have.
          </p>
        </div>
        
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chatbot;
