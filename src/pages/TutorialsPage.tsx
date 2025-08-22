import { TutorialList } from '@/components/TutorialList';
import type { Tutorial } from '@/types/tutorial';

interface TutorialsPageProps {
  onTutorialSelect: (tutorial: Tutorial) => void;
}

export const TutorialsPage: React.FC<TutorialsPageProps> = ({ onTutorialSelect }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <TutorialList onTutorialSelect={onTutorialSelect} />
    </div>
  );
};
