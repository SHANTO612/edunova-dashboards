import { useAnalytics } from '@/hooks/useAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, BookOpen, TrendingUp } from 'lucide-react';
import StatCard from '@/components/StatCard';
import ChartPlaceholder from '@/components/ChartPlaceholder';

const EducatorAnalytics = () => {
  const { analytics } = useAnalytics('educator');

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${analytics.revenue.total.toLocaleString()}`,
      icon: DollarSign,
      trend: { value: analytics.revenue.trend, isPositive: true },
    },
    {
      title: 'Total Students',
      value: analytics.users.total,
      icon: Users,
      trend: { value: analytics.users.trend, isPositive: true },
    },
    {
      title: 'Active Courses',
      value: analytics.courses.total,
      icon: BookOpen,
      trend: { value: analytics.courses.trend, isPositive: true },
    },
    {
      title: 'Completion Rate',
      value: `${analytics.engagement.completionRate}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Educator Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your teaching performance and revenue
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder
          title="Revenue Over Time"
          description="Monthly revenue trends"
          data={analytics.revenue.chartData}
          type="line"
          dataKey="value"
          xAxisKey="month"
        />
        <ChartPlaceholder
          title="Student Growth"
          description="Total enrolled students"
          data={analytics.users.chartData}
          type="bar"
          dataKey="value"
          xAxisKey="month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Courses</CardTitle>
            <CardDescription>Your best courses by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.courses.topPerforming.map((course, index) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.students} students
                      </p>
                    </div>
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

        <ChartPlaceholder
          title="Weekly Engagement"
          description="Student activity throughout the week"
          data={analytics.engagement.chartData}
          type="bar"
          dataKey="value"
          xAxisKey="day"
          height={300}
        />
      </div>
    </div>
  );
};

export default EducatorAnalytics;
