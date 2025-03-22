
import { Course, Quiz, User, Tool } from "@/lib/types";

// Mock API functions
export const api = {
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser: User = {
        id: "1",
        email: email,
        name: "John Doe",
        username: "johndoe", // Added username property
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
        username: email.split('@')[0], // Added username using part of email
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
        username: "johndoe", // Added username
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
  },
  tools: {
    getAllTools: async (): Promise<Tool[]> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return TOOLS_DATA;
    },
    getToolById: async (id: string): Promise<Tool | undefined> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return TOOLS_DATA.find((tool) => tool.id === id);
    },
    // Add alias functions for component compatibility
    getAll: async (): Promise<Tool[]> => {
      return api.tools.getAllTools();
    },
    getById: async (id: string): Promise<Tool | undefined> => {
      return api.tools.getToolById(id);
    }
  }
};

// Mock courses data
const COURSES_DATA: Course[] = [
  {
    id: "1",
    title: "Introduction to Cybersecurity",
    description: "Learn the fundamentals of cybersecurity and best practices to protect your digital assets.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    difficulty: "beginner",
    category: "Security Basics",
    estimatedTime: "3 hours",
    topics: [
      { 
        id: "1-1", 
        title: "What is Cybersecurity?", 
        content: `# What is Cybersecurity?
        
Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.

## Core Principles of Cybersecurity

### Confidentiality
Ensuring that sensitive information is accessed only by authorized individuals.

### Integrity
Maintaining the accuracy and trustworthiness of data throughout its lifecycle.

### Availability
Ensuring systems and data are accessible to authorized users when needed.

## The Importance of Cybersecurity

In today's interconnected world, the importance of cybersecurity cannot be overstated. Here's why:

1. **Data Protection**: Organizations collect and store vast amounts of data, including sensitive customer information.
2. **Financial Security**: Cyber attacks can lead to financial loss through theft, business disruption, or recovery costs.
3. **Reputation**: A security breach can damage an organization's reputation and erode customer trust.
4. **Regulatory Compliance**: Many industries have regulations requiring specific security measures.

## Common Cybersecurity Threats

- **Malware**: Software designed to cause harm (viruses, worms, trojans)
- **Phishing**: Deceptive attempts to steal sensitive information
- **Ransomware**: Malware that encrypts files until a ransom is paid
- **Social Engineering**: Manipulating people into breaking security procedures
- **DDoS Attacks**: Overwhelming a system with traffic to make it unavailable
- **Zero-day Exploits**: Attacks on previously unknown vulnerabilities

Understanding these fundamentals is the first step in developing a comprehensive cybersecurity strategy.`,
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
      },
      { 
        id: "1-2", 
        title: "Common Threats", 
        content: `# Common Cybersecurity Threats
        
Understanding the landscape of cybersecurity threats is essential for building effective defenses. This section covers the most prevalent threats that individuals and organizations face today.

## Malware

Malware (malicious software) is any program or file that is harmful to a computer user.

### Types of Malware

1. **Viruses**: Self-replicating programs that attach to clean files and spread throughout a computer system
2. **Worms**: Standalone malware that replicates itself to spread to other computers
3. **Trojans**: Malware disguised as legitimate software
4. **Spyware**: Software that secretly monitors user activity
5. **Adware**: Software that automatically displays or downloads advertising material
6. **Ransomware**: Malware that encrypts files, with the attacker demanding a ransom to restore access

## Phishing Attacks

Phishing is a type of social engineering attack often used to steal user data, including login credentials and credit card numbers.

### Common Phishing Techniques

- **Email Phishing**: Sending fraudulent emails that appear to come from legitimate sources
- **Spear Phishing**: Targeted emails to specific individuals, often containing personal information
- **Whaling**: Phishing attacks targeting high-profile executives
- **Vishing**: Phishing conducted via voice communication (phone)
- **Smishing**: Phishing conducted via SMS text messages

### Signs of a Phishing Attempt

- Urgent call to action
- Requests for personal information
- Suspicious or mismatched URLs
- Poor spelling and grammar
- Unexpected attachments

## Social Engineering

Social engineering is the psychological manipulation of people into performing actions or divulging confidential information.

### Common Techniques

- **Pretexting**: Creating a fabricated scenario to extract information
- **Baiting**: Offering something enticing to an unsuspecting victim to lure them into a trap
- **Quid Pro Quo**: Offering a service or benefit in exchange for information or access
- **Tailgating**: Following someone into a secured area or system

## Advanced Persistent Threats (APTs)

APTs are prolonged and targeted cyberattacks in which an attacker infiltrates a network and remains undetected for an extended period.

### Characteristics of APTs

- Sophisticated techniques
- Stealthy and continuous process
- Long-term access to the target
- Usually sponsored by nation-states or organized crime

## Zero-Day Exploits

A zero-day exploit targets a previously unknown vulnerability in software or hardware, giving developers zero days to address the vulnerability before it's exploited.

Being aware of these threats is the first step toward protection. The next sections will cover strategies and best practices to mitigate these risks.`,
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
      },
      { 
        id: "1-3", 
        title: "Best Practices", 
        content: `# Cybersecurity Best Practices
        
Implementing strong cybersecurity measures requires a multi-layered approach. This section outlines essential practices for individuals and organizations to enhance their security posture.

## For Individuals

### Password Management

- Use strong, unique passwords for each account
- Consider using a password manager
- Enable two-factor authentication (2FA) whenever possible
- Change passwords regularly, especially after a breach

### Safe Browsing

- Keep browsers and operating systems updated
- Use HTTPS connections when available
- Be cautious when downloading files or clicking links
- Consider using a VPN for public Wi-Fi connections

### Email Security

- Be skeptical of unexpected emails
- Don't click links or download attachments from unknown sources
- Verify sender addresses carefully
- Use email filtering and spam protection

### Device Security

- Keep all software and operating systems updated
- Use antivirus/anti-malware software
- Enable device encryption
- Secure your home network with strong passwords and WPA3

## For Organizations

### Security Policies and Procedures

- Develop comprehensive security policies
- Implement the principle of least privilege
- Establish incident response procedures
- Conduct regular security audits

### Employee Training

- Provide regular security awareness training
- Conduct simulated phishing exercises
- Establish clear security protocols
- Create a culture of security awareness

### Technical Controls

- Implement firewalls and intrusion detection systems
- Use endpoint protection platforms
- Deploy network segmentation
- Conduct regular vulnerability scanning and penetration testing

### Data Protection

- Classify data based on sensitivity
- Implement encryption for sensitive data
- Establish secure backup procedures
- Develop a data breach response plan

### Third-Party Risk Management

- Assess vendor security practices
- Include security requirements in contracts
- Regularly review third-party access
- Limit vendor access to necessary systems only

## Emerging Best Practices

### Zero Trust Model

"Never trust, always verify" - Treat all users and requests as potential threats and verify everything.

### Security Automation

Implement automated security solutions to reduce human error and increase response time.

### Risk-Based Security

Allocate security resources based on risk assessment rather than treating all assets equally.

### Continuous Monitoring

Implement real-time monitoring to detect and respond to threats as they occur.

By implementing these best practices, individuals and organizations can significantly reduce their cybersecurity risk. Remember that security is an ongoing process that requires constant vigilance and adaptation to new threats.`,
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
      },
    ]
  },
  {
    id: "2",
    title: "Network Security",
    description: "Explore network security concepts, protocols, and tools to protect your network infrastructure.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    difficulty: "intermediate",
    category: "Network Security",
    estimatedTime: "5 hours",
    topics: [
      { 
        id: "2-1", 
        title: "Network Architecture", 
        content: `# Network Architecture and Security
        
Understanding network architecture is fundamental to implementing effective security measures. This section explores the components of network infrastructure and how to secure them.

## Network Infrastructure Components

### Physical Layer

- **Cabling**: Fiber optic, ethernet, coaxial
- **Network Interface Cards (NICs)**: Connect devices to the network
- **Hubs and Repeaters**: Extend network signals

### Data Link Layer

- **Switches**: Connect devices within the same network
- **Bridges**: Connect separate network segments
- **VLANs**: Virtual Local Area Networks for logical network segmentation

### Network Layer

- **Routers**: Connect different networks and direct traffic
- **Firewalls**: Filter traffic based on predefined security rules
- **Load Balancers**: Distribute network traffic across multiple servers

### Transport and Application Layers

- **Gateways**: Connect dissimilar networks
- **Proxies**: Intermediaries between clients and servers
- **Application Delivery Controllers**: Optimize application performance and security

## Network Segmentation

Network segmentation divides a network into multiple segments or subnets, each acting as its own small network.

### Benefits of Segmentation

- Limits the scope of breaches
- Improves performance by reducing network congestion
- Simplifies management and troubleshooting
- Enables more granular security controls

### Segmentation Approaches

- **Physical Segmentation**: Using separate physical devices
- **Logical Segmentation**: Using VLANs or subnetting
- **Micro-segmentation**: Fine-grained segmentation typically implemented in software
- **Zero Trust Segmentation**: Based on the principle of never trust, always verify

## Securing Network Components

### Router Security

- Change default credentials
- Update firmware regularly
- Disable unnecessary services
- Implement access control lists (ACLs)
- Enable logging and monitoring

### Switch Security

- Disable unused ports
- Implement port security to limit MAC addresses
- Use private VLANs to restrict traffic between ports
- Configure BPDU guard to prevent spanning tree attacks
- Implement DHCP snooping to prevent rogue DHCP servers

### Wireless Network Security

- Use WPA3 encryption
- Change default SSIDs and passwords
- Enable MAC address filtering
- Implement network segmentation for guest networks
- Conduct regular wireless surveys to detect rogue access points

## Defense-in-Depth Strategy

A layered approach to network security provides multiple barriers to attackers.

### Perimeter Security

- **Firewalls**: Control traffic entering and leaving the network
- **Intrusion Prevention Systems (IPS)**: Detect and block known attacks
- **Web Application Firewalls (WAF)**: Protect web applications from specific attacks
- **DDoS Protection**: Mitigate distributed denial-of-service attacks

### Internal Network Security

- **Network Access Control (NAC)**: Control device access to the network
- **Internal Firewalls**: Segment internal networks
- **Data Loss Prevention (DLP)**: Prevent unauthorized data exfiltration
- **Endpoint Protection**: Secure individual devices on the network

### Monitoring and Response

- **Security Information and Event Management (SIEM)**: Collect and analyze security events
- **Network Traffic Analysis (NTA)**: Detect anomalous behavior
- **Security Orchestration, Automation, and Response (SOAR)**: Streamline security operations
- **Incident Response Plan**: Procedures for addressing security incidents

By understanding network architecture and implementing appropriate security measures at each layer, organizations can create a robust defense against an ever-evolving threat landscape.`,
        imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
      },
      { 
        id: "2-2", 
        title: "Firewalls and Intrusion Detection", 
        content: `# Firewalls and Intrusion Detection Systems
        
Firewalls and intrusion detection systems (IDS) are essential components of a comprehensive network security strategy. This section explores these technologies, their types, and best practices for implementation.

## Firewalls

A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on predefined security rules.

### Types of Firewalls

#### 1. Packet Filtering Firewalls
- Examine packets and enforce control based on:
  - Source and destination IP addresses
  - Source and destination ports
  - Protocols
- Advantages: Fast, transparent to users
- Limitations: Limited application awareness, vulnerable to spoofing

#### 2. Stateful Inspection Firewalls
- Track the state of active connections
- Make decisions based on context rather than examining packets in isolation
- Advantages: More secure than packet filtering, better handling of TCP/IP protocols
- Limitations: Resource-intensive, limited application awareness

#### 3. Application Layer Firewalls (Proxy Firewalls)
- Operate at the application layer of the OSI model
- Can understand certain applications and protocols (HTTP, FTP, etc.)
- Advantages: Deep inspection, content filtering, user authentication
- Limitations: Performance impact, may require client configuration

#### 4. Next-Generation Firewalls (NGFW)
- Combine traditional firewall capabilities with:
  - Intrusion prevention
  - Application awareness and control
  - User identity integration
  - Threat intelligence
- Advantages: Comprehensive protection, contextual awareness
- Limitations: Cost, complexity, performance considerations

### Firewall Deployment Strategies

#### Network Firewall
- Deployed at network perimeter
- Protects the entire network from external threats

#### Host-Based Firewall
- Installed on individual systems
- Provides protection regardless of network location

#### Internal Segmentation Firewall
- Deployed within the network
- Limits lateral movement if perimeter is breached

## Intrusion Detection and Prevention Systems

### Intrusion Detection Systems (IDS)
- Monitor network traffic for suspicious activity
- Alert administrators when potential threats are detected
- **Does not** actively block threats

### Intrusion Prevention Systems (IPS)
- Monitors network traffic like an IDS
- Actively blocks or prevents detected threats
- Can automatically respond to attacks

### Detection Methods

#### 1. Signature-Based Detection
- Compares activity against known attack patterns
- Effective against known threats
- Limitations: Cannot detect zero-day attacks or variants

#### 2. Anomaly-Based Detection
- Establishes a baseline of normal behavior
- Alerts on deviations from normal patterns
- Advantages: Can detect unknown threats
- Limitations: Prone to false positives

#### 3. Behavior-Based Detection
- Analyzes behavior patterns of users and systems
- Identifies abnormal activities
- Advantages: Adaptive to evolving threats
- Limitations: Resource-intensive, learning period required

#### 4. Heuristic-Based Detection
- Uses rules or algorithms to identify suspicious activity
- Based on past experience and known attack strategies
- Advantages: Can detect variants of known attacks
- Limitations: Potential for false positives

### IDS/IPS Deployment Options

#### 1. Network-Based (NIDS/NIPS)
- Monitors traffic on network segments or key points
- Advantages: Broad coverage, no impact on hosts
- Limitations: Cannot inspect encrypted traffic, blind to host-based attacks

#### 2. Host-Based (HIDS/HIPS)
- Installed on specific hosts to monitor activities
- Advantages: Can detect local attacks, inspect encrypted traffic
- Limitations: Resource impact on host, must be installed on each system

## Best Practices

### Firewall Implementation
- Implement a default deny policy
- Document all firewall rules with justifications
- Regularly audit and clean up rules
- Use the principle of least privilege
- Implement change management procedures

### IDS/IPS Implementation
- Position sensors strategically
- Tune systems to reduce false positives
- Regularly update signatures and detection methods
- Integrate with security information and event management (SIEM)
- Develop response procedures for alerts

### Maintenance and Operations
- Regularly update and patch all security systems
- Monitor performance impacts
- Conduct regular rule reviews
- Test configurations after changes
- Maintain detailed documentation

By implementing robust firewall and intrusion detection/prevention systems, organizations can significantly enhance their security posture and protect against a wide range of network-based threats.`,
        imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
      },
      { 
        id: "2-3", 
        title: "VPNs and Encryption", 
        content: `# VPNs and Encryption in Network Security
        
Virtual Private Networks (VPNs) and encryption are critical technologies for securing data as it travels across networks. This section covers the fundamentals of these technologies and their implementation in network security.

## Encryption Fundamentals

Encryption is the process of converting information into a code to prevent unauthorized access.

### Key Concepts

#### 1. Plaintext and Ciphertext
- **Plaintext**: Original, readable data
- **Ciphertext**: Encrypted, unreadable version of the data

#### 2. Encryption Keys
- **Encryption Key**: Value that determines the output of an encryption algorithm
- **Key Length**: Longer keys generally provide stronger security

#### 3. Cryptographic Algorithms
- Mathematical functions used to perform encryption and decryption

### Types of Encryption

#### 1. Symmetric Encryption
- Uses the same key for both encryption and decryption
- Examples: AES, DES, 3DES, Blowfish
- Advantages: Fast, efficient for large data sets
- Limitations: Key distribution challenges

#### 2. Asymmetric Encryption (Public Key)
- Uses a pair of keys: public (for encryption) and private (for decryption)
- Examples: RSA, ECC, DSA
- Advantages: Solves key distribution problem, enables digital signatures
- Limitations: Slower than symmetric encryption, resource-intensive

#### 3. Hybrid Encryption
- Combines symmetric and asymmetric methods
- Typically uses asymmetric encryption to securely exchange a symmetric key
- Advantages: Security of asymmetric with the performance of symmetric
- Common in many secure protocols (TLS, SSH, etc.)

### Cryptographic Hash Functions
- One-way functions that produce a fixed-size output
- Used for data integrity verification and password storage
- Examples: SHA-256, SHA-3, BLAKE2
- Properties: Deterministic, quick computation, infeasible to reverse

## Virtual Private Networks (VPNs)

A VPN extends a private network across a public network, allowing users to send and receive data as if their devices were directly connected to the private network.

### VPN Components

#### 1. VPN Client
- Software installed on the user's device
- Initiates the connection to the VPN server
- Handles encryption and authentication

#### 2. VPN Server
- Accepts connections from authorized VPN clients
- Creates the secure tunnel
- Forwards traffic between the client and destination

#### 3. Tunneling Protocol
- Encapsulates one protocol within another
- Creates the secure "tunnel" through which data travels
- Examples: IPsec, SSL/TLS, WireGuard

#### 4. Authentication Mechanism
- Verifies the identity of clients and servers
- May use passwords, certificates, multi-factor authentication

### Types of VPNs

#### 1. Remote Access VPN
- Connects individual users to a private network
- Common for remote employees accessing corporate resources
- Typically client-based

#### 2. Site-to-Site VPN
- Connects entire networks to each other
- Often used to connect branch offices to headquarters
- Implemented between VPN gateways (routers or firewalls)

#### 3. SSL VPN
- Uses the Secure Sockets Layer protocol
- Often clientless (web-based)
- Easier to implement but may have limited functionality

#### 4. IPsec VPN
- Uses Internet Protocol Security suite
- Provides strong security at the network layer
- Requires client software or compatible networking equipment

### VPN Protocols

#### 1. IPsec (Internet Protocol Security)
- Secures IP communications by authenticating and encrypting packets
- Works at the network layer
- Components: Authentication Header (AH) and Encapsulating Security Payload (ESP)

#### 2. SSL/TLS (Secure Sockets Layer/Transport Layer Security)
- Operates at the transport layer
- Used in HTTPS websites and SSL VPNs
- Provides authentication, encryption, and integrity

#### 3. OpenVPN
- Open-source software that uses the OpenSSL library
- Flexible, secure, and widely supported
- Can operate over UDP or TCP

#### 4. WireGuard
- Modern, streamlined protocol with state-of-the-art cryptography
- Simple design with small codebase
- Fast performance with low overhead

#### 5. L2TP/IPsec (Layer 2 Tunneling Protocol)
- Combines L2TP tunneling with IPsec encryption
- Widely supported across platforms
- Strong security but can be blocked by restrictive firewalls

## Implementation Best Practices

### Encryption Implementation
- Use strong, industry-standard algorithms
- Implement proper key management
- Keep encryption systems updated
- Use forward secrecy when possible
- Encrypt data at rest and in transit

### VPN Deployment
- Implement multi-factor authentication
- Use split tunneling judiciously
- Deploy VPN concentrators for scalability
- Monitor VPN usage and performance
- Regularly audit and test VPN security

### Security Considerations
- Protect encryption keys and certificates
- Implement perfect forward secrecy
- Consider the impact of quantum computing on encryption
- Balance security with usability and performance
- Plan for key rotation and certificate renewal

## Emerging Trends

### Zero Trust Network Access (ZTNA)
- Moving beyond traditional VPN models
- Verifies every user and device before granting access
- Provides least-privilege access to specific applications

### Quantum-Resistant Cryptography
- Developing algorithms resistant to quantum computing attacks
- Preparing for the post-quantum cryptographic era

### Software-Defined Perimeter (SDP)
- Creates dynamic, one-to-one network connections
- Makes network resources "invisible" until authenticated

By implementing robust encryption and VPN solutions, organizations can secure their data as it traverses networks, protecting it from interception and unauthorized access.`,
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
      },
    ]
  },
  {
    id: "3",
    title: "Ethical Hacking",
    description: "Discover the world of ethical hacking and penetration testing to identify vulnerabilities in systems.",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    difficulty: "advanced",
    category: "Offensive Security",
    estimatedTime: "7 hours",
    topics: [
      { 
        id: "3-1", 
        title: "Reconnaissance and Scanning", 
        content: `# Reconnaissance and Scanning Techniques
        
Reconnaissance and scanning are the initial phases of ethical hacking, where information about the target is gathered to identify potential vulnerabilities. This section covers the techniques, tools, and methodologies used in these critical phases.

## Reconnaissance (Information Gathering)

Reconnaissance involves collecting information about the target without directly interacting with its systems.

### Passive Reconnaissance

Involves gathering information without sending packets or requests to the target.

#### OSINT (Open Source Intelligence)
- Gathering information from publicly available sources
- Sources include:
  - Company websites and job postings
  - Social media profiles
  - Public records and government databases
  - Search engines
  - Financial reports and press releases

#### Common OSINT Techniques
- **Whois Lookups**: Identify domain registrants and contact information
- **DNS Analysis**: Discover subdomains, mail servers, and other DNS records
- **Social Media Reconnaissance**: Gather information about employees and organizational structure
- **Search Engine Dorking**: Use advanced search operators to find sensitive information
- **Public Code Repositories**: Examine code for API keys, credentials, or architecture details

### Active Reconnaissance

Involves directly interacting with the target systems.

#### Common Active Techniques
- **DNS Queries**: Direct queries to DNS servers for information
- **Ping Sweeps**: Identify live hosts on the network
- **Banner Grabbing**: Retrieve system banners to identify running services
- **Social Engineering**: Directly contact organization members to gather information
- **Physical Reconnaissance**: On-site visits to observe physical security measures

## Network Scanning

Network scanning involves systematic probing of network hosts to identify active services, operating systems, and potential vulnerabilities.

### Network Discovery

#### Ping Scanning
- Using ICMP Echo requests to identify live hosts
- Techniques to bypass ICMP filtering:
  - TCP SYN ping
  - TCP ACK ping
  - UDP ping

#### ARP Scanning
- For local networks
- Maps IP addresses to MAC addresses
- Usually faster and more reliable than ping scanning on local networks

### Port Scanning

#### Port Scanning Techniques
- **TCP Connect Scan**: Complete the TCP three-way handshake
- **SYN Scan (Half-open)**: Send SYN packet, record response, send RST
- **FIN Scan**: Send packet with FIN flag to detect stateful firewalls
- **Xmas Scan**: Send packet with FIN, PSH, and URG flags set
- **NULL Scan**: Send packet with no flags set
- **ACK Scan**: Determine firewall filtering rules
- **UDP Scan**: Identify open UDP ports, typically slower

#### Port Scanning Strategies
- **Full Port Scan**: Scan all 65,535 ports
- **Top Ports Scan**: Scan commonly used ports
- **Service Scan**: Target specific services (HTTP, FTP, SSH, etc.)
- **Sequential vs. Randomized**: Order of port scanning
- **Timing and Performance**: Adjusting scan speed to avoid detection

### Service and Version Detection

- Identifying specific services running on open ports
- Determining version numbers of services
- Banner grabbing and service probes
- Importance for vulnerability assessment

### Operating System Fingerprinting

- Identifying the operating system of target hosts
- Techniques:
  - TCP/IP stack behavior analysis
  - TTL values and default window sizes
  - ICMP message analysis
  - Response to unusual packet sequences

## Vulnerability Scanning

Automated scanning to identify known vulnerabilities in target systems.

### Types of Vulnerability Scanners
- **Network Vulnerability Scanners**: Scan network services
- **Web Application Scanners**: Focus on web application vulnerabilities
- **Database Scanners**: Identify database misconfigurations and vulnerabilities
- **Host-based Scanners**: Assess local system configurations

### Scanning Methodology
- Setting scope and scan parameters
- Managing scan intensity and potential impact
- Handling authentication for deeper scanning
- Interpreting and validating results
- Prioritizing findings based on risk

## Popular Tools

### Reconnaissance Tools
- **Maltego**: Visual link analysis for OSINT
- **Shodan**: Search engine for Internet-connected devices
- **Recon-ng**: Web reconnaissance framework
- **theHarvester**: Email, subdomain, and people gathering
- **OSINT Framework**: Collection of OSINT resources

### Network Scanning Tools
- **Nmap**: Comprehensive port scanner and network discovery tool
- **Masscan**: Fast port scanner
- **Angry IP Scanner**: Quick and user-friendly network scanner
- **Unicornscan**: Asynchronous stateless TCP/IP packet scanner

### Vulnerability Scanning Tools
- **OpenVAS**: Open-source vulnerability scanner
- **Nexpose**: Vulnerability management platform
- **Nessus**: Comprehensive vulnerability scanner
- **Nikto**: Web server scanner
- **OWASP ZAP**: Web application security scanner

## Legal and Ethical Considerations

- Always obtain proper authorization before scanning
- Document scope and authorized activities
- Be aware of potential system impact
- Follow responsible disclosure procedures
- Adhere to applicable laws and regulations

## Best Practices

- Start with passive reconnaissance
- Progress gradually to more invasive techniques
- Maintain detailed documentation
- Use multiple tools and cross-validate findings
- Consider the target's environment and business context
- Analyze and understand results rather than relying solely on automated tools

Effective reconnaissance and scanning set the foundation for a successful ethical hacking engagement. By thoroughly understanding the target environment, ethical hackers can identify potential entry points and vulnerabilities that might otherwise remain hidden.`,
        imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
      },
      { 
        id: "3-2", 
        title: "Exploitation Techniques", 
        content: `# Exploitation Techniques
        
Exploitation is the phase of ethical hacking where identified vulnerabilities are leveraged to gain access to systems or data. This section covers common exploitation techniques, methodologies, and tools used by ethical hackers.

## Exploitation Fundamentals

### The Exploitation Process

1. **Vulnerability Identification**: Discover weaknesses through reconnaissance and scanning
2. **Exploit Development/Selection**: Create or select appropriate exploit code
3. **Exploit Delivery**: Deliver the exploit to the target system
4. **Execution**: Run the exploit code on the target
5. **Privilege Escalation**: Increase access privileges where possible
6. **Persistence**: Establish mechanisms to maintain access
7. **Evidence Collection**: Document the successful exploitation
8. **Clean-up**: Remove artifacts of the exploitation (in real attacks, attackers often skip this step)

### Types of Vulnerabilities Exploited

- **Software Vulnerabilities**: Buffer overflows, injection flaws, etc.
- **Misconfigurations**: Insecure default settings, open permissions
- **Design Flaws**: Inherent weaknesses in application design
- **Human Factors**: Susceptibility to social engineering

## Common Exploitation Techniques

### Web Application Exploitation

#### SQL Injection
- Inserting malicious SQL code into queries
- Types: Error-based, Union-based, Blind, Time-based
- Impact: Data theft, authentication bypass, server compromise

#### Cross-Site Scripting (XSS)
- Injecting malicious scripts into web pages
- Types: Reflected, Stored, DOM-based
- Impact: Session hijacking, credential theft, malware delivery

#### Cross-Site Request Forgery (CSRF)
- Forcing users to perform unintended actions
- Prevention: Anti-CSRF tokens, SameSite cookies
- Impact: Account changes, financial transactions, data modification

#### File Inclusion Vulnerabilities
- Local File Inclusion (LFI): Including files on the server
- Remote File Inclusion (RFI): Including files from remote locations
- Impact: Code execution, sensitive data disclosure

#### Server-Side Request Forgery (SSRF)
- Forcing server to make requests to internal resources
- Impact: Internal reconnaissance, firewall bypass, data access

### Network-Based Exploitation

#### Man-in-the-Middle (MitM) Attacks
- Intercepting communication between two parties
- Techniques: ARP spoofing, DNS spoofing, SSL stripping
- Impact: Data theft, communication tampering, credential capture

#### Protocol Exploitation
- Exploiting weaknesses in network protocols
- Examples: SMB vulnerabilities, LDAP injection, SNMP exploitation
- Impact: Network compromise, lateral movement, data access

#### Wireless Network Exploitation
- Attacking Wi-Fi networks and connected devices
- Techniques: WEP/WPA cracking, Evil Twin attacks, KRACK
- Impact: Network access, traffic sniffing, device compromise

### System-Level Exploitation

#### Buffer Overflow Exploitation
- Overwriting memory beyond allocated buffer space
- Types: Stack-based, Heap-based, Format string vulnerabilities
- Impact: Remote code execution, privilege escalation

#### Privilege Escalation
- Vertical Escalation: Gaining higher privileges
- Horizontal Escalation: Accessing resources of other users at same level
- Techniques: Kernel exploits, misconfigured permissions, token manipulation

#### Password Attacks
- Brute Force: Trying all possible combinations
- Dictionary Attacks: Using lists of common passwords
- Credential Stuffing: Using previously leaked username/password pairs
- Pass-the-Hash: Using password hashes without knowing the plaintext

### Social Engineering Attacks

#### Phishing
- Creating fraudulent communications to steal information
- Types: Spear phishing, whaling, smishing, vishing
- Impact: Credential theft, malware installation, financial fraud

#### Pretexting
- Creating a fabricated scenario to obtain information
- Techniques: Impersonation, false urgency, establishing trust
- Impact: Information disclosure, access to restricted areas

#### Baiting
- Offering something enticing to entrap the victim
- Examples: Infected USB drives, fake software downloads
- Impact: Malware deployment, system compromise

## Exploit Development

### Exploit Frameworks and Tools

#### Metasploit Framework
- Comprehensive exploitation tool
- Components: Exploits, Payloads, Auxiliaries, Post-exploitation modules
- Features: Exploit development, delivery, and management

#### PowerShell Empire
- Post-exploitation framework
- Features: PowerShell agents, encrypted communications, modular architecture
- Use Cases: Lateral movement, persistence, data exfiltration

#### BeEF (Browser Exploitation Framework)
- Web browser exploitation tool
- Features: Hook browsers, execute JavaScript, browser fingerprinting
- Use Cases: Client-side attacks, social engineering

### Developing Custom Exploits

- Identifying vulnerable code patterns
- Fuzzing techniques to discover vulnerabilities
- Proof-of-concept development
- Exploit reliability and payload considerations
- Evading security controls

## Post-Exploitation

### Initial Access Stabilization
- Establishing reliable command and control
- Bypassing security controls
- Creating additional access methods

### Lateral Movement
- Moving from initial compromised system to other systems
- Techniques: Pass-the-hash, token impersonation, remote service exploitation
- Tools: PsExec, WMI, PowerShell remoting

### Data Exfiltration
- Identifying valuable data
- Techniques: DNS tunneling, steganography, encrypted channels
- Considerations: Data volume, timing, detection avoidance

## Legal and Ethical Considerations

- Operate only within authorized scope
- Avoid unnecessary damage or disruption
- Document all activities thoroughly
- Respect data privacy and confidentiality
- Follow responsible disclosure procedures

## Defense Strategies

- Keeping systems patched and updated
- Implementing defense-in-depth strategies
- Conducting regular security testing
- User awareness and training
- Monitoring and incident response capabilities

## Exploitation Methodology

### Pre-Exploitation Planning
- Defining objectives and success criteria
- Understanding the impact and potential consequences
- Preparing fallback plans and remediation steps

### Controlled Exploitation Process
- Testing exploits in isolated environments first
- Taking incremental steps and validating each phase
- Maintaining detailed logs of actions and outcomes

### Post-Exploitation Analysis
- Documenting successful exploitation vectors
- Assessing the real-world impact
- Providing actionable remediation advice

Ethical hackers use exploitation techniques to demonstrate real-world risks and help organizations understand their vulnerabilities. By conducting controlled exploitation with proper authorization, security professionals can identify and address weaknesses before malicious attackers can exploit them.`,
        imageUrl: "https://images.unsplash.com/photo-1648937744248-77b036ec4b82?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
      },
      { 
        id: "3-3", 
        title: "Reporting and Remediation", 
        content: `# Reporting and Remediation in Ethical Hacking
        
Effective reporting and remediation are critical components of the ethical hacking process. This section covers how to document findings, create impactful reports, and guide organizations through the remediation process.

## Reporting Fundamentals

### Purpose of Security Reports

- Document vulnerabilities and security weaknesses
- Provide evidence of successful exploitation
- Communicate risks in business terms
- Guide remediation efforts
- Establish a security baseline for future assessments

### Report Audiences

- **Technical Team**: Detailed technical findings for remediation
- **Management**: Risk overview and business impact
- **Executives**: High-level summary and strategic recommendations
- **Regulators/Compliance**: Evidence of security testing and compliance efforts

## Report Structure and Content

### Executive Summary

- Brief overview of the assessment
- Critical findings and key risks
- Overall security posture assessment
- Strategic recommendations
- Non-technical language for executive audience

### Methodology

- Scope and objectives of the assessment
- Testing approach and methodology
- Tools and techniques used
- Testing timeline and environment
- Limitations or constraints

### Findings and Vulnerabilities

- Categorization by severity/risk
- Clear vulnerability descriptions
- Evidence of exploitation (screenshots, logs)
- Technical details and affected systems
- Business impact of each finding

#### Vulnerability Severity Ratings

- **Critical**: Immediate threat, direct system compromise
- **High**: Significant risk, potential for substantial damage
- **Medium**: Moderate risk, limited impact
- **Low**: Minimal risk, unlikely to be exploited
- **Informational**: No direct security impact, best practice suggestions

### Risk Assessment

- Risk calculation methodology
- Likelihood of exploitation
- Potential business impact
- Threat actors who might exploit the vulnerability
- Existing mitigating controls

### Remediation Recommendations

- Specific, actionable remediation steps
- Prioritization guidance
- Short-term vs. long-term fixes
- References to industry best practices
- Verification procedures to confirm remediation

### Appendices

- Raw scan results
- Detailed technical notes
- References and resources
- Glossary of terms
- Testing tools and configurations

## Effective Reporting Techniques

### Visual Elements

- Charts and graphs for risk visualization
- Heatmaps showing vulnerability concentrations
- Screenshots demonstrating exploits
- Network diagrams highlighting vulnerable areas
- Executive dashboards for high-level understanding

### Writing Style

- Clear, concise language
- Avoiding unnecessary jargon
- Explaining technical concepts for non-technical readers
- Focusing on business impact
- Providing context for findings

### Evidence Collection

- Types of evidence to collect:
  - System logs
  - Command outputs
  - Network traffic captures
  - Application responses
  - Screenshots of successful exploits
- Documentation best practices
- Chain of custody considerations

## Remediation Planning and Execution

### Prioritizing Vulnerabilities

- Risk-based prioritization approach
- Considering technical dependencies
- Balancing security with business needs
- Quick wins vs. complex fixes

### Remediation Planning

- Developing a structured remediation plan
- Assigning ownership and responsibilities
- Establishing timelines and milestones
- Allocating necessary resources
- Considering compensating controls for interim protection

### Common Remediation Approaches

- **Patching and Updates**: Applying vendor patches
- **Configuration Changes**: Hardening systems and applications
- **Architecture Improvements**: Redesigning vulnerable components
- **Code Fixes**: Addressing application vulnerabilities
- **Policy and Procedure Updates**: Improving operational security

### Verification

- Retesting to verify fixes
- Regression testing to ensure no new issues
- Continuous monitoring
- Follow-up assessments

## Post-Assessment Activities

### Lessons Learned

- Identifying root causes of vulnerabilities
- Recognizing patterns in findings
- Improving security testing processes
- Applying knowledge to future assessments

### Security Program Improvement

- Integrating findings into security roadmap
- Building security awareness programs
- Enhancing security training
- Evolving security architecture

### Metrics and Measurement

- Tracking remediation progress
- Measuring risk reduction
- Establishing key performance indicators
- Demonstrating security improvement over time

## Challenges and Best Practices

### Common Reporting Challenges

- Balancing detail with readability
- Effectively communicating technical concepts
- Avoiding false positives
- Maintaining report quality with time constraints

### Common Remediation Challenges

- Limited resources and competing priorities
- Technical debt and legacy systems
- Third-party dependencies
- Organizational resistance to change

### Best Practices

- Collaboration between testers and remediation teams
- Regular status updates and milestone tracking
- Continuous communication throughout remediation
- Knowledge transfer to internal security teams
- Building remediation capabilities over time

## Legal and Compliance Considerations

- Report confidentiality and handling
- Evidence retention policies
- Compliance reporting requirements
- Breach notification obligations if applicable

Effective reporting transforms technical findings into actionable intelligence that organizations can use to improve their security posture. Well-executed remediation ensures that identified vulnerabilities are addressed, reducing risk and enhancing overall security. Together, these elements complete the ethical hacking process and deliver tangible value to the organization.`,
        imageUrl: "https://images.unsplash.com/photo-1618060932014-4deda4932554?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
      },
    ]
  },
];

