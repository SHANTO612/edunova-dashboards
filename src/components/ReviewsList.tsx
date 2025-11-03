import { useReviews } from '@/contexts/ReviewsContext';
import { Star } from 'lucide-react';

interface ReviewsListProps {
  courseId: string;
}

const ReviewsList = ({ courseId }: ReviewsListProps) => {
  const { getCourseReviews } = useReviews();
  const reviews = getCourseReviews(courseId);

  if (reviews.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No reviews yet. Be the first to review this course!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4 last:border-0">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">{review.userName}</div>
            <div className="text-sm text-muted-foreground">{review.date}</div>
          </div>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;