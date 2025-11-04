import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import StaffDashboard from '@/components/dashboard/StaffDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import bgMesh from '@/assets/bg-dashboard-green.png';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Seed demo data to match the provided design if storage is empty
    const hasSeeded = localStorage.getItem('studyhub_seeded_demo');
    if (hasSeeded) return;

    const nowIso = new Date().toISOString();

    const demoNotes = [
      { id: 'n1', title: 'OS Week 1', subject: 'Operating Systems', content: '...', uploadedBy: user?.id || 'staff', uploadedAt: nowIso, likes: 58, comments: 1, views: 23, file: { name: 'os_week1.pdf', type: 'application/pdf', size: 0, url: 'data:application/pdf;base64,' } },
      { id: 'n2', title: 'Java Week 2', subject: 'Java Programming', content: '...', uploadedBy: user?.id || 'staff', uploadedAt: nowIso, likes: 43, comments: 0, views: 13, file: { name: 'java_week2.pdf', type: 'application/pdf', size: 0, url: 'data:application/pdf;base64,' } },
      { id: 'n3', title: 'SEPP Week 5', subject: 'SEPP', content: '...', uploadedBy: user?.id || 'staff', uploadedAt: nowIso, likes: 100, comments: 14, views: 43, file: { name: 'sepp_week5.pdf', type: 'application/pdf', size: 0, url: 'data:application/pdf;base64,' } },
      { id: 'n4', title: 'DBMS Week 1', subject: 'DBMS', content: '...', uploadedBy: user?.id || 'staff', uploadedAt: nowIso, likes: 99, comments: 4, views: 4, file: { name: 'dbms_week1.pdf', type: 'application/pdf', size: 0, url: 'data:application/pdf;base64,' } },
    ];

    if (!localStorage.getItem('studyhub_notes')) {
      localStorage.setItem('studyhub_notes', JSON.stringify(demoNotes));
    }

    const demoTests = [
      { id: 't1', title: 'Data structures with Python', subject: 'Python', questions: [], createdBy: user?.id || 'staff', createdAt: '2023-05-01T10:30:00.000Z' },
      { id: 't2', title: 'Operating System', subject: 'OS', questions: [], createdBy: user?.id || 'staff', createdAt: '2023-05-08T10:30:00.000Z' },
    ];
    if (!localStorage.getItem('studyhub_tests')) {
      localStorage.setItem('studyhub_tests', JSON.stringify(demoTests));
    }

    // Weekly time ~ 15 hrs 12 mins
    if (!localStorage.getItem('studyhub_time_this_week')) {
      localStorage.setItem('studyhub_time_this_week', JSON.stringify({ minutes: 912 }));
    }

    // Seed a result so average shows ~93%
    if (user) {
      const existing = JSON.parse(localStorage.getItem('studyhub_results') || '[]');
      existing.push({ id: 'r1', studentId: user.id, score: 93, testId: 't1', createdAt: nowIso });
      localStorage.setItem('studyhub_results', JSON.stringify(existing));
    }

    localStorage.setItem('studyhub_seeded_demo', '1');
  }, [user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-page relative">
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{ backgroundImage: `url(${bgMesh})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="relative z-10">
        <DashboardLayout>
          {user?.role === 'staff' ? <StaffDashboard /> : <StudentDashboard />}
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Dashboard;