import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course } from '@/components/CourseCard';
import { Bundle } from '@/components/BundleCard';
import { useAuth } from './AuthContext';

interface PurchasesContextType {
  enrolledCourses: Course[];
  purchasedBundles: Bundle[];
  enrollInCourse: (course: Course) => void;
  purchaseBundle: (bundle: Bundle) => void;
  isEnrolled: (courseId: string) => boolean;
  isBundlePurchased: (bundleId: string) => boolean;
}

const PurchasesContext = createContext<PurchasesContextType | undefined>(undefined);

export const usePurchases = () => {
  const context = useContext(PurchasesContext);
  if (!context) {
    throw new Error('usePurchases must be used within a PurchasesProvider');
  }
  return context;
};

interface PurchasesProviderProps {
  children: ReactNode;
}

export const PurchasesProvider = ({ children }: PurchasesProviderProps) => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [purchasedBundles, setPurchasedBundles] = useState<Bundle[]>([]);
  const { user } = useAuth();

  // Load enrolled courses and purchased bundles from localStorage on mount
  useEffect(() => {
    if (user) {
      try {
        const storedCourses = localStorage.getItem(`enrolledCourses_${user.id}`);
        if (storedCourses) {
          setEnrolledCourses(JSON.parse(storedCourses));
        }
        
        const storedBundles = localStorage.getItem(`purchasedBundles_${user.id}`);
        if (storedBundles) {
          setPurchasedBundles(JSON.parse(storedBundles));
        }
      } catch (error) {
        console.error('Error loading purchases data:', error);
      }
    }
  }, [user]);

  // Save enrolled courses to localStorage whenever they change
  useEffect(() => {
    if (user && enrolledCourses.length > 0) {
      try {
        localStorage.setItem(`enrolledCourses_${user.id}`, JSON.stringify(enrolledCourses));
      } catch (error) {
        console.error('Error saving enrolled courses:', error);
      }
    }
  }, [enrolledCourses, user]);

  // Save purchased bundles to localStorage whenever they change
  useEffect(() => {
    if (user && purchasedBundles.length >= 0) {
      try {
        localStorage.setItem(`purchasedBundles_${user.id}`, JSON.stringify(purchasedBundles));
      } catch (error) {
        console.error('Error saving purchased bundles:', error);
      }
    }
  }, [purchasedBundles, user]);

  const enrollInCourse = (course: Course) => {
    if (!isEnrolled(course.id)) {
      setEnrolledCourses((prev) => [...prev, course]);
    }
  };

  const purchaseBundle = (bundle: Bundle) => {
    if (!isBundlePurchased(bundle.id)) {
      setPurchasedBundles((prev) => [...prev, bundle]);
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourses.some((course) => course.id === courseId);
  };

  const isBundlePurchased = (bundleId: string) => {
    return purchasedBundles.some((bundle) => bundle.id === bundleId);
  };

  return (
    <PurchasesContext.Provider value={{ 
      enrolledCourses, 
      purchasedBundles,
      enrollInCourse, 
      purchaseBundle,
      isEnrolled,
      isBundlePurchased
    }}>
      {children}
    </PurchasesContext.Provider>
  );
};