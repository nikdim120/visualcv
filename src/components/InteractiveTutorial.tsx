import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Play, Check, Info, Zap, Eye, FlaskConical } from 'lucide-react';
import type { Tutorial, TutorialStep } from '@/types/tutorial';
import { ImageDisplay } from './ImageDisplay';
import { AlgorithmPanel } from './AlgorithmPanel';
import { TutorialParameters } from './TutorialParameters';
import { applyAlgorithm } from '@/lib/opencv';
import { algorithms } from '@/data/algorithms';
import type { ProcessingResult } from '@/types/cv';

interface InteractiveTutorialProps {
  tutorial: Tutorial;
  onBack: () => void;
}

const getStepIcon = (actionType: string) => {
  switch (actionType) {
    case 'info': return <Info className="h-4 w-4" />;
    case 'apply': return <Zap className="h-4 w-4" />;
    case 'visualization': return <Eye className="h-4 w-4" />;
    case 'experiment': return <FlaskConical className="h-4 w-4" />;
    default: return <Play className="h-4 w-4" />;
  }
};

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({ 
  tutorial, 
  onBack 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<any>(null);

  const currentStep = tutorial.steps[currentStepIndex];
  const progress = (completedSteps.length / tutorial.steps.length) * 100;

  // Učitaj sample sliku na početku
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setCurrentImage(img);
    img.src = tutorial.sampleImageUrl;
  }, [tutorial.sampleImageUrl]);

  const handleStepComplete = useCallback(() => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps(prev => [...prev, currentStep.id]);
    }
  }, [currentStep.id, completedSteps]);

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < tutorial.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [currentStepIndex, tutorial.steps.length]);

  const handlePreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  const handleStepAction = useCallback(async () => {
    if (currentStep.actionType === 'info') {
      handleStepComplete();
    }
  }, [currentStep, handleStepComplete]);

  const handleApplyAlgorithm = useCallback(async (parameters: Record<string, any>) => {
    if (!currentImage) return;
    
    setIsProcessing(true);
    try {
      // Pronađi algoritam
      const algorithm = algorithms.find(alg => alg.id === tutorial.algorithmId);
      if (!algorithm) {
        throw new Error('Algorithm not found');
      }
      
      setCurrentAlgorithm(algorithm);
      
      // Primeni algoritam
      const result = await applyAlgorithm(currentImage, tutorial.algorithmId, parameters);
      
      // Kreiraj ProcessingResult
      const processingResult: ProcessingResult = {
        originalImage: currentImage.src,
        processedImage: result.result,
        processingTime: result.processingTime,
        algorithm: algorithm,
        parameters: parameters
      };
      
      setProcessingResult(processingResult);
      handleStepComplete();
    } catch (error) {
      console.error('Error applying algorithm:', error);
      alert('Greška pri primeni algoritma. Molimo pokušajte ponovo.');
    } finally {
      setIsProcessing(false);
    }
  }, [currentImage, tutorial.algorithmId, handleStepComplete]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Nazad
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{tutorial.name}</h1>
            <p className="text-muted-foreground">{tutorial.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">
            Korak {currentStepIndex + 1} od {tutorial.steps.length}
          </div>
          <Progress value={progress} className="w-32 mt-1" />
        </div>
      </div>

      {/* Tutorial Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tutorial Steps */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStepIcon(currentStep.actionType)}
                {currentStep.title}
              </CardTitle>
              <CardDescription>
                {currentStep.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Step Progress */}
              <div className="space-y-2">
                {tutorial.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                      index === currentStepIndex
                        ? 'bg-primary/10 border border-primary/20'
                        : completedSteps.includes(step.id)
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-muted/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      completedSteps.includes(step.id)
                        ? 'bg-green-500 text-white'
                        : index === currentStepIndex
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {completedSteps.includes(step.id) ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`text-sm ${
                      index === currentStepIndex ? 'font-medium' : ''
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              {currentStep.actionText && currentStep.actionType === 'info' && (
                <Button 
                  className="w-full" 
                  onClick={handleStepAction}
                  disabled={isProcessing}
                >
                  {getStepIcon(currentStep.actionType)}
                  <span className="ml-2">{currentStep.actionText}</span>
                </Button>
              )}

              {/* Parameters Panel for apply steps */}
              {currentStep.actionType === 'apply' && (
                <TutorialParameters
                  algorithmId={tutorial.algorithmId}
                  onApply={handleApplyAlgorithm}
                  isProcessing={isProcessing}
                />
              )}

              {/* Navigation */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={currentStepIndex === 0}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Prethodni
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={currentStepIndex === tutorial.steps.length - 1}
                  className="flex-1"
                >
                  Sledeći
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Image Display */}
        <div className="lg:col-span-2">
          <ImageDisplay
            originalImage={currentImage}
            processingResult={processingResult}
            isProcessing={isProcessing}
          />
        </div>
      </div>

      {/* Experiment Panel (for experiment steps) */}
      {currentStep.actionType === 'experiment' && (
        <Card>
          <CardHeader>
            <CardTitle>Eksperimentišite sami</CardTitle>
            <CardDescription>
              Podesite parametre i vidite kako utiču na rezultat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TutorialParameters
              algorithmId={tutorial.algorithmId}
              onApply={handleApplyAlgorithm}
              isProcessing={isProcessing}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
