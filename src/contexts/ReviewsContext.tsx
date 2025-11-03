import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'userId' | 'userName' | 'date'>) => void;
  getCourseReviews: (courseId: string) => Review[];
  getUserReview: (courseId: string, userId: string) => Review | undefined;
  getAverageRating: (courseId: string) => number;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

interface ReviewsProviderProps {
  children: ReactNode;
}

export const ReviewsProvider = ({ children }: ReviewsProviderProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useAuth();

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const storedReviews = localStorage.getItem('course_reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    if (reviews.length > 0) {
      try {
        localStorage.setItem('course_reviews', JSON.stringify(reviews));
      } catch (error) {
        console.error('Error saving reviews:', error);
      }
    }
  }, [reviews]);

  const addReview = (reviewData: Omit<Review, 'id' | 'userId' | 'userName' | 'date'>) => {
    if (!user) return;
    
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      date: new Date().toISOString(),
    };

    // Remove existing review by this user for this course if it exists
    const filteredReviews = reviews.filter(
      (r) => !(r.courseId === reviewData.courseId && r.userId === user.id)
    );

    setReviews([...filteredReviews, newReview]);
  };

  const getCourseReviews = (courseId: string) => {
    return reviews.filter((review) => review.courseId === courseId);
  };

  const getUserReview = (courseId: string, userId: string) => {
    return reviews.find((review) => review.courseId === courseId && review.userId === userId);
  };

  const getAverageRating = (courseId: string) => {
    const courseReviews = getCourseReviews(courseId);
    if (courseReviews.length === 0) return 0;
    
    const sum = courseReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / courseReviews.length;
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getCourseReviews, getUserReview, getAverageRating }}>
      {children}
    </ReviewsContext.Provider>
  );
};