import { useState } from 'react';
import { UserRole } from '@/contexts/AuthContext';

export interface AnalyticsData {
  revenue: {
    total: number;
    trend: number;
    chartData: { month: string; value: number }[];
  };
  users: {
    total: number;
    trend: number;
    chartData: { month: string; value: number }[];
  };
  courses: {
    total: number;
    trend: number;
    topPerforming: { id: string; title: string; students: number; revenue: number }[];
  };
  engagement: {
    completionRate: number;
    averageTime: string;
    chartData: { day: string; value: number }[];
  };
}

const MOCK_EDUCATOR_ANALYTICS: AnalyticsData = {
  revenue: {
    total: 45231,
    trend: 15,
    chartData: [
      { month: 'Jan', value: 3200 },
      { month: 'Feb', value: 3800 },
      { month: 'Mar', value: 4100 },
      { month: 'Apr', value: 4500 },
      { month: 'May', value: 4200 },
      { month: 'Jun', value: 4800 },
    ],
  },
  users: {
    total: 1234,
    trend: 12,
    chartData: [
      { month: 'Jan', value: 890 },
      { month: 'Feb', value: 950 },
      { month: 'Mar', value: 1020 },
      { month: 'Apr', value: 1100 },
      { month: 'May', value: 1180 },
      { month: 'Jun', value: 1234 },
    ],
  },
  courses: {
    total: 12,
    trend: 8,
    topPerforming: [
      { id: '1', title: 'Advanced React Patterns', students: 245, revenue: 4900 },
      { id: '2', title: 'TypeScript Fundamentals', students: 389, revenue: 7780 },
      { id: '3', title: 'Node.js Backend Development', students: 167, revenue: 3340 },
    ],
  },
  engagement: {
    completionRate: 78,
    averageTime: '4.5 hrs/week',
    chartData: [
      { day: 'Mon', value: 65 },
      { day: 'Tue', value: 70 },
      { day: 'Wed', value: 75 },
      { day: 'Thu', value: 80 },
      { day: 'Fri', value: 78 },
      { day: 'Sat', value: 72 },
      { day: 'Sun', value: 68 },
    ],
  },
};

const MOCK_MARKETER_ANALYTICS: AnalyticsData = {
  revenue: {
    total: 89340,
    trend: 18,
    chartData: [
      { month: 'Jan', value: 6800 },
      { month: 'Feb', value: 7200 },
      { month: 'Mar', value: 8100 },
      { month: 'Apr', value: 8900 },
      { month: 'May', value: 8500 },
      { month: 'Jun', value: 9200 },
    ],
  },
  users: {
    total: 2847,
    trend: 12,
    chartData: [
      { month: 'Jan', value: 2100 },
      { month: 'Feb', value: 2300 },
      { month: 'Mar', value: 2450 },
      { month: 'Apr', value: 2600 },
      { month: 'May', value: 2720 },
      { month: 'Jun', value: 2847 },
    ],
  },
  courses: {
    total: 8,
    trend: 15,
    topPerforming: [
      { id: '1', title: 'Full Stack Developer Bundle', students: 89, revenue: 17800 },
      { id: '2', title: 'Data Science Master Bundle', students: 67, revenue: 13400 },
      { id: '3', title: 'Mobile Development Bundle', students: 54, revenue: 10800 },
    ],
  },
  engagement: {
    completionRate: 72,
    averageTime: '5.2 hrs/week',
    chartData: [
      { day: 'Mon', value: 68 },
      { day: 'Tue', value: 72 },
      { day: 'Wed', value: 75 },
      { day: 'Thu', value: 78 },
      { day: 'Fri', value: 74 },
      { day: 'Sat', value: 70 },
      { day: 'Sun', value: 65 },
    ],
  },
};

const MOCK_STUDENT_ANALYTICS: AnalyticsData = {
  revenue: {
    total: 0,
    trend: 0,
    chartData: [],
  },
  users: {
    total: 0,
    trend: 0,
    chartData: [],
  },
  courses: {
    total: 5,
    trend: 0,
    topPerforming: [
      { id: '1', title: 'Advanced React Patterns', students: 0, revenue: 0 },
      { id: '2', title: 'TypeScript Fundamentals', students: 0, revenue: 0 },
    ],
  },
  engagement: {
    completionRate: 68,
    averageTime: '3.5 hrs/week',
    chartData: [
      { day: 'Mon', value: 60 },
      { day: 'Tue', value: 65 },
      { day: 'Wed', value: 70 },
      { day: 'Thu', value: 72 },
      { day: 'Fri', value: 68 },
      { day: 'Sat', value: 55 },
      { day: 'Sun', value: 50 },
    ],
  },
};

export const useAnalytics = (role: UserRole) => {
  const [loading, setLoading] = useState(false);

  const getAnalyticsData = (): AnalyticsData => {
    switch (role) {
      case 'educator':
        return MOCK_EDUCATOR_ANALYTICS;
      case 'marketer':
        return MOCK_MARKETER_ANALYTICS;
      case 'student':
        return MOCK_STUDENT_ANALYTICS;
      default:
        return MOCK_STUDENT_ANALYTICS;
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    return getAnalyticsData();
  };

  return {
    loading,
    analytics: getAnalyticsData(),
    fetchAnalytics,
  };
};
