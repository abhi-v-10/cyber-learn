
export const APP_NAME = "CyberEdu";

export const USER_TITLES = [
  "Cyber Novice",
  "Security Apprentice",
  "Digital Defender",
  "Network Guardian",
  "Encryption Expert",
  "Threat Hunter",
  "Forensic Analyst",
  "Security Architect",
  "Incident Commander",
  "Cyber Oracle"
];

export const COURSE_CATEGORIES = [
  "Network Security",
  "Web Security",
  "Mobile Security",
  "Cloud Security",
  "Cryptography",
  "Ethical Hacking",
  "Social Engineering",
  "Incident Response",
  "Security Governance",
  "Privacy & Compliance"
];

export const QUIZ_CATEGORIES = [
  "Network Security",
  "Web Security",
  "Mobile Security",
  "Cloud Security",
  "Cryptography",
  "Ethical Hacking",
  "Social Engineering",
  "Incident Response",
  "Security Governance",
  "Privacy & Compliance"
];

export const mockCourses = [
  {
    id: "network-security-fundamentals",
    title: "Network Security Fundamentals",
    description: "Learn the core concepts of protecting networks from unauthorized access and attacks.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    difficulty: "beginner",
    category: "Network Security",
    estimatedTime: "6 hours",
    topics: [
      {
        id: "network-basics",
        title: "Network Basics",
        content: `
# Network Basics

Networks are the foundation of modern computing and communication systems. Understanding how they work is essential for cybersecurity professionals.

## Network Architecture

A computer network is a collection of computers and devices connected together to facilitate communication and resource sharing. The basic components include:

- **Hosts**: End devices like computers, servers, and IoT devices
- **Network devices**: Routers, switches, firewalls, and access points
- **Media**: The physical or wireless pathways for data transmission
- **Protocols**: Rules that govern communication between devices

## Network Models

The two primary models for understanding network communications are:

### OSI Model (7 layers)
1. Physical Layer
2. Data Link Layer
3. Network Layer
4. Transport Layer
5. Session Layer
6. Presentation Layer
7. Application Layer

### TCP/IP Model (4 layers)
1. Network Interface Layer
2. Internet Layer
3. Transport Layer
4. Application Layer

## Common Network Protocols

- **TCP (Transmission Control Protocol)**: Connection-oriented, reliable delivery
- **UDP (User Datagram Protocol)**: Connectionless, faster but unreliable
- **IP (Internet Protocol)**: Addressing and routing
- **HTTP/HTTPS**: Web browsing
- **DNS (Domain Name System)**: Name resolution
- **DHCP (Dynamic Host Configuration Protocol)**: IP address assignment

## Network Security Principles

1. **Defense in Depth**: Multiple layers of security controls
2. **Least Privilege**: Minimal access rights necessary for functionality
3. **Segmentation**: Dividing networks into isolated zones
4. **Encryption**: Protecting data confidentiality during transmission
5. **Authentication**: Verifying identity before granting access
        `,
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: "common-network-threats",
        title: "Common Network Threats",
        content: `
# Common Network Threats

Networks face numerous threats that cybersecurity professionals must understand and mitigate. This section covers the most prevalent network security threats.

## Man-in-the-Middle (MitM) Attacks

In MitM attacks, attackers position themselves between two communicating parties to eavesdrop or modify the communication. Common techniques include:

- **ARP Poisoning**: Manipulating the Address Resolution Protocol to redirect traffic
- **DNS Spoofing**: Corrupting DNS server data to redirect users to malicious websites
- **Session Hijacking**: Taking over authenticated sessions by stealing session tokens

## Denial of Service (DoS) and Distributed Denial of Service (DDoS)

These attacks aim to make network resources unavailable by overwhelming them with traffic:

- **Volumetric Attacks**: Flooding the network with bandwidth-consuming traffic
- **Protocol Attacks**: Exploiting weaknesses in network protocols
- **Application Layer Attacks**: Targeting specific applications or services

## Packet Sniffing

Packet sniffing involves capturing and inspecting data packets traveling across a network:

- **Passive Sniffing**: Only observing traffic
- **Active Sniffing**: Manipulating traffic to capture more data
- **Wireless Sniffing**: Capturing data from wireless networks

## Port Scanning and Vulnerability Scanning

Attackers use scanning techniques to identify potential entry points:

- **Port Scanning**: Probing network ports to identify services running
- **Vulnerability Scanning**: Looking for known vulnerabilities in network services
- **Banner Grabbing**: Collecting information about services and their versions

## Network Intrusion

Once vulnerabilities are identified, attackers may attempt to penetrate the network:

- **Exploitation**: Using known vulnerabilities to gain unauthorized access
- **Privilege Escalation**: Expanding access rights after initial penetration
- **Persistence**: Establishing methods to maintain access over time

## Prevention and Detection Strategies

1. **Firewalls**: Filter network traffic based on security rules
2. **Intrusion Detection Systems (IDS)**: Monitor networks for suspicious activity
3. **Intrusion Prevention Systems (IPS)**: Actively block detected threats
4. **Network Monitoring**: Continuous observation of network traffic patterns
5. **Security Information and Event Management (SIEM)**: Centralized security event monitoring

## Incident Response

When a network security incident occurs, organizations should follow a structured response process:

1. **Preparation**: Having tools and procedures ready
2. **Detection**: Identifying potential security incidents
3. **Containment**: Limiting the impact of the incident
4. **Eradication**: Removing the threat from the environment
5. **Recovery**: Restoring systems to normal operation
6. **Lessons Learned**: Analyzing the incident to improve future security
        `,
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "ethical-hacking-basics",
    title: "Ethical Hacking Basics",
    description: "Learn the fundamentals of ethical hacking and penetration testing methodologies.",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
    difficulty: "intermediate",
    category: "Ethical Hacking",
    estimatedTime: "8 hours",
    topics: [
      {
        id: "ethical-hacking-intro",
        title: "Introduction to Ethical Hacking",
        content: `
# Introduction to Ethical Hacking

Ethical hacking involves legally breaking into computers and devices to test an organization's defenses. It's among the most exciting IT fields today, and the perfect career for those who enjoy creative problem-solving and continuous learning.

## What is Ethical Hacking?

Ethical hacking is the practice of attempting to penetrate systems and networks to discover security vulnerabilities that malicious hackers could exploit. Unlike criminal hackers, ethical hackers:

- Have permission from the system owner
- Report all vulnerabilities discovered
- Help strengthen security posture
- Operate within legal boundaries
- Follow a code of ethics

## Types of Hackers

Hackers are typically categorized by their intentions:

- **White Hat Hackers**: Ethical hackers who help improve security
- **Black Hat Hackers**: Malicious hackers with criminal intent
- **Gray Hat Hackers**: Those who may violate laws but without malicious intent
- **Blue Team**: Defensive security professionals
- **Red Team**: Offensive security professionals who simulate attacks
- **Purple Team**: Combines both red and blue team functions

## The Ethical Hacking Process

A structured approach to ethical hacking typically includes these phases:

1. **Reconnaissance**: Gathering information about the target
2. **Scanning**: Identifying open ports, services, and vulnerabilities
3. **Gaining Access**: Exploiting vulnerabilities to penetrate systems
4. **Maintaining Access**: Establishing persistence
5. **Covering Tracks**: Removing evidence of penetration (in real attacks)
6. **Reporting**: Documenting findings and recommendations

## Legal and Ethical Considerations

Ethical hackers must always:

- Obtain proper written authorization before testing
- Respect privacy and data confidentiality
- Avoid disrupting or damaging systems
- Report all security issues discovered
- Follow the scope defined in the agreement
- Adhere to legal requirements and regulations

## Essential Skills for Ethical Hackers

Becoming an effective ethical hacker requires knowledge in:

- **Networking**: Understanding protocols, routing, and network architecture
- **Operating Systems**: Proficiency in Windows, Linux, macOS
- **Programming**: Scripting abilities in Python, Bash, PowerShell
- **Web Technologies**: Understanding of HTTP, APIs, web applications
- **Database Systems**: SQL knowledge and database architectures
- **Cryptography**: Understanding encryption and its implementations

## Common Ethical Hacking Tools

Ethical hackers utilize various tools, including:

- **Kali Linux**: A specialized Linux distribution for penetration testing
- **Metasploit**: Exploitation framework
- **Wireshark**: Network protocol analyzer
- **Nmap**: Network scanner
- **Burp Suite**: Web application security testing
- **John the Ripper**: Password cracker
- **OWASP ZAP**: Web application vulnerability scanner

## Getting Started with Ethical Hacking

To begin your journey in ethical hacking:

1. Build strong fundamentals in networking and system administration
2. Learn programming basics, particularly Python and Bash
3. Set up a home lab for practice
4. Study security concepts and certifications like CompTIA Security+
5. Practice on legal platforms like HackTheBox, TryHackMe, or VulnHub
6. Consider specialized certifications like CEH or OSCP
        `,
        imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2069&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "cryptography-essentials",
    title: "Cryptography Essentials",
    description: "Understand the principles of modern cryptography and how to implement secure systems.",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
    difficulty: "intermediate",
    category: "Cryptography",
    estimatedTime: "7 hours",
    topics: []
  },
  {
    id: "web-application-security",
    title: "Web Application Security",
    description: "Learn to identify and exploit common web vulnerabilities and how to protect against them.",
    imageUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop",
    difficulty: "intermediate",
    category: "Web Security",
    estimatedTime: "8 hours",
    topics: []
  },
  {
    id: "social-engineering",
    title: "Social Engineering Tactics",
    description: "Understand the psychological techniques used to manipulate users and how to defend against them.",
    imageUrl: "https://images.unsplash.com/photo-1573497701240-345a300b8d36?q=80&w=2070&auto=format&fit=crop",
    difficulty: "beginner",
    category: "Social Engineering",
    estimatedTime: "5 hours",
    topics: []
  },
  {
    id: "cloud-security",
    title: "Cloud Security",
    description: "Learn security principles and best practices for major cloud platforms.",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
    difficulty: "advanced",
    category: "Cloud Security",
    estimatedTime: "9 hours",
    topics: []
  }
];

export const mockQuizzes = [
  {
    id: "network-security-quiz",
    title: "Network Security Fundamentals",
    description: "Test your knowledge of network security concepts and protocols.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    category: "Network Security",
    difficulty: "beginner",
    questions: [
      {
        id: "q1",
        question: "Which of the following is NOT a common network security threat?",
        options: [
          "Man-in-the-middle attack",
          "SQL injection",
          "ARP poisoning",
          "Quantum entanglement"
        ],
        correctAnswer: 3,
        explanation: "Quantum entanglement is a physics concept, not a network security threat. The other options are valid network security threats."
      },
      {
        id: "q2",
        question: "What is the purpose of a firewall in network security?",
        options: [
          "To encrypt network traffic",
          "To filter network traffic based on predetermined security rules",
          "To accelerate network performance",
          "To compress data for faster transmission"
        ],
        correctAnswer: 1,
        explanation: "Firewalls are security devices that monitor and filter incoming and outgoing network traffic based on predetermined security rules."
      },
      {
        id: "q3",
        question: "Which protocol operates at the transport layer and provides reliable, connection-oriented data delivery?",
        options: [
          "HTTP",
          "IP",
          "TCP",
          "ICMP"
        ],
        correctAnswer: 2,
        explanation: "TCP (Transmission Control Protocol) operates at the transport layer and provides reliable, connection-oriented data delivery."
      },
      {
        id: "q4",
        question: "What type of attack aims to make a service unavailable by overwhelming it with traffic?",
        options: [
          "Phishing attack",
          "SQL injection",
          "DNS spoofing",
          "Denial of Service (DoS) attack"
        ],
        correctAnswer: 3,
        explanation: "A Denial of Service (DoS) attack aims to make a service unavailable by overwhelming it with traffic or resource requests."
      },
      {
        id: "q5",
        question: "Which security principle involves providing users with only the minimum levels of access needed to perform their job functions?",
        options: [
          "Defense in depth",
          "Least privilege",
          "Separation of duties",
          "Security by obscurity"
        ],
        correctAnswer: 1,
        explanation: "The principle of least privilege involves providing users with only the minimum levels of access needed to perform their job functions."
      },
      {
        id: "q6",
        question: "What is the purpose of network segmentation in cybersecurity?",
        options: [
          "To increase network speed",
          "To reduce hardware costs",
          "To contain breaches and limit lateral movement",
          "To simplify network management"
        ],
        correctAnswer: 2,
        explanation: "Network segmentation is used to divide a network into isolated segments to contain breaches and limit lateral movement of attackers."
      },
      {
        id: "q7",
        question: "Which of the following is a type of network-based intrusion detection system?",
        options: [
          "Firewall",
          "Antivirus",
          "Snort",
          "VPN"
        ],
        correctAnswer: 2,
        explanation: "Snort is a popular network-based intrusion detection system that monitors network traffic for suspicious activity."
      },
      {
        id: "q8",
        question: "What does ARP spoofing allow an attacker to do?",
        options: [
          "Encrypt network traffic",
          "Intercept network traffic between hosts",
          "Speed up network connections",
          "Scan for open ports"
        ],
        correctAnswer: 1,
        explanation: "ARP spoofing allows an attacker to intercept network traffic between hosts by associating their MAC address with the IP address of another host."
      },
      {
        id: "q9",
        question: "Which encryption protocol is considered insecure and should not be used for securing websites?",
        options: [
          "TLS 1.3",
          "SSH",
          "SSL 3.0",
          "IPsec"
        ],
        correctAnswer: 2,
        explanation: "SSL 3.0 is considered insecure due to vulnerabilities like POODLE and should not be used for securing websites."
      },
      {
        id: "q10",
        question: "What is the main function of a VPN in network security?",
        options: [
          "To block malicious websites",
          "To create a secure, encrypted connection over a less secure network",
          "To scan for network vulnerabilities",
          "To accelerate network traffic"
        ],
        correctAnswer: 1,
        explanation: "A VPN (Virtual Private Network) creates a secure, encrypted connection over a less secure network, such as the public internet."
      }
    ]
  },
  {
    id: "cryptography-quiz",
    title: "Cryptography Basics",
    description: "Test your understanding of cryptographic concepts and algorithms.",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
    category: "Cryptography",
    difficulty: "intermediate",
    questions: [
      {
        id: "q1",
        question: "Which of the following is a symmetric encryption algorithm?",
        options: [
          "RSA",
          "AES",
          "ECC",
          "Diffie-Hellman"
        ],
        correctAnswer: 1,
        explanation: "AES (Advanced Encryption Standard) is a symmetric encryption algorithm, meaning it uses the same key for both encryption and decryption."
      },
      {
        id: "q2",
        question: "What is the primary purpose of a hash function in cryptography?",
        options: [
          "To encrypt data",
          "To generate random numbers",
          "To create a fixed-size output from variable-size input data",
          "To exchange keys securely"
        ],
        correctAnswer: 2,
        explanation: "Hash functions create a fixed-size output (hash) from variable-size input data, primarily used for data integrity verification."
      },
      {
        id: "q3",
        question: "Which of the following is NOT a property of a secure cryptographic hash function?",
        options: [
          "Preimage resistance",
          "Second preimage resistance",
          "Collision resistance",
          "Reversibility"
        ],
        correctAnswer: 3,
        explanation: "Reversibility is NOT a property of secure hash functions. They should be one-way functions that cannot be reversed to reveal the original input."
      },
      {
        id: "q4",
        question: "What does the 'D' in 'DES' stand for?",
        options: [
          "Digital",
          "Dynamic",
          "Data",
          "Double"
        ],
        correctAnswer: 2,
        explanation: "DES stands for Data Encryption Standard, a symmetric-key algorithm for the encryption of digital data."
      },
      {
        id: "q5",
        question: "Which of the following is a common use of public key cryptography?",
        options: [
          "Password storage",
          "Bulk data encryption",
          "Digital signatures",
          "Stream encryption"
        ],
        correctAnswer: 2,
        explanation: "Digital signatures are a common application of public key cryptography, allowing verification of message authenticity and integrity."
      },
      {
        id: "q6",
        question: "What is a salt in the context of password hashing?",
        options: [
          "A type of encryption algorithm",
          "A random value added to the password before hashing",
          "A method to decrypt passwords",
          "A way to compress passwords"
        ],
        correctAnswer: 1,
        explanation: "A salt is a random value added to the password before hashing to ensure that identical passwords don't produce the same hash."
      },
      {
        id: "q7",
        question: "Which of the following best describes a man-in-the-middle attack in cryptography?",
        options: [
          "Brute-forcing encryption keys",
          "Intercepting and potentially altering communication between two parties",
          "Using quantum computers to break encryption",
          "Analyzing power consumption to determine encryption keys"
        ],
        correctAnswer: 1,
        explanation: "A man-in-the-middle attack involves intercepting and potentially altering communication between two parties who believe they are directly communicating with each other."
      },
      {
        id: "q8",
        question: "What is the primary advantage of asymmetric encryption over symmetric encryption?",
        options: [
          "It's generally faster",
          "It uses less computational resources",
          "It doesn't require a secure key exchange beforehand",
          "It produces smaller ciphertext"
        ],
        correctAnswer: 2,
        explanation: "The primary advantage of asymmetric encryption is that it doesn't require a secure key exchange beforehand, as the public key can be freely distributed."
      },
      {
        id: "q9",
        question: "Which of the following is NOT a common mode of operation for block ciphers?",
        options: [
          "ECB (Electronic Codebook)",
          "CBC (Cipher Block Chaining)",
          "RSA (Rivest-Shamir-Adleman)",
          "CTR (Counter)"
        ],
        correctAnswer: 2,
        explanation: "RSA is not a mode of operation for block ciphers; it's an asymmetric encryption algorithm. The others are all modes of operation for block ciphers."
      },
      {
        id: "q10",
        question: "What does TLS stand for?",
        options: [
          "Transport Layer Security",
          "Time Layer System",
          "Transfer Level Service",
          "Trusted Linking System"
        ],
        correctAnswer: 0,
        explanation: "TLS stands for Transport Layer Security, a cryptographic protocol designed to provide communications security over a computer network."
      }
    ]
  },
  {
    id: "web-security-quiz",
    title: "Web Application Security",
    description: "Test your knowledge of common web vulnerabilities and protection mechanisms.",
    imageUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop",
    category: "Web Security",
    difficulty: "intermediate",
    questions: [
      {
        id: "q1",
        question: "Which of the following is a common vulnerability where unsanitized user input is executed as code?",
        options: [
          "Brute force attack",
          "Cross-site scripting (XSS)",
          "Distributed Denial of Service (DDoS)",
          "Session hijacking"
        ],
        correctAnswer: 1,
        explanation: "Cross-site scripting (XSS) is a vulnerability where unsanitized user input is executed as code in a victim's browser."
      },
      {
        id: "q2",
        question: "What is SQL injection?",
        options: [
          "A technique to optimize database queries",
          "A method to backup SQL databases",
          "An attack that inserts malicious SQL code via input fields",
          "A tool for database administration"
        ],
        correctAnswer: 2,
        explanation: "SQL injection is an attack where malicious SQL code is inserted via input fields to manipulate a database."
      },
      {
        id: "q3",
        question: "Which security header helps prevent clickjacking attacks?",
        options: [
          "Content-Security-Policy",
          "X-XSS-Protection",
          "X-Frame-Options",
          "Strict-Transport-Security"
        ],
        correctAnswer: 2,
        explanation: "The X-Frame-Options header helps prevent clickjacking attacks by controlling whether a page can be embedded in frames."
      },
      {
        id: "q4",
        question: "What is CSRF?",
        options: [
          "Cross-Site Request Forgery",
          "Client-Side Resource Filtering",
          "Common Security Response Framework",
          "Cross-Site Reference Forging"
        ],
        correctAnswer: 0,
        explanation: "CSRF stands for Cross-Site Request Forgery, an attack that forces authenticated users to execute unwanted actions on a web application."
      },
      {
        id: "q5",
        question: "Which of the following is NOT a common web authentication method?",
        options: [
          "OAuth",
          "SAML",
          "JWT",
          "TCP"
        ],
        correctAnswer: 3,
        explanation: "TCP (Transmission Control Protocol) is not an authentication method; it's a core protocol for internet communication. The others are all authentication mechanisms."
      },
      {
        id: "q6",
        question: "What is the purpose of Content Security Policy (CSP)?",
        options: [
          "To encrypt web traffic",
          "To restrict which resources can be loaded by a page",
          "To compress web content for faster loading",
          "To validate user credentials"
        ],
        correctAnswer: 1,
        explanation: "Content Security Policy (CSP) restricts which resources (scripts, stylesheets, images, etc.) can be loaded by a page, helping to prevent XSS attacks."
      },
      {
        id: "q7",
        question: "Which of the following is a secure way to store user passwords?",
        options: [
          "Plain text",
          "Using reversible encryption",
          "Using a salted hash function",
          "Base64 encoding"
        ],
        correctAnswer: 2,
        explanation: "Using a salted hash function is a secure way to store passwords, as it's one-way and resistant to rainbow table attacks."
      },
      {
        id: "q8",
        question: "What is the Same-Origin Policy?",
        options: [
          "A policy requiring all web content to come from the same developer",
          "A security mechanism that restricts how documents or scripts from one origin interact with resources from another origin",
          "A legal framework for copyright protection on the web",
          "A browser setting that ensures all pages load at the same speed"
        ],
        correctAnswer: 1,
        explanation: "The Same-Origin Policy is a security mechanism that restricts how documents or scripts from one origin interact with resources from another origin."
      },
      {
        id: "q9",
        question: "Which of the following best describes a Web Application Firewall (WAF)?",
        options: [
          "A physical device that protects web servers from fire damage",
          "A security policy document for web development",
          "A filter that monitors HTTP traffic between a web application and the Internet",
          "A backup system for web content"
        ],
        correctAnswer: 2,
        explanation: "A Web Application Firewall (WAF) is a filter that monitors HTTP traffic between a web application and the Internet, blocking malicious traffic."
      },
      {
        id: "q10",
        question: "What does HTTPS provide that HTTP doesn't?",
        options: [
          "Faster page loading",
          "Better browser compatibility",
          "Encrypted communication",
          "Improved search engine ranking"
        ],
        correctAnswer: 2,
        explanation: "HTTPS provides encrypted communication between a client and server, protecting the data in transit from eavesdropping and tampering."
      }
    ]
  }
];

export const OPENAI_API_KEY = "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";
