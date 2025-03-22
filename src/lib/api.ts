import { Course, Quiz, User, UserProgress, Tool, ChatMessage } from "./types";

// Mock user data
const mockUser: User = {
  id: "user-1",
  email: "test@example.com",
  name: "Test User",
  username: "testuser",
  avatarUrl: "https://avatars.githubusercontent.com/u/7289795?v=4",
  createdAt: new Date(),
  progress: {
    completedCourses: [],
    completedQuizzes: [],
    loginStreak: 5,
    lastLogin: new Date(),
    points: 150,
    level: 2,
    title: "Beginner",
  },
};

// Mock quizzes data
const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Network Security Basics",
    description: "Test your knowledge of fundamental network security concepts.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-464ef50ce906?q=80&w=2070&auto=format&fit=crop",
    category: "Network Security",
    difficulty: "beginner",
    questions: [
      {
        id: "1-1",
        question: "What does the acronym 'CIA' stand for in the context of security?",
        options: ["Confidentiality, Integrity, Availability", "Control, Inspect, Audit", "Certify, Identify, Authorize", "Classify, Isolate, Archive"],
        correctAnswer: 0,
        explanation: "The CIA triad represents the core principles of information security.",
      },
    ],
  },
  {
    id: "2",
    title: "Ethical Hacking Techniques",
    description: "Challenge your understanding of ethical hacking methodologies.",
    imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2069&auto=format&fit=crop",
    category: "Ethical Hacking",
    difficulty: "intermediate",
    questions: [
      {
        id: "2-1",
        question: "Which of the following is a common method for gathering information about a target network?",
        options: ["SQL Injection", "Port Scanning", "Cross-Site Scripting", "Denial of Service"],
        correctAnswer: 1,
        explanation: "Port scanning is used to discover open ports and services on a network.",
      },
    ],
  },
];

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Cybersecurity",
    description: "Learn the fundamentals of cybersecurity, including basic terminology, common threats, and essential security practices.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    difficulty: "beginner",
    topics: [
      {
        id: "1-1",
        title: "Cybersecurity Fundamentals",
        content: "This topic covers the basic concepts and principles of cybersecurity, including the CIA triad (Confidentiality, Integrity, Availability), threat actors, and common vulnerabilities.",
        resources: [
          {
            title: "NIST Cybersecurity Framework",
            url: "https://www.nist.gov/cyberframework",
            type: "article"
          }
        ]
      }
    ],
    category: "Fundamentals",
    estimatedTime: "4 hours"
  },
  {
    id: "2",
    title: "Network Security Essentials",
    description: "Explore the principles of securing networks, including firewall configuration, intrusion detection, and secure network architectures.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    difficulty: "intermediate",
    topics: [
      {
        id: "2-1",
        title: "Firewall Implementation",
        content: "Learn how to configure and manage firewalls to protect network boundaries and control traffic flow based on security policies.",
        resources: [
          {
            title: "Firewall Best Practices",
            url: "https://www.cisco.com/c/en/us/support/docs/security/asa-5500-x-series-firewalls/200191-Security-Best-Practices-for-the-ASA.html",
            type: "article"
          }
        ]
      }
    ],
    category: "Network Security",
    estimatedTime: "6 hours"
  },
  {
    id: "3",
    title: "Ethical Hacking Fundamentals",
    description: "Learn ethical hacking methodologies and techniques to identify vulnerabilities in systems and networks.",
    imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2069&auto=format&fit=crop",
    difficulty: "advanced",
    topics: [
      {
        id: "3-1",
        title: "Reconnaissance Techniques",
        content: "Discover methods for gathering information about target systems and networks as the first phase of ethical hacking.",
        resources: [
          {
            title: "OSINT Framework",
            url: "https://osintframework.com/",
            type: "tool"
          }
        ]
      }
    ],
    category: "Ethical Hacking",
    estimatedTime: "8 hours"
  },
  {
    id: "4",
    title: "Secure Coding Practices",
    description: "Master the art of writing secure code that is resistant to common vulnerabilities like injection attacks, XSS, and CSRF.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    difficulty: "intermediate",
    topics: [
      {
        id: "4-1",
        title: "Input Validation",
        content: "Learn techniques for properly validating user input to prevent injection attacks and other security vulnerabilities.",
        resources: [
          {
            title: "OWASP Input Validation Cheat Sheet",
            url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html",
            type: "article"
          }
        ]
      }
    ],
    category: "Application Security",
    estimatedTime: "7 hours"
  },
  {
    id: "5",
    title: "Cloud Security Fundamentals",
    description: "Understand the security challenges and solutions specific to cloud environments, including AWS, Azure, and GCP.",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
    difficulty: "intermediate",
    topics: [
      {
        id: "5-1",
        title: "Cloud Security Models",
        content: "Explore the shared responsibility model and understand the security considerations for IaaS, PaaS, and SaaS cloud services.",
        resources: [
          {
            title: "Cloud Security Alliance",
            url: "https://cloudsecurityalliance.org/",
            type: "article"
          }
        ]
      }
    ],
    category: "Cloud Security",
    estimatedTime: "6 hours"
  },
  {
    id: "6",
    title: "Mobile Application Security",
    description: "Learn to identify and mitigate security threats specific to mobile applications on iOS and Android platforms.",
    imageUrl: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=2624&auto=format&fit=crop",
    difficulty: "advanced",
    topics: [
      {
        id: "6-1",
        title: "Mobile App Vulnerabilities",
        content: "Identify common security vulnerabilities in mobile applications and understand mitigation strategies.",
        resources: [
          {
            title: "OWASP Mobile Top 10",
            url: "https://owasp.org/www-project-mobile-top-10/",
            type: "article"
          }
        ]
      }
    ],
    category: "Mobile Security",
    estimatedTime: "7 hours"
  },
  {
    id: "7",
    title: "Cryptography for Cybersecurity",
    description: "Understand modern cryptographic algorithms and protocols and learn how to implement them correctly.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    difficulty: "intermediate",
    topics: [
      {
        id: "7-1",
        title: "Cryptographic Fundamentals",
        content: "Learn about symmetric and asymmetric encryption, hash functions, and their applications in cybersecurity.",
        resources: [
          {
            title: "Cryptography 101",
            url: "https://www.tutorialspoint.com/cryptography/index.htm",
            type: "article"
          }
        ]
      }
    ],
    category: "Cryptography",
    estimatedTime: "8 hours"
  },
  {
    id: "8",
    title: "Social Engineering Defense",
    description: "Learn to recognize and defend against social engineering attacks that target human psychology rather than technical vulnerabilities.",
    imageUrl: "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?q=80&w=2074&auto=format&fit=crop",
    difficulty: "beginner",
    topics: [
      {
        id: "8-1",
        title: "Phishing Attack Prevention",
        content: "Understand how to identify phishing attempts and implement organizational controls to prevent successful attacks.",
        resources: [
          {
            title: "Anti-Phishing Training",
            url: "https://www.phishing.org/phishing-resources",
            type: "article"
          }
        ]
      }
    ],
    category: "Human Security",
    estimatedTime: "4 hours"
  },
  {
    id: "9",
    title: "Security Operations Center (SOC)",
    description: "Learn the principles and practices of building and operating an effective security operations center.",
    imageUrl: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=2233&auto=format&fit=crop",
    difficulty: "advanced",
    topics: [
      {
        id: "9-1",
        title: "SOC Architecture and Tools",
        content: "Explore the essential components, tools, and technologies used in modern Security Operations Centers.",
        resources: [
          {
            title: "SOC Fundamentals",
            url: "https://www.sans.org/reading-room/whitepapers/analyst/building-maintaining-security-operations-center-35907",
            type: "article"
          }
        ]
      }
    ],
    category: "Security Operations",
    estimatedTime: "10 hours"
  },
  {
    id: "10",
    title: "IoT Security Challenges",
    description: "Understand the unique security challenges posed by Internet of Things devices and learn mitigation strategies.",
    imageUrl: "https://images.unsplash.com/photo-1558346489-22990b33b48b?q=80&w=2070&auto=format&fit=crop",
    difficulty: "intermediate",
    topics: [
      {
        id: "10-1",
        title: "IoT Vulnerabilities",
        content: "Identify common security vulnerabilities in IoT devices and understand the implications for organizational security.",
        resources: [
          {
            title: "OWASP IoT Top 10",
            url: "https://owasp.org/www-project-internet-of-things/",
            type: "article"
          }
        ]
      }
    ],
    category: "IoT Security",
    estimatedTime: "6 hours"
  }
];

