
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CourseContent } from "@/components/courses/CourseContent";
import { api } from "@/lib/api";
import { Course } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setError("Course ID is missing");
        setLoading(false);
        return;
      }

      try {
        const courseData = await api.courses.getById(id);
        if (courseData) {
          setCourse(courseData);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course data");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
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

  if (error || !course) {
    return (
      <Layout requireAuth>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            {error || "Course not found"}
          </h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the course you were looking for.
          </p>
          <Button onClick={() => navigate("/courses")}>
            Back to Courses
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
          onClick={() => navigate("/courses")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
      </div>
      <CourseContent course={course} />
    </Layout>
  );
};

export default CourseDetails;
