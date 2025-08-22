export interface Algorithm {
  id: string;
  name: string;
  description: string;
  category: 'filtering' | 'edge-detection' | 'morphological' | 'feature-detection' | 'segmentation';
  parameters: AlgorithmParameter[];
  icon: string;
}

export interface AlgorithmParameter {
  id: string;
  name: string;
  type: 'slider' | 'select' | 'number';
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number | string;
  options?: { value: string; label: string }[];
}

export interface ProcessingResult {
  originalImage: string;
  processedImage: string;
  processingTime: number;
  algorithm: Algorithm;
  parameters: Record<string, number | string>;
}

export interface ImageData {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
}
