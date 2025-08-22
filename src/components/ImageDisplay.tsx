import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Download, RotateCcw, Trash2 } from 'lucide-react';
import type { ProcessingResult } from '@/types/cv';
import { clearOpenCVMemory } from '@/lib/opencv';

interface ImageDisplayProps {
  originalImage: HTMLImageElement | null;
  processingResult: ProcessingResult | null;
  isProcessing: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  originalImage,
  processingResult,
  isProcessing
}) => {
  const [showProcessed, setShowProcessed] = useState(true);

  const handleDownload = (imageSrc: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setShowProcessed(false);
  };

  const handleClearMemory = () => {
    clearOpenCVMemory();
    alert('Memorija je očišćena! Možete nastaviti sa obradom slika.');
  };

  if (!originalImage) {
    return (
      <Card className="h-96">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <div className="text-4xl mb-4">🖼️</div>
            <p>Učitajte sliku da počnete</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowProcessed(!showProcessed)}
            disabled={!processingResult}
          >
            {showProcessed ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showProcessed ? 'Sakrij rezultat' : 'Prikaži rezultat'}
          </Button>
          
          {processingResult && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetuj
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearMemory}
            className="text-orange-600 hover:text-orange-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Očisti memoriju
          </Button>
        </div>

        {processingResult && (
          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
            Vreme obrade: {processingResult.processingTime.toFixed(2)}ms
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Original Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Originalna slika</CardTitle>
            <CardDescription>
              Dimenzije: {originalImage.naturalWidth} × {originalImage.naturalHeight}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
                             <img
                 src={originalImage.src}
                 alt="Original"
                 className="w-full h-auto max-h-64 sm:max-h-96 object-contain rounded-lg border"
               />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleDownload(originalImage.src, 'original.png')}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Processed Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {processingResult ? (
                <>
                  <span>{processingResult.algorithm.icon}</span>
                  {processingResult.algorithm.name}
                </>
              ) : (
                'Obrađena slika'
              )}
            </CardTitle>
            <CardDescription>
              {processingResult ? (
                <>
                  Algoritam: {processingResult.algorithm.name}
                  <br />
                  Parametri: {Object.entries(processingResult.parameters)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ')}
                </>
              ) : (
                'Odaberite algoritam i kliknite "Primeni"'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {processingResult && showProcessed ? (
                <>
                                     <img
                     src={processingResult.processedImage}
                     alt="Processed"
                     className="w-full h-auto max-h-64 sm:max-h-96 object-contain rounded-lg border"
                   />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleDownload(processingResult.processedImage, 'processed.png')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                                 <div className="w-full h-64 sm:h-96 bg-muted rounded-lg border flex items-center justify-center">
                  {isProcessing ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Obrađujem...</p>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <div className="text-4xl mb-2">🔧</div>
                      <p>Nema obrađene slike</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Statistics */}
      {processingResult && (
        <Card>
          <CardHeader>
            <CardTitle>Statistike obrade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-medium">Algoritam</div>
                <div className="text-muted-foreground">{processingResult.algorithm.name}</div>
              </div>
              <div>
                <div className="font-medium">Vreme obrade</div>
                <div className="text-muted-foreground">{processingResult.processingTime.toFixed(2)}ms</div>
              </div>
              <div>
                <div className="font-medium">Kategorija</div>
                <div className="text-muted-foreground">{processingResult.algorithm.category}</div>
              </div>
              <div>
                <div className="font-medium">Parametri</div>
                <div className="text-muted-foreground">
                  {Object.keys(processingResult.parameters).length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
