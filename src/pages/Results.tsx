import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

const Results = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  const navigate = useNavigate();

  // Defensive parsing of results from localStorage to avoid JSON.parse crashes
  let results: any[] = [];
  try {
    const raw = localStorage.getItem('studyhub_results') || '[]';
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) results = parsed;
  } catch (e) {
    // log and continue with empty results to avoid crash
    // eslint-disable-next-line no-console
    console.warn('Failed to parse studyhub_results from localStorage', e);
    results = [];
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold mb-2">
                {user.role === 'staff' ? 'Student Results' : 'My Results'}
              </h1>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center rounded-md bg-slate-800 px-3 py-1 text-sm text-white hover:opacity-90"
              >
                Back
              </button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <p>Your results will appear here</p>
              ) : (
                <ul className="space-y-2">
                  {results.map((r: any) => (
                    <li key={r.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{r.testName || 'Test'}</div>
                        <div className="text-sm text-muted-foreground">Score: {r.score ?? 'N/A'}</div>
                      </div>
                      <div className="text-sm text-secondary">{r.date || ''}</div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Results;