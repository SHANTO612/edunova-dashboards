import { useState } from 'react';
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
];

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    return courses;
  };

  const getCourseById = async (id: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
    return courses.find((course) => course.id === id);
  };

  const createCourse = async (courseData: Omit<Course, 'id' | 'students'>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newCourse: Course = {
      ...courseData,
      id: String(courses.length + 1),
      students: 0,
    };
    setCourses([...courses, newCourse]);
    setLoading(false);
    return newCourse;
  };

  const updateCourse = async (id: string, courseData: Partial<Course>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, ...courseData } : course
      )
    );
    setLoading(false);
  };

  const deleteCourse = async (id: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCourses(courses.filter((course) => course.id !== id));
    setLoading(false);
  };

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
