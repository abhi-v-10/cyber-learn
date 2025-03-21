
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CoursesList } from "@/components/courses/CoursesList";
import { QuizList } from "@/components/quiz/QuizList";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Course, Quiz } from "@/lib/types";
import { ArrowRight, ShieldCheck, BookOpen, MessageSquare, Award } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [featuredQuizzes, setFeaturedQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await api.courses.getAll();
        const quizzes = await api.quizzes.getAll();
        setFeaturedCourses(courses.slice(0, 3));
        setFeaturedQuizzes(quizzes.slice(0, 3));
      } catch (error) {
        console.error("Error fetching featured content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: "Interactive Learning",
      description: "Expert-curated courses with personalized learning paths to master cybersecurity skills."
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-primary" />,
      title: "Practical Security Tools",
      description: "Hands-on experience with real-world security tools and simulations."
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-primary" />,
      title: "AI Learning Assistant",
      description: "Get instant help and answers to your cybersecurity questions."
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "Achievement System",
      description: "Track your progress and earn recognition for your accomplishments."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyber-dark to-cyber-blue mb-16">
        <div className="relative z-10 px-6 py-16 sm:px-8 sm:py-24 lg:py-32 xl:py-36">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Master Cybersecurity with AI-Powered Learning
            </h1>
            <p className="mt-6 text-xl text-white/80">
              Learn, practice, and master cybersecurity skills through interactive courses, hands-on tools, and AI-guided learning paths.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {user ? (
                <>
                  <Button size="lg" onClick={() => navigate("/courses")}>
                    Explore Courses
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate("/chatbot")} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Ask the AI Tutor
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" onClick={() => navigate("/register")}>
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate("/login")} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop')] bg-center bg-cover opacity-20"></div>
      </div>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Key Features</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology with cybersecurity expertise to provide a comprehensive learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 flex flex-col items-center text-center hover-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      {(featuredCourses.length > 0 || loading) && (
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Button variant="outline" onClick={() => navigate("/courses")}>
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="loader" />
            </div>
          ) : (
            <CoursesList courses={featuredCourses} />
          )}
        </section>
      )}

      {/* Featured Quizzes Section */}
      {(featuredQuizzes.length > 0 || loading) && (
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Test Your Skills</h2>
            <Button variant="outline" onClick={() => navigate("/quizzes")}>
              View All Quizzes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="loader" />
            </div>
          ) : (
            <QuizList quizzes={featuredQuizzes} />
          )}
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="rounded-2xl bg-gradient-to-r from-cyber-dark to-cyber-purple p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to advance your cybersecurity skills?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join our platform today and get access to expert-led courses, hands-on tools, and AI-powered learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <>
                  <Button size="lg" onClick={() => navigate("/courses")}>
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" onClick={() => navigate("/register")}>
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate("/login")} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2069&auto=format&fit=crop')] bg-center bg-cover opacity-20"></div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