// Mock tools data
const mockTools: Tool[] = [
  {
    id: "1",
    title: "Password Strength Analyzer",
    description: "Check the strength of your passwords and learn how to create more secure ones.",
    type: "password",
    component: "PasswordAnalyzer"
  },
  {
    id: "2",
    title: "Phishing URL Detector",
    description: "Analyze URLs to identify potential phishing attempts and learn how to spot them.",
    type: "phishing",
    component: "PhishingDetector"
  },
  {
    id: "3",
    title: "Encryption Playground",
    description: "Experiment with different encryption techniques to understand how they protect data.",
    type: "encryption",
    component: "EncryptionPlayground"
  }
];

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (email === "test@example.com" && password === "password") {
        return Promise.resolve(mockUser);
      } else {
        throw new Error("Invalid credentials");
      }
    },
    register: async (email: string, password: string, username: string): Promise<User> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        email,
        name: username,
        username,
        avatarUrl: null,
        createdAt: new Date(),
        progress: {
          completedCourses: [],
          completedQuizzes: [],
          loginStreak: 0,
          lastLogin: new Date(),
          points: 0,
          level: 1,
          title: "Newbie",
        },
      };
      return Promise.resolve(newUser);
    },
    logout: async (): Promise<void> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return Promise.resolve();
    },
  },
  courses: {
    getAll: async (): Promise<Course[]> => {
      return Promise.resolve(mockCourses);
    },
    getById: async (id: string): Promise<Course | undefined> => {
      return Promise.resolve(mockCourses.find((course) => course.id === id));
    },
  },
  quizzes: {
    getAll: async (): Promise<Quiz[]> => {
      return Promise.resolve(mockQuizzes);
    },
    getById: async (id: string): Promise<Quiz | undefined> => {
      return Promise.resolve(mockQuizzes.find((quiz) => quiz.id === id));
    },
    submitQuiz: async (quizId: string, answers: number[], userId: string): Promise<{
      score: number;
      passed: boolean;
      feedback: string[];
    }> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const quiz = mockQuizzes.find(q => q.id === quizId);
      
      if (!quiz) {
        throw new Error("Quiz not found");
      }
      
      const feedbackArray: string[] = [];
      let correctAnswers = 0;
      
      quiz.questions.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        if (isCorrect) {
          correctAnswers++;
          feedbackArray.push(`Question ${index + 1}: Correct! ${question.explanation}`);
        } else {
          feedbackArray.push(`Question ${index + 1}: Incorrect. The correct answer was "${question.options[question.correctAnswer]}". ${question.explanation}`);
        }
      });
      
      const score = (correctAnswers / quiz.questions.length) * 100;
      const passed = score >= 80; // 80% passing threshold
      
      return {
        score,
        passed,
        feedback: feedbackArray
      };
    }
  },
  progress: {
    get: async (userId: string): Promise<UserProgress> => {
      // Simulate fetching user progress
      await new Promise((resolve) => setTimeout(resolve, 500));
      return Promise.resolve(mockUser.progress);
    },
    update: async (userId: string, updates: Partial<UserProgress>): Promise<UserProgress> => {
      // Simulate updating user progress
      await new Promise((resolve) => setTimeout(resolve, 500));
      mockUser.progress = { ...mockUser.progress, ...updates };
      return Promise.resolve(mockUser.progress);
    },
  },
  tools: {
    getAll: async (): Promise<Tool[]> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return Promise.resolve(mockTools);
    },
    getById: async (id: string): Promise<Tool | undefined> => {
      return Promise.resolve(mockTools.find((tool) => tool.id === id));
    }
  },
  chatbot: {
    sendMessage: async (message: string, previousMessages: ChatMessage[]): Promise<string> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simple mock responses based on message content
      if (message.toLowerCase().includes("password")) {
        return "Strong passwords are critical in cybersecurity. Use a mix of uppercase and lowercase letters, numbers, and special characters. Aim for at least 12 characters and avoid using personal information or common words.";
      } else if (message.toLowerCase().includes("phishing")) {
        return "Phishing attacks try to trick you into revealing sensitive information. Always verify the sender's email address, be suspicious of urgent requests, check for spelling errors, and never click on suspicious links. Instead, go directly to the official website by typing the URL yourself.";
      } else if (message.toLowerCase().includes("encryption")) {
        return "Encryption is the process of converting data into a code to prevent unauthorized access. Common encryption types include symmetric encryption (using one key) and asymmetric encryption (using public and private keys). HTTPS, VPNs, and encrypted messaging apps all use encryption to protect your data.";
      } else if (message.toLowerCase().includes("network")) {
        return "Network security involves practices designed to protect the integrity, confidentiality, and accessibility of computer networks and data. This includes technologies like firewalls, intrusion detection systems, VPNs, and security protocols. Regular audits and updates are essential for maintaining network security.";
      } else {
        return "That's an interesting cybersecurity question. In this field, continuous learning is essential as threats and technologies evolve rapidly. Consider exploring official resources like NIST, OWASP, or taking courses in specific areas you're interested in to deepen your knowledge.";
      }
    }
  }
};
