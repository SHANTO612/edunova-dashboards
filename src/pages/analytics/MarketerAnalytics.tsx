import { useAnalytics } from '@/hooks/useAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Package, TrendingUp } from 'lucide-react';
import StatCard from '@/components/StatCard';
import ChartPlaceholder from '@/components/ChartPlaceholder';

const MarketerAnalytics = () => {
  const { analytics } = useAnalytics('marketer');

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
      title: 'Active Bundles',
      value: analytics.courses.total,
      icon: Package,
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
        <h1 className="text-3xl font-bold">Marketer Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your bundles and marketing performance
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
          description="Monthly bundle sales"
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
            <CardTitle>Top Performing Bundles</CardTitle>
            <CardDescription>Your best bundles by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.courses.topPerforming.map((bundle, index) => (
                <div
                  key={bundle.id}
                  className="flex items-center justify-between p-4 border border-accent/20 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full">
                      <span className="text-sm font-bold text-accent">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{bundle.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {bundle.students} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-accent">${bundle.revenue}</p>
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

export default MarketerAnalytics;
