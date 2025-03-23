
import React from "react";
import { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Flame, Trophy, Users } from "lucide-react";

interface ProgressStatsProps {
  user: User;
  completedCoursesCount: number;
  totalCoursesCount: number;
  completedQuizzesCount: number;
  totalQuizzesCount: number;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({
  user,
  completedCoursesCount,
  totalCoursesCount,
  completedQuizzesCount,
  totalQuizzesCount,
}) => {
  const courseProgress = totalCoursesCount > 0 
    ? (completedCoursesCount / totalCoursesCount) * 100 
    : 0;
    
  const quizProgress = totalQuizzesCount > 0 
    ? (completedQuizzesCount / totalQuizzesCount) * 100 
    : 0;

  // Calculate the next title based on completed quizzes - updated to 15 quizzes per title
  const getTitleForQuizCount = (quizCount: number): string => {
    if (quizCount < 15) return "Rookie";
    if (quizCount < 30) return "Learner";
    if (quizCount < 45) return "Dedicated";
    if (quizCount < 60) return "Master";
    return "Expert";
  };

  const nextTitle = getTitleForQuizCount(completedQuizzesCount + 15);
  const nextTitleThreshold = Math.ceil((completedQuizzesCount + 1) / 15) * 15;
  const nextTitleProgress = ((completedQuizzesCount % 15) / 15) * 100;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Streak</CardTitle>
          <Flame className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.progress.loginStreak} days</div>
          <p className="text-xs text-muted-foreground">
            Keep it up! Log in daily to increase your streak.
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Points</CardTitle>
          <Trophy className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.progress.points}</div>
          <p className="text-xs text-muted-foreground">
            Earn more by completing courses and quizzes.
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Title</CardTitle>
          <Award className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.progress.title}</div>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-muted-foreground">
              Next: {nextTitleThreshold - completedQuizzesCount} more quizzes for {nextTitle}
            </p>
            <Progress value={nextTitleProgress} className="h-1" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Level</CardTitle>
          <Users className="h-4 w-4 text-violet-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.progress.level}</div>
          <p className="text-xs text-muted-foreground">
            Each 15 quizzes earns you a new level.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
