import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import ChatbotSidebar from '@/components/ChatbotSidebar';
import { Button } from '@/components/ui/button';
import { MessageSquareText } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext';

const DashboardLayout = () => {
  const { showChatbot, toggleChatbot } = useChatbot();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex relative">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
        
        {/* Chatbot toggle button */}
        <Button 
          variant="outline" 
          size="icon"
          className="fixed bottom-6 right-6 z-50 rounded-full h-12 w-12 shadow-lg"
          onClick={toggleChatbot}
        >
          <MessageSquareText className="h-6 w-6" />
        </Button>
        
        {/* Chatbot sidebar */}
        <div className={`fixed top-16 right-0 bottom-0 w-80 transform transition-transform duration-300 ease-in-out z-40 ${showChatbot ? 'translate-x-0' : 'translate-x-full'}`}>
          <ChatbotSidebar />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
