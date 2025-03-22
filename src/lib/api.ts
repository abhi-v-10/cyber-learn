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
    title: "Rookie",
  },
};

// Create more extensive quiz data
const createBasicNetworkSecurityQuiz = (): Quiz => {
  return {
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
        explanation: "The CIA triad represents the core principles of information security: Confidentiality ensures data is accessible only to authorized users, Integrity ensures data remains accurate and unaltered, and Availability ensures systems are operational when needed.",
      },
      {
        id: "1-2",
        question: "Which of the following is NOT typically a function of a firewall?",
        options: ["Packet filtering", "Network address translation", "Data encryption", "Access control"],
        correctAnswer: 2,
        explanation: "Firewalls typically handle packet filtering, NAT, and access control, but data encryption is usually handled by separate protocols and services like SSL/TLS.",
      },
      {
        id: "1-3",
        question: "What type of attack involves sending a flood of traffic to overwhelm a system?",
        options: ["Man-in-the-middle attack", "SQL injection", "Denial of Service (DoS) attack", "Cross-site scripting"],
        correctAnswer: 2,
        explanation: "A Denial of Service (DoS) attack aims to make a system or network resource unavailable by flooding it with useless traffic.",
      },
      {
        id: "1-4",
        question: "What is the purpose of a VPN in network security?",
        options: ["To speed up internet connections", "To create a secure, encrypted connection over a less secure network", "To block all incoming traffic", "To compress data for faster transmission"],
        correctAnswer: 1,
        explanation: "A Virtual Private Network (VPN) creates an encrypted connection over a less secure network, providing secure access to resources and protecting data in transit.",
      },
      {
        id: "1-5",
        question: "Which protocol is used to securely access remote servers?",
        options: ["HTTP", "FTP", "SSH", "SMTP"],
        correctAnswer: 2,
        explanation: "Secure Shell (SSH) is a cryptographic network protocol used for secure data communication, remote command execution, and other secure services between two networked computers.",
      },
      {
        id: "1-6",
        question: "What is a subnet mask used for?",
        options: ["Hiding your IP address", "Filtering spam emails", "Dividing an IP network into subnetworks", "Encrypting network traffic"],
        correctAnswer: 2,
        explanation: "A subnet mask is used to divide an IP network into subnetworks by determining which part of the IP address is the network address and which part is the host address.",
      },
      {
        id: "1-7",
        question: "Which of the following is an example of a symmetric encryption algorithm?",
        options: ["RSA", "AES", "ECC", "Diffie-Hellman"],
        correctAnswer: 1,
        explanation: "Advanced Encryption Standard (AES) is a symmetric encryption algorithm that uses the same key for both encryption and decryption.",
      },
      {
        id: "1-8",
        question: "What is the purpose of an IDS (Intrusion Detection System) in network security?",
        options: ["To block unauthorized access", "To monitor and analyze network traffic for suspicious activity", "To encrypt data transmissions", "To optimize network performance"],
        correctAnswer: 1,
        explanation: "An Intrusion Detection System (IDS) monitors and analyzes network traffic to identify potential security breaches, vulnerabilities, and attacks against a network or system.",
      },
      {
        id: "1-9",
        question: "Which network layer does a standard firewall operate on in the OSI model?",
        options: ["Physical layer", "Network layer", "Transport layer", "Application layer"],
        correctAnswer: 2,
        explanation: "A standard firewall operates at the Transport layer (Layer 4) of the OSI model, filtering traffic based on TCP and UDP ports, though modern next-generation firewalls can operate at multiple layers.",
      },
      {
        id: "1-10",
        question: "What is the purpose of HTTPS?",
        options: ["To make websites load faster", "To compress web content", "To secure the data transmitted between a browser and a website", "To block malicious websites"],
        correctAnswer: 2,
        explanation: "HTTPS (HTTP Secure) encrypts the data transmitted between a browser and a website, providing authentication of the website and protecting the privacy and integrity of the data being exchanged.",
      }
    ],
  };
};

