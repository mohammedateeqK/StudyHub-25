import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import StaffDashboard from '@/components/dashboard/StaffDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardLayout>
      {user?.role === 'staff' ? <StaffDashboard /> : <StudentDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;