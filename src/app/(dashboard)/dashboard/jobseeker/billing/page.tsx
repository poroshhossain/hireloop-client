import { Wallet } from "lucide-react";
import PlaceholderPage from "@/features/dashboard/PlaceholderPage";

const BillingPage = () => {
  return (
    <PlaceholderPage
      icon={Wallet}
      title="Billing"
      description="Manage your plan, invoices and payment methods."
    />
  );
};

export default BillingPage;
