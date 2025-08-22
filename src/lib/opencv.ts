declare global {
  interface Window {
    cv: any;
  }
}

export const loadOpenCV = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.cv) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://docs.opencv.org/4.8.0/opencv.js';
    script.async = true;
    script.onload = () => {
      // Wait for OpenCV to be ready
      const checkOpenCV = () => {
        if (window.cv && window.cv.Mat) {
          resolve();
        } else {
          setTimeout(checkOpenCV, 100);
        }
      };
      checkOpenCV();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const imageToMat = (imageElement: HTMLImageElement): any => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imageElement.naturalWidth;
  canvas.height = imageElement.naturalHeight;
  ctx?.drawImage(imageElement, 0, 0);
  
  return window.cv.imread(canvas);
};

export const matToImage = (mat: any): string => {
  const canvas = document.createElement('canvas');
  window.cv.imshow(canvas, mat);
  const dataUrl = canvas.toDataURL();
  
  // Eksplicitno oslobodi canvas memoriju
  canvas.width = 0;
  canvas.height = 0;
  
  return dataUrl;
};

// Funkcija za čišćenje OpenCV memorije
export const clearOpenCVMemory = (): void => {
  if (window.cv && window.cv.Mat) {
    try {
      // Pokušaj da forsiraš garbage collection
      if (window.gc) {
        window.gc();
      }
      
      // Pokušaj da očistiš OpenCV memoriju
      if (window.cv.cleanup) {
        window.cv.cleanup();
      }
      
      console.log('OpenCV memory cleared');
    } catch (error) {
      console.warn('Could not clear OpenCV memory:', error);
    }
  }
};

