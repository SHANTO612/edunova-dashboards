import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Users, Award, Video } from 'lucide-react';
import { useCourses } from '@/hooks/useCourses';
import { useAuth } from '@/contexts/AuthContext';
import { usePurchases } from '@/contexts/PurchasesContext';
import { useReviews } from '@/contexts/ReviewsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Course } from '@/types/course';
import { useToast } from '@/hooks/use-toast';
import ReviewForm from '@/components/ReviewForm';
import ReviewsList from '@/components/ReviewsList';
import PaymentModal from '@/components/PaymentModal';
import CourseContentModal from '@/components/modals/CourseContentModal';



const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getCourseById } = useCourses();
  const { enrollInCourse, isEnrolled } = usePurchases();
  const { getUserReview } = useReviews();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
      let mounted = true;

      const fetchCourse = async () => {
        if (!id) return;
        try {
          const courseData = await getCourseById(id);
          if (mounted) {
            setCourse(courseData || null);
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching course:', error);
          if (mounted) {
            setCourse(null);
            setLoading(false);
          }
        }
      };

      fetchCourse();

      return () => {
        mounted = false;
      };
    }, [id, getCourseById]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-secondary/50 w-48 rounded" />
        <div className="h-96 bg-secondary/50 rounded-lg" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Course not found</p>
        <Button onClick={() => navigate('/courses')} className="mt-4">
          Back to Courses
        </Button>
      </div>
    );
  }

  const handleEnrollClick = () => {
    if (isEnrolled(course.id)) {
      navigate('/purchases/student');
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentComplete = () => {
    enrollInCourse(course);
    toast({
      title: "Enrollment Successful",
      description: `You have successfully enrolled in ${course.title}`,
    });
    navigate('/purchases/student');
    setShowPaymentModal(false);
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <BookOpen className="h-24 w-24 text-primary/40" />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-base">
                    Instructor: {course.instructor}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {course.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{course.description}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="curriculum" className="flex-1">Curriculum</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>What you'll learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Master the fundamentals and advanced concepts</li>
                    <li>Build real-world projects from scratch</li>
                    <li>Learn industry best practices</li>
                    <li>Get hands-on experience with practical exercises</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="curriculum" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.modules && course.modules.length > 0 ? (
                      course.modules.map((module) => (
                        <div key={module.id} className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">{module.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {module.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{module.duration}</span>
                            {module.videoUploaded && (
                              <span className="flex items-center gap-1">
                                • <Video className="h-4 w-4" /> Video available
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No modules available for this course.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReviewsList courseId={course.id} />
                  
                  {isEnrolled(course.id) && (
                    <div className="mt-8 border-t pt-6">
                      <h4 className="font-medium mb-4">Write a Review</h4>
                      <ReviewForm 
                        courseId={course.id} 
                        onReviewSubmitted={() => {
                          // Force re-render
                          setCourse({...course});
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">${course.price}</CardTitle>
              <CardDescription>One-time payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.role === 'student' && (
                isEnrolled(course.id) ? (
                  <Button 
                    className="w-full" 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate('/purchases/student')}
                  >
                    View My Courses
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleEnrollClick}
                  >
                    Enroll Now
                  </Button>
                )
              )}
              {user?.role === 'marketer' && (
                <Button className="w-full" size="lg">
                  License Course
                </Button>
              )}
              {user?.role === 'educator' && (
                <Button 
                  className="w-full" 
                  size="lg" 
                  variant="outline"
                  onClick={() => setShowEditModal(true)}
                >
                  Edit Course
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">{course.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Students Enrolled</p>
                  <p className="text-sm text-muted-foreground">{course.students}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Certificate</p>
                  <p className="text-sm text-muted-foreground">Included</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {showPaymentModal && (
        <PaymentModal
          open={showPaymentModal}
          onOpenChange={setShowPaymentModal}
          item={course}
          itemType="course"
          onPaymentComplete={handlePaymentComplete}
        />
      )}
      
      <CourseContentModal 
        open={showEditModal} 
        onOpenChange={async (open) => {
          setShowEditModal(open);
          if (!open) {
            // Refresh course data when modal closes
            if (id) {
              const refreshedCourse = await getCourseById(id);
              setCourse(refreshedCourse);
            }
          }
        }} 
        editCourse={course} 
      />
    </div>
  );
};

export default CourseDetail;
