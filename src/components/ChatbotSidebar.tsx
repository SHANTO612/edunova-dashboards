import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Send, Bot } from 'lucide-react';
import { useCourses } from '@/hooks/useCourses';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotSidebar = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I can help you find courses. What are you interested in learning?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const { getCourses } = useCourses();
  const navigate = useNavigate();
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Process the message and generate a response
    setTimeout(async () => {
      const courses = await getCourses();
      const query = input.toLowerCase();
      
      // Simple keyword matching
      const matchedCourses = courses.filter(
        (course) => 
          course.title.toLowerCase().includes(query) || 
          course.description.toLowerCase().includes(query)
      );
      
      let botResponse: Message;
      
      if (matchedCourses.length > 0) {
        const courseLinks = matchedCourses.map(
          (course) => `<a href="#" class="text-blue-500 hover:underline" data-course-id="${course.id}">${course.title}</a>`
        ).join('<br/>');
        
        botResponse = {
          id: Date.now().toString(),
          content: `I found these courses that might interest you:<br/>${courseLinks}`,
          sender: 'bot',
          timestamp: new Date(),
        };
      } else {
        botResponse = {
          id: Date.now().toString(),
          content: "I couldn't find any courses matching your query. Try different keywords or browse all courses.",
          sender: 'bot',
          timestamp: new Date(),
        };
      }
      
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleCourseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' && target.dataset.courseId) {
      e.preventDefault();
      navigate(`/courses/${target.dataset.courseId}`);
    }
  };
  
  return (
    <div className="flex flex-col h-full border-l">
      <div className="p-4 border-b flex items-center">
        <Bot className="h-5 w-5 mr-2" />
        <h2 className="font-medium">Course Assistant</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4" onClick={handleCourseClick}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card
                className={`px-3 py-2 max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about courses..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSidebar;