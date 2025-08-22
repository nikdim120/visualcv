import { Algorithm } from '@/types/cv';

export const algorithms: Algorithm[] = [
  {
    id: 'gaussian-blur',
    name: 'Gaussian Blur',
    description: 'Primenjuje Gaussian blur filter za smanjenje šuma i glatko zamagljenje slike.',
    category: 'filtering',
    icon: '🔵',
    parameters: [
      {
        id: 'kernelSize',
        name: 'Kernel Size',
        type: 'slider',
        min: 1,
        max: 31,
        step: 2,
        defaultValue: 5
      },
      {
        id: 'sigmaX',
        name: 'Sigma X',
        type: 'slider',
        min: 0,
        max: 10,
        step: 0.1,
        defaultValue: 1
      }
    ]
  },
  {
    id: 'median-blur',
    name: 'Median Blur',
    description: 'Primenjuje median filter koji je efikasan za uklanjanje salt-and-pepper šuma.',
    category: 'filtering',
    icon: '🟡',
    parameters: [
      {
        id: 'kernelSize',
        name: 'Kernel Size',
        type: 'slider',
        min: 3,
        max: 15,
        step: 2,
        defaultValue: 5
      }
    ]
  },
  {
    id: 'bilateral-filter',
    name: 'Bilateral Filter',
    description: 'Filter koji čuva ivice dok smanjuje šum, koristeći prostornu i intenzitetnu sličnost.',
    category: 'filtering',
    icon: '🟢',
    parameters: [
      {
        id: 'd',
        name: 'Diameter',
        type: 'slider',
        min: 1,
        max: 15,
        step: 1,
        defaultValue: 9
      },
      {
        id: 'sigmaColor',
        name: 'Sigma Color',
        type: 'slider',
        min: 1,
        max: 150,
        step: 1,
        defaultValue: 75
      },
      {
        id: 'sigmaSpace',
        name: 'Sigma Space',
        type: 'slider',
        min: 1,
        max: 150,
        step: 1,
        defaultValue: 75
      }
    ]
  },
  {
    id: 'canny-edge',
    name: 'Canny Edge Detection',
    description: 'Detektuje ivice u slici koristeći Canny algoritam sa višestrukim koracima.',
    category: 'edge-detection',
    icon: '⚡',
    parameters: [
      {
        id: 'threshold1',
        name: 'Lower Threshold',
        type: 'slider',
        min: 0,
        max: 255,
        step: 1,
        defaultValue: 50
      },
      {
        id: 'threshold2',
        name: 'Upper Threshold',
        type: 'slider',
        min: 0,
        max: 255,
        step: 1,
        defaultValue: 150
      }
    ]
  },
  {
    id: 'sobel-edge',
    name: 'Sobel Edge Detection',
    description: 'Detektuje ivice koristeći Sobel operator za gradijent izračunavanje.',
    category: 'edge-detection',
    icon: '📐',
    parameters: [
      {
        id: 'dx',
        name: 'X Derivative',
        type: 'slider',
        min: 0,
        max: 2,
        step: 1,
        defaultValue: 1
      },
      {
        id: 'dy',
        name: 'Y Derivative',
        type: 'slider',
        min: 0,
        max: 2,
        step: 1,
        defaultValue: 1
      },
      {
        id: 'ksize',
        name: 'Kernel Size',
        type: 'select',
        defaultValue: '3',
        options: [
          { value: '1', label: '1x1' },
          { value: '3', label: '3x3' },
          { value: '5', label: '5x5' },
          { value: '7', label: '7x7' }
        ]
      }
    ]
  },
  {
    id: 'laplacian',
    name: 'Laplacian Edge Detection',
    description: 'Detektuje ivice koristeći Laplacian operator koji je osetljiv na promene u intenzitetu.',
    category: 'edge-detection',
    icon: '🔷',
    parameters: [
      {
        id: 'ksize',
        name: 'Kernel Size',
        type: 'select',
        defaultValue: '3',
        options: [
          { value: '1', label: '1x1' },
          { value: '3', label: '3x3' },
          { value: '5', label: '5x5' }
        ]
      }
    ]
  },
  {
    id: 'erosion',
    name: 'Erosion',
    description: 'Morfološka operacija koja smanjuje objekte i povećava rupice.',
    category: 'morphological',
    icon: '🔻',
    parameters: [
      {
        id: 'kernelSize',
        name: 'Kernel Size',
        type: 'slider',
        min: 1,
        max: 21,
        step: 1,
        defaultValue: 3
      },
      {
        id: 'iterations',
        name: 'Iterations',
        type: 'slider',
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 1
      }
    ]
  },
  {
    id: 'dilation',
    name: 'Dilation',
    description: 'Morfološka operacija koja povećava objekte i smanjuje rupice.',
    category: 'morphological',
    icon: '🔺',
    parameters: [
      {
        id: 'kernelSize',
        name: 'Kernel Size',
        type: 'slider',
        min: 1,
        max: 21,
        step: 1,
        defaultValue: 3
      },
      {
        id: 'iterations',
        name: 'Iterations',
        type: 'slider',
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 1
      }
    ]
  },
  {
    id: 'opening',
    name: 'Opening',
    description: 'Kombinacija erozije i dilatacije koja uklanja male objekte i glatko ivice.',
    category: 'morphological',
    icon: '🔸',
    parameters: [
      {
        id: 'kernelSize',
        name: 'Kernel Size',
        type: 'slider',
        min: 1,
        max: 21,
        step: 1,
        defaultValue: 3
      }
    ]
  },
  {
    id: 'closing',
    name: 'Closing',
    description: 'Kombinacija dilatacije i erozije koja popunjava male rupice i povezuje bliske objekte.',
    category: 'morphological',
    icon: '🔹',
    parameters: [
      {
        id: 'kernelSize',
        name: 'Kernel Size',
        type: 'slider',
        min: 1,
        max: 21,
        step: 1,
        defaultValue: 3
      }
    ]
  },
  {
    id: 'harris-corners',
    name: 'Harris Corner Detection',
    description: 'Detektuje uglove u slici koristeći Harris corner detector.',
    category: 'feature-detection',
    icon: '📍',
    parameters: [
      {
        id: 'blockSize',
        name: 'Block Size',
        type: 'slider',
        min: 2,
        max: 10,
        step: 1,
        defaultValue: 2
      },
      {
        id: 'ksize',
        name: 'Kernel Size',
        type: 'slider',
        min: 3,
        max: 31,
        step: 2,
        defaultValue: 3
      },
      {
        id: 'k',
        name: 'Harris Parameter',
        type: 'slider',
        min: 0.01,
        max: 0.1,
        step: 0.01,
        defaultValue: 0.04
      }
    ]
  },
  {
    id: 'adaptive-threshold',
    name: 'Adaptive Threshold',
    description: 'Primenjuje adaptivnu binarizaciju koja prilagođava prag lokalno.',
    category: 'segmentation',
    icon: '⚫',
    parameters: [
      {
        id: 'blockSize',
        name: 'Block Size',
        type: 'slider',
        min: 3,
        max: 25,
        step: 2,
        defaultValue: 11
      },
      {
        id: 'c',
        name: 'Constant',
        type: 'slider',
        min: -10,
        max: 10,
        step: 1,
        defaultValue: 2
      },
      {
        id: 'method',
        name: 'Method',
        type: 'select',
        defaultValue: 'ADAPTIVE_THRESH_GAUSSIAN_C',
        options: [
          { value: 'ADAPTIVE_THRESH_GAUSSIAN_C', label: 'Gaussian' },
          { value: 'ADAPTIVE_THRESH_MEAN_C', label: 'Mean' }
        ]
      }
    ]
  }
];
