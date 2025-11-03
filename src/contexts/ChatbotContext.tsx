import React, { createContext, useContext, useState } from 'react';

interface ChatbotContextType {
  showChatbot: boolean;
  toggleChatbot: () => void;
  openChatbot: () => void;
  closeChatbot: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => setShowChatbot(prev => !prev);
  const openChatbot = () => setShowChatbot(true);
  const closeChatbot = () => setShowChatbot(false);

  return (
    <ChatbotContext.Provider value={{ showChatbot, toggleChatbot, openChatbot, closeChatbot }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = (): ChatbotContextType => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};