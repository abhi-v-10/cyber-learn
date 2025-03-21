
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { QuizList } from "@/components/quiz/QuizList";
import { api } from "@/lib/api";
import { Quiz } from "@/lib/types";
import { QUIZ_CATEGORIES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const allQuizzes = await api.quizzes.getAll();
        setQuizzes(allQuizzes);
        setFilteredQuizzes(allQuizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    const filtered = quizzes.filter((quiz) => {
      const matchesSearch =
        searchQuery === "" ||
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || quiz.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === "all" || quiz.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    setFilteredQuizzes(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty, quizzes]);

  return (
    <Layout requireAuth>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Cybersecurity Quizzes</h1>
          <p className="text-muted-foreground text-lg">
            Test your knowledge and skills with our interactive quizzes covering various cybersecurity topics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quizzes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {QUIZ_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedDifficulty}
            onValueChange={setSelectedDifficulty}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="loader" />
          </div>
        ) : (
          <QuizList
            quizzes={filteredQuizzes}
            emptyMessage={
              searchQuery || selectedCategory !== "all" || selectedDifficulty !== "all"
                ? "No quizzes match your filters. Try adjusting your search criteria."
                : "No quizzes available."
            }
          />
        )}
      </div>
    </Layout>
  );
};

export default Quizzes;
