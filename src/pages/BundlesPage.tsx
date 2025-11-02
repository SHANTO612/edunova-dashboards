import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBundles } from '@/hooks/useBundles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BundleCard, { Bundle } from '@/components/BundleCard';
import CreateBundleModal from '@/components/modals/CreateBundleModal';

const BundlesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bundles, getBundles, loading } = useBundles();
  const [searchQuery, setSearchQuery] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filteredBundles, setFilteredBundles] = useState<Bundle[]>([]);

  useEffect(() => {
    getBundles();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredBundles(
        bundles.filter((bundle) =>
          bundle.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredBundles(bundles);
    }
  }, [searchQuery, bundles]);

  const handleBundleAction = (bundle: Bundle) => {
    navigate(`/bundles/${bundle.id}`);
  };

  const getActionLabel = () => {
    switch (user?.role) {
      case 'marketer':
        return 'Manage Bundle';
      case 'student':
        return 'Purchase Bundle';
      default:
        return 'View Bundle';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Bundles</h1>
          <p className="text-muted-foreground mt-1">
            {user?.role === 'marketer' && 'Create and manage your course bundles'}
            {user?.role === 'student' && 'Save money with bundled courses'}
          </p>
        </div>
        {user?.role === 'marketer' && (
          <Button onClick={() => setCreateModalOpen(true)} className="bg-accent hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Bundle
          </Button>
        )}
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search bundles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-secondary/50 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBundles.map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              onAction={handleBundleAction}
              actionLabel={getActionLabel()}
            />
          ))}
        </div>
      )}

      {!loading && filteredBundles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No bundles found</p>
        </div>
      )}

      <CreateBundleModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </div>
  );
};

export default BundlesPage;
