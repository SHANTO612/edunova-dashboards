import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

const AISuggestionsPage = () => {
  const { user } = useAuth();

  // Auto-open chatbot sidebar
  useEffect(() => {
    const chatbotToggle = document.querySelector(".chatbot-toggle");
    if (chatbotToggle && !document.querySelector(".w-80")) {
      chatbotToggle.dispatchEvent(new MouseEvent("click"));
    }
  }, []);

  // -----------------------------
  // Dummy AI suggestion data
  // -----------------------------
  const educatorSuggestions = [
    {
      title: "Add interactive quizzes",
      description: "Courses with quizzes have 35% higher completion rates.",
      action: "Generate Quizzes",
      impact: { before: 62, after: 84 },
      plan: [
        "Week 1: Add quizzes to two lessons",
        "Week 2: Collect student feedback",
        "Week 3: Refine based on engagement analytics",
      ],
    },
    {
      title: "Update course content",
      description: "Your React course could benefit from latest v18 features.",
      action: "View Suggestions",
      impact: { before: 70, after: 90 },
      plan: [
        "Week 1: Update code examples to React 18",
        "Week 2: Add explanation videos",
        "Week 3: Run A/B test on updated lessons",
      ],
    },
    {
      title: "Improve video quality",
      description: "AI can enhance clarity and reduce background noise.",
      action: "Enhance Videos",
      impact: { before: 75, after: 88 },
      plan: [
        "Day 1: Upload videos to AI enhancer",
        "Day 2: Review improvements",
        "Day 3: Publish enhanced version",
      ],
    },
  ];

  const marketerSuggestions = [
    {
      title: "Optimize bundle pricing",
      description: "Increase discounts to 35% for higher conversion rates.",
      action: "Apply Changes",
      impact: { before: 50, after: 72 },
      plan: [
        "Step 1: Analyze top-performing bundles",
        "Step 2: Apply 35% discount",
        "Step 3: Measure conversions weekly",
      ],
    },
    {
      title: "Target new audience",
      description: "Data shows potential in the healthcare sector.",
      action: "View Analysis",
      impact: { before: 65, after: 83 },
      plan: [
        "Step 1: Research healthcare audience needs",
        "Step 2: Run targeted campaign",
        "Step 3: Compare engagement vs. old audience",
      ],
    },
  ];

  const studentSuggestions = [
    {
      title: "Recommended course: Advanced TypeScript",
      description: "Based on your completed React courses.",
      action: "View Course",
      impact: { before: 68, after: 92 },
      plan: [
        "Week 1: Enroll and complete intro module",
        "Week 2: Practice weekly exercises",
        "Week 3: Attempt final project",
      ],
    },
    {
      title: "Study schedule optimization",
      description: "AI can create a personalized study plan.",
      action: "Generate Plan",
      impact: { before: 55, after: 80 },
      plan: [
        "Day 1: Analyze current study pattern",
        "Day 2: Generate new schedule",
        "Day 3: Track consistency for one week",
      ],
    },
  ];

  const suggestions =
    user?.role === "educator"
      ? educatorSuggestions
      : user?.role === "marketer"
      ? marketerSuggestions
      : studentSuggestions;

  // -----------------------------
  // New interactive states
  // -----------------------------
  const [completed, setCompleted] = useState([]);
  const [activePlan, setActivePlan] = useState(null);

  const toggleCompletion = (index) => {
    setCompleted((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const togglePlan = (index) => {
    setActivePlan((prev) => (prev === index ? null : index));
  };

  const completionRate = Math.round(
    (completed.length / suggestions.length) * 100
  );

  // -----------------------------
  // Render UI
  // -----------------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">AI Suggestions</h1>
        <p className="text-muted-foreground mt-1">
          Personalized recommendations to improve your{" "}
          {user?.role === "marketer" ? "marketing" : "learning"}
        </p>
      </div>

      {/* Progress Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Progress</CardTitle>
          <CardDescription>
            Track how many AI suggestions you've completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm">
              {completed.length} of {suggestions.length} suggestions completed
            </p>
            <p className="text-sm font-semibold text-green-600">
              {completionRate}% done
            </p>
          </div>
          <div className="w-full bg-gray-200 h-2 mt-2 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Suggestion List */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>
            AI-powered suggestions based on your recent activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg transition-colors duration-200 ${
                  completed.includes(index)
                    ? "bg-green-800 border-green-400" // darker green
                    : "bg-accent/5 border-accent/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{suggestion.title}</h4>
                  <Button
                    variant={
                      completed.includes(index) ? "secondary" : "outline"
                    }
                    size="sm"
                    onClick={() => toggleCompletion(index)}
                  >
                    {completed.includes(index)
                      ? "✅ Completed"
                      : "Mark as Done"}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-2">
                  {suggestion.description}
                </p>

                {/* AI Impact Simulation */}
                <div className="mt-3 text-xs text-muted-foreground">
                  Impact Simulation:{" "}
                  <span className="font-semibold text-green-700">
                    {suggestion.impact.before}% → {suggestion.impact.after}% (+
                    {suggestion.impact.after - suggestion.impact.before}%)
                  </span>
                </div>

                {/* View Plan */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3"
                  onClick={() => togglePlan(index)}
                >
                  {activePlan === index ? "Hide Plan" : "View Action Plan"}
                </Button>

                {activePlan === index && (
                  <ul className="mt-2 pl-4 list-disc text-sm text-muted-foreground">
                    {suggestion.plan.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Assistant */}
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
              Get instant answers to your questions about{" "}
              {user?.role === "educator"
                ? "teaching strategies"
                : user?.role === "marketer"
                ? "marketing tactics"
                : "course content"}
            </p>
            <Button
              className="mt-3"
              onClick={() =>
                document
                  .querySelector(".chatbot-toggle")
                  ?.dispatchEvent(new MouseEvent("click"))
              }
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
