import DashboardLayout from '@/components/layout/DashboardLayout';
import UserDashboard from '@/components/dashboard/UserDashboard';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <UserDashboard />
    </DashboardLayout>
  );
}
