
import { ChatMessage, Course, Quiz, User, UserProgress } from "./types";
import { mockCourses, mockQuizzes, OPENAI_API_KEY } from "./constants";

// Simulate an API with localStorage persistence
export const api = {
  // Auth functions
  auth: {
    register: async (email: string, password: string, name: string): Promise<User> => {
      // Check if user exists
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      if (existingUsers.find((u: any) => u.email === email)) {
        throw new Error("User already exists");
      }

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        createdAt: new Date(),
        progress: {
          completedCourses: [],
          completedQuizzes: [],
          loginStreak: 1,
          lastLogin: new Date(),
          points: 0,
          level: 1,
          title: "Cyber Novice"
        }
      };

      // Save user
      localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      return newUser;
    },

    login: async (email: string, password: string): Promise<User> => {
      // In a real app, we would validate the password
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === email);

      if (!user) {
        throw new Error("Invalid credentials");
      }

      // Update login streak
      const lastLogin = new Date(user.progress.lastLogin);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lastLogin.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        user.progress.loginStreak += 1;
      } else if (diffDays > 1) {
        user.progress.loginStreak = 1;
      }

      user.progress.lastLogin = today;

      // Update user
      localStorage.setItem("users", JSON.stringify(users.map((u: any) => 
        u.id === user.id ? user : u
      )));
      localStorage.setItem("currentUser", JSON.stringify(user));

      return user;
    },

    logout: async (): Promise<void> => {
      localStorage.removeItem("currentUser");
    },

    getCurrentUser: (): User | null => {
      const userStr = localStorage.getItem("currentUser");
      if (!userStr) return null;
      
      try {
        const user = JSON.parse(userStr);
        // Ensure dates are Date objects
        user.createdAt = new Date(user.createdAt);
        user.progress.lastLogin = new Date(user.progress.lastLogin);
        return user;
      } catch (error) {
        console.error("Error parsing user", error);
        return null;
      }
    },

    updateUserProgress: async (progress: Partial<UserProgress>): Promise<User> => {
      const currentUser = api.auth.getCurrentUser();
      if (!currentUser) {
        throw new Error("Not authenticated");
      }

      const updatedUser = {
        ...currentUser,
        progress: {
          ...currentUser.progress,
          ...progress
        }
      };

      // Update in users array
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      localStorage.setItem("users", JSON.stringify(users.map((u: any) => 
        u.id === currentUser.id ? updatedUser : u
      )));

      // Update current user
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      return updatedUser;
    }
  },

  // Course functions
  courses: {
    getAll: async (): Promise<Course[]> => {
      // In a real app, this would fetch from an API
      return mockCourses;
    },

    getById: async (id: string): Promise<Course | undefined> => {
      return mockCourses.find(course => course.id === id);
    },

    getRecommended: async (userId: string): Promise<Course[]> => {
      // In a real app, this would use AI to recommend courses based on user progress
      return mockCourses.slice(0, 3);
    }
  },

  // Quiz functions
  quizzes: {
    getAll: async (): Promise<Quiz[]> => {
      return mockQuizzes;
    },

    getById: async (id: string): Promise<Quiz | undefined> => {
      return mockQuizzes.find(quiz => quiz.id === id);
    },

    submitQuiz: async (quizId: string, answers: number[], userId: string): Promise<{
      score: number;
      passed: boolean;
      feedback: string[];
    }> => {
      const quiz = await api.quizzes.getById(quizId);
      if (!quiz) {
        throw new Error("Quiz not found");
      }

      // Calculate score
      let correctCount = 0;
      const feedback: string[] = [];

      quiz.questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          correctCount++;
          feedback.push(`Question ${index + 1}: Correct! ${question.explanation}`);
        } else {
          feedback.push(`Question ${index + 1}: Incorrect. ${question.explanation}`);
        }
      });

      const score = (correctCount / quiz.questions.length) * 100;
      const passed = score >= 80; // 8 out of 10 questions correct

      // If passed, update user progress
      if (passed) {
        const currentUser = api.auth.getCurrentUser();
        if (currentUser) {
          const completedQuizzes = currentUser.progress.completedQuizzes || [];
          if (!completedQuizzes.includes(quizId)) {
            await api.auth.updateUserProgress({
              completedQuizzes: [...completedQuizzes, quizId],
              points: currentUser.progress.points + 10
            });
            
            // Check for title updates
            const totalQuizzesPassed = completedQuizzes.length + 1;
            if (totalQuizzesPassed % 25 === 0) {
              const newLevel = Math.floor(totalQuizzesPassed / 25) + 1;
              await api.auth.updateUserProgress({
                level: newLevel,
                title: `Level ${newLevel} Expert`
              });
            }
          }
        }
      }

      return {
        score,
        passed,
        feedback
      };
    }
  },

  // AI Chatbot functions
  chatbot: {
    sendMessage: async (message: string, chatHistory: ChatMessage[]): Promise<string> => {
      try {
        // Format conversation history for OpenAI
        const messages = [
          {
            role: "system",
            content: "You are a helpful cybersecurity and education tutor. Provide accurate, concise answers to questions about cybersecurity concepts, ethical hacking, network security, cryptography, and related educational topics."
          },
          ...chatHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: "user",
            content: message
          }
        ];

        // Call OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Failed to get response from AI");
        }

        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        console.error("Error calling OpenAI API:", error);
        return "I'm having trouble connecting right now. Please try again later.";
      }
    }
  }
};

// Initialize with some fake users if empty
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}
