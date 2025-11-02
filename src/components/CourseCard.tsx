import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Users } from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  price: number;
  category: string;
  thumbnail?: string;
}

interface CourseCardProps {
  course: Course;
  onAction?: (course: Course) => void;
  actionLabel?: string;
}

const CourseCard = ({ course, onAction, actionLabel = 'View Course' }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <BookOpen className="h-16 w-16 text-primary/40" />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
          <Badge variant="secondary">{course.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{course.students} students</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">${course.price}</span>
        {onAction && (
          <Button onClick={() => onAction(course)}>{actionLabel}</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