const createEthicalHackingQuiz = (): Quiz => {
  return {
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
        explanation: "Port scanning is used to discover open ports and services on a network, which is a fundamental reconnaissance technique in ethical hacking.",
      },
      {
        id: "2-2",
        question: "What is the purpose of a penetration test?",
        options: ["To find and exploit vulnerabilities in a system", "To permanently secure a system against all attacks", "To recover lost data", "To monitor network traffic"],
        correctAnswer: 0,
        explanation: "A penetration test (pentest) is an authorized simulated attack on a computer system to evaluate its security by identifying and potentially exploiting vulnerabilities.",
      },
      {
        id: "2-3",
        question: "Which tool is commonly used for network packet analysis?",
        options: ["Metasploit", "Nmap", "Wireshark", "John the Ripper"],
        correctAnswer: 2,
        explanation: "Wireshark is a widely-used network protocol analyzer that allows users to capture and interactively browse the traffic running on a computer network.",
      },
      {
        id: "2-4",
        question: "What type of testing involves having no prior knowledge of the target system?",
        options: ["White box testing", "Gray box testing", "Black box testing", "Integration testing"],
        correctAnswer: 2,
        explanation: "Black box testing is a method of software testing where the tester has no knowledge of the internal structure, design, or implementation of the target system.",
      },
      {
        id: "2-5",
        question: "Which of the following is a password cracking technique that tries all possible combinations?",
        options: ["Dictionary attack", "Brute force attack", "Rainbow table attack", "Phishing"],
        correctAnswer: 1,
        explanation: "A brute force attack attempts to crack passwords by systematically trying all possible combinations of characters until the correct one is found.",
      },
      {
        id: "2-6",
        question: "What is social engineering in the context of security?",
        options: ["Building secure social networks", "Using technology to improve social interactions", "Manipulating people into divulging confidential information", "Engineering solutions for social problems"],
        correctAnswer: 2,
        explanation: "Social engineering is the psychological manipulation of people into performing actions or divulging confidential information, exploiting human vulnerabilities rather than technical hacking techniques.",
      },
      {
        id: "2-7",
        question: "Which phase of ethical hacking involves maintaining access to the system?",
        options: ["Reconnaissance", "Scanning", "Gaining Access", "Maintaining Access"],
        correctAnswer: 3,
        explanation: "The Maintaining Access phase involves ensuring that future access to the compromised system is possible, often by installing backdoors or creating additional user accounts.",
      },
      {
        id: "2-8",
        question: "What is the purpose of the 'Nmap' tool in ethical hacking?",
        options: ["Password cracking", "Network mapping and port scanning", "Web application testing", "Wireless network hacking"],
        correctAnswer: 1,
        explanation: "Nmap (Network Mapper) is an open-source tool used for network discovery and security auditing, primarily for port scanning to identify available services on a network.",
      },
      {
        id: "2-9",
        question: "Which attack involves sending malicious requests from an authenticated user to a website?",
        options: ["SQL Injection", "Cross-Site Request Forgery (CSRF)", "Cross-Site Scripting (XSS)", "Command Injection"],
        correctAnswer: 1,
        explanation: "Cross-Site Request Forgery (CSRF) forces authenticated users to execute unwanted actions on web applications where they're currently authenticated, by sending malicious requests from the user's browser.",
      },
      {
        id: "2-10",
        question: "What is a zero-day vulnerability?",
        options: ["A vulnerability that exists for zero days", "A vulnerability that is known to the software vendor but not yet fixed", "A vulnerability that is unknown to the software vendor and has no available patches", "A vulnerability that cannot be exploited"],
        correctAnswer: 2,
        explanation: "A zero-day vulnerability is a software security flaw that is unknown to the vendor or developer and doesn't have a patch available, giving attackers the opportunity to exploit it before it can be fixed.",
      }
    ],
  };
};

