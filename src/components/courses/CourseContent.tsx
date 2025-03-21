
import React, { useState } from "react";
import { Course, CourseTopic } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Markdown from "react-markdown";

interface CourseContentProps {
  course: Course;
}

export const CourseContent: React.FC<CourseContentProps> = ({ course }) => {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const activeTopic = course.topics[activeTopicIndex] || course.topics[0];

  const handleNext = () => {
    if (activeTopicIndex < course.topics.length - 1) {
      setActiveTopicIndex(activeTopicIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (activeTopicIndex > 0) {
      setActiveTopicIndex(activeTopicIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  if (!activeTopic) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Content Coming Soon</h3>
        <p className="text-muted-foreground">
          We're working on creating amazing content for this course.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">{course.title}</h2>
          <Badge className="text-sm" variant="outline">
            {course.category}
          </Badge>
        </div>
        <p className="text-muted-foreground">{course.description}</p>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
          <div className="bg-card rounded-lg border p-1 overflow-x-auto">
            <div className="flex space-x-1">
              {course.topics.map((topic, index) => (
                <Button
                  key={topic.id}
                  variant={index === activeTopicIndex ? "default" : "ghost"}
                  className={`rounded-md whitespace-nowrap ${
                    index === activeTopicIndex ? "" : "text-muted-foreground"
                  }`}
                  onClick={() => setActiveTopicIndex(index)}
                >
                  {index + 1}. {topic.title}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg border overflow-hidden">
            {activeTopic.imageUrl && (
              <div
                className="w-full h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${activeTopic.imageUrl})` }}
              />
            )}
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">{activeTopic.title}</h3>
              <div className="prose max-w-none">
                <Markdown>{activeTopic.content}</Markdown>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={activeTopicIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={activeTopicIndex === course.topics.length - 1}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          {activeTopic.resources && activeTopic.resources.length > 0 ? (
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Additional Resources</h3>
                <ul className="space-y-3">
                  {activeTopic.resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-md hover:bg-accent transition-colors"
                      >
                        <div className="mr-3">
                          {resource.type === "video" ? (
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <polygon points="5 3 19 12 5 21 5 3" />
                              </svg>
                            </div>
                          ) : resource.type === "article" ? (
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-xs text-muted-foreground">{resource.type}</div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No additional resources available for this topic.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
