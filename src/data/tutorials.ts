import type { Tutorial } from '@/types/tutorial';

export const tutorials: Tutorial[] = [
  {
    id: 'canny-edge-detection',
    name: 'Canny Edge Detection',
    description: 'Naučite kako Canny algoritam detektuje ivice korak po korak',
    algorithmId: 'canny-edge',
    difficulty: 'intermediate',
    estimatedTime: 15,
    category: 'edge-detection',
    sampleImageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop',
    prerequisites: ['Osnovno poznavanje slika', 'Pojam gradijenta'],
    learningObjectives: [
      'Razumeti zašto je potrebno smanjenje šuma',
      'Naučiti kako se računa gradijent',
      'Razumeti non-maximum suppression',
      'Naučiti kako se postavljaju pragovi'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Canny algoritam',
        description: 'Canny algoritam je jedan od najpopularnijih algoritama za detekciju ivica. On radi u četiri glavne faze: smanjenje šuma, pronalaženje gradijenta, non-maximum suppression i histerezis pražnjenje.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'noise-reduction',
        title: 'Korak 1: Smanjenje šuma (Gaussian Blur)',
        description: 'Prvi korak je uklanjanje šuma iz slike. Šum može lažno da se protumači kao ivice, pa ga moramo ukloniti pre detekcije. Koristimo Gaussian blur filter.',
        actionType: 'apply',
        actionText: 'Primeni Gaussian Blur',
        isCompleted: false,
        isActive: false,
        parameters: { kernelSize: 5, sigmaX: 1 }
      },
      {
        id: 'gradient',
        title: 'Korak 2: Pronalaženje gradijenta',
        description: 'Sada pronalazimo gradijent - intenzitet promene osvetljenja u svakoj tački. Koristimo Sobel operatore za X i Y pravce. Pomerite miš preko slike da vidite vizualizaciju gradijenta.',
        actionType: 'visualization',
        actionText: 'Prikaži gradijent',
        isCompleted: false,
        isActive: false,
        visualization: {
          type: 'gradient',
          data: { dx: 1, dy: 1, ksize: 3 }
        }
      },
      {
        id: 'non-maximum',
        title: 'Korak 3: Non-maximum suppression',
        description: 'Non-maximum suppression održava samo najjače ivice u svom susedstvu. Ovo sužava linije ivica i uklanja "duplikate".',
        actionType: 'apply',
        actionText: 'Primeni non-maximum suppression',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'hysteresis',
        title: 'Korak 4: Histerezis pražnjenje',
        description: 'Konačni korak koristi dva praga (niski i visoki) da odluči koje ivice su stvarne. Ivice iznad visokog praga su sigurno stvarne, a one između pragova se povezuju sa stvarnim ivicama.',
        actionType: 'apply',
        actionText: 'Primeni histerezis pražnjenje',
        isCompleted: false,
        isActive: false,
        parameters: { threshold1: 50, threshold2: 150 }
      },
      {
        id: 'final-result',
        title: 'Konačni rezultat',
        description: 'Evo konačnog rezultata Canny algoritma! Vidite kako su detektovane jasne ivice dok je šum uklonjen.',
        actionType: 'info',
        actionText: 'Pogledaj rezultat',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'experiment',
        title: 'Probaj sam',
        description: 'Sada možete da eksperimentišete sa različitim parametrima. Upload-ujte svoju sliku ili koristite postojeću i podesite low_threshold i high_threshold vrednosti.',
        actionType: 'experiment',
        actionText: 'Započni eksperiment',
        isCompleted: false,
        isActive: false
      }
    ]
  },
  {
    id: 'gaussian-blur-tutorial',
    name: 'Gaussian Blur Filter',
    description: 'Naučite kako Gaussian blur filter radi i kada ga koristiti',
    algorithmId: 'gaussian-blur',
    difficulty: 'beginner',
    estimatedTime: 10,
    category: 'filtering',
    sampleImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    prerequisites: ['Osnovno poznavanje slika'],
    learningObjectives: [
      'Razumeti zašto je potreban blur filter',
      'Naučiti kako Gaussian distribucija utiče na rezultat',
      'Razumeti uticaj kernel size i sigma parametara'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Gaussian Blur',
        description: 'Gaussian blur je filter koji "zamagljuje" sliku koristeći Gaussian distribuciju. Koristi se za smanjenje šuma i glatko zamagljenje.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'kernel-explanation',
        title: 'Kernel i Gaussian distribucija',
        description: 'Gaussian blur koristi kernel (matricu) koja sledi Gaussian distribuciju. Centralni piksel ima najveću težinu, a težina opada sa udaljenošću.',
        actionType: 'visualization',
        actionText: 'Prikaži kernel',
        isCompleted: false,
        isActive: false,
        visualization: {
          type: 'custom',
          data: { kernelSize: 5, sigma: 1 }
        }
      },
      {
        id: 'apply-blur',
        title: 'Primena Gaussian Blur-a',
        description: 'Sada ćemo primeniti Gaussian blur na sliku. Vidite kako se šum smanjuje i slika postaje glatkija.',
        actionType: 'apply',
        actionText: 'Primeni Gaussian Blur',
        isCompleted: false,
        isActive: false,
        parameters: { kernelSize: 5, sigmaX: 1 }
      },
      {
        id: 'parameter-effects',
        title: 'Uticaj parametara',
        description: 'Eksperimentišite sa različitim vrednostima kernel size i sigma da vidite kako utiču na rezultat.',
        actionType: 'experiment',
        actionText: 'Eksperimentiši',
        isCompleted: false,
        isActive: false
      }
    ]
  }
];

export const getTutorialById = (id: string): Tutorial | undefined => 
  tutorials.find(tutorial => tutorial.id === id);

export const getTutorialsByCategory = (category: string): Tutorial[] => 
  tutorials.filter(tutorial => tutorial.category === category);

export const getTutorialsByDifficulty = (difficulty: string): Tutorial[] => 
  tutorials.filter(tutorial => tutorial.difficulty === difficulty);
