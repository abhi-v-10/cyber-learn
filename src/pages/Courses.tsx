
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { CoursesList } from "@/components/courses/CoursesList";
import { api } from "@/lib/api";
import { Course } from "@/lib/types";
import { COURSE_CATEGORIES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCourses = await api.courses.getAll();
        setCourses(allCourses);
        setFilteredCourses(allCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === "all" || course.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty, courses]);

  return (
    <Layout requireAuth>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Cybersecurity Courses</h1>
          <p className="text-muted-foreground text-lg">
            Explore our comprehensive collection of cybersecurity courses designed to help you master essential skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
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
              {COURSE_CATEGORIES.map((category) => (
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
          <CoursesList
            courses={filteredCourses}
            emptyMessage={
              searchQuery || selectedCategory !== "all" || selectedDifficulty !== "all"
                ? "No courses match your filters. Try adjusting your search criteria."
                : "No courses available."
            }
          />
        )}
      </div>
    </Layout>
  );
};

export default Courses;
