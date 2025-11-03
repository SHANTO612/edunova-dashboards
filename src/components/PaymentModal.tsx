import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Course } from '@/types/course';
import { Bundle } from '@/components/BundleCard';
import { CreditCard, Smartphone } from 'lucide-react';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Course | Bundle;
  itemType: 'course' | 'bundle';
  onPaymentComplete: () => void;
}

const PaymentModal = ({ open, onOpenChange, item, itemType, onPaymentComplete }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash'>('card');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    onOpenChange(false);
    onPaymentComplete();
  };

  const getItemPrice = () => {
    if (itemType === 'course') {
      return (item as Course).price;
    } else {
      return (item as Bundle).discountedPrice;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            You're {itemType === 'course' ? 'enrolling in' : 'purchasing'} <span className="font-medium">{item.title}</span> for ${getItemPrice()}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>Select Payment Method</Label>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={(value) => setPaymentMethod(value as 'card' | 'bkash')}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem 
                  value="card" 
                  id="card" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="card" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-3 h-6 w-6" />
                  Credit/Debit Card
                </Label>
              </div>
              
              <div>
                <RadioGroupItem 
                  value="bkash" 
                  id="bkash" 
                  className="peer sr-only" 
                />
                <Label 
                  htmlFor="bkash" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Smartphone className="mb-3 h-6 w-6" />
                  bKash
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
            </div>
          )}
          
          {paymentMethod === 'bkash' && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="bkashNumber">bKash Number</Label>
                <Input id="bkashNumber" placeholder="01XXXXXXXXX" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="pin">PIN</Label>
                <Input id="pin" type="password" placeholder="Enter your bKash PIN" />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : `Pay $${getItemPrice()}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;