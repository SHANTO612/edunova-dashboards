import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/hooks/useCourses';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CourseCard, { Course } from '@/components/CourseCard';
import CreateCourseModal from '@/components/modals/CreateCourseModal';

const CoursesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courses, getCourses, loading } = useCourses();
  const [searchQuery, setSearchQuery] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredCourses(
        courses.filter(
          (course) =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredCourses(courses);
    }
  }, [searchQuery, courses]);

  const handleCourseAction = (course: Course) => {
    navigate(`/courses/${course.id}`);
  };

  const getActionLabel = () => {
    switch (user?.role) {
      case 'educator':
        return 'Manage Course';
      case 'marketer':
        return 'License Course';
      case 'student':
        return 'Enroll Now';
      default:
        return 'View Course';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground mt-1">
            {user?.role === 'educator' && 'Manage your courses'}
            {user?.role === 'marketer' && 'License courses for your bundles'}
            {user?.role === 'student' && 'Discover and enroll in courses'}
          </p>
        </div>
        {user?.role === 'educator' && (
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        )}
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search courses by title or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 bg-secondary/50 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onAction={handleCourseAction}
              actionLabel={getActionLabel()}
            />
          ))}
        </div>
      )}

      {!loading && filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found</p>
        </div>
      )}

      <CreateCourseModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </div>
  );
};

export default CoursesPage;
