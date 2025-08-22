import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/pages/HomePage';
import { TutorialsPage } from '@/pages/TutorialsPage';
import { TutorialPage } from '@/pages/TutorialPage';
import { InfoPage } from '@/pages/InfoPage';
import { AlgorithmDetailPage } from '@/pages/AlgorithmDetailPage';
import { getTutorialById } from '@/data/tutorials';
import { getAlgorithmInfoById } from '@/data/algorithm-info';
import type { Tutorial } from '@/types/tutorial';
import type { AlgorithmInfo } from '@/data/algorithm-info';

// Wrapper komponenta za TutorialPage sa URL parametrima
const TutorialPageWrapper = () => {
  const { tutorialId } = useParams<{ tutorialId: string }>();
  const navigate = useNavigate();
  const tutorial = tutorialId ? getTutorialById(tutorialId) : null;
  
  if (!tutorial) {
    return <Navigate to="/tutorials" replace />;
  }

  const handleBack = () => {
    navigate('/tutorials');
  };

  return <TutorialPage tutorial={tutorial} onBack={handleBack} />;
};

// Wrapper komponenta za AlgorithmDetailPage sa URL parametrima
const AlgorithmDetailPageWrapper = () => {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  const navigate = useNavigate();
  const algorithm = algorithmId ? getAlgorithmInfoById(algorithmId) : null;
  
  if (!algorithm) {
    return <Navigate to="/info" replace />;
  }

  const handleBack = () => {
    navigate('/info');
  };

  return <AlgorithmDetailPage algorithm={algorithm} onBack={handleBack} />;
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  
  const handleTutorialSelect = (tutorial: Tutorial) => {
    navigate(`/tutorials/${tutorial.id}`);
  };

  const handleAlgorithmSelect = (algorithm: AlgorithmInfo) => {
    navigate(`/info/${algorithm.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tutorials" element={<TutorialsPage onTutorialSelect={handleTutorialSelect} />} />
          <Route path="/tutorials/:tutorialId" element={<TutorialPageWrapper />} />
          <Route path="/info" element={<InfoPage onAlgorithmSelect={handleAlgorithmSelect} />} />
          <Route path="/info/:algorithmId" element={<AlgorithmDetailPageWrapper />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2024 Computer Vision Lab</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Interaktivna platforma za kompjuterski vid</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
