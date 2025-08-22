import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';
import { sampleImages, fallbackImages } from '@/data/sample-images';
import type { ImageData } from '@/types/cv';

interface ImageUploadProps {
  onImageSelect: (image: HTMLImageElement) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Detekcija mobilnih uređaja
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Molimo odaberite sliku.');
      return;
    }

    // Proveri veličinu fajla (maksimalno 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('Slika je prevelika. Maksimalna veličina je 10MB.');
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
      img.onerror = () => {
        alert('Greška pri učitavanju slike. Molimo pokušajte sa drugom slikom.');
        setIsLoading(false);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      alert('Greška pri čitanju fajla. Molimo pokušajte ponovo.');
      setIsLoading(false);
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
    
    const tryLoadImage = (url: string, isFallback = false) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        onImageSelect(img);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${sampleImage.name} from ${url}`);
        
        // Pokušaj fallback URL ako postoji i nije već pokušan
        if (!isFallback && fallbackImages[sampleImage.id]) {
          console.log(`Trying fallback URL for ${sampleImage.name}`);
          tryLoadImage(fallbackImages[sampleImage.id], true);
        } else {
          alert(`Greška pri učitavanju slike: ${sampleImage.name}. Molimo pokušajte sa drugom slikom ili upload-ujte svoju.`);
          setIsLoading(false);
        }
      };
      
      img.src = url;
    };
    
    tryLoadImage(sampleImage.url);
  }, [onImageSelect]);

  const handleCameraCapture = useCallback(() => {
    // Implementacija kamere bi zahtevala getUserMedia API
    alert('Funkcija kamere će biti implementirana u sledećoj verziji.');
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Učitaj sliku
          </CardTitle>
          <CardDescription>
            {isMobile ? 'Kliknite za odabir slike sa telefona' : 'Prevucite sliku ovde ili kliknite za odabir fajla'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors ${
              isDragOver
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
              <span className="hidden sm:inline">Prevucite sliku ovde ili </span>kliknite za odabir
            </p>
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-input')?.click()}
              disabled={isLoading}
              className="h-10 sm:h-9 px-4 sm:px-3"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              {isMobile ? 'Odaberi sliku' : 'Odaberi fajl'}
            </Button>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => document.getElementById('camera-input')?.click()}
              disabled={isLoading}
              className="flex-1 h-10 sm:h-9"
            >
              <Camera className="h-4 w-4 mr-2" />
              Kamera
            </Button>
            <input
              id="camera-input"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileInput}
              className="hidden"
            />
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {sampleImages.map((sampleImage) => (
              <Button
                key={sampleImage.id}
                variant="outline"
                onClick={() => handleSampleImage(sampleImage)}
                disabled={isLoading}
                className="h-14 sm:h-16 flex-col gap-1"
              >
                <img
                  src={sampleImage.thumbnail}
                  alt={sampleImage.name}
                  className="h-6 w-6 object-cover rounded"
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
