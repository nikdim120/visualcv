export interface AlgorithmInfo {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  sections: {
    title: string;
    content: string;
    subsections?: {
      title: string;
      content: string;
      code?: string;
      formula?: string;
    }[];
  }[];
  applications: string[];
  advantages: string[];
  disadvantages: string[];
  relatedAlgorithms: string[];
  references: {
    title: string;
    url?: string;
    authors?: string;
    year?: number;
  }[];
}

export const algorithmInfo: AlgorithmInfo[] = [
  {
    id: 'gaussian-blur',
    name: 'Gaussian Blur',
    category: 'filtering',
    icon: '🔵',
    description: 'Gaussian blur je jedan od najfundamentalnijih filtera u kompjuterskom vidu koji koristi Gaussian distribuciju za zamagljenje slike.',
    sections: [
      {
        title: 'Uvod',
        content: 'Gaussian blur je filter koji "zamagljuje" sliku koristeći Gaussian (normalnu) distribuciju. Ovo je jedna od najvažnijih operacija u kompjuterskom vidu jer se koristi kao prethodni korak za mnoge druge algoritme.',
        subsections: [
          {
            title: 'Zašto Gaussian distribucija?',
            content: 'Gaussian distribucija je prirodna distribucija koja se javlja u mnogim fizičkim procesima. U kontekstu slika, ona dobro modelira način na koji se svetlost širi i reflektuje od površina.',
            formula: 'G(x,y) = (1/(2πσ²)) * e^(-(x²+y²)/(2σ²))'
          }
        ]
      },
      {
        title: 'Matematička osnova',
        content: 'Gaussian blur se implementira kao konvolucija slike sa Gaussian kernel-om. Kernel je matrica koja definiše težine za svaki piksel u susedstvu.',
        subsections: [
          {
            title: 'Gaussian Kernel',
            content: 'Kernel se kreira na osnovu Gaussian funkcije. Centralni piksel ima najveću težinu, a težina opada eksponencijalno sa udaljenošću.',
            code: `// Primer 3x3 Gaussian kernel sa σ=1
[0.077847, 0.123317, 0.077847]
[0.123317, 0.195346, 0.123317]
[0.077847, 0.123317, 0.077847]`
          },
          {
            title: 'Konvolucija',
            content: 'Svaki piksel u rezultujućoj slici se računa kao ponderisana suma piksela u susedstvu, gde su težine definisane Gaussian kernel-om.',
            formula: 'I\'[x,y] = Σ(i,j) I[x+i,y+j] * G[i,j]'
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Gaussian blur ima dva glavna parametra koji utiču na rezultat:',
        subsections: [
          {
            title: 'Kernel Size',
            content: 'Veličina kernel-a određuje koliko piksela u susedstvu će biti uključeno u proračun. Veći kernel znači više zamagljenja.',
            code: `// Kernel size mora biti neparan broj
kernelSize = 2 * ceil(3 * sigma) + 1`
          },
          {
            title: 'Sigma (σ)',
            content: 'Sigma parametar kontroliše širinu Gaussian distribucije. Veća sigma znači više zamagljenja i širi kernel.',
            code: `// Veća sigma = više zamagljenja
sigma = 1.0  // Malo zamagljenja
sigma = 3.0  // Srednje zamagljenje
sigma = 5.0  // Jako zamagljenje`
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Gaussian blur se može implementirati na nekoliko načina:',
        subsections: [
          {
            title: 'Direktna konvolucija',
            content: 'Najjednostavniji pristup je direktna konvolucija sa Gaussian kernel-om. Ovo je sporo za velike kernel-e.',
            code: `def gaussian_blur_direct(image, kernel_size, sigma):
    kernel = create_gaussian_kernel(kernel_size, sigma)
    return convolve(image, kernel)`
          },
          {
            title: 'Separabilnost',
            content: 'Gaussian funkcija je separabilna, što znači da se 2D konvolucija može razložiti na dve 1D konvolucije. Ovo je mnogo efikasnije.',
            code: `def gaussian_blur_separable(image, kernel_size, sigma):
    # Prvo horizontalno, zatim vertikalno
    kernel_x = create_1d_gaussian_kernel(kernel_size, sigma)
    kernel_y = kernel_x.T
    temp = convolve(image, kernel_x)
    return convolve(temp, kernel_y)`
          }
        ]
      }
    ],
    applications: [
      'Smanjenje šuma u slikama',
      'Prethodni korak za detekciju ivica',
      'Glatko zamagljenje u fotografiji',
      'Smanjenje aliasing efekata',
      'Priprema slike za druge algoritme'
    ],
    advantages: [
      'Efikasan za smanjenje šuma',
      'Glatko zamagljenje bez artefakata',
      'Separabilnost omogućava brzu implementaciju',
      'Matematički dobro definisan',
      'Široko podržan u bibliotekama'
    ],
    disadvantages: [
      'Uklanja i korisne detalje',
      'Može biti spor za velike kernel-e',
      'Nije edge-preserving',
      'Može stvoriti halo efekte',
      'Nije optimalan za salt-and-pepper šum'
    ],
    relatedAlgorithms: ['median-blur', 'bilateral-filter', 'box-blur'],
    references: [
      {
        title: 'Digital Image Processing',
        authors: 'Rafael C. Gonzalez, Richard E. Woods',
        year: 2017
      },
      {
        title: 'Computer Vision: Algorithms and Applications',
        authors: 'Richard Szeliski',
        year: 2010
      }
    ]
  },
  {
    id: 'canny-edge',
    name: 'Canny Edge Detection',
    category: 'edge-detection',
    icon: '⚡',
    description: 'Canny edge detection je jedan od najpopularnijih i najefikasnijih algoritama za detekciju ivica koji koristi višestruke korake za optimalne rezultate.',
    sections: [
      {
        title: 'Uvod',
        content: 'Canny edge detection je algoritam koji detektuje ivice u slikama koristeći višestruke korake. Razvio ga je John F. Canny 1986. godine i i danas se smatra jednim od najboljih algoritama za detekciju ivica.',
        subsections: [
          {
            title: 'Ciljevi algoritma',
            content: 'Canny je definisao tri glavna cilja za detekciju ivica: 1) Niska greška - ne detektovati ivice gde ih nema, 2) Visoka preciznost - detektovati ivice tamo gde su stvarno, 3) Jedan odziv - jedan piksel širine za svaku ivicu.'
          }
        ]
      },
      {
        title: 'Koraci algoritma',
        content: 'Canny algoritam se sastoji od četiri glavna koraka:',
        subsections: [
          {
            title: '1. Smanjenje šuma',
            content: 'Prvi korak je primena Gaussian blur filtera za uklanjanje šuma. Šum može lažno da se protumači kao ivice.',
            code: `// Gaussian blur za smanjenje šuma
blurred = cv2.GaussianBlur(image, (5, 5), 1.0)`
          },
          {
            title: '2. Pronalaženje gradijenta',
            content: 'Koriste se Sobel operatori za pronalaženje gradijenta magnitude i smera u svakom pikselu.',
            code: `// Sobel operatori za X i Y pravce
grad_x = cv2.Sobel(blurred, cv2.CV_64F, 1, 0, ksize=3)
grad_y = cv2.Sobel(blurred, cv2.CV_64F, 0, 1, ksize=3)

// Magnitude i smer gradijenta
magnitude = sqrt(grad_x² + grad_y²)
direction = atan2(grad_y, grad_x)`
          },
          {
            title: '3. Non-maximum suppression',
            content: 'Održava se samo najjači piksel u svom susedstvu duž smera gradijenta. Ovo sužava linije ivica.',
            code: `// Non-maximum suppression
for each pixel:
    if magnitude[pixel] < magnitude[neighbor1] or 
       magnitude[pixel] < magnitude[neighbor2]:
        magnitude[pixel] = 0`
          },
          {
            title: '4. Histerezis pražnjenje',
            content: 'Koriste se dva praga (niski i visoki) za odlučivanje koje ivice su stvarne. Ivice iznad visokog praga su sigurno stvarne.',
            code: `// Histerezis pražnjenje
strong_edges = magnitude > high_threshold
weak_edges = (magnitude > low_threshold) & (magnitude <= high_threshold)

// Poveži weak edges sa strong edges
final_edges = strong_edges + connected_weak_edges`
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Canny algoritam ima dva glavna parametra:',
        subsections: [
          {
            title: 'Lower Threshold',
            content: 'Niski prag za histerezis pražnjenje. Pikseli sa gradijentom iznad ovog praga se smatraju kandidatima za ivice.',
            code: 'lower_threshold = 50  // Tipična vrednost'
          },
          {
            title: 'Upper Threshold',
            content: 'Visoki prag za histerezis pražnjenje. Pikseli sa gradijentom iznad ovog praga se smatraju sigurnim ivicama.',
            code: 'upper_threshold = 150  // Tipično 3x lower_threshold'
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Evo kompletnog primera implementacije Canny algoritma:',
        subsections: [
          {
            title: 'OpenCV implementacija',
            content: 'OpenCV pruža gotovu implementaciju Canny algoritma:',
            code: `import cv2
import numpy as np

def canny_edge_detection(image, low_threshold=50, high_threshold=150):
    # 1. Smanjenje šuma
    blurred = cv2.GaussianBlur(image, (5, 5), 1.0)
    
    # 2. Pronalaženje gradijenta
    grad_x = cv2.Sobel(blurred, cv2.CV_64F, 1, 0, ksize=3)
    grad_y = cv2.Sobel(blurred, cv2.CV_64F, 0, 1, ksize=3)
    
    magnitude = np.sqrt(grad_x**2 + grad_y**2)
    direction = np.arctan2(grad_y, grad_x)
    
    # 3. Non-maximum suppression
    # (implementacija je složenija)
    
    # 4. Histerezis pražnjenje
    edges = cv2.Canny(blurred, low_threshold, high_threshold)
    
    return edges`
          }
        ]
      }
    ],
    applications: [
      'Detekcija objekata',
      'Segmentacija slike',
      'Prethodni korak za feature detection',
      'Analiza strukture slike',
      'Computer vision pipeline'
    ],
    advantages: [
      'Visoka preciznost detekcije',
      'Robustnost na šum',
      'Jedan piksel širine ivica',
      'Dobra teorijska osnova',
      'Široko podržan'
    ],
    disadvantages: [
      'Složen za implementaciju',
      'Više koraka = sporiji',
      'Osetljiv na parametre',
      'Može propustiti slabe ivice',
      'Ne detektuje sve tipove ivica'
    ],
    relatedAlgorithms: ['sobel-edge', 'laplacian', 'harris-corners'],
    references: [
      {
        title: 'A Computational Approach to Edge Detection',
        authors: 'John F. Canny',
        year: 1986
      },
      {
        title: 'Digital Image Processing',
        authors: 'Rafael C. Gonzalez, Richard E. Woods',
        year: 2017
      }
    ]
  },
  {
    id: 'bilateral-filter',
    name: 'Bilateral Filter',
    category: 'filtering',
    icon: '🟢',
    description: 'Bilateral filter je edge-preserving filter koji smanjuje šum dok čuva ivice koristeći prostornu i intenzitetnu sličnost.',
    sections: [
      {
        title: 'Uvod',
        content: 'Bilateral filter je napredan filter koji rešava problem standardnih blur filtera - gubljenje ivica. On smanjuje šum dok čuva oštre ivice i detalje u slici.',
        subsections: [
          {
            title: 'Problem standardnih filtera',
            content: 'Gaussian blur i drugi standardni filteri smanjuju šum, ali takođe zamagljuju ivice i detalje. Bilateral filter rešava ovaj problem.'
          }
        ]
      },
      {
        title: 'Princip rada',
        content: 'Bilateral filter koristi dva faktora za određivanje težine svakog piksela:',
        subsections: [
          {
            title: 'Prostorni faktor',
            content: 'Meri udaljenost između piksela. Pikseli koji su bliže imaju veću težinu.',
            formula: 'G_σs(||p - q||) = e^(-||p - q||²/(2σs²))'
          },
          {
            title: 'Intenzitetni faktor',
            content: 'Meri razliku u intenzitetu između piksela. Pikseli sa sličnim intenzitetom imaju veću težinu.',
            formula: 'G_σr(|I(p) - I(q)|) = e^(-|I(p) - I(q)|²/(2σr²))'
          },
          {
            title: 'Kombinovana težina',
            content: 'Konačna težina je proizvod prostornog i intenzitetnog faktora.',
            formula: 'w(p,q) = G_σs(||p - q||) * G_σr(|I(p) - I(q)|)'
          }
        ]
      },
      {
        title: 'Matematička formula',
        content: 'Bilateral filter se računa kao ponderisana sredina:',
        subsections: [
          {
            title: 'Formula',
            content: 'Svaki piksel se zamenjuje ponderisanom sredinom susednih piksela.',
            formula: 'BF[I]p = (1/Wp) * Σq∈S G_σs(||p - q||) * G_σr(|I(p) - I(q)|) * I(q)'
          },
          {
            title: 'Normalizacija',
            content: 'Wp je normalizacioni faktor koji osigurava da suma težina bude 1.',
            formula: 'Wp = Σq∈S G_σs(||p - q||) * G_σr(|I(p) - I(q)|)'
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Bilateral filter ima tri glavna parametra:',
        subsections: [
          {
            title: 'Diameter (d)',
            content: 'Veličina filtera. Veći diameter znači više piksela u susedstvu.',
            code: 'diameter = 9  // Tipična vrednost'
          },
          {
            title: 'Sigma Color (σr)',
            content: 'Kontroliše koliko različitih intenziteta će biti smešteno. Veća vrednost znači više zamagljenja.',
            code: 'sigma_color = 75  // Za RGB slike (0-255)'
          },
          {
            title: 'Sigma Space (σs)',
            content: 'Kontroliše prostornu širinu filtera. Veća vrednost znači da će udaljeniji pikseli imati veću težinu.',
            code: 'sigma_space = 75  // U pikselima'
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Evo primera implementacije bilateral filtera:',
        subsections: [
          {
            title: 'OpenCV implementacija',
            content: 'OpenCV pruža efikasnu implementaciju bilateral filtera:',
            code: `import cv2
import numpy as np

def bilateral_filter(image, d, sigma_color, sigma_space):
    """
    Primeni bilateral filter na sliku
    
    Args:
        image: Ulazna slika
        d: Diameter filtera
        sigma_color: Sigma za intenzitet
        sigma_space: Sigma za prostor
    """
    filtered = cv2.bilateralFilter(
        image, 
        d, 
        sigma_color, 
        sigma_space
    )
    return filtered

# Primer korišćenja
result = bilateral_filter(image, 9, 75, 75)`
          },
          {
            title: 'Manuelna implementacija',
            content: 'Evo pojednostavljene manuelne implementacije:',
            code: `def bilateral_filter_manual(image, d, sigma_color, sigma_space):
    height, width = image.shape
    result = np.zeros_like(image)
    
    for i in range(height):
        for j in range(width):
            # Pronađi susedne piksele
            neighbors = get_neighbors(image, i, j, d)
            
            # Izračunaj težine
            weights = []
            for ni, nj, n_val in neighbors:
                # Prostorni faktor
                spatial_dist = np.sqrt((i-ni)**2 + (j-nj)**2)
                spatial_weight = np.exp(-spatial_dist**2 / (2*sigma_space**2))
                
                # Intenzitetni faktor
                intensity_diff = abs(image[i,j] - n_val)
                intensity_weight = np.exp(-intensity_diff**2 / (2*sigma_color**2))
                
                # Kombinovana težina
                weight = spatial_weight * intensity_weight
                weights.append(weight)
            
            # Ponderisana sredina
            total_weight = sum(weights)
            if total_weight > 0:
                weighted_sum = sum(w * n_val for w, (ni, nj, n_val) in zip(weights, neighbors))
                result[i,j] = weighted_sum / total_weight
    
    return result`
          }
        ]
      }
    ],
    applications: [
      'Smanjenje šuma sačuvanjem ivica',
      'Prethodni korak za detekciju ivica',
      'Glatko zamagljenje u fotografiji',
      'Uklanjanje šuma iz medicinskih slika',
      'Priprema slike za segmentaciju'
    ],
    advantages: [
      'Čuva ivice i detalje',
      'Efikasan za smanjenje šuma',
      'Matematički dobro definisan',
      'Robustan na različite tipove šuma',
      'Prirodan rezultat'
    ],
    disadvantages: [
      'Sporiji od standardnih filtera',
      'Složeniji za implementaciju',
      'Osetljiv na parametre',
      'Može biti spor za velike slike',
      'Može stvoriti halo efekte'
    ],
    relatedAlgorithms: ['gaussian-blur', 'median-blur', 'non-local-means'],
    references: [
      {
        title: 'Bilateral Filtering for Gray and Color Images',
        authors: 'C. Tomasi, R. Manduchi',
        year: 1998
      },
      {
        title: 'Computer Vision: Algorithms and Applications',
        authors: 'Richard Szeliski',
        year: 2010
      }
    ]
  }
];

export const getAlgorithmInfoById = (id: string): AlgorithmInfo | undefined => 
  algorithmInfo.find(info => info.id === id);

export const getAlgorithmInfoByCategory = (category: string): AlgorithmInfo[] => 
  algorithmInfo.filter(info => info.category === category);
