import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, BookOpen, Percent } from 'lucide-react';

export interface Bundle {
  id: string;
  title: string;
  description: string;
  courses: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

interface BundleCardProps {
  bundle: Bundle;
  onAction?: (bundle: Bundle) => void;
  actionLabel?: string;
}

const BundleCard = ({ bundle, onAction, actionLabel = 'View Bundle' }: BundleCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-accent/20">
      <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
        <Package className="h-16 w-16 text-accent/40" />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{bundle.title}</CardTitle>
          <Badge className="bg-accent text-accent-foreground">
            <Percent className="h-3 w-3 mr-1" />
            {bundle.discount}% OFF
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {bundle.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>{bundle.courses} courses included</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground line-through">
            ${bundle.originalPrice}
          </span>
          <span className="text-2xl font-bold text-accent">
            ${bundle.discountedPrice}
          </span>
        </div>
        {onAction && (
          <Button onClick={() => onAction(bundle)} className="bg-accent hover:bg-accent/90">
            {actionLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BundleCard;
