import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MarketerDashboard = () => {
  const stats = [
    {
      title: 'Active Bundles',
      value: 8,
      icon: Package,
      trend: { value: 15, isPositive: true },
    },
    {
      title: 'Total Sales',
      value: 456,
      icon: ShoppingCart,
      trend: { value: 23, isPositive: true },
    },
    {
      title: 'Revenue',
      value: '$89,340',
      icon: TrendingUp,
      trend: { value: 18, isPositive: true },
    },
    {
      title: 'Students Enrolled',
      value: 2847,
      icon: Users,
      trend: { value: 12, isPositive: true },
    },
  ];

  const topBundles = [
    { id: '1', title: 'Full Stack Developer Bundle', sales: 89, revenue: 17800 },
    { id: '2', title: 'Data Science Master Bundle', sales: 67, revenue: 13400 },
    { id: '3', title: 'Mobile Development Bundle', sales: 54, revenue: 10800 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketer Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your bundles and marketing performance
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">Create New Bundle</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Bundles</CardTitle>
            <CardDescription>Your best selling course bundles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBundles.map((bundle) => (
                <div
                  key={bundle.id}
                  className="flex items-center justify-between p-4 border border-accent/20 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{bundle.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {bundle.sales} sales
                    </p>
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

        <Card>
          <CardHeader>
            <CardTitle>Marketing Insights</CardTitle>
            <CardDescription>AI-powered recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-accent/50 rounded-lg bg-accent/5">
                <h4 className="font-medium mb-2">Optimize bundle pricing</h4>
                <p className="text-sm text-muted-foreground">
                  Increase discounts to 35% for higher conversion rates
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Apply Changes
                </Button>
              </div>
              <div className="p-4 border border-primary/50 rounded-lg bg-primary/5">
                <h4 className="font-medium mb-2">Target new segments</h4>
                <p className="text-sm text-muted-foreground">
                  Create a beginner-friendly bundle for career switchers
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  View Details
                </Button>
              </div>
              <div className="p-4 border border-success/50 rounded-lg bg-success/5">
                <h4 className="font-medium mb-2">Launch seasonal campaign</h4>
                <p className="text-sm text-muted-foreground">
                  Back-to-school promotion could boost sales by 40%
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Plan Campaign
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketerDashboard;
