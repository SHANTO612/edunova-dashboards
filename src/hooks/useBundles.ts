import { useState } from 'react';
import { Bundle } from '@/components/BundleCard';
import { DEMO_BUNDLES } from '@/lib/demoData';

export const useBundles = () => {
  // Load bundles from localStorage if present so dummy data persists across reloads
  const loadBundles = (): Bundle[] => {
    try {
      const raw = localStorage.getItem('bundles');
      if (raw) return JSON.parse(raw) as Bundle[];
    } catch (_) {}
    return DEMO_BUNDLES;
  };

  const [bundles, setBundles] = useState<Bundle[]>(loadBundles());
  const [loading, setLoading] = useState(false);

  const getBundles = async () => {
    setLoading(true);
    // Load bundles from localStorage or use demo data
    const loadedBundles = loadBundles();
    await new Promise((resolve) => setTimeout(resolve, 500));
    setBundles(loadedBundles);
    setLoading(false);
    return loadedBundles;
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
      id: String(Date.now()),
    };
    const updated = [...bundles, newBundle];
    setBundles(updated);
    try {
      localStorage.setItem('bundles', JSON.stringify(updated));
    } catch (_) {}
    setLoading(false);
    return newBundle;
  };

  const updateBundle = async (id: string, bundleData: Partial<Bundle>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const updated = bundles.map((bundle) =>
      bundle.id === id ? { ...bundle, ...bundleData } : bundle
    );
    setBundles(updated);
    try {
      localStorage.setItem('bundles', JSON.stringify(updated));
    } catch (_) {}
    setLoading(false);
  };

  const deleteBundle = async (id: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const updated = bundles.filter((bundle) => bundle.id !== id);
    setBundles(updated);
    try {
      localStorage.setItem('bundles', JSON.stringify(updated));
    } catch (_) {}
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
