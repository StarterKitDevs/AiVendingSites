import { SubscriptionTiers } from '@/components/subscription-tiers';
import { Header } from '@/components/ui/header';

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Subscriptions" />
      <main>
        <SubscriptionTiers />
      </main>
    </div>
  );
} 