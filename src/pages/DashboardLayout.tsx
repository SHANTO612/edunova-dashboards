import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import ChatbotSidebar from '@/components/ChatbotSidebar';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const DashboardLayout = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8 relative">
          <Outlet />
          <Button 
            className="fixed bottom-6 right-6 rounded-full h-12 w-12 p-0 shadow-lg chatbot-toggle"
            onClick={() => setShowChatbot(!showChatbot)}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </main>
        {showChatbot && (
          <div className="w-80">
            <ChatbotSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
