
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProgressStats } from "@/components/progress/ProgressStats";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Course, Quiz } from "@/lib/types";
import { CoursesList } from "@/components/courses/CoursesList";
import { QuizList } from "@/components/quiz/QuizList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Calendar, Check, Medal, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const Progress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<Quiz[]>([]);
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;

        const courses = await api.courses.getAll();
        const quizzes = await api.quizzes.getAll();
        
        setAllCourses(courses);
        setAllQuizzes(quizzes);
        
        const userCompletedCourses = courses.filter(course => 
          user.progress.completedCourses.includes(course.id)
        );
        
        const userCompletedQuizzes = quizzes.filter(quiz => 
          user.progress.completedQuizzes.includes(quiz.id)
        );
        
        setCompletedCourses(userCompletedCourses);
        setCompletedQuizzes(userCompletedQuizzes);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return (
      <Layout requireAuth>
        <div className="flex justify-center py-12">
          <p>Please log in to view your progress.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requireAuth>
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Your Learning Progress</h1>
          <p className="text-muted-foreground text-lg">
            Track your achievements and see how far you've come in your cybersecurity journey.
          </p>
        </div>

        <ProgressStats
          user={user}
          completedCoursesCount={completedCourses.length}
          totalCoursesCount={allCourses.length}
          completedQuizzesCount={completedQuizzes.length}
          totalQuizzesCount={allQuizzes.length}
        />

        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Achievement Timeline</h3>
                <p className="text-sm text-muted-foreground">Your learning journey milestones</p>
              </div>
            </div>

            <div className="space-y-6 mt-6">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="w-0.5 bg-border flex-1 my-2"></div>
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-2">
                    <Medal className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Account Created</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    You started your cybersecurity journey with us
                  </p>
                </div>
              </div>

              {completedQuizzes.length > 0 && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="w-0.5 bg-border flex-1 my-2"></div>
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">First Quiz Completed</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      You completed your first quiz: {completedQuizzes[0].title}
                    </p>
                  </div>
                </div>
              )}

              {completedCourses.length > 0 && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="w-0.5 bg-border flex-1 my-2"></div>
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">First Course Completed</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      You completed your first course: {completedCourses[0].title}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Current Streak: {user.progress.loginStreak} days</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Keep logging in daily to increase your streak!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="completed">
          <TabsList className="mb-6">
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
          
          <TabsContent value="completed" className="space-y-8">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="loader" />
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold">Completed Courses</h3>
                    <Button variant="outline" onClick={() => navigate("/courses")}>
                      Browse All Courses
                    </Button>
                  </div>
                  <CoursesList
                    courses={completedCourses}
                    emptyMessage="You haven't completed any courses yet. Start learning today!"
                  />
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold">Completed Quizzes</h3>
                    <Button variant="outline" onClick={() => navigate("/quizzes")}>
                      Browse All Quizzes
                    </Button>
                  </div>
                  <QuizList
                    quizzes={completedQuizzes}
                    emptyMessage="You haven't completed any quizzes yet. Test your knowledge today!"
                  />
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="in-progress">
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We're working on tracking your in-progress courses and quizzes. Check back soon!
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate("/courses")}>
                  Browse Courses
                </Button>
                <Button variant="outline" onClick={() => navigate("/quizzes")}>
                  Browse Quizzes
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recommended">
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Personalized Recommendations Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Our AI is learning your preferences and will soon recommend courses and quizzes tailored to your learning style.
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate("/courses")}>
                  Browse Courses
                </Button>
                <Button variant="outline" onClick={() => navigate("/quizzes")}>
                  Browse Quizzes
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Progress;
