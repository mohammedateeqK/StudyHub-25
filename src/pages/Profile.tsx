import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import bgMesh from '@/assets/bg-dashboard-green.png';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('studyhub_users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === user?.id ? { ...u, name } : u
    );
    localStorage.setItem('studyhub_users', JSON.stringify(updatedUsers));
    
    const updatedUser = { ...user, name };
    localStorage.setItem('studyhub_user', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile updated",
      description: "Your changes have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-page relative">
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{ backgroundImage: `url(${bgMesh})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="relative z-10">
        <DashboardLayout>
          <div className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input value={email} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input value={user?.role} disabled className="bg-muted capitalize" />
            </div>
            <Button onClick={handleSave} variant="gradient">
              Save Changes
            </Button>
          </CardContent>
        </Card>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Profile;