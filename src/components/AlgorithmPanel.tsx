import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { algorithms } from '@/data/algorithms';
import type { Algorithm, AlgorithmParameter } from '@/types/cv';
import { Play, Info } from 'lucide-react';

interface AlgorithmPanelProps {
  onAlgorithmSelect: (algorithm: Algorithm) => void;
  onApplyAlgorithm: (algorithmId: string, parameters: Record<string, number | string>) => void;
  selectedAlgorithm: Algorithm | null;
  isProcessing: boolean;
}

export const AlgorithmPanel: React.FC<AlgorithmPanelProps> = ({
  onAlgorithmSelect,
  onApplyAlgorithm,
  selectedAlgorithm,
  isProcessing
}) => {
  const [parameters, setParameters] = useState<Record<string, number | string>>({});

  const handleAlgorithmSelect = (algorithm: Algorithm) => {
    onAlgorithmSelect(algorithm);
    // Reset parameters to default values
    const defaultParams: Record<string, number | string> = {};
    algorithm.parameters.forEach(param => {
      defaultParams[param.id] = param.defaultValue;
    });
    setParameters(defaultParams);
  };

  const handleParameterChange = (paramId: string, value: number | string) => {
    setParameters(prev => ({
      ...prev,
      [paramId]: value
    }));
  };

  const handleApplyAlgorithm = () => {
    if (selectedAlgorithm) {
      onApplyAlgorithm(selectedAlgorithm.id, parameters);
    }
  };

  const getCategoryName = (category: string) => {
    const categoryNames: Record<string, string> = {
      'filtering': 'Filtriranje',
      'edge-detection': 'Detekcija ivica',
      'morphological': 'Morfološke operacije',
      'feature-detection': 'Detekcija karakteristika',
      'segmentation': 'Segmentacija'
    };
    return categoryNames[category] || category;
  };

  const renderParameterControl = (param: AlgorithmParameter) => {
    const value = parameters[param.id] ?? param.defaultValue;

    switch (param.type) {
      case 'slider':
        return (
          <div key={param.id} className="space-y-2">
            <Label className="text-sm font-medium">
              {param.name}: {value}
            </Label>
            <Slider
              value={[value as number]}
              onValueChange={(vals) => handleParameterChange(param.id, vals[0])}
              min={param.min}
              max={param.max}
              step={param.step}
              className="w-full"
            />
          </div>
        );

      case 'select':
        return (
          <div key={param.id} className="space-y-2">
            <Label className="text-sm font-medium">{param.name}</Label>
            <Select
              value={value as string}
              onValueChange={(val) => handleParameterChange(param.id, val)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {param.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'number':
        return (
          <div key={param.id} className="space-y-2">
            <Label className="text-sm font-medium">{param.name}</Label>
            <input
              type="number"
              value={value as number}
              onChange={(e) => handleParameterChange(param.id, parseFloat(e.target.value))}
              min={param.min}
              max={param.max}
              step={param.step}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const groupedAlgorithms = algorithms.reduce((acc, algorithm) => {
    if (!acc[algorithm.category]) {
      acc[algorithm.category] = [];
    }
    acc[algorithm.category].push(algorithm);
    return acc;
  }, {} as Record<string, Algorithm[]>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Algoritmi</CardTitle>
          <CardDescription>
            Odaberite algoritam za obradu slike
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(groupedAlgorithms).map(([category, categoryAlgorithms]) => (
            <div key={category} className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">
                {getCategoryName(category)}
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {categoryAlgorithms.map((algorithm) => (
                  <Button
                    key={algorithm.id}
                    variant={selectedAlgorithm?.id === algorithm.id ? "default" : "outline"}
                    onClick={() => handleAlgorithmSelect(algorithm)}
                    className="justify-start h-auto p-3"
                    disabled={isProcessing}
                  >
                    <span className="text-lg mr-2">{algorithm.icon}</span>
                    <div className="text-left">
                      <div className="font-medium">{algorithm.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {algorithm.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedAlgorithm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">{selectedAlgorithm.icon}</span>
              {selectedAlgorithm.name}
            </CardTitle>
            <CardDescription className="flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              {selectedAlgorithm.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {selectedAlgorithm.parameters.map(renderParameterControl)}
            </div>
            
            <Button
              onClick={handleApplyAlgorithm}
              disabled={isProcessing}
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              {isProcessing ? 'Obrađujem...' : 'Primeni algoritam'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
