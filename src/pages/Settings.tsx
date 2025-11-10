import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Check, RotateCcw } from 'lucide-react';
import { getBackgroundImage } from '@/lib/backgroundHelper';
import bgGradient from '@/assets/bg-gradient.png';
import bgDashboard from '@/assets/bg-dashboard.png';
import bgDashboardGreen from '@/assets/bg-dashboard-green.png';
import bgMesh from '@/assets/bg-mesh.png';
import bgWave from '@/assets/bg-wave.png';
import bgPattern from '@/assets/bg-pattern-1.png';

const Settings = () => {
  const { isAuthenticated } = useAuth();
  const { opacity, intensity, backgroundImage, setOpacity, setIntensity, setBackgroundImage, resetToDefaults } = useSettings();
  const [customImage, setCustomImage] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const presetImages = [
    { id: 'default', name: 'Gradient', src: bgGradient },
    { id: 'dashboard', name: 'Dashboard', src: bgDashboard },
    { id: 'green', name: 'Green', src: bgDashboardGreen },
    { id: 'mesh', name: 'Mesh', src: bgMesh },
    { id: 'wave', name: 'Wave', src: bgWave },
    { id: 'pattern', name: 'Pattern', src: bgPattern },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setCustomImage(dataUrl);
        setBackgroundImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-page relative">
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-300"
        style={{ 
          backgroundImage: `url(${getBackgroundImage(backgroundImage)})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          opacity: opacity,
          filter: `brightness(${intensity})`
        }}
      />
      <div className="relative z-10">
        <DashboardLayout>
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Background Settings</h1>
                <p className="text-muted-foreground">Customize your background appearance</p>
              </div>
              <Button variant="outline" onClick={resetToDefaults}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Background Image</CardTitle>
                <CardDescription>Choose a preset image or upload your own</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Preset Images</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {presetImages.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setBackgroundImage(preset.id)}
                        className={`relative aspect-video rounded-lg border-2 overflow-hidden transition-all hover:scale-105 ${
                          backgroundImage === preset.id ? 'border-primary ring-2 ring-primary' : 'border-border'
                        }`}
                      >
                        <img 
                          src={preset.src} 
                          alt={preset.name}
                          className="w-full h-full object-cover"
                        />
                        {backgroundImage === preset.id && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Check className="w-8 h-8 text-primary-foreground" />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <p className="text-xs font-medium text-white">{preset.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Custom Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="bg-upload"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('bg-upload')?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Custom Image
                    </Button>
                  </div>
                  {customImage && (
                    <div className="relative aspect-video rounded-lg border-2 border-primary overflow-hidden">
                      <img 
                        src={customImage} 
                        alt="Custom background"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <p className="text-xs font-medium text-white">Custom Image</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Background Adjustments</CardTitle>
                <CardDescription>Fine-tune opacity and intensity</CardDescription>
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
                      Intensity (Brightness)
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
