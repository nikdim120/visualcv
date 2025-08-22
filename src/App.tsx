import { useState, useCallback } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { AlgorithmPanel } from '@/components/AlgorithmPanel';
import { ImageDisplay } from '@/components/ImageDisplay';
import { algorithms } from '@/data/algorithms';
import { applyAlgorithm } from '@/lib/opencv';
import type { Algorithm, ProcessingResult } from '@/types/cv';
import { Brain, Camera } from 'lucide-react';

function App() {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = useCallback((image: HTMLImageElement) => {
    setOriginalImage(image);
    setProcessingResult(null);
  }, []);

  const handleAlgorithmSelect = useCallback((algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
  }, []);

  const handleApplyAlgorithm = useCallback(async (
    algorithmId: string,
    parameters: Record<string, number | string>
  ) => {
    if (!originalImage) return;

    setIsProcessing(true);
    try {
      const { result, processingTime } = await applyAlgorithm(
        originalImage,
        algorithmId,
        parameters
      );

      const algorithm = algorithms.find(alg => alg.id === algorithmId);
      if (!algorithm) throw new Error('Algorithm not found');

      const newResult: ProcessingResult = {
        originalImage: originalImage.src,
        processedImage: result,
        processingTime,
        algorithm,
        parameters
      };

      setProcessingResult(newResult);
    } catch (error) {
      console.error('Error applying algorithm:', error);
      alert('Greška pri primeni algoritma. Molimo pokušajte ponovo.');
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">Computer Vision Lab</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Camera className="h-4 w-4" />
              Interaktivna platforma za kompjuterski vid
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Top Section - Image Upload + Display (100% width) */}
          <div className="space-y-8">
            <ImageUpload onImageSelect={handleImageSelect} />
            <ImageDisplay
              originalImage={originalImage}
              processingResult={processingResult}
              isProcessing={isProcessing}
            />
          </div>

          {/* Bottom Section - Algorithm Panel (100% width, centered) */}
          <div className="max-w-4xl mx-auto">
            <AlgorithmPanel
              onAlgorithmSelect={handleAlgorithmSelect}
              onApplyAlgorithm={handleApplyAlgorithm}
              selectedAlgorithm={selectedAlgorithm}
              isProcessing={isProcessing}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Computer Vision Lab - Interaktivna platforma za učenje algoritama kompjuterskog vida
            </p>
            <p className="mt-2">
              Koristi OpenCV.js, React i shadcn/ui komponente
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
