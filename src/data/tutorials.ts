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
  },
  {
    id: 'median-blur-tutorial',
    name: 'Median Blur Filter',
    description: 'Naučite kako median filter uklanja salt-and-pepper šum',
    algorithmId: 'median-blur',
    difficulty: 'beginner',
    estimatedTime: 8,
    category: 'filtering',
    sampleImageUrl: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&h=400&fit=crop',
    prerequisites: ['Osnovno poznavanje slika'],
    learningObjectives: [
      'Razumeti razliku između median i mean filtera',
      'Naučiti kada koristiti median blur',
      'Razumeti uticaj kernel size parametra'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Median Blur',
        description: 'Median blur je filter koji zamenjuje svaki piksel sa medianom vrednosti u njegovom susedstvu. Ovo je efikasno za uklanjanje salt-and-pepper šuma.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'vs-gaussian',
        title: 'Median vs Gaussian Blur',
        description: 'Median blur čuva ivice bolje od Gaussian blur-a jer ne koristi ponderisanu sredinu. Umesto toga, koristi stvarnu srednju vrednost.',
        actionType: 'visualization',
        actionText: 'Uporedi filtere',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'apply-median',
        title: 'Primena Median Blur-a',
        description: 'Sada ćemo primeniti median blur na sliku sa šumom. Vidite kako se salt-and-pepper šum uklanja.',
        actionType: 'apply',
        actionText: 'Primeni Median Blur',
        isCompleted: false,
        isActive: false,
        parameters: { kernelSize: 5 }
      },
      {
        id: 'experiment',
        title: 'Eksperimentišite',
        description: 'Testirajte različite kernel size vrednosti da vidite kako utiču na rezultat.',
        actionType: 'experiment',
        actionText: 'Eksperimentiši',
        isCompleted: false,
        isActive: false
      }
    ]
  },
  {
    id: 'bilateral-filter-tutorial',
    name: 'Bilateral Filter',
    description: 'Naučite kako bilateral filter čuva ivice dok smanjuje šum',
    algorithmId: 'bilateral-filter',
    difficulty: 'intermediate',
    estimatedTime: 12,
    category: 'filtering',
    sampleImageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop',
    prerequisites: ['Gaussian blur', 'Pojam ivica'],
    learningObjectives: [
      'Razumeti koncept bilateral filtera',
      'Naučiti razliku između prostornog i intenzitetnog filtra',
      'Razumeti kada koristiti bilateral filter'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Bilateral Filter',
        description: 'Bilateral filter je "edge-preserving" filter koji smanjuje šum dok čuva ivice. Koristi dva faktora: prostornu i intenzitetnu sličnost.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'spatial-vs-intensity',
        title: 'Prostorni vs Intenzitetni faktor',
        description: 'Prostorni faktor meri udaljenost između piksela, a intenzitetni faktor meri sličnost vrednosti piksela. Oba faktora utiču na težinu.',
        actionType: 'visualization',
        actionText: 'Prikaži faktore',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'apply-bilateral',
        title: 'Primena Bilateral Filter-a',
        description: 'Sada ćemo primeniti bilateral filter. Vidite kako se šum smanjuje dok se ivice čuvaju.',
        actionType: 'apply',
        actionText: 'Primeni Bilateral Filter',
        isCompleted: false,
        isActive: false,
        parameters: { d: 9, sigmaColor: 75, sigmaSpace: 75 }
      },
      {
        id: 'parameter-effects',
        title: 'Uticaj parametara',
        description: 'Eksperimentišite sa diameter, sigmaColor i sigmaSpace parametrima.',
        actionType: 'experiment',
        actionText: 'Eksperimentiši',
        isCompleted: false,
        isActive: false
      }
    ]
  },
  {
    id: 'sobel-edge-tutorial',
    name: 'Sobel Edge Detection',
    description: 'Naučite kako Sobel operator detektuje ivice',
    algorithmId: 'sobel-edge',
    difficulty: 'beginner',
    estimatedTime: 10,
    category: 'edge-detection',
    sampleImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    prerequisites: ['Osnovno poznavanje slika', 'Pojam gradijenta'],
    learningObjectives: [
      'Razumeti Sobel operatore',
      'Naučiti kako se računa gradijent',
      'Razumeti uticaj kernel size parametra'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Sobel Edge Detection',
        description: 'Sobel operator je jedan od najjednostavnijih i najefikasnijih operatora za detekciju ivica. Koristi se za pronalaženje gradijenta u X i Y pravcu.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'sobel-kernels',
        title: 'Sobel Kerneli',
        description: 'Sobel operator koristi dva kernela: jedan za X pravac i jedan za Y pravac. Ovi kerneli detektuju horizontalne i vertikalne ivice.',
        actionType: 'visualization',
        actionText: 'Prikaži kerneli',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'apply-sobel',
        title: 'Primena Sobel operatora',
        description: 'Sada ćemo primeniti Sobel operator na sliku. Vidite kako se detektuju ivice.',
        actionType: 'apply',
        actionText: 'Primeni Sobel',
        isCompleted: false,
        isActive: false,
        parameters: { dx: 1, dy: 1, ksize: 3 }
      },
      {
        id: 'experiment',
        title: 'Eksperimentišite',
        description: 'Testirajte različite kombinacije dx i dy vrednosti.',
        actionType: 'experiment',
        actionText: 'Eksperimentiši',
        isCompleted: false,
        isActive: false
      }
    ]
  },
  {
    id: 'laplacian-tutorial',
    name: 'Laplacian Edge Detection',
    description: 'Naučite kako Laplacian operator detektuje ivice',
    algorithmId: 'laplacian',
    difficulty: 'intermediate',
    estimatedTime: 10,
    category: 'edge-detection',
    sampleImageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop',
    prerequisites: ['Sobel operator', 'Pojam drugog izvoda'],
    learningObjectives: [
      'Razumeti Laplacian operator',
      'Naučiti razliku između prvog i drugog izvoda',
      'Razumeti osetljivost na šum'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Laplacian Edge Detection',
        description: 'Laplacian operator je drugi izvod koji je osetljiv na promene u intenzitetu. Detektuje ivice na oba pravca istovremeno.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'vs-sobel',
        title: 'Laplacian vs Sobel',
        description: 'Laplacian je osetljiviji na šum od Sobel operatora jer koristi drugi izvod. Međutim, detektuje ivice na sve strane.',
        actionType: 'visualization',
        actionText: 'Uporedi operatore',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'apply-laplacian',
        title: 'Primena Laplacian operatora',
        description: 'Sada ćemo primeniti Laplacian operator. Vidite kako se detektuju ivice na sve strane.',
        actionType: 'apply',
        actionText: 'Primeni Laplacian',
        isCompleted: false,
        isActive: false,
        parameters: { ksize: 3 }
      },
      {
        id: 'experiment',
        title: 'Eksperimentišite',
        description: 'Testirajte različite kernel size vrednosti.',
        actionType: 'experiment',
        actionText: 'Eksperimentiši',
        isCompleted: false,
        isActive: false
      }
    ]
  },
  {
    id: 'erosion-tutorial',
    name: 'Erosion - Morfološka operacija',
    description: 'Naučite kako erosion smanjuje objekte',
    algorithmId: 'erosion',
    difficulty: 'beginner',
    estimatedTime: 8,
    category: 'morphological',
    sampleImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    prerequisites: ['Osnovno poznavanje slika'],
    learningObjectives: [
      'Razumeti koncept erozije',
      'Naučiti kako kernel utiče na rezultat',
      'Razumeti uticaj broja iteracija'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Erosion',
        description: 'Erosion je morfološka operacija koja "smanjuje" objekte u slici. Koristi se za uklanjanje malih objekata i sužavanje linija.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'kernel-effect',
        title: 'Uticaj kernela',
        description: 'Kernel definiše oblik i veličinu erozije. Veći kernel znači veću eroziju.',
        actionType: 'visualization',
        actionText: 'Prikaži kernel',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'apply-erosion',
        title: 'Primena Erosion-a',
        description: 'Sada ćemo primeniti erosion na sliku. Vidite kako se objekti smanjuju.',
        actionType: 'apply',
        actionText: 'Primeni Erosion',
        isCompleted: false,
        isActive: false,
        parameters: { kernelSize: 3, iterations: 1 }
      },
      {
        id: 'experiment',
        title: 'Eksperimentišite',
        description: 'Testirajte različite kernel size i iterations vrednosti.',
        actionType: 'experiment',
        actionText: 'Eksperimentiši',
        isCompleted: false,
        isActive: false
      }
    ]
  },
  {
    id: 'dilation-tutorial',
    name: 'Dilation - Morfološka operacija',
    description: 'Naučite kako dilation povećava objekte',
    algorithmId: 'dilation',
    difficulty: 'beginner',
    estimatedTime: 8,
    category: 'morphological',
    sampleImageUrl: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&h=400&fit=crop',
    prerequisites: ['Erosion', 'Osnovno poznavanje slika'],
    learningObjectives: [
      'Razumeti koncept dilatacije',
      'Naučiti razliku između erozije i dilatacije',
      'Razumeti kada koristiti dilataciju'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Dilation',
        description: 'Dilation je suprotna operacija od erozije. Ona "povećava" objekte u slici i popunjava male rupice.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'vs-erosion',
        title: 'Dilation vs Erosion',
        description: 'Dilation povećava objekte, dok erosion smanjuje. Ove operacije se često koriste zajedno.',
        actionType: 'visualization',
        actionText: 'Uporedi operacije',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'apply-dilation',
        title: 'Primena Dilation-a',
        description: 'Sada ćemo primeniti dilation na sliku. Vidite kako se objekti povećavaju.',
        actionType: 'apply',
        actionText: 'Primeni Dilation',
        isCompleted: false,
        isActive: false,
        parameters: { kernelSize: 3, iterations: 1 }
      },
      {
        id: 'experiment',
        title: 'Eksperimentišite',
        description: 'Testirajte različite parametre i vidite kako utiču na rezultat.',
        actionType: 'experiment',
        actionText: 'Eksperimentiši',
        isCompleted: false,
        isActive: false
      }
    ]
  },
  {
    id: 'opening-tutorial',
    name: 'Opening - Morfološka operacija',
    description: 'Naučite kako opening kombinuje eroziju i dilataciju',
    algorithmId: 'opening',
    difficulty: 'intermediate',
    estimatedTime: 10,
    category: 'morphological',
    sampleImageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop',
    prerequisites: ['Erosion', 'Dilation'],
    learningObjectives: [
      'Razumeti koncept opening operacije',
      'Naučiti redosled erozije i dilatacije',
      'Razumeti kada koristiti opening'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Opening',
        description: 'Opening je kombinacija erozije i dilatacije (erozija pa dilatacija). Uklanja male objekte i glatko ivice.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'step-by-step',
        title: 'Korak po korak',
        description: 'Prvo se primenjuje erozija koja uklanja male objekte, zatim dilatacija koja vraća veličinu preostalih objekata.',
        actionType: 'visualization',
        actionText: 'Prikaži korake',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'apply-opening',
        title: 'Primena Opening-a',
        description: 'Sada ćemo primeniti opening operaciju. Vidite kako se uklanjaju mali objekti.',
        actionType: 'apply',
        actionText: 'Primeni Opening',
        isCompleted: false,
        isActive: false,
        parameters: { kernelSize: 3 }
      },
      {
        id: 'experiment',
        title: 'Eksperimentišite',
        description: 'Testirajte različite kernel size vrednosti.',
        actionType: 'experiment',
        actionText: 'Eksperimentiši',
        isCompleted: false,
        isActive: false
      }
    ]
  },
  {
    id: 'closing-tutorial',
    name: 'Closing - Morfološka operacija',
    description: 'Naučite kako closing kombinuje dilataciju i eroziju',
    algorithmId: 'closing',
    difficulty: 'intermediate',
    estimatedTime: 10,
    category: 'morphological',
    sampleImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    prerequisites: ['Erosion', 'Dilation', 'Opening'],
    learningObjectives: [
      'Razumeti koncept closing operacije',
      'Naučiti razliku između opening i closing',
      'Razumeti kada koristiti closing'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Closing',
        description: 'Closing je suprotna operacija od opening-a: dilatacija pa erozija. Popunjava male rupice i povezuje bliske objekte.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'vs-opening',
        title: 'Closing vs Opening',
        description: 'Closing popunjava rupice, dok opening uklanja objekte. Ove operacije se često koriste zajedno.',
        actionType: 'visualization',
        actionText: 'Uporedi operacije',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'apply-closing',
        title: 'Primena Closing-a',
        description: 'Sada ćemo primeniti closing operaciju. Vidite kako se popunjavaju male rupice.',
        actionType: 'apply',
        actionText: 'Primeni Closing',
        isCompleted: false,
        isActive: false,
        parameters: { kernelSize: 3 }
      },
      {
        id: 'experiment',
        title: 'Eksperimentišite',
        description: 'Testirajte različite kernel size vrednosti.',
        actionType: 'experiment',
        actionText: 'Eksperimentiši',
        isCompleted: false,
        isActive: false
      }
    ]
  },
  {
    id: 'harris-corners-tutorial',
    name: 'Harris Corner Detection',
    description: 'Naučite kako Harris detector pronalazi uglove',
    algorithmId: 'harris-corners',
    difficulty: 'advanced',
    estimatedTime: 15,
    category: 'feature-detection',
    sampleImageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop',
    prerequisites: ['Sobel operator', 'Matrične operacije'],
    learningObjectives: [
      'Razumeti koncept uglova',
      'Naučiti Harris corner response funkciju',
      'Razumeti uticaj parametara'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Harris Corner Detection',
        description: 'Harris corner detector pronalazi uglove u slici. Ugao je tačka gde se susreću dve ivice različitih pravaca.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'corner-response',
        title: 'Harris Corner Response',
        description: 'Harris koristi matrične operacije da izračuna "corner response" za svaki piksel. Veća vrednost znači da je piksel ugao.',
        actionType: 'visualization',
        actionText: 'Prikaži response',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'apply-harris',
        title: 'Primena Harris Corner Detection-a',
        description: 'Sada ćemo primeniti Harris corner detector. Vidite kako se detektuju uglovi.',
        actionType: 'apply',
        actionText: 'Primeni Harris',
        isCompleted: false,
        isActive: false,
        parameters: { blockSize: 2, ksize: 3, k: 0.04 }
      },
      {
        id: 'experiment',
        title: 'Eksperimentišite',
        description: 'Testirajte različite parametre da vidite kako utiču na detekciju uglova.',
        actionType: 'experiment',
        actionText: 'Eksperimentiši',
        isCompleted: false,
        isActive: false
      }
    ]
  },
  {
    id: 'adaptive-threshold-tutorial',
    name: 'Adaptive Threshold',
    description: 'Naučite kako adaptivna binarizacija prilagođava prag lokalno',
    algorithmId: 'adaptive-threshold',
    difficulty: 'intermediate',
    estimatedTime: 12,
    category: 'segmentation',
    sampleImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    prerequisites: ['Osnovna binarizacija', 'Pojam praga'],
    learningObjectives: [
      'Razumeti razliku između globalnog i lokalnog praga',
      'Naučiti kako se računa adaptivni prag',
      'Razumeti uticaj block size i constant parametara'
    ],
    steps: [
      {
        id: 'intro',
        title: 'Uvod u Adaptive Threshold',
        description: 'Adaptive threshold prilagođava prag lokalno za svaki region slike. Ovo je korisno kada slika ima neravnomerno osvetljenje.',
        actionType: 'info',
        actionText: 'Započni tutorijal',
        isCompleted: false,
        isActive: true
      },
      {
        id: 'vs-global',
        title: 'Adaptive vs Global Threshold',
        description: 'Global threshold koristi jedan prag za celu sliku, dok adaptive threshold koristi različite pragove za različite regione.',
        actionType: 'visualization',
        actionText: 'Uporedi metode',
        isCompleted: false,
        isActive: false
      },
      {
        id: 'apply-adaptive',
        title: 'Primena Adaptive Threshold-a',
        description: 'Sada ćemo primeniti adaptive threshold. Vidite kako se prag prilagođava lokalno.',
        actionType: 'apply',
        actionText: 'Primeni Adaptive Threshold',
        isCompleted: false,
        isActive: false,
        parameters: { blockSize: 11, c: 2, method: 'ADAPTIVE_THRESH_GAUSSIAN_C' }
      },
      {
        id: 'experiment',
        title: 'Eksperimentišite',
        description: 'Testirajte različite block size, constant i method parametre.',
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
