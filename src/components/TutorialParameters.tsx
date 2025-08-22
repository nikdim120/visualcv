import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { algorithms } from '@/data/algorithms';
import type { Algorithm } from '@/types/cv';

interface TutorialParametersProps {
  algorithmId: string;
  onApply: (parameters: Record<string, any>) => void;
  isProcessing: boolean;
}

export const TutorialParameters: React.FC<TutorialParametersProps> = ({
  algorithmId,
  onApply,
  isProcessing
}) => {
  const [parameters, setParameters] = useState<Record<string, any>>({});
  
  const algorithm = algorithms.find(alg => alg.id === algorithmId);
  
  if (!algorithm) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Parametri</CardTitle>
          <CardDescription>Algoritam nije pronađen</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const handleParameterChange = useCallback((paramId: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [paramId]: value
    }));
  }, []);

  const handleApply = useCallback(() => {
    // Popuni default vrednosti za parametre koji nisu postavljeni
    const finalParameters = { ...parameters };
    algorithm.parameters.forEach(param => {
      if (finalParameters[param.id] === undefined) {
        finalParameters[param.id] = param.defaultValue;
      }
    });
    
    onApply(finalParameters);
  }, [parameters, algorithm, onApply]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parametri za {algorithm.name}</CardTitle>
        <CardDescription>
          Podesite parametre specifične za ovaj algoritam
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {algorithm.parameters.map((param) => (
          <div key={param.id} className="space-y-2">
            <Label htmlFor={param.id}>{param.name}</Label>
            
            {param.type === 'slider' && (
              <div className="space-y-2">
                <Slider
                  id={param.id}
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={[parameters[param.id] ?? param.defaultValue]}
                  onValueChange={(value) => handleParameterChange(param.id, value[0])}
                  disabled={isProcessing}
                />
                <div className="text-sm text-muted-foreground">
                  Vrednost: {parameters[param.id] ?? param.defaultValue}
                </div>
              </div>
            )}
            
            {param.type === 'select' && (
              <Select
                value={parameters[param.id] ?? param.defaultValue}
                onValueChange={(value) => handleParameterChange(param.id, value)}
                disabled={isProcessing}
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
            )}
          </div>
        ))}
        
        <Button 
          onClick={handleApply} 
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Obrađujem...
            </>
          ) : (
            'Primeni algoritam'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
