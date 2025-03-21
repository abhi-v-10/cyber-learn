
import { Course, Quiz, User } from "@/lib/types";

// Mock API functions
export const api = {
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser: User = {
        id: "1",
        email: email,
        name: "John Doe",
        createdAt: new Date(),
        progress: {
          level: 1,
          points: 0,
          title: "Beginner",
          completedCourses: [],
          completedQuizzes: [],
          loginStreak: 1,
          lastLogin: new Date(),
        },
      };

      return mockUser;
    },
    register: async (email: string, password: string, name: string): Promise<User> => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser: User = {
        id: "1",
        email: email,
        name: name,
        createdAt: new Date(),
        progress: {
          level: 1,
          points: 0,
          title: "Beginner",
          completedCourses: [],
          completedQuizzes: [],
          loginStreak: 1,
          lastLogin: new Date(),
        },
      };

      return mockUser;
    },
    logout: async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    getCurrentUser: (): User | null => {
      return null;
    },
    updateUserProgress: async (progress: any): Promise<User> => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser: User = {
        id: "1",
        email: "john.doe@example.com",
        name: "John Doe",
        createdAt: new Date(),
        progress: {
          level: 1,
          points: progress.points || 0,
          title: "Beginner",
          completedCourses: progress.completedCourses || [],
          completedQuizzes: progress.completedQuizzes || [],
          loginStreak: progress.loginStreak || 1,
          lastLogin: new Date(),
        },
      };

      return mockUser;
    },
  },
  courses: {
    getAllCourses: async (): Promise<Course[]> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return COURSES_DATA;
    },
    getCourseById: async (id: string): Promise<Course | undefined> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return COURSES_DATA.find((course) => course.id === id);
    },
    // Add alias functions for component compatibility
    getAll: async (): Promise<Course[]> => {
      return api.courses.getAllCourses();
    },
    getById: async (id: string): Promise<Course | undefined> => {
      return api.courses.getCourseById(id);
    }
  },
  quizzes: {
    getAllQuizzes: async (): Promise<Quiz[]> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return QUIZZES_DATA;
    },
    getQuizById: async (id: string): Promise<Quiz | undefined> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return QUIZZES_DATA.find((quiz) => quiz.id === id);
    },
    submitQuiz: async (quizId: string, selectedAnswers: number[], userId: string): Promise<{ score: number; passed: boolean; feedback: string[] }> => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const quiz = QUIZZES_DATA.find(q => q.id === quizId);
      if (!quiz) {
        throw new Error("Quiz not found");
      }

      let correctAnswers = 0;
      const feedback: string[] = [];

      for (let i = 0; i < quiz.questions.length; i++) {
        const question = quiz.questions[i];
        const correctAnswerIndex = question.correctAnswer;
        const selectedAnswer = selectedAnswers[i];

        if (selectedAnswer === correctAnswerIndex) {
          correctAnswers++;
          feedback.push(`${question.question}: Correct!`);
        } else {
          feedback.push(`${question.question}: Incorrect. The correct answer was ${question.options[correctAnswerIndex]}.`);
        }
      }

      const score = (correctAnswers / quiz.questions.length) * 100;
      const passed = score >= 80;

      return {
        score: score,
        passed: passed,
        feedback: feedback,
      };
    },
    // Add alias functions for component compatibility
    getAll: async (): Promise<Quiz[]> => {
      return api.quizzes.getAllQuizzes();
    },
    getById: async (id: string): Promise<Quiz | undefined> => {
      return api.quizzes.getQuizById(id);
    }
  },
  chatbot: {
    sendMessage: async (message: string, history: any[]): Promise<string> => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return `This is a mock response to your message: "${message}". In a real implementation, this would connect to an AI service using your API key.`;
    }
  }
};

// Mock types
type CourseDifficulty = "beginner" | "intermediate" | "advanced";
type QuizDifficulty = "beginner" | "intermediate" | "advanced";

// Mock courses data
const COURSES_DATA: Course[] = [
  {
    id: "1",
    title: "Introduction to Cybersecurity",
    description: "Learn the fundamentals of cybersecurity and best practices to protect your digital assets.",
    imageUrl: "/placeholder.svg",
    difficulty: "beginner",
    category: "Security Basics",
    estimatedTime: "3 hours",
    topics: [
      { id: "1-1", title: "What is Cybersecurity?", content: "Introduction to cybersecurity concepts", imageUrl: "/placeholder.svg" },
      { id: "1-2", title: "Common Threats", content: "Overview of common cybersecurity threats", imageUrl: "/placeholder.svg" },
      { id: "1-3", title: "Best Practices", content: "Cybersecurity best practices", imageUrl: "/placeholder.svg" },
    ]
  },
  {
    id: "2",
    title: "Network Security",
    description: "Explore network security concepts, protocols, and tools to protect your network infrastructure.",
    imageUrl: "/placeholder.svg",
    difficulty: "intermediate",
    category: "Network Security",
    estimatedTime: "5 hours",
    topics: [
      { id: "2-1", title: "Network Architecture", content: "Understanding network architecture", imageUrl: "/placeholder.svg" },
      { id: "2-2", title: "Firewalls and Intrusion Detection", content: "Working with firewalls and IDS", imageUrl: "/placeholder.svg" },
      { id: "2-3", title: "VPNs and Encryption", content: "VPN technologies and encryption methods", imageUrl: "/placeholder.svg" },
    ]
  },
  {
    id: "3",
    title: "Ethical Hacking",
    description: "Discover the world of ethical hacking and penetration testing to identify vulnerabilities in systems.",
    imageUrl: "/placeholder.svg",
    difficulty: "advanced",
    category: "Offensive Security",
    estimatedTime: "7 hours",
    topics: [
      { id: "3-1", title: "Reconnaissance and Scanning", content: "Information gathering techniques", imageUrl: "/placeholder.svg" },
      { id: "3-2", title: "Exploitation Techniques", content: "Common exploitation methods", imageUrl: "/placeholder.svg" },
      { id: "3-3", title: "Reporting and Remediation", content: "Creating security reports", imageUrl: "/placeholder.svg" },
    ]
  },
];

