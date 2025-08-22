import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';
import { sampleImages } from '@/data/sample-images';
import type { ImageData } from '@/types/cv';

interface ImageUploadProps {
  onImageSelect: (image: HTMLImageElement) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Molimo odaberite sliku.');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        onImageSelect(img);
        setIsLoading(false);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleSampleImage = useCallback((sampleImage: ImageData) => {
    setIsLoading(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      onImageSelect(img);
      setIsLoading(false);
    };
    img.onerror = () => {
      alert('Greška pri učitavanju slike.');
      setIsLoading(false);
    };
    img.src = sampleImage.url;
  }, [onImageSelect]);

  const handleCameraCapture = useCallback(() => {
    // Implementacija kamere bi zahtevala getUserMedia API
    alert('Funkcija kamere će biti implementirana u sledećoj verziji.');
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Učitaj sliku
          </CardTitle>
          <CardDescription>
            Prevucite sliku ovde ili kliknite za odabir fajla
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">
              Prevucite sliku ovde ili kliknite za odabir
            </p>
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-input')?.click()}
              disabled={isLoading}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Odaberi fajl
            </Button>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCameraCapture}
              disabled={isLoading}
              className="flex-1"
            >
              <Camera className="h-4 w-4 mr-2" />
              Kamera
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Primeri slika</CardTitle>
          <CardDescription>
            Odaberite jednu od predefinisanih slika za brzi test
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {sampleImages.map((sampleImage) => (
              <Button
                key={sampleImage.id}
                variant="outline"
                onClick={() => handleSampleImage(sampleImage)}
                disabled={isLoading}
                className="h-20 flex-col gap-2"
              >
                <img
                  src={sampleImage.thumbnail}
                  alt={sampleImage.name}
                  className="h-8 w-8 object-cover rounded"
                />
                <span className="text-xs">{sampleImage.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
