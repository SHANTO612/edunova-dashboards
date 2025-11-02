// Demo data and seeding utilities
export const DEMO_COURSES = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Master advanced React patterns including render props, HOCs, and custom hooks',
    instructor: 'Sarah Johnson',
    duration: '8 weeks',
    students: 245,
    price: 99,
    category: 'Web Development',
  },
  {
    id: '2',
    title: 'TypeScript Fundamentals',
    description: 'Learn TypeScript from basics to advanced type systems',
    instructor: 'Mike Chen',
    duration: '6 weeks',
    students: 389,
    price: 79,
    category: 'Programming',
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js and Express',
    instructor: 'Alex Rodriguez',
    duration: '10 weeks',
    students: 167,
    price: 119,
    category: 'Backend',
  },
  {
    id: '4',
    title: 'UI/UX Design Principles',
    description: 'Design beautiful and intuitive user interfaces',
    instructor: 'Emma Watson',
    duration: '5 weeks',
    students: 512,
    price: 89,
    category: 'Design',
  },
  {
    id: '5',
    title: 'Python for Data Science',
    description: 'Analyze data and build ML models with Python',
    instructor: 'David Lee',
    duration: '12 weeks',
    students: 678,
    price: 149,
    category: 'Data Science',
  },
];

export const DEMO_BUNDLES = [
  {
    id: '1',
    title: 'Full Stack Developer Bundle',
    description: 'Complete path from frontend to backend development',
    courses: 5,
    originalPrice: 500,
    discountedPrice: 300,
    discount: 40,
  },
  {
    id: '2',
    title: 'Data Science Master Bundle',
    description: 'Everything you need to become a data scientist',
    courses: 6,
    originalPrice: 600,
    discountedPrice: 360,
    discount: 40,
  },
  {
    id: '3',
    title: 'Mobile Development Bundle',
    description: 'Build iOS and Android apps from scratch',
    courses: 4,
    originalPrice: 400,
    discountedPrice: 260,
    discount: 35,
  },
  {
    id: '4',
    title: 'UI/UX Design Complete Bundle',
    description: 'Master design thinking and user experience',
    courses: 7,
    originalPrice: 550,
    discountedPrice: 330,
    discount: 40,
  },
  {
    id: '5',
    title: 'DevOps Engineer Bundle',
    description: 'Learn CI/CD, Docker, Kubernetes and cloud platforms',
    courses: 5,
    originalPrice: 480,
    discountedPrice: 312,
    discount: 35,
  },
];

// Force seed demo data (overwrites existing)
export const forceSeedDemoData = () => {
  console.log('Force seeding demo data...');
  localStorage.setItem('courses', JSON.stringify(DEMO_COURSES));
  localStorage.setItem('bundles', JSON.stringify(DEMO_BUNDLES));
};

// Check if demo data exists
export const hasDemoData = () => {
  const courses = localStorage.getItem('courses');
  const bundles = localStorage.getItem('bundles');
  return courses !== null && bundles !== null;
};

// Initialize demo data if not present
export const initDemoData = () => {
  console.log('Checking demo data...');
  if (!hasDemoData()) {
    console.log('No demo data found, seeding...');
    forceSeedDemoData();
  }
};

export default {
  DEMO_COURSES,
  DEMO_BUNDLES,
  forceSeedDemoData,
  hasDemoData,
  initDemoData,
};