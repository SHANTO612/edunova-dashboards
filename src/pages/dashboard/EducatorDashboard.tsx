import { BookOpen, Users, DollarSign, TrendingUp } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const EducatorDashboard = () => {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: 'Total Courses',
      value: 12,
      icon: BookOpen,
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Total Students',
      value: 1234,
      icon: Users,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Revenue',
      value: '$45,231',
      icon: DollarSign,
      trend: { value: 15, isPositive: true },
    },
    {
      title: 'Course Completion Rate',
      value: '78%',
      icon: TrendingUp,
      trend: { value: 5, isPositive: true },
    },
  ];

  const recentCourses = [
    { id: '1', title: 'Advanced React Patterns', students: 245, revenue: 4900 },
    { id: '2', title: 'TypeScript Fundamentals', students: 389, revenue: 7780 },
    { id: '3', title: 'Node.js Backend Development', students: 167, revenue: 3340 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Educator Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your courses and track your teaching impact
          </p>
        </div>
        <Button>Create New Course</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Courses</CardTitle>
            <CardDescription>Your most popular courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.students} students
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">${course.revenue}</p>
                    <p className="text-xs text-muted-foreground">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
            <CardDescription>Recommendations to improve your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-accent/50 rounded-lg bg-accent/5">
                <h4 className="font-medium mb-2">Add interactive quizzes</h4>
                <p className="text-sm text-muted-foreground">
                  Courses with quizzes have 35% higher completion rates
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Generate Quizzes
                </Button>
              </div>
              <div className="p-4 border border-primary/50 rounded-lg bg-primary/5">
                <h4 className="font-medium mb-2">Update course content</h4>
                <p className="text-sm text-muted-foreground">
                  Your React course could benefit from latest v18 features
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  View Suggestions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducatorDashboard;
