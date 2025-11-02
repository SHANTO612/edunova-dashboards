import { BookOpen, Clock, Award, Target } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const StudentDashboard = () => {
  const stats = [
    {
      title: 'Enrolled Courses',
      value: 5,
      icon: BookOpen,
      description: '2 in progress',
    },
    {
      title: 'Learning Hours',
      value: 48,
      icon: Clock,
      description: 'This month',
    },
    {
      title: 'Certificates',
      value: 3,
      icon: Award,
      description: 'Earned',
    },
    {
      title: 'Completion Rate',
      value: '68%',
      icon: Target,
      description: 'Keep going!',
    },
  ];

  const activeCourses = [
    { id: '1', title: 'Advanced React Patterns', progress: 65, nextLesson: 'Custom Hooks' },
    { id: '2', title: 'TypeScript Fundamentals', progress: 30, nextLesson: 'Generics' },
  ];

  const recommendedCourses = [
    { id: '1', title: 'Node.js Backend Development', reason: 'Complements your React skills' },
    { id: '2', title: 'GraphQL & Apollo', reason: 'Popular with React developers' },
    { id: '3', title: 'Testing with Jest', reason: 'Essential for production apps' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Continue your learning journey
          </p>
        </div>
        <Button>Browse Courses</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{course.title}</h3>
                    <span className="text-sm font-medium text-primary">
                      {course.progress}%
                    </span>
                  </div>
                  <Progress value={course.progress} className="mb-3" />
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Next: {course.nextLesson}
                    </p>
                    <Button size="sm">Continue</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Based on your learning path</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 border border-primary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <h4 className="font-medium mb-2">{course.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {course.reason}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Course
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
