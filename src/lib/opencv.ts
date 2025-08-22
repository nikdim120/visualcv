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
  return canvas.toDataURL();
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
        window.cv.bilateralFilter(src, dst, d, sigmaColor, sigmaSpace);
        break;
        
      case 'canny-edge':
        dst = new window.cv.Mat();
        const threshold1 = parameters.threshold1 as number;
        const threshold2 = parameters.threshold2 as number;
        window.cv.Canny(src, dst, threshold1, threshold2);
        break;
        
      case 'sobel-edge':
        dst = new window.cv.Mat();
        const dx = parameters.dx as number;
        const dy = parameters.dy as number;
        const sobelKsize = parseInt(parameters.ksize as string);
        window.cv.Sobel(src, dst, window.cv.CV_8U, dx, dy, sobelKsize);
        break;
        
      case 'laplacian':
        dst = new window.cv.Mat();
        const laplacianKsize = parseInt(parameters.ksize as string);
        window.cv.Laplacian(src, dst, window.cv.CV_8U, laplacianKsize);
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
        window.cv.cornerHarris(src, dst, blockSize, harrisKsize, k);
        break;
        
      case 'adaptive-threshold':
        dst = new window.cv.Mat();
        const adaptiveBlockSize = parameters.blockSize as number;
        const c = parameters.c as number;
        const method = parameters.method as string;
        const adaptiveMethod = method === 'ADAPTIVE_THRESH_GAUSSIAN_C' ? window.cv.ADAPTIVE_THRESH_GAUSSIAN_C : window.cv.ADAPTIVE_THRESH_MEAN_C;
        window.cv.adaptiveThreshold(src, dst, 255, adaptiveMethod, window.cv.THRESH_BINARY, adaptiveBlockSize, c);
        break;
        
      default:
        throw new Error(`Unknown algorithm: ${algorithmId}`);
    }
    
    const processingTime = performance.now() - startTime;
    const result = matToImage(dst);
    
    // Clean up
    src.delete();
    dst.delete();
    
    return { result, processingTime };
  } catch (error) {
    // Clean up on error
    if (src) src.delete();
    if (dst) dst.delete();
    throw error;
  }
};
