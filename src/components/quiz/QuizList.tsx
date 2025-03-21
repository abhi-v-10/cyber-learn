
import React from "react";
import { QuizCard } from "./QuizCard";
import { Quiz } from "@/lib/types";

interface QuizListProps {
  quizzes: Quiz[];
  emptyMessage?: string;
}

export const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  emptyMessage = "No quizzes available.",
}) => {
  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};
