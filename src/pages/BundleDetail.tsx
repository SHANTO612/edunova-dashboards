import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, BookOpen, Percent, Check, Star } from 'lucide-react';
import { useBundles } from '@/hooks/useBundles';
import { useAuth } from '@/contexts/AuthContext';
import { usePurchases } from '@/contexts/PurchasesContext';
import { useReviews } from '@/contexts/ReviewsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bundle } from '@/components/BundleCard';
import { toast } from '@/components/ui/use-toast';
import PaymentModal from '@/components/PaymentModal';
import ReviewForm from '@/components/ReviewForm';
import ReviewsList from '@/components/ReviewsList';

const BundleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getBundleById } = useBundles();
  const { purchaseBundle, isBundlePurchased } = usePurchases();
  const { getCourseReviews, getAverageRating } = useReviews();
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchBundle = async () => {
      if (id) {
        const bundleData = await getBundleById(id);
        setBundle(bundleData || null);
        setLoading(false);
      }
    };
    fetchBundle();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-secondary/50 w-48 rounded" />
        <div className="h-96 bg-secondary/50 rounded-lg" />
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Bundle not found</p>
        <Button onClick={() => navigate('/bundles')} className="mt-4">
          Back to Bundles
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2 border-accent/20">
            <div className="h-64 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
              <Package className="h-24 w-24 text-accent/40" />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl mb-2">{bundle.title}</CardTitle>
                  <CardDescription className="text-base">
                    {bundle.description}
                  </CardDescription>
                </div>
                <Badge className="bg-accent text-accent-foreground">
                  <Percent className="h-3 w-3 mr-1" />
                  {bundle.discount}% OFF
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="courses" className="flex-1">Courses</TabsTrigger>
              <TabsTrigger value="progress" className="flex-1">Progress</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>What you'll get</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Access to all {bundle.courses} courses</li>
                    <li>Lifetime access to course content</li>
                    <li>Certificates for each course</li>
                    <li>Priority support</li>
                    <li>Exclusive community access</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Included Courses</CardTitle>
                  <CardDescription>
                    This bundle includes {bundle.courses} premium courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from({ length: bundle.courses }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <BookOpen className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Course {index + 1}</p>
                          <p className="text-sm text-muted-foreground">
                            Full access included
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Track your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: bundle.courses }).map((_, index) => {
                      // Calculate random progress for demo purposes
                      const progress = Math.floor(Math.random() * 100);
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">Course {index + 1}</h4>
                            <span className="text-sm font-medium text-primary">
                              {progress}%
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          
                          {/* Module slots */}
                          <div className="mt-3 space-y-2">
                            {Array.from({ length: 4 }).map((_, moduleIndex) => {
                              const moduleProgress = Math.min(100, progress + (moduleIndex * 10) - 20);
                              const isCompleted = moduleProgress >= 100;
                              return (
                                <div key={moduleIndex} className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'border border-gray-300'}`}>
                                    {isCompleted && <Check className="h-3 w-3 text-white" />}
                                  </div>
                                  <span className="text-sm">Module {moduleIndex + 1}</span>
                                  {isCompleted && <span className="text-xs text-green-500 ml-auto">Completed</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
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
                  {id && <ReviewsList courseId={id} />}
                  
                  {id && isBundlePurchased(id) && (
                    <div className="mt-8 border-t pt-6">
                      <h4 className="font-medium mb-4">Write a Review</h4>
                      <ReviewForm 
                        courseId={id} 
                        onReviewSubmitted={() => {
                          // Force re-render
                          if (bundle) {
                            setBundle({...bundle});
                          }
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
          <Card className="border-2 border-accent/20">
            <CardHeader>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground line-through">
                  ${bundle.originalPrice}
                </p>
                <CardTitle className="text-3xl text-accent">
                  ${bundle.discountedPrice}
                </CardTitle>
                <CardDescription>
                  Save ${bundle.originalPrice - bundle.discountedPrice}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.role === 'student' && (
                isBundlePurchased(bundle.id) ? (
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg" disabled>
                    <Check className="mr-2 h-4 w-4" /> Purchased
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90" 
                    size="lg"
                    onClick={() => setShowPaymentModal(true)}
                    disabled={isPurchasing}
                  >
                    Purchase Bundle
                  </Button>
                )
              )}
              {user?.role === 'marketer' && (
                <Button className="w-full bg-accent hover:bg-accent/90" size="lg" variant="outline">
                  Edit Bundle
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bundle Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Percent className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Best Value</p>
                  <p className="text-sm text-muted-foreground">
                    Save {bundle.discount}% compared to buying individually
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Complete Learning Path</p>
                  <p className="text-sm text-muted-foreground">
                    Carefully curated courses for your success
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      {bundle && (
        <PaymentModal
          open={showPaymentModal}
          onOpenChange={setShowPaymentModal}
          item={bundle}
          itemType="bundle"
          onPaymentComplete={() => {
            setIsPurchasing(true);
            setTimeout(() => {
              purchaseBundle(bundle);
              setIsPurchasing(false);
              toast({
                title: "Bundle purchased!",
                description: `You now have access to ${bundle.title}`,
              });
            }, 1000);
          }}
        />
      )}
    </div>
  );
};

export default BundleDetail;
