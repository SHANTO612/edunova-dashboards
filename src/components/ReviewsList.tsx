import { useReviews, Review } from '@/contexts/ReviewsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewsListProps {
  courseId: string;
}

const ReviewsList = ({ courseId }: ReviewsListProps) => {
  const { getCourseReviews, getAverageRating } = useReviews();
  const reviews = getCourseReviews(courseId);
  const averageRating = getAverageRating(courseId);

  if (reviews.length === 0) {
    return <p className="text-muted-foreground">No reviews yet</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= Math.round(averageRating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="font-medium">
          {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
        </span>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">{review.userName}</p>
            <div className="flex mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(review.date), 'MMM d, yyyy')}
          </p>
        </div>
        <p className="mt-3 text-muted-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewsList;