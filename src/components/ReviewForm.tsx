import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useReviews } from '@/contexts/ReviewsContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReviewFormProps {
  courseId: string;
  onReviewSubmitted?: () => void;
}

const ReviewForm = ({ courseId, onReviewSubmitted }: ReviewFormProps) => {
  const { user } = useAuth();
  const { addReview, getUserReview } = useReviews();
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const existingReview = user ? getUserReview(user.id, courseId) : undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to leave a review",
        variant: "destructive",
      });
      return;
    }
    
    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment for your review",
        variant: "destructive",
      });
      return;
    }
    
    addReview({
      userId: user.id,
      userName: user.name || user.email.split('@')[0],
      courseId,
      rating,
      comment,
    });
    
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    
    setComment('');
    setRating(5);
    
    // Call the onReviewSubmitted callback if provided
    if (onReviewSubmitted) {
      onReviewSubmitted();
    }
  };

  if (existingReview) {
    return (
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          You've already reviewed this course. Thank you for your feedback!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              className="p-1"
            >
              <Star
                className={`h-6 w-6 ${
                  (hoveredRating !== null ? star <= hoveredRating : star <= rating)
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="comment" className="block text-sm font-medium mb-2">
          Your Review
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this course..."
          rows={4}
        />
      </div>
      
      <Button type="submit">Submit Review</Button>
    </form>
  );
};

export default ReviewForm;