export const applyAlgorithm = async (
  imageElement: HTMLImageElement,
  algorithmId: string,
  parameters: Record<string, number | string>
): Promise<{ result: string; processingTime: number }> => {
  await loadOpenCV();
  
  const startTime = performance.now();
  const src = imageToMat(imageElement);
  let dst: any;
  
  // Debug informacije
  console.log(`Algorithm: ${algorithmId}`);
  console.log(`Image channels: ${src.channels()}, size: ${src.rows}x${src.cols}`);
  console.log(`Parameters:`, parameters);
  
  // Lista za praćenje privremenih Mat objekata
  const tempMats: any[] = [];
  
  try {
    switch (algorithmId) {
      case 'gaussian-blur':
        dst = new window.cv.Mat();
        const kernelSize = parameters.kernelSize as number;
        const sigmaX = parameters.sigmaX as number;
        window.cv.GaussianBlur(src, dst, new window.cv.Size(kernelSize, kernelSize), sigmaX, 0);
        break;
        
      case 'median-blur':
        dst = new window.cv.Mat();
        const medianKernelSize = parameters.kernelSize as number;
        window.cv.medianBlur(src, dst, medianKernelSize);
        break;
        
      case 'bilateral-filter':
        dst = new window.cv.Mat();
        const d = parameters.d as number;
        const sigmaColor = parameters.sigmaColor as number;
        const sigmaSpace = parameters.sigmaSpace as number;
        
        // Konvertuj u BGR format ako je potrebno (OpenCV bilateralFilter radi bolje sa BGR)
        let bgrSrc = src;
        if (src.channels() === 4) { // RGBA
          bgrSrc = new window.cv.Mat();
          window.cv.cvtColor(src, bgrSrc, window.cv.COLOR_RGBA2BGR);
        } else if (src.channels() === 3) { // RGB
          bgrSrc = new window.cv.Mat();
          window.cv.cvtColor(src, bgrSrc, window.cv.COLOR_RGB2BGR);
        }
        
        // Primeni bilateral filter
        window.cv.bilateralFilter(bgrSrc, dst, d, sigmaColor, sigmaSpace);
        
        // Konvertuj nazad u RGB ako je potrebno
        if (bgrSrc !== src) {
          console.log('Converting back to RGB format...');
          const rgbResult = new window.cv.Mat();
          window.cv.cvtColor(dst, rgbResult, window.cv.COLOR_BGR2RGB);
          dst.delete();
          dst = rgbResult;
          bgrSrc.delete();
          console.log('Bilateral filter completed successfully');
        } else {
          console.log('Bilateral filter completed (no conversion needed)');
        }
        break;
        
      case 'canny-edge':
        dst = new window.cv.Mat();
        const threshold1 = parameters.threshold1 as number;
        const threshold2 = parameters.threshold2 as number;
        
        // Konvertuj u grayscale ako je potrebno
        let graySrcCanny = src;
        if (src.channels() > 1) {
          graySrcCanny = new window.cv.Mat();
          window.cv.cvtColor(src, graySrcCanny, window.cv.COLOR_RGBA2GRAY);
        }
        
        // Primeni Canny edge detection
        window.cv.Canny(graySrcCanny, dst, threshold1, threshold2);
        
        // Clean up
        if (graySrcCanny !== src) graySrcCanny.delete();
        break;
        
      case 'sobel-edge':
        dst = new window.cv.Mat();
        const dx = parameters.dx as number;
        const dy = parameters.dy as number;
        const sobelKsize = parseInt(parameters.ksize as string);
        
        // Konvertuj u grayscale ako je potrebno
        let graySrc = src;
        if (src.channels() > 1) {
          graySrc = new window.cv.Mat();
          window.cv.cvtColor(src, graySrc, window.cv.COLOR_RGBA2GRAY);
        }
        
        // Primeni Sobel operator
        const gradX = new window.cv.Mat();
        const gradY = new window.cv.Mat();
        window.cv.Sobel(graySrc, gradX, window.cv.CV_64F, dx, 0, sobelKsize);
        window.cv.Sobel(graySrc, gradY, window.cv.CV_64F, 0, dy, sobelKsize);
        
        // Izračunaj magnitude
        const magnitude = new window.cv.Mat();
        window.cv.magnitude(gradX, gradY, magnitude);
        
        // Konvertuj u 8-bit format
        window.cv.convertScaleAbs(magnitude, dst);
        
        // Clean up
        if (graySrc !== src) graySrc.delete();
        gradX.delete();
        gradY.delete();
        magnitude.delete();
        break;
        
      case 'laplacian':
        dst = new window.cv.Mat();
        const laplacianKsize = parseInt(parameters.ksize as string);
        
        // Konvertuj u grayscale ako je potrebno
        let graySrcLaplacian = src;
        if (src.channels() > 1) {
          graySrcLaplacian = new window.cv.Mat();
          window.cv.cvtColor(src, graySrcLaplacian, window.cv.COLOR_RGBA2GRAY);
        }
        
        // Primeni Laplacian operator
        const laplacianTemp = new window.cv.Mat();
        window.cv.Laplacian(graySrcLaplacian, laplacianTemp, window.cv.CV_64F, laplacianKsize);
        
        // Konvertuj u apsolutne vrednosti i zatim u 8-bit format
        window.cv.convertScaleAbs(laplacianTemp, dst);
        
        // Clean up
        if (graySrcLaplacian !== src) graySrcLaplacian.delete();
        laplacianTemp.delete();
        break;
        
      case 'erosion':
        dst = new window.cv.Mat();
        const erosionKernelSize = parameters.kernelSize as number;
        const iterations = parameters.iterations as number;
        const erosionKernel = window.cv.getStructuringElement(window.cv.MORPH_RECT, new window.cv.Size(erosionKernelSize, erosionKernelSize));
        window.cv.erode(src, dst, erosionKernel, new window.cv.Point(-1, -1), iterations);
        break;
        
      case 'dilation':
        dst = new window.cv.Mat();
        const dilationKernelSize = parameters.kernelSize as number;
        const dilationIterations = parameters.iterations as number;
        const dilationKernel = window.cv.getStructuringElement(window.cv.MORPH_RECT, new window.cv.Size(dilationKernelSize, dilationKernelSize));
        window.cv.dilate(src, dst, dilationKernel, new window.cv.Point(-1, -1), dilationIterations);
        break;
        
      case 'opening':
        dst = new window.cv.Mat();
        const openingKernelSize = parameters.kernelSize as number;
        const openingKernel = window.cv.getStructuringElement(window.cv.MORPH_RECT, new window.cv.Size(openingKernelSize, openingKernelSize));
        window.cv.morphologyEx(src, dst, window.cv.MORPH_OPEN, openingKernel);
        break;
        
      case 'closing':
        dst = new window.cv.Mat();
        const closingKernelSize = parameters.kernelSize as number;
        const closingKernel = window.cv.getStructuringElement(window.cv.MORPH_RECT, new window.cv.Size(closingKernelSize, closingKernelSize));
        window.cv.morphologyEx(src, dst, window.cv.MORPH_CLOSE, closingKernel);
        break;
        
      case 'harris-corners':
        dst = new window.cv.Mat();
        const blockSize = parameters.blockSize as number;
        const harrisKsize = parameters.ksize as number;
        const k = parameters.k as number;
        
        // Konvertuj u grayscale ako je potrebno
        let graySrcHarris = src;
        if (src.channels() > 1) {
          graySrcHarris = new window.cv.Mat();
          window.cv.cvtColor(src, graySrcHarris, window.cv.COLOR_RGBA2GRAY);
        }
        
        // Primeni Harris corner detection
        const harrisTemp = new window.cv.Mat();
        window.cv.cornerHarris(graySrcHarris, harrisTemp, blockSize, harrisKsize, k);
        
        // Normalizuj rezultat
        window.cv.normalize(harrisTemp, dst, 0, 255, window.cv.NORM_MINMAX, window.cv.CV_8U);
        
        // Clean up
        if (graySrcHarris !== src) graySrcHarris.delete();
        harrisTemp.delete();
        break;
        
      case 'adaptive-threshold':
        dst = new window.cv.Mat();
        const adaptiveBlockSize = parameters.blockSize as number;
        const c = parameters.c as number;
        const method = parameters.method as string;
        const adaptiveMethod = method === 'ADAPTIVE_THRESH_GAUSSIAN_C' ? window.cv.ADAPTIVE_THRESH_GAUSSIAN_C : window.cv.ADAPTIVE_THRESH_MEAN_C;
        
        // Konvertuj u grayscale ako je potrebno
        let graySrcAdaptive = src;
        if (src.channels() > 1) {
          graySrcAdaptive = new window.cv.Mat();
          window.cv.cvtColor(src, graySrcAdaptive, window.cv.COLOR_RGBA2GRAY);
        }
        
        // Primeni adaptive threshold
        window.cv.adaptiveThreshold(graySrcAdaptive, dst, 255, adaptiveMethod, window.cv.THRESH_BINARY, adaptiveBlockSize, c);
        
        // Clean up
        if (graySrcAdaptive !== src) graySrcAdaptive.delete();
        break;
        
      default:
        throw new Error(`Unknown algorithm: ${algorithmId}`);
    }
    
    const processingTime = performance.now() - startTime;
    console.log(`Processing completed in ${processingTime.toFixed(2)}ms`);
    console.log(`Result channels: ${dst.channels()}, size: ${dst.rows}x${dst.cols}`);
    
    const result = matToImage(dst);
    console.log(`Image conversion completed, result length: ${result.length}`);
    
    // Clean up sve privremene Mat objekte
    tempMats.forEach(mat => {
      if (mat && !mat.isDeleted()) {
        mat.delete();
      }
    });
    
    // Clean up glavne objekte
    if (src && !src.isDeleted()) src.delete();
    if (dst && !dst.isDeleted()) dst.delete();
    
    // Forsiraj garbage collection ako je moguće
    if (window.gc) {
      window.gc();
    }
    
    return { result, processingTime };
  } catch (error) {
    console.error('Error in algorithm processing:', error);
    
    // Clean up sve privremene Mat objekte na grešku
    tempMats.forEach(mat => {
      if (mat && !mat.isDeleted()) {
        mat.delete();
      }
    });
    
    // Clean up glavne objekte na grešku
    if (src && !src.isDeleted()) src.delete();
    if (dst && !dst.isDeleted()) dst.delete();
    
    throw error;
  }
};
