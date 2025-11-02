import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Package, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: 'Create Courses',
      description: 'Build and share your knowledge with AI-powered content generation',
    },
    {
      icon: Package,
      title: 'Bundle & Sell',
      description: 'Create course bundles with smart pricing and discounts',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Automatic transcription, quiz generation, and content recommendations',
    },
    {
      icon: TrendingUp,
      title: 'Analytics',
      description: 'Track performance and optimize your courses with data insights',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-20 w-20 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            SynapseX - AI-Powered EdTech Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Transform the way you teach, market, and learn with intelligent course management
            and automated content generation
          </p>
          <div className="flex gap-4 justify-center">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to={`/dashboard/${user?.role}`}>Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of educators, marketers, and students already using our platform
          </p>
          {!isAuthenticated && (
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <Link to="/register">Create Your Free Account</Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