const createWebSecurityQuiz = (): Quiz => {
  return {
    id: "3",
    title: "Web Application Security",
    description: "Test your knowledge of web application vulnerabilities and security best practices.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    category: "Application Security",
    difficulty: "intermediate",
    questions: [
      {
        id: "3-1",
        question: "What is SQL Injection?",
        options: [
          "A technique to optimize SQL database performance", 
          "A method to insert malicious SQL code into queries", 
          "A database backup procedure", 
          "A way to connect SQL databases to web applications"
        ],
        correctAnswer: 1,
        explanation: "SQL Injection is an attack where malicious SQL statements are inserted into entry fields of a web application, allowing attackers to manipulate databases, access or destroy data.",
      },
      {
        id: "3-2",
        question: "Which security header helps protect against Cross-Site Scripting (XSS)?",
        options: [
          "Content-Security-Policy", 
          "Strict-Transport-Security", 
          "X-Frame-Options", 
          "X-Content-Type-Options"
        ],
        correctAnswer: 0,
        explanation: "Content-Security-Policy (CSP) helps prevent XSS attacks by specifying which dynamic resources are allowed to load, limiting the browser's ability to execute malicious scripts.",
      },
      {
        id: "3-3",
        question: "What is CORS (Cross-Origin Resource Sharing)?",
        options: [
          "A vulnerability that allows unauthorized access", 
          "A mechanism that enables controlled access to resources outside a domain", 
          "A tool for testing web applications", 
          "A type of authentication system"
        ],
        correctAnswer: 1,
        explanation: "CORS is a security feature implemented by browsers that allows servers to specify which origins can access their resources, controlling cross-origin HTTP requests.",
      },
      {
        id: "3-4",
        question: "Which of the following is NOT a common web application vulnerability from the OWASP Top 10?",
        options: [
          "Broken Access Control", 
          "Cryptographic Failures", 
          "Memory Buffer Overflow", 
          "Injection"
        ],
        correctAnswer: 2,
        explanation: "Memory Buffer Overflow is primarily a systems-level vulnerability rather than a web application vulnerability, and it's not in the OWASP Top 10 for web applications.",
      },
      {
        id: "3-5",
        question: "What is the purpose of HTTPS?",
        options: [
          "To encrypt cookies only", 
          "To encrypt all data transmitted between client and server", 
          "To make websites load faster", 
          "To prevent SQL injection attacks"
        ],
        correctAnswer: 1,
        explanation: "HTTPS encrypts all data exchanged between client and server, protecting sensitive information from eavesdropping and tampering during transmission.",
      },
      {
        id: "3-6",
        question: "Which of the following best describes CSRF (Cross-Site Request Forgery)?",
        options: [
          "Injecting malicious scripts into web pages", 
          "Tricking users into executing unwanted actions on a website they're authenticated to", 
          "Stealing session cookies through XSS", 
          "Attacking a database through SQL queries"
        ],
        correctAnswer: 1,
        explanation: "CSRF tricks authenticated users into performing unwanted actions on a web application without their knowledge, by exploiting the trust the application has in the user's browser.",
      },
      {
        id: "3-7",
        question: "Which practice helps protect against Session Hijacking?",
        options: [
          "Using HTTP instead of HTTPS", 
          "Storing session IDs in URL parameters", 
          "Implementing secure cookies with the HttpOnly flag", 
          "Keeping sessions valid indefinitely"
        ],
        correctAnswer: 2,
        explanation: "The HttpOnly flag on cookies prevents client-side scripts from accessing the session cookie, which helps protect against session hijacking via XSS attacks.",
      },
      {
        id: "3-8",
        question: "What is a Web Application Firewall (WAF)?",
        options: [
          "A physical device that protects web servers", 
          "A software or hardware solution that monitors and filters HTTP traffic", 
          "A type of antivirus for websites", 
          "A tool for backing up web applications"
        ],
        correctAnswer: 1,
        explanation: "A WAF monitors, filters, and blocks HTTP traffic to and from a web application, protecting against various attacks like XSS, CSRF, and SQL injection.",
      },
      {
        id: "3-9",
        question: "What is the Same-Origin Policy?",
        options: [
          "A policy requiring all website content to come from the same developer", 
          "A browser security mechanism that restricts how documents or scripts from one origin interact with resources from another origin", 
          "A law requiring websites to disclose their country of origin", 
          "A design principle stating websites should maintain consistent styling"
        ],
        correctAnswer: 1,
        explanation: "The Same-Origin Policy is a critical security mechanism implemented by browsers that restricts how documents or scripts from one origin can interact with resources from another origin, preventing malicious websites from accessing sensitive data.",
      },
      {
        id: "3-10",
        question: "Which authentication method is generally considered the most secure?",
        options: [
          "Basic authentication", 
          "Single-factor authentication", 
          "Multi-factor authentication", 
          "Digest authentication"
        ],
        correctAnswer: 2,
        explanation: "Multi-factor authentication combines two or more independent credentials (something you know, something you have, something you are), making it significantly more secure than single-factor methods.",
      }
    ],
  };
};

const mockQuizzes: Quiz[] = [
  createBasicNetworkSecurityQuiz(),
  createEthicalHackingQuiz(),
  createWebSecurityQuiz(),
];

