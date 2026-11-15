import { Settings } from "lucide-react";
import PlaceholderPage from "@/features/dashboard/PlaceholderPage";

const AdminSettingsPage = () => {
  return (
    <PlaceholderPage
      icon={Settings}
      title="Settings"
      description="Platform-wide configuration — categories, moderation and roles."
    />
  );
};

export default AdminSettingsPage;
