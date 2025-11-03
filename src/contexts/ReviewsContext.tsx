import { createContext, useContext, useState, ReactNode } from 'react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getUserReview: (userId: string, courseId: string) => Review | undefined;
  getCourseReviews: (courseId: string) => Review[];
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

// Sample reviews data
const initialReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    courseId: '1',
    rating: 5,
    comment: 'Excellent course! I learned a lot about React patterns.',
    date: '2023-10-15',
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Jane Smith',
    courseId: '1',
    rating: 4,
    comment: 'Very informative content, but could use more examples.',
    date: '2023-10-10',
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Mike Johnson',
    courseId: '2',
    rating: 5,
    comment: 'The TypeScript explanations were clear and concise.',
    date: '2023-09-28',
  },
];

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const getUserReview = (userId: string, courseId: string) => {
    return reviews.find((review) => review.userId === userId && review.courseId === courseId);
  };

  const getCourseReviews = (courseId: string) => {
    return reviews.filter((review) => review.courseId === courseId);
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getUserReview,
        getCourseReviews,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};