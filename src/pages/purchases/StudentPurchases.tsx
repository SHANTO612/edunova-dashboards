import { usePurchases } from '@/contexts/PurchasesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StudentPurchases = () => {
  const { enrolledCourses, purchasedBundles } = usePurchases();
  const navigate = useNavigate();

  const hasNoPurchases = enrolledCourses.length === 0 && purchasedBundles.length === 0;

  if (hasNoPurchases) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No purchases yet</h2>
        <p className="text-muted-foreground mb-6">
          You haven't enrolled in any courses or purchased any bundles yet.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/courses/role/student')}>
            Browse Courses
          </Button>
          <Button onClick={() => navigate('/bundles')} variant="outline">
            Browse Bundles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="courses">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">My Purchases</h2>
          <TabsList>
            <TabsTrigger value="courses">Courses ({enrolledCourses.length})</TabsTrigger>
            <TabsTrigger value="bundles">Bundles ({purchasedBundles.length})</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="courses" className="mt-0">
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">You haven't enrolled in any courses yet.</p>
              <Button onClick={() => navigate('/courses/role/student')} className="mt-4">
                Browse Courses
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-primary/40" />
                  </div>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>Instructor: {course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      Continue Learning
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="bundles" className="mt-0">
          {purchasedBundles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">You haven't purchased any bundles yet.</p>
              <Button onClick={() => navigate('/bundles')} className="mt-4">
                Browse Bundles
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedBundles.map((bundle) => (
                <Card key={bundle.id} className="overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <Package className="h-12 w-12 text-accent/40" />
                  </div>
                  <CardHeader>
                    <CardTitle>{bundle.title}</CardTitle>
                    <CardDescription>{bundle.courses} courses included</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{bundle.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/bundles/${bundle.id}`)}
                    >
                      View Bundle
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentPurchases;