import { Wallet } from "lucide-react";
import PlaceholderPage from "@/features/dashboard/PlaceholderPage";

const AdminPaymentsPage = () => {
  return (
    <PlaceholderPage
      icon={Wallet}
      title="Payments"
      description="Subscriptions, invoices and platform revenue at a glance."
    />
  );
};

export default AdminPaymentsPage;
