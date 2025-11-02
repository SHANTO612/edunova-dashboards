import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useBundles } from '@/hooks/useBundles';

interface CreateBundleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateBundleModal = ({ open, onOpenChange }: CreateBundleModalProps) => {
  const { toast } = useToast();
  const { createBundle } = useBundles();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courses: '',
    originalPrice: '',
    discount: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const discount = Number(formData.discount);
    const originalPrice = Number(formData.originalPrice);
    const discountedPrice = originalPrice * (1 - discount / 100);

    try {
      await createBundle({
        title: formData.title,
        description: formData.description,
        courses: Number(formData.courses),
        originalPrice,
        discountedPrice,
        discount,
      });

      toast({
        title: 'Success',
        description: 'Bundle created successfully',
      });

      onOpenChange(false);
      setFormData({
        title: '',
        description: '',
        courses: '',
        originalPrice: '',
        discount: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create bundle',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Bundle</DialogTitle>
          <DialogDescription>
            Bundle multiple courses together with a special discount
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Bundle Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Full Stack Developer Bundle"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what's included in this bundle..."
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courses">Number of Courses</Label>
                <Input
                  id="courses"
                  type="number"
                  value={formData.courses}
                  onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                  placeholder="5"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price ($)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  placeholder="40"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>
            {formData.originalPrice && formData.discount && (
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Final Price: <span className="text-lg font-bold text-primary">
                    ${(Number(formData.originalPrice) * (1 - Number(formData.discount) / 100)).toFixed(2)}
                  </span>
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Bundle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBundleModal;
