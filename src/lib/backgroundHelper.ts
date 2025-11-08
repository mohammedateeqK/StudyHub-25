import bgGradient from '@/assets/bg-gradient.png';
import bgDashboard from '@/assets/bg-dashboard.png';
import bgDashboardGreen from '@/assets/bg-dashboard-green.png';
import bgMesh from '@/assets/bg-mesh.png';
import bgWave from '@/assets/bg-wave.png';
import bgPattern from '@/assets/bg-pattern-1.png';

export const getBackgroundImage = (backgroundImage: string): string => {
  if (backgroundImage === 'default') return bgGradient;
  if (backgroundImage === 'dashboard') return bgDashboard;
  if (backgroundImage === 'green') return bgDashboardGreen;
  if (backgroundImage === 'mesh') return bgMesh;
  if (backgroundImage === 'wave') return bgWave;
  if (backgroundImage === 'pattern') return bgPattern;
  return backgroundImage; // custom image
};