// Enhance mock courses with detailed study materials
const enhanceCourseWithDetailedMaterials = (course: Course): Course => {
  return {
    ...course,
    topics: course.topics.map(topic => ({
      ...topic,
      importantNotes: [
        {
          title: "Critical Security Concept",
          content: `Remember that ${topic.title} is fundamental to building secure systems. Always consider the security implications before implementing any solution.`,
          type: "warning"
        },
        {
          title: "Industry Best Practice",
          content: "Leading organizations implement this by following the principle of least privilege and regular security audits.",
          type: "info"
        }
      ],
      studyMaterials: `
## Detailed Study Guide: ${topic.title}

### Overview
This section provides an in-depth exploration of ${topic.title} concepts, methodologies, and real-world applications. Take your time to thoroughly understand these principles as they form the foundation of many advanced cybersecurity practices.

### Key Concepts

1. **Fundamental Principles**
   - The core theories underlying ${topic.title}
   - Historical development and evolution
   - Current state-of-the-art approaches

2. **Implementation Strategies**
   - Step-by-step procedures for implementing secure solutions
   - Common pitfalls to avoid
   - Verification and validation techniques

3. **Case Studies**
   - Analysis of major security incidents related to ${topic.title}
   - Lessons learned from industry failures
   - Success stories and their contributing factors

### Advanced Topics

- Mathematical foundations of related cryptographic methods
- Regulatory compliance considerations
- Future trends and emerging research directions

### Practical Application

Understanding how to apply these concepts in real-world scenarios is critical. Consider how you would implement these security measures in systems of varying scales and complexity levels.

---

> "Security is a process, not a product." - Bruce Schneier

Remember to regularly revisit these materials as the field of cybersecurity evolves rapidly.
      `,
      practiceQuestions: [
        {
          question: `What is the primary purpose of ${topic.title} in a modern security framework?`,
          answer: "To establish a robust defense mechanism that protects sensitive data while allowing legitimate operations to proceed efficiently."
        },
        {
          question: `How does ${topic.title} relate to the CIA triad?`,
          answer: "It primarily supports the Confidentiality and Integrity aspects by ensuring that only authorized users can access and modify critical information."
        },
        {
          question: `In a high-security environment, how would you implement ${topic.title}?`,
          answer: "Implementation would involve a defense-in-depth approach with multiple layers of security controls, regular auditing, and continuous monitoring for anomalies."
        }
      ]
    }))
  };
};