// Mock quizzes data
const QUIZZES_DATA: Quiz[] = [
  {
    id: "1",
    title: "Cybersecurity Fundamentals Quiz",
    description: "Test your knowledge on basic cybersecurity concepts and best practices.",
    imageUrl: "/placeholder.svg",
    category: "Security Basics",
    difficulty: "beginner",
    questions: [
      {
        id: "q1-1",
        question: "What is the primary goal of cybersecurity?",
        options: [
          "To disrupt network communications",
          "To protect digital assets and data",
          "To create malicious software",
          "To monitor user activity",
        ],
        correctAnswer: 1,
        explanation: "The primary goal of cybersecurity is to protect digital assets and data from threats."
      },
      {
        id: "q1-2",
        question: "Which of the following is a common type of cyber threat?",
        options: ["Antivirus", "Firewall", "Malware", "Encryption"],
        correctAnswer: 2,
        explanation: "Malware is a common type of cyber threat, while the others are security tools or methods."
      },
      {
        id: "q1-3",
        question: "What does the acronym 'CIA' stand for in cybersecurity?",
        options: [
          "Confidentiality, Integrity, Availability",
          "Central Intelligence Agency",
          "Cybersecurity Intelligence Agency",
          "Critical Information Asset",
        ],
        correctAnswer: 0,
        explanation: "In cybersecurity, CIA stands for Confidentiality, Integrity, and Availability, which are the three main principles."
      },
    ]
  },
  {
    id: "2",
    title: "Network Security Quiz",
    description: "Test your knowledge on network security concepts, protocols, and tools.",
    imageUrl: "/placeholder.svg",
    category: "Network Security",
    difficulty: "intermediate",
    questions: [
      {
        id: "q2-1",
        question: "What is a firewall?",
        options: [
          "A tool for monitoring network traffic",
          "A security system that controls network access",
          "A type of encryption",
          "A method for creating virtual networks",
        ],
        correctAnswer: 1,
        explanation: "A firewall is a security system that controls network access based on predetermined rules."
      },
      {
        id: "q2-2",
        question: "Which protocol is commonly used for secure communication over the internet?",
        options: ["HTTP", "FTP", "SMTP", "HTTPS"],
        correctAnswer: 3,
        explanation: "HTTPS (HTTP Secure) is used for secure communication over the internet."
      },
      {
        id: "q2-3",
        question: "What is a VPN?",
        options: [
          "Virtual Private Network",
          "Very Personal Network",
          "Video Processing Network",
          "Voice over IP Network",
        ],
        correctAnswer: 0,
        explanation: "VPN stands for Virtual Private Network, which creates a secure connection over public networks."
      },
    ]
  },
  {
    id: "3",
    title: "Ethical Hacking Quiz",
    description: "Test your knowledge on ethical hacking and penetration testing techniques.",
    imageUrl: "/placeholder.svg",
    category: "Offensive Security",
    difficulty: "advanced",
    questions: [
      {
        id: "q3-1",
        question: "What is reconnaissance in ethical hacking?",
        options: [
          "Exploiting system vulnerabilities",
          "Gathering information about a target",
          "Creating malicious software",
          "Securing network communications",
        ],
        correctAnswer: 1,
        explanation: "Reconnaissance is the process of gathering information about a target before attempting any exploitation."
      },
      {
        id: "q3-2",
        question: "Which of the following is a common vulnerability scanning tool?",
        options: ["Wireshark", "Nmap", "Metasploit", "John the Ripper"],
        correctAnswer: 1,
        explanation: "Nmap is a network scanner commonly used for vulnerability scanning."
      },
      {
        id: "q3-3",
        question: "What is the purpose of penetration testing?",
        options: [
          "To identify and exploit vulnerabilities",
          "To secure network infrastructure",
          "To monitor user activity",
          "To create secure passwords",
        ],
        correctAnswer: 0,
        explanation: "The purpose of penetration testing is to identify and exploit vulnerabilities to assess security."
      },
    ]
  },
];
