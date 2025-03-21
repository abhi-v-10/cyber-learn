
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { QuizContent } from "@/components/quiz/QuizContent";
import { api } from "@/lib/api";
import { Quiz } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";

const QuizDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) {
        setError("Quiz ID is missing");
        setLoading(false);
        return;
      }

      try {
        const quizData = await api.quizzes.getById(id);
        if (quizData) {
          setQuiz(quizData);
        } else {
          setError("Quiz not found");
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz data");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) {
    return (
      <Layout requireAuth>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="loader" />
        </div>
      </Layout>
    );
  }

  if (error || !quiz) {
    return (
      <Layout requireAuth>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <HelpCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            {error || "Quiz not found"}
          </h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the quiz you were looking for.
          </p>
          <Button onClick={() => navigate("/quizzes")}>
            Back to Quizzes
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requireAuth>
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate("/quizzes")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Button>
      </div>
      <QuizContent quiz={quiz} />
    </Layout>
  );
};

export default QuizDetails;
