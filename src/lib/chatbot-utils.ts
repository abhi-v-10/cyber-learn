
// Knowledge base for cybersecurity topics
const cybersecurityKnowledge = {
  // Common cybersecurity concepts
  concepts: {
    "firewall": "A security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.",
    "encryption": "The process of converting information or data into a code to prevent unauthorized access.",
    "malware": "Software designed to harm or exploit any programmable device, service, or network.",
    "phishing": "A cybercrime where targets are contacted by email, telephone, or text message by someone posing as a legitimate institution to lure them into providing sensitive data.",
    "vpn": "A Virtual Private Network extends a private network across a public network, enabling users to send and receive data across shared or public networks as if their computing devices were directly connected to the private network.",
    "zero-day": "A zero-day vulnerability is a software security flaw that is unknown to those who should be interested in mitigating the flaw.",
    "ransomware": "A type of malicious software designed to block access to a computer system until a sum of money is paid.",
    "2fa": "Two-Factor Authentication is a security process in which users provide two different authentication factors to verify themselves.",
    "social engineering": "The manipulation of people into performing actions or divulging confidential information.",
    "ddos": "A Distributed Denial of Service attack is an attempt to make an online service unavailable by overwhelming it with traffic from multiple sources.",
    "penetration testing": "An authorized simulated attack on a computer system to evaluate the security of the system.",
  },
  
  // Platform-specific FAQs
  platformFAQs: {
    "courses": "Our platform offers various cybersecurity courses ranging from beginner to advanced levels. You can browse all available courses in the Courses section.",
    "difficulty levels": "Our courses are categorized into three difficulty levels: Beginner, Intermediate, and Advanced.",
    "quizzes": "Each course includes quizzes to test your knowledge. You can also take standalone quizzes from the Quizzes section.",
    "progress tracking": "Your learning progress is tracked automatically. Visit the Progress section to see detailed statistics.",
    "tools": "We provide interactive tools like Encryption Playground, Password Analyzer, and Phishing Detector to help you practice cybersecurity concepts.",
    "certificate": "You'll receive a certificate upon completing a course with a passing grade on all quizzes.",
    "account": "You can manage your account settings, including password changes, in the Profile section.",
    "contact support": "For additional help, please reach out to support@cybersecplatform.com.",
    "pricing": "We offer free basic courses and premium courses for subscribers. Check the pricing page for more details.",
    "mobile": "Yes, our platform is fully responsive and works on mobile devices.",
  }
};

// This function uses our local knowledge base to respond to user questions
export const getChatbotResponse = async (userInput: string): Promise<string> => {
  // Normalize input for better matching
  const normalizedInput = userInput.toLowerCase();
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Check for general greetings
  if (/^(hi|hello|hey|greetings)/i.test(normalizedInput)) {
    return "Hello! How can I help you with cybersecurity today?";
  }
  
  // Check if user is asking about how the AI works
  if (normalizedInput.includes("how do you work") || 
      normalizedInput.includes("who are you") || 
      normalizedInput.includes("what can you do")) {
    return "I'm a specialized chatbot designed to answer questions about cybersecurity concepts and provide information about this learning platform. I can explain cybersecurity terms, provide guidance on courses, and help with general platform questions.";
  }
  
  // Check for thanks
  if (/thank|thanks/i.test(normalizedInput)) {
    return "You're welcome! If you have any more questions about cybersecurity or the platform, feel free to ask.";
  }
  
  // Search for cybersecurity concept matches
  for (const [concept, explanation] of Object.entries(cybersecurityKnowledge.concepts)) {
    if (normalizedInput.includes(concept)) {
      return `**${concept.charAt(0).toUpperCase() + concept.slice(1)}**: ${explanation}`;
    }
  }
  
  // Search for platform FAQs
  for (const [topic, answer] of Object.entries(cybersecurityKnowledge.platformFAQs)) {
    if (normalizedInput.includes(topic)) {
      return answer;
    }
  }
  
  // Topic-specific responses
  if (normalizedInput.includes("course") || normalizedInput.includes("learn")) {
    return "Our platform offers various cybersecurity courses for all skill levels. You can find beginner courses on cybersecurity fundamentals, intermediate courses on specific security domains, and advanced courses for specialized topics. Check the Courses section to browse all available options.";
  }
  
  if (normalizedInput.includes("quiz") || normalizedInput.includes("test")) {
    return "We offer quizzes on various cybersecurity topics, including network security, web security, cryptography, and social engineering. Each quiz contains multiple-choice questions to test your knowledge. You can access all quizzes from the Quizzes section of the platform.";
  }
  
  if (normalizedInput.includes("tool") || normalizedInput.includes("practice")) {
    return "Our platform includes interactive tools to help you practice cybersecurity concepts. You can use the Encryption Playground to experiment with encryption techniques, the Password Analyzer to test password strength, and the Phishing Detector to learn how to identify phishing attempts.";
  }
  
  if (normalizedInput.includes("password") || normalizedInput.includes("secure password")) {
    return "Creating strong passwords is essential for cybersecurity. A strong password should:\n\n1. Be at least 12 characters long\n2. Include a mix of uppercase and lowercase letters\n3. Contain numbers and special characters\n4. Avoid personal information\n5. Be unique for each account\n\nYou can use our Password Analyzer tool to test the strength of your passwords.";
  }
  
  if (normalizedInput.includes("phishing")) {
    return "Phishing is a type of social engineering attack where attackers attempt to steal sensitive information by disguising as trustworthy entities. To avoid phishing:\n\n1. Check email sender addresses carefully\n2. Be suspicious of unexpected attachments\n3. Hover over links before clicking\n4. Look for spelling or grammatical errors\n5. Never provide sensitive information through email\n\nYou can learn more about identifying phishing attempts in our 'Social Engineering' course.";
  }
  
  if (normalizedInput.includes("encrypt") || normalizedInput.includes("encryption")) {
    return "Encryption is the process of converting information into a code to prevent unauthorized access. Common encryption types include:\n\n1. Symmetric encryption (uses the same key for encryption and decryption)\n2. Asymmetric encryption (uses public and private key pairs)\n3. End-to-end encryption (only communicating users can read the messages)\n\nYou can experiment with different encryption methods in our Encryption Playground tool.";
  }
  
  // Default response for queries we can't address specifically
  return "I don't have specific information on that topic yet. For cybersecurity questions, try asking about common concepts like encryption, malware, phishing, or ransomware. For platform questions, you can ask about courses, quizzes, tools, or account management.";
};
