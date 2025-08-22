import { InteractiveTutorial } from '@/components/InteractiveTutorial';
import type { Tutorial } from '@/types/tutorial';

interface TutorialPageProps {
  tutorial: Tutorial;
  onBack: () => void;
}

export const TutorialPage: React.FC<TutorialPageProps> = ({ tutorial, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <InteractiveTutorial tutorial={tutorial} onBack={onBack} />
    </div>
  );
};
