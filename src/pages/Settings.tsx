import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import bgGradient from '@/assets/bg-gradient.png';

const Settings = () => {
  const { isAuthenticated } = useAuth();
  const { opacity, intensity, setOpacity, setIntensity } = useSettings();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-page relative">
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-300"
        style={{ 
          backgroundImage: `url(${bgGradient})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          opacity: opacity,
          filter: `brightness(${intensity})`
        }}
      />
      <div className="relative z-10">
        <DashboardLayout>
          <div className="max-w-2xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Background Settings</h1>
              <p className="text-muted-foreground">Customize your background appearance</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Background Customization</CardTitle>
                <CardDescription>Adjust opacity and intensity to your preference</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="opacity" className="text-sm font-medium">
                      Opacity
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(opacity * 100)}%
                    </span>
                  </div>
                  <Slider
                    id="opacity"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[opacity]}
                    onValueChange={(values) => setOpacity(values[0])}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="intensity" className="text-sm font-medium">
                      Intensity
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(intensity * 100)}%
                    </span>
                  </div>
                  <Slider
                    id="intensity"
                    min={0.5}
                    max={1.5}
                    step={0.01}
                    value={[intensity]}
                    onValueChange={(values) => setIntensity(values[0])}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Settings;
