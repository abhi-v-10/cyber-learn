
import React, { useState } from "react";
import { Quiz } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, ChevronLeft, ChevronRight, HelpCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAuth } from "@/context/auth";

interface QuizContentProps {
  quiz: Quiz;
}

export const QuizContent: React.FC<QuizContentProps> = ({ quiz }) => {
  const { user, updateProgress } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quiz.questions.length).fill(-1));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    passed: boolean;
    feedback: string[];
    incorrectAnswers: {
      questionIndex: number;
      userAnswer: number;
      correctAnswer: number;
      explanation: string;
    }[];
  } | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = parseInt(value);
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestionIndex] === -1) {
      toast.error("Please select an answer before continuing");
      return;
    }
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswers.includes(-1)) {
      toast.error("Please answer all questions before submitting");
      return;
    }

    setLoadingSubmit(true);

    try {
      if (!user) {
        toast.error("You must be logged in to submit a quiz");
        return;
      }

      const result = await api.quizzes.submitQuiz(quiz.id, selectedAnswers, user.id);
      setQuizResult(result);
      setQuizSubmitted(true);

      if (result.passed) {
        toast.success("Congratulations! You passed the quiz!");
        
        // Calculate new title based on completed quizzes
        const getTitleForQuizCount = (quizCount: number): string => {
          if (quizCount < 25) return "Rookie";
          if (quizCount < 50) return "Learner";
          if (quizCount < 75) return "Dedicated";
          if (quizCount < 100) return "Master";
          return "Expert";
        };
        
        // Update user progress
        const completedQuizzes = user.progress.completedQuizzes || [];
        if (!completedQuizzes.includes(quiz.id)) {
          const newCompletedQuizzes = [...completedQuizzes, quiz.id];
          const newTitle = getTitleForQuizCount(newCompletedQuizzes.length);
          
          await updateProgress({
            completedQuizzes: newCompletedQuizzes,
            points: user.progress.points + 10,
            title: newTitle,
            level: Math.floor(newCompletedQuizzes.length / 25) + 1
          });
        }
      } else {
        toast.error("You didn't pass this time. Review the feedback and try again!");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers(Array(quiz.questions.length).fill(-1));
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
    setQuizResult(null);
  };

  if (!currentQuestion) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">{quiz.title}</h2>
          <p className="text-muted-foreground">{quiz.description}</p>
        </div>
        <Badge variant="outline" className="self-start sm:self-auto">
          {quiz.category}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Progress value={progress} className="flex-1" />
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {currentQuestionIndex + 1} of {quiz.questions.length}
        </span>
      </div>

      {!quizSubmitted ? (
        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {currentQuestionIndex + 1}
              </span>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold leading-tight">
                  {currentQuestion.question}
                </h3>
              </div>
            </div>

            <Separator className="my-6" />

            <RadioGroup
              value={selectedAnswers[currentQuestionIndex].toString()}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 rounded-md border p-4 transition-colors hover:bg-accent"
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer py-2 text-base"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between bg-muted/40 p-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <Button size="sm" onClick={handleSubmit} disabled={loadingSubmit} className="gap-1">
                {loadingSubmit ? "Submitting..." : "Submit Quiz"}
              </Button>
            ) : (
              <Button size="sm" onClick={handleNext} className="gap-1">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col items-center justify-center py-6 text-center">
                {quizResult?.passed ? (
                  <div className="space-y-2">
                    <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold">You passed!</h3>
                    <p className="text-muted-foreground">
                      You scored {quizResult.score.toFixed(0)}%, which is above the 80% passing threshold.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                      <XCircle className="h-10 w-10 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold">Try again</h3>
                    <p className="text-muted-foreground">
                      You scored {quizResult?.score.toFixed(0)}%, which is below the 80% passing threshold.
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Question Feedback</h4>
                <div className="space-y-3">
                  {quizResult?.feedback.map((feedback, index) => {
                    const isCorrect = feedback.includes("Correct!");
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          isCorrect ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                          )}
                          <div>
                            <p
                              className={`font-medium ${
                                isCorrect ? "text-green-800" : "text-red-800"
                              }`}
                            >
                              {feedback.split(":")[0]}:
                            </p>
                            <p className="text-sm mt-1">{feedback.split(":")[1]}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {quizResult && quizResult.incorrectAnswers && quizResult.incorrectAnswers.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Incorrect Answers</h4>
                  <div className="space-y-4">
                    {quizResult.incorrectAnswers.map((item, index) => (
                      <Card key={index} className="border-red-100">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">
                            Question {item.questionIndex + 1}: {quiz.questions[item.questionIndex].question}
                          </h5>
                          <div className="space-y-2 ml-4">
                            <p className="text-red-600">
                              Your answer: {quiz.questions[item.questionIndex].options[item.userAnswer]}
                            </p>
                            <p className="text-green-600">
                              Correct answer: {quiz.questions[item.questionIndex].options[item.correctAnswer]}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Explanation: {item.explanation}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleRetake} className="gap-2">
              <HelpCircle className="h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
