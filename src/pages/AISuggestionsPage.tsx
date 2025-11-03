import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const AISuggestionsPage = () => {
  const { user } = useAuth();
  
  // For all users, automatically show the chatbot sidebar
  useEffect(() => {
    // Only open the chatbot if it's not already open
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    if (chatbotToggle && !document.querySelector('.w-80')) {
      chatbotToggle.dispatchEvent(new MouseEvent('click'));
    }
  }, []);

  const educatorSuggestions = [
    {
      title: "Add interactive quizzes",
      description: "Courses with quizzes have 35% higher completion rates",
      action: "Generate Quizzes"
    },
    {
      title: "Update course content",
      description: "Your React course could benefit from latest v18 features",
      action: "View Suggestions"
    },
    {
      title: "Improve video quality",
      description: "AI can enhance clarity and reduce background noise",
      action: "Enhance Videos"
    }
  ];

  const marketerSuggestions = [
    {
      title: "Optimize bundle pricing",
      description: "Increase discounts to 35% for higher conversion rates",
      action: "Apply Changes"
    },
    {
      title: "Target new audience",
      description: "Data shows potential in the healthcare sector",
      action: "View Analysis"
    }
  ];

  const studentSuggestions = [
    {
      title: "Recommended course: Advanced TypeScript",
      description: "Based on your completed React courses",
      action: "View Course"
    },
    {
      title: "Study schedule optimization",
      description: "AI can create a personalized study plan",
      action: "Generate Plan"
    }
  ];

  const suggestions = user?.role === 'educator' ? educatorSuggestions : 
                     user?.role === 'marketer' ? marketerSuggestions : 
                     studentSuggestions;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Suggestions</h1>
        <p className="text-muted-foreground mt-1">
          Personalized recommendations to improve your {user?.role === 'marketer' ? "marketing" : "learning"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>
            AI-powered suggestions based on your activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-4 border border-accent/50 rounded-lg bg-accent/5">
                <h4 className="font-medium mb-2">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {suggestion.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => document.querySelector('.chatbot-toggle')?.dispatchEvent(new MouseEvent('click'))}
                >
                  {suggestion.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription>
            Get personalized help with your specific needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border border-primary/50 rounded-lg bg-primary/5">
            <h4 className="font-medium mb-2">Ask the AI Assistant</h4>
            <p className="text-sm text-muted-foreground">
              Get instant answers to your questions about {user?.role === 'educator' ? "teaching strategies" : user?.role === 'marketer' ? "marketing tactics" : "course content"}
            </p>
            <Button 
              className="mt-3"
              onClick={() => document.querySelector('.chatbot-toggle')?.dispatchEvent(new MouseEvent('click'))}
            >
              Open Assistant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISuggestionsPage;