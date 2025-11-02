import { useAnalytics } from '@/hooks/useAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Award, Target } from 'lucide-react';
import StatCard from '@/components/StatCard';
import ChartPlaceholder from '@/components/ChartPlaceholder';

const StudentAnalytics = () => {
  const { analytics } = useAnalytics('student');

  const stats = [
    {
      title: 'Enrolled Courses',
      value: analytics.courses.total,
      icon: BookOpen,
      description: '2 in progress',
    },
    {
      title: 'Learning Time',
      value: analytics.engagement.averageTime,
      icon: Clock,
      description: 'This week',
    },
    {
      title: 'Certificates',
      value: 3,
      icon: Award,
      description: 'Earned',
    },
    {
      title: 'Completion Rate',
      value: `${analytics.engagement.completionRate}%`,
      icon: Target,
      description: 'Keep going!',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Learning Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your learning progress and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder
          title="Weekly Learning Activity"
          description="Your study time throughout the week"
          data={analytics.engagement.chartData}
          type="bar"
          dataKey="value"
          xAxisKey="day"
          height={350}
        />

        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your enrolled courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.courses.topPerforming.map((course, index) => (
                <div
                  key={course.id}
                  className="p-4 border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{course.title}</h3>
                    <span className="text-sm font-medium text-primary">
                      {(index + 1) * 30}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(index + 1) * 30}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Your learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'First Course', description: 'Completed your first course', earned: true },
              { title: 'Fast Learner', description: 'Completed 3 courses in a month', earned: true },
              { title: 'Perfect Score', description: 'Score 100% on any quiz', earned: false },
            ].map((achievement) => (
              <div
                key={achievement.title}
                className={`p-4 border rounded-lg ${
                  achievement.earned ? 'border-primary/50 bg-primary/5' : 'opacity-50'
                }`}
              >
                <Award className={`h-8 w-8 mb-2 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                <h4 className="font-medium mb-1">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAnalytics;
