import { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotContextType {
  messages: Message[];
  sendMessage: (content: string) => void;
  clearChat: () => void;
  isLoading: boolean;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: 'Hello! How can I help you with your learning journey today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: generateBotResponse(content),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        content: 'Hello! How can I help you with your learning journey today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  // Simple bot response generator
  const generateBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return 'Hello there! How can I assist you with your courses today?';
    } else if (lowerCaseMessage.includes('course')) {
      return 'We have many courses available. You can browse them in the Courses section or ask me about specific topics you\'re interested in.';
    } else if (lowerCaseMessage.includes('payment') || lowerCaseMessage.includes('pay')) {
      return 'We accept credit cards and mobile payments. If you\'re having issues with payment, please contact our support team.';
    } else if (lowerCaseMessage.includes('certificate')) {
      return 'Certificates are provided upon successful completion of courses. You can find them in your profile after finishing all required modules.';
    } else {
      return 'I\'m here to help with any questions about our courses, enrollment, or learning resources. Could you provide more details about what you\'re looking for?';
    }
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        sendMessage,
        clearChat,
        isLoading,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};