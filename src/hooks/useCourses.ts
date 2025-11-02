import { useState, useEffect, useCallback } from 'react';
import { Course } from '@/components/CourseCard';

const MOCK_COURSES: Course[] = [
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
  {
    id: '6',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps',
    instructor: 'Lisa Park',
    duration: '9 weeks',
    students: 234,
    price: 129,
    category: 'Mobile',
  },
  {
    id: '7',
    title: 'Intro to SQL and Databases',
    description: 'Relational databases, queries and performance basics',
    instructor: 'Robert King',
    duration: '4 weeks',
    students: 412,
    price: 59,
    category: 'Data',
  },
  {
    id: '8',
    title: 'Kubernetes for Developers',
    description: 'Deploy and manage containerized applications at scale',
    instructor: 'Nina Patel',
    duration: '6 weeks',
    students: 198,
    price: 129,
    category: 'DevOps',
  },
  {
    id: '9',
    title: 'GraphQL APIs',
    description: 'Design and implement GraphQL servers and clients',
    instructor: 'Ethan Brooks',
    duration: '5 weeks',
    students: 150,
    price: 89,
    category: 'Backend',
  },
  {
    id: '10',
    title: 'Design Systems with Figma',
    description: 'Create and maintain scalable design systems',
    instructor: 'Olivia Gomez',
    duration: '3 weeks',
    students: 320,
    price: 49,
    category: 'Design',
  },
];

export const useCourses = () => {
  const loadCourses = useCallback((): Course[] => {
    try {
      const raw = localStorage.getItem('courses');
      if (raw) return JSON.parse(raw) as Course[];
    } catch (_) {}
    return MOCK_COURSES;
  }, []);

  const [courses, setCourses] = useState<Course[]>(loadCourses());
  const [loading, setLoading] = useState(false);

  const getCourses = useCallback(async () => {
    setLoading(true);
    try {
      // Load courses from localStorage or use mock data
      const loadedCourses = loadCourses();
      console.log('Loaded courses:', loadedCourses);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCourses(loadedCourses);
      return loadedCourses;
    } catch (error) {
      console.error('Error loading courses:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [loadCourses]);

  const getCourseById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return courses.find((course) => course.id === id) || null;
    } catch (error) {
      console.error('Error getting course by id:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [courses]);

  const createCourse = useCallback(async (courseData: Omit<Course, 'id' | 'students'>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newCourse: Course = {
      ...courseData,
      id: String(Date.now()),
      students: 0,
    };
    const updated = [...courses, newCourse];
    setCourses(updated);
    try {
      localStorage.setItem('courses', JSON.stringify(updated));
    } catch (_) {}
    setLoading(false);
    return newCourse;
  }, [courses]);

  const updateCourse = useCallback(async (id: string, courseData: Partial<Course>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const updated = courses.map((course) =>
      course.id === id ? { ...course, ...courseData } : course
    );
    setCourses(updated);
    try {
      localStorage.setItem('courses', JSON.stringify(updated));
    } catch (_) {}
    setLoading(false);
  }, [courses]);

  const deleteCourse = useCallback(async (id: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const updated = courses.filter((course) => course.id !== id);
    setCourses(updated);
    try {
      localStorage.setItem('courses', JSON.stringify(updated));
    } catch (_) {}
    setLoading(false);
  }, [courses]);

  return {
    courses,
    loading,
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};
