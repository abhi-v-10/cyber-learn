
import React from "react";
import { Link } from "react-router-dom";
import { Course } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`/courses/${course.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover-glow hover:border-primary/50 group-hover:translate-y-[-5px]">
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${course.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge
              className="mb-2"
              variant={
                course.difficulty === "beginner"
                  ? "outline"
                  : course.difficulty === "intermediate"
                  ? "secondary"
                  : "default"
              }
            >
              {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
            </Badge>
            <h3 className="text-xl font-semibold text-white line-clamp-1">{course.title}</h3>
          </div>
        </div>
        <CardContent className="p-4 h-24">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 border-t">
          <Badge variant="secondary" className="text-xs">
            {course.category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {course.estimatedTime}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
