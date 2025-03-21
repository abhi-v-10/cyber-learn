
import React from "react";
import { Link } from "react-router-dom";
import { Quiz } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

interface QuizCardProps {
  quiz: Quiz;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  return (
    <Link to={`/quizzes/${quiz.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover-glow hover:border-primary/50 group-hover:translate-y-[-5px]">
        <div className="relative h-40 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${quiz.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge
              className="mb-2"
              variant={
                quiz.difficulty === "beginner"
                  ? "outline"
                  : quiz.difficulty === "intermediate"
                  ? "secondary"
                  : "default"
              }
            >
              {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
            </Badge>
            <h3 className="text-xl font-semibold text-white line-clamp-1">{quiz.title}</h3>
          </div>
        </div>
        <CardContent className="p-4 h-24">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {quiz.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 border-t">
          <Badge variant="secondary" className="text-xs">
            {quiz.category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <HelpCircle className="h-3.5 w-3.5 mr-1" />
            {quiz.questions.length} questions
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