// Mock quizzes data
const QUIZZES_DATA: Quiz[] = [
  {
    id: "1",
    title: "Cybersecurity Fundamentals Quiz",
    description: "Test your knowledge on basic cybersecurity concepts and best practices.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
      {
        id: "q1-4",
        question: "Which of the following is NOT a good password practice?",
        options: [
          "Using different passwords for different accounts",
          "Writing down passwords and keeping them in a visible place",
          "Using a combination of letters, numbers, and special characters",
          "Changing passwords regularly",
        ],
        correctAnswer: 1,
        explanation: "Writing down passwords and keeping them in a visible place is a poor security practice as it makes them easily accessible to unauthorized individuals."
      },
      {
        id: "q1-5",
        question: "What is phishing?",
        options: [
          "A type of encryption",
          "A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity",
          "A method to secure wireless networks",
          "A technique to compress data",
        ],
        correctAnswer: 1,
        explanation: "Phishing is a social engineering attack where attackers disguise themselves as trusted entities to trick users into revealing sensitive information."
      },
      {
        id: "q1-6",
        question: "Which of the following is a type of malware that encrypts files and demands payment for the decryption key?",
        options: [
          "Worm",
          "Trojan",
          "Ransomware",
          "Spyware",
        ],
        correctAnswer: 2,
        explanation: "Ransomware is a type of malware that encrypts the victim's files and demands a ransom payment to restore access."
      },
      {
        id: "q1-7",
        question: "What is two-factor authentication (2FA)?",
        options: [
          "Using two different passwords",
          "Having two administrators approve access",
          "Using two different authentication methods to verify identity",
          "Encrypting data twice",
        ],
        correctAnswer: 2,
        explanation: "Two-factor authentication requires users to provide two different authentication factors to verify their identity, typically something they know (password) and something they have (like a mobile device)."
      },
      {
        id: "q1-8",
        question: "Which of the following is an example of a security vulnerability?",
        options: [
          "Using strong encryption",
          "Implementing access controls",
          "Outdated software",
          "Regular security audits",
        ],
        correctAnswer: 2,
        explanation: "Outdated software often contains known security vulnerabilities that have been fixed in newer versions, making it a security vulnerability."
      },
      {
        id: "q1-9",
        question: "What is social engineering in cybersecurity?",
        options: [
          "Using social media for marketing",
          "Psychological manipulation to trick users into making security mistakes",
          "Building social networks securely",
          "Engineering secure social media platforms",
        ],
        correctAnswer: 1,
        explanation: "Social engineering is the psychological manipulation of people into performing actions or divulging confidential information, often through deception."
      },
      {
        id: "q1-10",
        question: "Which of the following is the best way to protect against data loss?",
        options: [
          "Never store sensitive data",
          "Only use public computers",
          "Regular backups to multiple locations",
          "Share your passwords with trusted colleagues",
        ],
        correctAnswer: 2,
        explanation: "Regular backups to multiple locations ensure that data can be recovered in case of loss due to hardware failure, malware, or other causes."
      }
    ]
  },
  {
    id: "2",
    title: "Network Security Quiz",
    description: "Test your knowledge on network security concepts, protocols, and tools.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
      {
        id: "q2-4",
        question: "What is the purpose of network segmentation?",
        options: [
          "To increase network speed",
          "To reduce the cost of network equipment",
          "To contain breaches and limit lateral movement",
          "To simplify network management",
        ],
        correctAnswer: 2,
        explanation: "Network segmentation divides a network into multiple segments to contain breaches and limit lateral movement of attackers within the network."
      },
      {
        id: "q2-5",
        question: "Which of the following is NOT a common network attack?",
        options: [
          "Man-in-the-Middle",
          "Denial of Service",
          "ARP Poisoning",
          "Data Normalization",
        ],
        correctAnswer: 3,
        explanation: "Data Normalization is a database design technique, not a network attack. The other options are all common types of network attacks."
      },
      {
        id: "q2-6",
        question: "What is the purpose of an Intrusion Detection System (IDS)?",
        options: [
          "To encrypt network traffic",
          "To detect unauthorized access or attacks",
          "To authenticate users",
          "To accelerate network performance",
        ],
        correctAnswer: 1,
        explanation: "An Intrusion Detection System (IDS) monitors network traffic for suspicious activity and issues alerts when such activity is discovered."
      },
      {
        id: "q2-7",
        question: "Which of the following is a secure remote access protocol?",
        options: [
          "Telnet",
          "SSH (Secure Shell)",
          "FTP (File Transfer Protocol)",
          "SNMP (Simple Network Management Protocol)",
        ],
        correctAnswer: 1,
        explanation: "SSH (Secure Shell) is a secure protocol used for remote access, providing encrypted communications between two untrusted hosts over an insecure network."
      },
      {
        id: "q2-8",
        question: "What is a DMZ in network security?",
        options: [
          "Demarcation Zone",
          "Demilitarized Zone",
          "Data Management Zone",
          "Dynamic Monitoring Zone",
        ],
        correctAnswer: 1,
        explanation: "A DMZ (Demilitarized Zone) is a physical or logical subnetwork that contains and exposes an organization's external-facing services to an untrusted network, usually the internet."
      },
      {
        id: "q2-9",
        question: "Which of the following best describes MAC address filtering?",
        options: [
          "A technique to prevent physical access to network devices",
          "A method to control which devices can connect to a network based on their physical address",
          "A way to filter emails with malicious content",
          "A protocol for secure wireless communications",
        ],
        correctAnswer: 1,
        explanation: "MAC address filtering is a security method where access to a network is restricted based on the MAC address (physical address) of the connecting device."
      },
      {
        id: "q2-10",
        question: "What is the primary purpose of a proxy server?",
        options: [
          "To increase internet speed",
          "To act as an intermediary between clients and servers",
          "To store website data locally",
          "To manage network hardware",
        ],
        correctAnswer: 1,
        explanation: "A proxy server acts as an intermediary between clients and servers, which can provide functions like caching, authentication, and filtering."
      }
    ]
  },
  {
    id: "3",
    title: "Ethical Hacking Quiz",
    description: "Test your knowledge on ethical hacking and penetration testing techniques.",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
      {
        id: "q3-4",
        question: "What is SQL Injection?",
        options: [
          "A technique to improve database performance",
          "A method to protect SQL databases",
          "An attack that inserts malicious code into SQL statements",
          "A tool for database administration",
        ],
        correctAnswer: 2,
        explanation: "SQL Injection is an attack where malicious SQL code is inserted into input fields to manipulate the database."
      },
      {
        id: "q3-5",
        question: "Which phase of ethical hacking involves maintaining access to the target system?",
        options: [
          "Reconnaissance",
          "Scanning",
          "Gaining Access",
          "Maintaining Access",
        ],
        correctAnswer: 3,
        explanation: "Maintaining Access is the phase where the ethical hacker ensures they can come back to the exploited system, which helps assess the persistence capabilities that a real attacker might use."
      },
      {
        id: "q3-6",
        question: "What is a 'Zero-Day Vulnerability'?",
        options: [
          "A vulnerability that has existed for zero days",
          "A vulnerability that is exploited on the same day it is discovered by the vendor",
          "A vulnerability that requires zero effort to exploit",
          "A vulnerability that affects zero systems",
        ],
        correctAnswer: 1,
        explanation: "A Zero-Day Vulnerability is a security flaw that is exploited before the vendor becomes aware of it, giving them 'zero days' to create and deploy a patch."
      },
      {
        id: "q3-7",
        question: "What is the difference between black box, white box, and gray box testing?",
        options: [
          "The color of the testing equipment used",
          "The level of knowledge the tester has about the target system",
          "The severity of vulnerabilities found",
          "The time of day when testing is performed",
        ],
        correctAnswer: 1,
        explanation: "These terms refer to the level of knowledge and access the tester has: black box (no knowledge), white box (full knowledge), and gray box (partial knowledge)."
      },
      {
        id: "q3-8",
        question: "What is 'privilege escalation' in the context of ethical hacking?",
        options: [
          "Increasing the pay rate for ethical hacking services",
          "Obtaining higher-level permissions than originally granted",
          "Escalating a security incident to management",
          "Increasing the difficulty of a penetration test",
        ],
        correctAnswer: 1,
        explanation: "Privilege escalation refers to the act of exploiting a vulnerability to gain higher-level permissions than originally granted."
      },
      {
        id: "q3-9",
        question: "What is a 'payload' in the context of exploitation?",
        options: [
          "The weight of the hacking equipment",
          "The cost of a security breach",
          "The code that executes after successful exploitation",
          "The number of vulnerabilities found",
        ],
        correctAnswer: 2,
        explanation: "A payload is the actual code that executes after successful exploitation, performing the intended malicious or testing action."
      },
      {
        id: "q3-10",
        question: "Which of the following best describes 'social engineering'?",
        options: [
          "Engineering social media platforms",
          "Using technical means to crack passwords",
          "Manipulating people into breaking security procedures",
          "Creating sociable AI systems",
        ],
        correctAnswer: 2,
        explanation: "Social engineering involves psychological manipulation to trick people into divulging confidential information or breaking security procedures."
      }
    ]
  },
  {
    id: "4",
    title: "Cryptography Basics Quiz",
    description: "Test your knowledge on cryptography concepts and techniques.",
    imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Security Basics",
    difficulty: "intermediate",
    questions: [
      {
        id: "q4-1",
        question: "What is the purpose of encryption in cybersecurity?",
        options: [
          "To permanently delete data",
          "To convert data into a form that unauthorized users cannot understand",
          "To compress data for faster transmission",
          "To detect malware in files",
        ],
        correctAnswer: 1,
        explanation: "Encryption converts data into a secure format that can only be read by authorized parties who have the decryption key."
      },
      {
        id: "q4-2",
        question: "Which of the following is a symmetric encryption algorithm?",
        options: [
          "RSA",
          "AES",
          "ECC",
          "Diffie-Hellman",
        ],
        correctAnswer: 1,
        explanation: "AES (Advanced Encryption Standard) is a symmetric encryption algorithm that uses the same key for both encryption and decryption."
      },
      {
        id: "q4-3",
        question: "What is the main difference between symmetric and asymmetric encryption?",
        options: [
          "Symmetric encryption is faster but less secure",
          "Asymmetric encryption uses multiple algorithms while symmetric uses only one",
          "Symmetric encryption uses the same key for encryption and decryption, while asymmetric uses different keys",
          "Symmetric encryption is used for authentication, while asymmetric is used for confidentiality",
        ],
        correctAnswer: 2,
        explanation: "The key difference is that symmetric encryption uses a single key for both encryption and decryption, while asymmetric encryption uses a pair of mathematically related keys (public and private)."
      },
      {
        id: "q4-4",
        question: "What is a hash function used for?",
        options: [
          "Encrypting data for secure transmission",
          "Generating digital signatures",
          "Creating a fixed-size output from variable-size input data, often for integrity verification",
          "Anonymizing user data for privacy",
        ],
        correctAnswer: 2,
        explanation: "A hash function creates a fixed-size output (hash) from variable-size input data. It's commonly used to verify data integrity, as any change to the input produces a different hash value."
      },
      {
        id: "q4-5",
        question: "Which of the following is a characteristic of a good cryptographic hash function?",
        options: [
          "It should be easy to reverse-engineer the original data from the hash",
          "It should produce the same hash for different inputs occasionally",
          "It should be computationally efficient to compute the hash for any input",
          "It should generate hashes of variable length depending on the input",
        ],
        correctAnswer: 2,
        explanation: "A good hash function should be computationally efficient, but also resistant to collisions and reverse-engineering. It should produce fixed-length outputs regardless of input size."
      },
      {
        id: "q4-6",
        question: "What is the purpose of a digital certificate?",
        options: [
          "To encrypt email communications",
          "To verify the identity of entities in digital communications",
          "To generate random encryption keys",
          "To compress digital files securely",
        ],
        correctAnswer: 1,
        explanation: "Digital certificates are used to verify the identity of entities (people, organizations, servers) in digital communications, binding a public key to an entity's identity."
      },
      {
        id: "q4-7",
        question: "What is a Public Key Infrastructure (PKI)?",
        options: [
          "A system for encrypting all public internet traffic",
          "A framework for managing digital certificates and public-key encryption",
          "A government database of all public encryption keys",
          "A public repository of known encryption algorithms",
        ],
        correctAnswer: 1,
        explanation: "PKI is a framework that enables secure electronic transfer of information using a system of public key cryptography, digital certificates, certificate authorities, and other services."
      },
      {
        id: "q4-8",
        question: "What cryptographic protocol is commonly used to secure web browsing?",
        options: [
          "SSH",
          "IPsec",
          "TLS/SSL",
          "PGP",
        ],
        correctAnswer: 2,
        explanation: "TLS (Transport Layer Security) and its predecessor SSL (Secure Sockets Layer) are cryptographic protocols designed to provide secure communication over a computer network, commonly used for secure web browsing (HTTPS)."
      },
      {
        id: "q4-9",
        question: "What is end-to-end encryption?",
        options: [
          "Encryption that is applied at both the client and server ends",
          "Encryption that can only be decrypted at specific endpoints on a network",
          "A system where only the communicating users can read the messages, with no intermediary access",
          "A type of encryption that works across multiple types of devices",
        ],
        correctAnswer: 2,
        explanation: "End-to-end encryption ensures that data is encrypted on the sender's system and only decrypted on the recipient's system, preventing access by any intermediaries, including service providers."
      },
      {
        id: "q4-10",
        question: "What is a 'brute force attack' in the context of cryptography?",
        options: [
          "Physically forcing access to secured servers to steal encryption keys",
          "Attempting all possible keys or passwords until the correct one is found",
          "Using specialized hardware to damage encryption devices",
          "Forcing users through social engineering to reveal their encryption keys",
        ],
        correctAnswer: 1,
        explanation: "A brute force attack involves systematically checking all possible keys or passwords until the correct one is found, essentially trying every possibility until success."
      }
    ]
  },
  {
    id: "5",
    title: "Security Compliance Quiz",
    description: "Test your knowledge on security regulations, standards, and compliance frameworks.",
    imageUrl: "https://images.unsplash.com/photo-1452457750107-cd084dce177d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Security Management",
    difficulty: "intermediate",
    questions: [
      {
        id: "q5-1",
        question: "What is the primary purpose of the GDPR?",
        options: [
          "To regulate international trade",
          "To protect individuals' personal data and privacy in the EU",
          "To establish cybersecurity standards for government agencies",
          "To regulate internet service providers",
        ],
        correctAnswer: 1,
        explanation: "The General Data Protection Regulation (GDPR) is designed to protect the personal data and privacy of EU citizens and residents."
      },
      {
        id: "q5-2",
        question: "Which of the following is NOT one of the primary components of the HIPAA Security Rule?",
        options: [
          "Administrative Safeguards",
          "Physical Safeguards",
          "Financial Safeguards",
          "Technical Safeguards",
        ],
        correctAnswer: 2,
        explanation: "The HIPAA Security Rule has three main components: Administrative Safeguards, Physical Safeguards, and Technical Safeguards. Financial Safeguards is not one of them."
      },
      {
        id: "q5-3",
        question: "What does PCI DSS stand for?",
        options: [
          "Personal Computer Digital Security Standard",
          "Payment Card Industry Data Security Standard",
          "Public Certificate Distribution Security System",
          "Primary Compliance Documentation Security Standard",
        ],
        correctAnswer: 1,
        explanation: "PCI DSS stands for Payment Card Industry Data Security Standard, which is a set of security standards designed to ensure that all companies that accept, process, store, or transmit credit card information maintain a secure environment."
      },
      {
        id: "q5-4",
        question: "Which of the following best describes an ISO 27001 certification?",
        options: [
          "A certification indicating compliance with international quality management standards",
          "A certification specifically for cloud service providers",
          "A certification demonstrating implementation of an information security management system (ISMS)",
          "A certification required for organizations that process credit card payments",
        ],
        correctAnswer: 2,
        explanation: "ISO 27001 is an international standard for information security management systems (ISMS), providing a framework for organizations to identify, analyze, and address their information security risks."
      },
      {
        id: "q5-5",
        question: "What is the primary focus of SOC 2 compliance?",
        options: [
          "Financial reporting controls",
          "Security, availability, processing integrity, confidentiality, and privacy of customer data",
          "Healthcare information privacy",
          "Government contract security requirements",
        ],
        correctAnswer: 1,
        explanation: "SOC 2 (Service Organization Control 2) focuses on controls related to security, availability, processing integrity, confidentiality, and privacy of customer data."
      },
      {
        id: "q5-6",
        question: "What does NIST stand for in the context of cybersecurity frameworks?",
        options: [
          "National Institute of Security Technology",
          "National Information Security Treasury",
          "National Institute of Standards and Technology",
          "Network Infrastructure Security Testing",
        ],
        correctAnswer: 2,
        explanation: "NIST stands for National Institute of Standards and Technology, which develops cybersecurity standards, guidelines, and best practices to help organizations manage cybersecurity risks."
      },
      {
        id: "q5-7",
        question: "Which of the following is a key requirement of the Sarbanes-Oxley Act (SOX) related to information security?",
        options: [
          "Implementation of biometric authentication for all employees",
          "Mandatory encryption of all stored data",
          "Establishment of internal controls for financial reporting, including IT controls",
          "Annual penetration testing by certified third parties",
        ],
        correctAnswer: 2,
        explanation: "The Sarbanes-Oxley Act requires companies to establish and maintain internal controls for financial reporting, which includes IT controls that affect financial data integrity."
      },
      {
        id: "q5-8",
        question: "What is the focus of FISMA (Federal Information Security Modernization Act)?",
        options: [
          "Standardizing security for financial institutions",
          "Protecting health information privacy",
          "Securing federal government information systems",
          "Regulating international data transfers",
        ],
        correctAnswer: 2,
        explanation: "FISMA was established to strengthen the security of information systems in federal agencies, requiring them to develop, document, and implement security programs."
      },
      {
        id: "q5-9",
        question: "What is the purpose of a security framework like NIST CSF?",
        options: [
          "To enforce legal requirements for cybersecurity",
          "To provide a set of guidelines and best practices for managing cybersecurity risks",
          "To certify security professionals in standardized practices",
          "To regulate how organizations must respond to data breaches",
        ],
        correctAnswer: 1,
        explanation: "Security frameworks like the NIST Cybersecurity Framework (CSF) provide guidelines, standards, and best practices to help organizations manage and reduce cybersecurity risks."
      },
      {
        id: "q5-10",
        question: "Which compliance requirement would most likely apply to a company that processes credit card payments?",
        options: [
          "HIPAA",
          "PCI DSS",
          "FISMA",
          "FERPA",
        ],
        correctAnswer: 1,
        explanation: "PCI DSS (Payment Card Industry Data Security Standard) applies to organizations that handle credit card information, setting requirements for securing payment card data."
      }
    ]
  }
];

// Mock cybersecurity tools data
const TOOLS_DATA: Tool[] = [
  {
    id: "1",
    title: "Password Strength Analyzer",
    description: "Analyze the strength of your passwords and get recommendations for improvement.",
    type: "password",
    component: "PasswordAnalyzer"
  },
  {
    id: "2",
    title: "Phishing Detection Tool",
    description: "Check URLs and emails for signs of phishing attempts and potential scams.",
    type: "phishing",
    component: "PhishingDetector"
  },
  {
    id: "3",
    title: "Encryption Playground",
    description: "Experiment with different encryption algorithms and learn how they work.",
    type: "encryption",
    component: "EncryptionPlayground"
  }
];

