
import React from "react";
import { CourseCard } from "./CourseCard";
import { Course } from "@/lib/types";

interface CoursesListProps {
  courses: Course[];
  emptyMessage?: string;
}

export const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  emptyMessage = "No courses available.",
}) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
