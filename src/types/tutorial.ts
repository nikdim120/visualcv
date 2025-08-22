export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  actionType: 'info' | 'apply' | 'interactive' | 'visualization' | 'experiment';
  actionText?: string;
  actionHandler?: () => void;
  isCompleted: boolean;
  isActive: boolean;
  imageUrl?: string;
  parameters?: Record<string, any>;
  visualization?: {
    type: 'gradient' | 'edges' | 'histogram' | 'custom';
    data?: any;
  };
}

export interface Tutorial {
  id: string;
  name: string;
  description: string;
  algorithmId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // u minutima
  steps: TutorialStep[];
  sampleImageUrl: string;
  category: 'edge-detection' | 'filtering' | 'morphological' | 'feature-detection' | 'segmentation';
  prerequisites?: string[];
  learningObjectives: string[];
}

export interface TutorialProgress {
  tutorialId: string;
  currentStep: number;
  completedSteps: string[];
  isCompleted: boolean;
  startedAt: Date;
  completedAt?: Date;
}