// Make sure the mock courses data has the correct difficulty types
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Cybersecurity",
    description: "Learn the fundamentals of cybersecurity, including basic terminology, common threats, and essential security practices.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    difficulty: "beginner" as const,
    topics: [
      {
        id: "1-1",
        title: "Cybersecurity Fundamentals",
        content: "This topic covers the basic concepts and principles of cybersecurity, including the CIA triad (Confidentiality, Integrity, Availability), threat actors, and common vulnerabilities.",
        resources: [
          {
            title: "NIST Cybersecurity Framework",
            url: "https://www.nist.gov/cyberframework",
            type: "article" as const
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
    difficulty: "intermediate" as const,
    topics: [
      {
        id: "2-1",
        title: "Firewall Implementation",
        content: "Learn how to configure and manage firewalls to protect network boundaries and control traffic flow based on security policies.",
        resources: [
          {
            title: "Firewall Best Practices",
            url: "https://www.cisco.com/c/en/us/support/docs/security/asa-5500-x-series-firewalls/200191-Security-Best-Practices-for-the-ASA.html",
            type: "article" as const
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
    difficulty: "advanced" as const,
    topics: [
      {
        id: "3-1",
        title: "Reconnaissance Techniques",
        content: "Discover methods for gathering information about target systems and networks as the first phase of ethical hacking.",
        resources: [
          {
            title: "OSINT Framework",
            url: "https://osintframework.com/",
            type: "tool" as const
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
    difficulty: "intermediate" as const,
    topics: [
      {
        id: "4-1",
        title: "Input Validation",
        content: "Learn techniques for properly validating user input to prevent injection attacks and other security vulnerabilities.",
        resources: [
          {
            title: "OWASP Input Validation Cheat Sheet",
            url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html",
            type: "article" as const
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
    difficulty: "intermediate" as const,
    topics: [
      {
        id: "5-1",
        title: "Cloud Security Models",
        content: "Explore the shared responsibility model and understand the security considerations for IaaS, PaaS, and SaaS cloud services.",
        resources: [
          {
            title: "Cloud Security Alliance",
            url: "https://cloudsecurityalliance.org/",
            type: "article" as const
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
    difficulty: "advanced" as const,
    topics: [
      {
        id: "6-1",
        title: "Mobile App Vulnerabilities",
        content: "Identify common security vulnerabilities in mobile applications and understand mitigation strategies.",
        resources: [
          {
            title: "OWASP Mobile Top 10",
            url: "https://owasp.org/www-project-mobile-top-10/",
            type: "article" as const
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
    difficulty: "intermediate" as const,
    topics: [
      {
        id: "7-1",
        title: "Cryptographic Fundamentals",
        content: "Learn about symmetric and asymmetric encryption, hash functions, and their applications in cybersecurity.",
        resources: [
          {
            title: "Cryptography 101",
            url: "https://www.tutorialspoint.com/cryptography/index.htm",
            type: "article" as const
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
    difficulty: "beginner" as const,
    topics: [
      {
        id: "8-1",
        title: "Phishing Attack Prevention",
        content: "Understand how to identify phishing attempts and implement organizational controls to prevent successful attacks.",
        resources: [
          {
            title: "Anti-Phishing Training",
            url: "https://www.phishing.org/phishing-resources",
            type: "article" as const
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
    difficulty: "advanced" as const,
    topics: [
      {
        id: "9-1",
        title: "SOC Architecture and Tools",
        content: "Explore the essential components, tools, and technologies used in modern Security Operations Centers.",
        resources: [
          {
            title: "SOC Fundamentals",
            url: "https://www.sans.org/reading-room/whitepapers/analyst/building-maintaining-security-operations-center-35907",
            type: "article" as const
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
    difficulty: "intermediate" as const,
    topics: [
      {
        id: "10-1",
        title: "IoT Vulnerabilities",
        content: "Identify common security vulnerabilities in IoT devices and understand the implications for organizational security.",
        resources: [
          {
            title: "OWASP IoT Top 10",
            url: "https://owasp.org/www-project-internet-of-things/",
            type: "article" as const
          }
        ]
      }
    ],
    category: "IoT Security",
    estimatedTime: "6 hours"
  }
].map(enhanceCourseWithDetailedMaterials);

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
      
      // Check if this is a new day login to update streak
      const now = new Date();
      const lastLogin = new Date(mockUser.progress.lastLogin);
      
      // Reset streak if more than 48 hours have passed since last login
      if ((now.getTime() - lastLogin.getTime()) > 48 * 60 * 60 * 1000) {
        mockUser.progress.loginStreak = 1;
      }
      // Increase streak if it's been between 24-48 hours since last login
      else if ((now.getTime() - lastLogin.getTime()) > 24 * 60 * 60 * 1000) {
        mockUser.progress.loginStreak += 1;
      }
      
      // Update last login time
      mockUser.progress.lastLogin = now;
      
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
          loginStreak: 1,
          lastLogin: new Date(),
          points: 0,
          level: 1,
          title: "Rookie",
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
      incorrectAnswers: {
        questionIndex: number;
        userAnswer: number;
        correctAnswer: number;
        explanation: string;
      }[];
    }> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const quiz = mockQuizzes.find(q => q.id === quizId);
      
      if (!quiz) {
        throw new Error("Quiz not found");
      }
      
      const feedbackArray: string[] = [];
      let correctAnswers = 0;
      const incorrectAnswers = [];
      
      quiz.questions.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        if (isCorrect) {
          correctAnswers++;
          feedbackArray.push(`Question ${index + 1}: Correct! ${question.explanation}`);
        } else {
          feedbackArray.push(`Question ${index + 1}: Incorrect. The correct answer was "${question.options[question.correctAnswer]}". ${question.explanation}`);
          incorrectAnswers.push({
            questionIndex: index,
            userAnswer: userAnswer,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation
          });
        }
      });
      
      const score = (correctAnswers / quiz.questions.length) * 100;
      const passed = score >= 80; // 80% passing threshold
      
      return {
        score,
        passed,
        feedback: feedbackArray,
        incorrectAnswers
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
      // Using mock responses since we're replacing this with the Gemini API in the frontend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      return "This is a mock response that shouldn't be used. The chatbot is now implemented with Gemini API directly in the frontend.";
    }
  }
};
