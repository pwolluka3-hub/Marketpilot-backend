import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import ErrorBoundary from './components/ui/ErrorBoundary';
import LoadingPulse from './components/ui/LoadingPulse';
import { AuthProvider } from './context/AuthContext';
import { BrandProvider } from './context/BrandContext';
import { QueueProvider } from './context/QueueContext';

const Onboarding = lazy(() => import('./pages/Onboarding'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ContentStudio = lazy(() => import('./pages/ContentStudio'));
const Calendar = lazy(() => import('./pages/Calendar'));
const Analytics = lazy(() => import('./pages/Analytics'));
const SocialHub = lazy(() => import('./pages/SocialHub'));
const SkillManager = lazy(() => import('./pages/SkillManager'));
const BrandKit = lazy(() => import('./pages/BrandKit'));
const AIChat = lazy(() => import('./pages/AIChat'));
const Settings = lazy(() => import('./pages/Settings'));

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrandProvider>
          <QueueProvider>
            <div className="layout">
              <Sidebar />
              <main className="main">
                <Suspense fallback={<LoadingPulse />}>
                  <Routes>
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/content" element={<ContentStudio />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/social" element={<SocialHub />} />
                    <Route path="/skills" element={<SkillManager />} />
                    <Route path="/brand" element={<BrandKit />} />
                    <Route path="/chat" element={<AIChat />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/onboarding" replace />} />
                  </Routes>
                </Suspense>
              </main>
              <BottomNav />
            </div>
          </QueueProvider>
        </BrandProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
