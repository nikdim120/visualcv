import { ImageUpload } from '@/components/ImageUpload';
import { AlgorithmPanel } from '@/components/AlgorithmPanel';
import { ImageDisplay } from '@/components/ImageDisplay';
import { algorithms } from '@/data/algorithms';
import { applyAlgorithm } from '@/lib/opencv';
import type { Algorithm, ProcessingResult } from '@/types/cv';
import { useState, useCallback } from 'react';

export const HomePage: React.FC = () => {
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

  const handleApplyAlgorithm = useCallback(async (algorithm: Algorithm, parameters: Record<string, any>) => {
    if (!originalImage) return;

    setIsProcessing(true);
    try {
      const result = await applyAlgorithm(originalImage, algorithm.id, parameters);
      setProcessingResult(result);
    } catch (error) {
      console.error('Error applying algorithm:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage]);

  return (
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
  );
};
