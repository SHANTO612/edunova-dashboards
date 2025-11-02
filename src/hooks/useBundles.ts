import { useState } from 'react';
import { Bundle } from '@/components/BundleCard';

const MOCK_BUNDLES: Bundle[] = [
  {
    id: '1',
    title: 'Full Stack Developer Bundle',
    description: 'Complete path from frontend to backend development',
    courses: 5,
    originalPrice: 500,
    discountedPrice: 300,
    discount: 40,
  },
  {
    id: '2',
    title: 'Data Science Master Bundle',
    description: 'Everything you need to become a data scientist',
    courses: 6,
    originalPrice: 600,
    discountedPrice: 360,
    discount: 40,
  },
  {
    id: '3',
    title: 'Mobile Development Bundle',
    description: 'Build iOS and Android apps from scratch',
    courses: 4,
    originalPrice: 400,
    discountedPrice: 260,
    discount: 35,
  },
  {
    id: '4',
    title: 'UI/UX Design Complete Bundle',
    description: 'Master design thinking and user experience',
    courses: 7,
    originalPrice: 550,
    discountedPrice: 330,
    discount: 40,
  },
  {
    id: '5',
    title: 'DevOps Engineer Bundle',
    description: 'Learn CI/CD, Docker, Kubernetes and cloud platforms',
    courses: 5,
    originalPrice: 480,
    discountedPrice: 312,
    discount: 35,
  },
];

export const useBundles = () => {
  const [bundles, setBundles] = useState<Bundle[]>(MOCK_BUNDLES);
  const [loading, setLoading] = useState(false);

  const getBundles = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    return bundles;
  };

  const getBundleById = async (id: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
    return bundles.find((bundle) => bundle.id === id);
  };

  const createBundle = async (bundleData: Omit<Bundle, 'id'>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newBundle: Bundle = {
      ...bundleData,
      id: String(bundles.length + 1),
    };
    setBundles([...bundles, newBundle]);
    setLoading(false);
    return newBundle;
  };

  const updateBundle = async (id: string, bundleData: Partial<Bundle>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setBundles(
      bundles.map((bundle) =>
        bundle.id === id ? { ...bundle, ...bundleData } : bundle
      )
    );
    setLoading(false);
  };

  const deleteBundle = async (id: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setBundles(bundles.filter((bundle) => bundle.id !== id));
    setLoading(false);
  };

  return {
    bundles,
    loading,
    getBundles,
    getBundleById,
    createBundle,
    updateBundle,
    deleteBundle,
  };
};
