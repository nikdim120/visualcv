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
  },
  {
    id: 'median-blur',
    name: 'Median Blur',
    category: 'filtering',
    icon: '🟡',
    description: 'Median blur je filter koji je posebno efikasan za uklanjanje salt-and-pepper šuma dok čuva ivice bolje od Gaussian blur-a.',
    sections: [
      {
        title: 'Uvod',
        content: 'Median blur je statistički filter koji zamenjuje vrednost svakog piksela sa medijanom vrednosti u njegovom susedstvu. Ovo ga čini posebno efikasnim za uklanjanje šuma koji nije Gaussian.',
        subsections: [
          {
            title: 'Zašto medijan?',
            content: 'Medijan je robusniji od srednje vrednosti jer nije osetljiv na ekstremne vrednosti (outliers). Ovo ga čini idealnim za uklanjanje salt-and-pepper šuma.'
          }
        ]
      },
      {
        title: 'Princip rada',
        content: 'Za svaki piksel, filter uzima sve piksele u definisanom susedstvu (kernel), sortira ih po vrednosti, i uzima srednju vrednost (medijan).',
        subsections: [
          {
            title: 'Algoritam',
            content: '1. Definiši kernel (npr. 3x3, 5x5) 2. Za svaki piksel, uzmi sve piksele u kernel-u 3. Sortiraj vrednosti 4. Uzmi medijan kao novu vrednost',
            code: `def median_blur(image, kernel_size):
    height, width = image.shape
    result = np.zeros_like(image)
    offset = kernel_size // 2
    
    for i in range(offset, height - offset):
        for j in range(offset, width - offset):
            # Uzmi susedne piksele
            neighborhood = image[i-offset:i+offset+1, j-offset:j+offset+1]
            # Sortiraj i uzmi medijan
            median_val = np.median(neighborhood)
            result[i, j] = median_val
    
    return result`
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Median blur ima jedan glavni parametar:',
        subsections: [
          {
            title: 'Kernel Size',
            content: 'Veličina kernel-a određuje koliko piksela će biti uključeno u proračun medijana. Veći kernel znači više zamagljenja.',
            code: `kernel_size = 3  # 3x3 kernel
kernel_size = 5  # 5x5 kernel
kernel_size = 7  # 7x7 kernel`
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Evo primera implementacije median blur-a:',
        subsections: [
          {
            title: 'OpenCV implementacija',
            content: 'OpenCV pruža efikasnu implementaciju median blur-a:',
            code: `import cv2
import numpy as np

def median_blur_opencv(image, kernel_size):
    """
    Primeni median blur na sliku
    
    Args:
        image: Ulazna slika
        kernel_size: Veličina kernel-a (mora biti neparan)
    """
    # Kernel size mora biti neparan
    if kernel_size % 2 == 0:
        kernel_size += 1
    
    filtered = cv2.medianBlur(image, kernel_size)
    return filtered

# Primer korišćenja
result = median_blur_opencv(image, 5)`
          }
        ]
      }
    ],
    applications: [
      'Uklanjanje salt-and-pepper šuma',
      'Smanjenje šuma u medicinskim slikama',
      'Prethodni korak za detekciju ivica',
      'Čišćenje skeniranih dokumenata',
      'Obrađivanje satelitskih slika'
    ],
    advantages: [
      'Efikasan za salt-and-pepper šum',
      'Čuva ivice bolje od Gaussian blur-a',
      'Robusnost na ekstremne vrednosti',
      'Jednostavan za implementaciju',
      'Matematički dobro definisan'
    ],
    disadvantages: [
      'Sporiji od Gaussian blur-a',
      'Može biti spor za velike kernel-e',
      'Nije separabilan',
      'Može stvoriti artefakte',
      'Nije optimalan za Gaussian šum'
    ],
    relatedAlgorithms: ['gaussian-blur', 'bilateral-filter', 'non-local-means'],
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
    id: 'sobel-edge',
    name: 'Sobel Edge Detection',
    category: 'edge-detection',
    icon: '📐',
    description: 'Sobel edge detection je jedan od najjednostavnijih i najefikasnijih algoritama za detekciju ivica koji koristi gradijent operator.',
    sections: [
      {
        title: 'Uvod',
        content: 'Sobel operator je diskretni diferencijalni operator koji računa aproksimaciju gradijenta intenziteta slike. Koristi se za detekciju ivica u slikama.',
        subsections: [
          {
            title: 'Princip gradijenta',
            content: 'Gradijent meri brzinu promene intenziteta u prostoru. Ivice su oblasti gde se intenzitet brzo menja, što rezultuje visokim gradijentom.'
          }
        ]
      },
      {
        title: 'Sobel operatori',
        content: 'Sobel koristi dva 3x3 kernel-a za računanje gradijenta u X i Y pravcu:',
        subsections: [
          {
            title: 'X operator (horizontalni gradijent)',
            content: 'Detektuje vertikalne ivice (promene u horizontalnom pravcu).',
            code: `Sx = [-1  0  +1]
      [-2  0  +2]
      [-1  0  +1]`
          },
          {
            title: 'Y operator (vertikalni gradijent)',
            content: 'Detektuje horizontalne ivice (promene u vertikalnom pravcu).',
            code: `Sy = [-1  -2  -1]
      [ 0   0   0]
      [+1  +2  +1]`
          },
          {
            title: 'Magnitude gradijenta',
            content: 'Magnitude gradijenta se računa kao:',
            formula: 'G = √(Gx² + Gy²)'
          },
          {
            title: 'Smer gradijenta',
            content: 'Smer gradijenta se računa kao:',
            formula: 'θ = atan2(Gy, Gx)'
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Evo primera implementacije Sobel operatora:',
        subsections: [
          {
            title: 'OpenCV implementacija',
            content: 'OpenCV pruža gotovu implementaciju Sobel operatora:',
            code: `import cv2
import numpy as np

def sobel_edge_detection(image, dx=1, dy=1, ksize=3):
    """
    Primeni Sobel operator na sliku
    
    Args:
        image: Ulazna slika
        dx: Red derivacije po X
        dy: Red derivacije po Y
        ksize: Veličina kernel-a
    """
    # Primeni Sobel operator
    grad_x = cv2.Sobel(image, cv2.CV_64F, dx, 0, ksize=ksize)
    grad_y = cv2.Sobel(image, cv2.CV_64F, 0, dy, ksize=ksize)
    
    # Izračunaj magnitude
    magnitude = np.sqrt(grad_x**2 + grad_y**2)
    
    # Normalizuj na 0-255
    magnitude = np.uint8(magnitude)
    
    return magnitude

# Primer korišćenja
edges = sobel_edge_detection(image, dx=1, dy=1, ksize=3)`
          },
          {
            title: 'Manuelna implementacija',
            content: 'Evo pojednostavljene manuelne implementacije:',
            code: `def sobel_manual(image):
    # Sobel kernel-i
    sobel_x = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]])
    sobel_y = np.array([[-1, -2, -1], [0, 0, 0], [1, 2, 1]])
    
    # Konvolucija
    grad_x = cv2.filter2D(image, cv2.CV_64F, sobel_x)
    grad_y = cv2.filter2D(image, cv2.CV_64F, sobel_y)
    
    # Magnitude
    magnitude = np.sqrt(grad_x**2 + grad_y**2)
    return magnitude`
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Sobel operator ima nekoliko parametara:',
        subsections: [
          {
            title: 'X Derivative (dx)',
            content: 'Red derivacije po X pravcu. Tipično 1 za detekciju vertikalnih ivica.',
            code: 'dx = 1  # Prva derivacija po X'
          },
          {
            title: 'Y Derivative (dy)',
            content: 'Red derivacije po Y pravcu. Tipično 1 za detekciju horizontalnih ivica.',
            code: 'dy = 1  # Prva derivacija po Y'
          },
          {
            title: 'Kernel Size (ksize)',
            content: 'Veličina Sobel kernel-a. Veći kernel daje glatkiji rezultat.',
            code: `ksize = 3  # 3x3 kernel (standardni)
ksize = 5  # 5x5 kernel (glatkiji)
ksize = 7  # 7x7 kernel (najglatkiji)`
          }
        ]
      }
    ],
    applications: [
      'Detekcija ivica u slikama',
      'Prethodni korak za detekciju objekata',
      'Analiza strukture slike',
      'Computer vision pipeline',
      'Obrađivanje medicinskih slika'
    ],
    advantages: [
      'Jednostavan za implementaciju',
      'Brži od Canny algoritma',
      'Dobra detekcija ivica',
      'Matematički dobro definisan',
      'Široko podržan'
    ],
    disadvantages: [
      'Osetljiv na šum',
      'Ne detektuje sve tipove ivica',
      'Može stvoriti duple ivice',
      'Nema non-maximum suppression',
      'Nije optimalan za složene slike'
    ],
    relatedAlgorithms: ['canny-edge', 'laplacian', 'prewitt'],
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
    id: 'laplacian',
    name: 'Laplacian Edge Detection',
    category: 'edge-detection',
    icon: '🔷',
    description: 'Laplacian operator je drugi diferencijalni operator koji detektuje ivice na osnovu druge derivacije intenziteta.',
    sections: [
      {
        title: 'Uvod',
        content: 'Laplacian operator računa drugu derivaciju intenziteta slike. On je osetljiv na promene u intenzitetu i detektuje ivice na osnovu preloma (zero-crossings).',
        subsections: [
          {
            title: 'Princip druge derivacije',
            content: 'Druga derivacija meri brzinu promene gradijenta. Ivice se javljaju na mestima gde se druga derivacija menja sa pozitivne na negativnu vrednost (zero-crossing).'
          }
        ]
      },
      {
        title: 'Laplacian operator',
        content: 'Laplacian operator se može implementirati kao konvolucija sa različitim kernel-ima:',
        subsections: [
          {
            title: 'Standardni Laplacian kernel',
            content: 'Najjednostavniji 3x3 Laplacian kernel:',
            code: `L = [ 0  -1   0]
     [-1   4  -1]
     [ 0  -1   0]`
          },
          {
            title: 'Prošireni Laplacian kernel',
            content: '8-susedni Laplacian kernel koji uključuje dijagonalne susede:',
            code: `L = [-1  -1  -1]
     [-1   8  -1]
     [-1  -1  -1]`
          },
          {
            title: 'Matematička formula',
            content: 'Laplacian se računa kao:',
            formula: '∇²f = ∂²f/∂x² + ∂²f/∂y²'
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Evo primera implementacije Laplacian operatora:',
        subsections: [
          {
            title: 'OpenCV implementacija',
            content: 'OpenCV pruža gotovu implementaciju Laplacian operatora:',
            code: `import cv2
import numpy as np

def laplacian_edge_detection(image, ksize=3):
    """
    Primeni Laplacian operator na sliku
    
    Args:
        image: Ulazna slika
        ksize: Veličina kernel-a (1, 3, 5)
    """
    # Primeni Laplacian operator
    laplacian = cv2.Laplacian(image, cv2.CV_64F, ksize=ksize)
    
    # Konvertuj u apsolutne vrednosti
    abs_laplacian = np.absolute(laplacian)
    
    # Konvertuj u 8-bit
    laplacian_8u = np.uint8(abs_laplacian)
    
    return laplacian_8u

# Primer korišćenja
edges = laplacian_edge_detection(image, ksize=3)`
          },
          {
            title: 'Manuelna implementacija',
            content: 'Evo pojednostavljene manuelne implementacije:',
            code: `def laplacian_manual(image):
    # Laplacian kernel
    kernel = np.array([[0, -1, 0], [-1, 4, -1], [0, -1, 0]])
    
    # Konvolucija
    laplacian = cv2.filter2D(image, cv2.CV_64F, kernel)
    
    # Apsolutne vrednosti
    abs_laplacian = np.absolute(laplacian)
    
    return abs_laplacian`
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Laplacian operator ima jedan glavni parametar:',
        subsections: [
          {
            title: 'Kernel Size (ksize)',
            content: 'Veličina Laplacian kernel-a. Veći kernel daje glatkiji rezultat.',
            code: `ksize = 1  # 1x1 kernel (najjednostavniji)
ksize = 3  # 3x3 kernel (standardni)
ksize = 5  # 5x5 kernel (glatkiji)`
          }
        ]
      },
      {
        title: 'Zero-crossing detekcija',
        content: 'Laplacian operator se često koristi sa zero-crossing detekcijom:',
        subsections: [
          {
            title: 'Princip',
            content: 'Ivice se detektuju na mestima gde Laplacian menja znak (prelazi kroz nulu).',
            code: `def zero_crossing(laplacian):
    # Pronađi zero-crossings
    zero_crossings = np.zeros_like(laplacian)
    
    for i in range(1, laplacian.shape[0]-1):
        for j in range(1, laplacian.shape[1]-1):
            # Proveri sve susede
            if (laplacian[i,j] * laplacian[i+1,j] < 0 or
                laplacian[i,j] * laplacian[i-1,j] < 0 or
                laplacian[i,j] * laplacian[i,j+1] < 0 or
                laplacian[i,j] * laplacian[i,j-1] < 0):
                zero_crossings[i,j] = 255
    
    return zero_crossings`
          }
        ]
      }
    ],
    applications: [
      'Detekcija ivica u slikama',
      'Zero-crossing detekcija',
      'Analiza strukture slike',
      'Prethodni korak za segmentaciju',
      'Obrađivanje medicinskih slika'
    ],
    advantages: [
      'Osetljiv na promene intenziteta',
      'Detektuje zero-crossings',
      'Jednostavan za implementaciju',
      'Matematički dobro definisan',
      'Brži od Canny algoritma'
    ],
    disadvantages: [
      'Vrlo osetljiv na šum',
      'Može stvoriti duple ivice',
      'Ne daje informaciju o smeru ivica',
      'Može biti nestabilan',
      'Nije optimalan za složene slike'
    ],
    relatedAlgorithms: ['sobel-edge', 'canny-edge', 'prewitt'],
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
    id: 'erosion',
    name: 'Erosion',
    category: 'morphological',
    icon: '🔻',
    description: 'Erozija je osnovna morfološka operacija koja smanjuje objekte i povećava rupice u slici.',
    sections: [
      {
        title: 'Uvod',
        content: 'Erozija je morfološka operacija koja se koristi za smanjenje objekata u slici. Ona "jede" ivice objekata i povećava veličinu rupica.',
        subsections: [
          {
            title: 'Princip erozije',
            content: 'Erozija se može zamisliti kao "skidanje sloja" sa objekata. Svaki piksel se zamenjuje minimumom vrednosti u njegovom susedstvu.'
          }
        ]
      },
      {
        title: 'Matematička definicija',
        content: 'Erozija se definiše kao:',
        subsections: [
          {
            title: 'Formula',
            content: 'Erozija slike A sa strukturnim elementom B se definiše kao:',
            formula: 'A ⊖ B = {z | (B)z ⊆ A}'
          },
          {
            title: 'Implementacija',
            content: 'Praktično, erozija se implementira kao:',
            formula: 'Erosion(x,y) = min{I(x+i,y+j) | (i,j) ∈ B}'
          }
        ]
      },
      {
        title: 'Strukturni elementi',
        content: 'Strukturni element određuje oblik i veličinu erozije:',
        subsections: [
          {
            title: 'Tipovi strukturnih elemenata',
            content: 'Najčešći strukturni elementi su:',
            code: `# Pravougaoni strukturni element
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))

# Kružni strukturni element
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3,3))

# Kros strukturni element
kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (3,3))`
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Evo primera implementacije erozije:',
        subsections: [
          {
            title: 'OpenCV implementacija',
            content: 'OpenCV pruža efikasnu implementaciju erozije:',
            code: `import cv2
import numpy as np

def erosion_opencv(image, kernel_size=3, iterations=1):
    """
    Primeni eroziju na sliku
    
    Args:
        image: Ulazna slika
        kernel_size: Veličina kernel-a
        iterations: Broj iteracija
    """
    # Kreiraj strukturni element
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, kernel_size))
    
    # Primeni eroziju
    eroded = cv2.erode(image, kernel, iterations=iterations)
    
    return eroded

# Primer korišćenja
result = erosion_opencv(image, kernel_size=3, iterations=1)`
          },
          {
            title: 'Manuelna implementacija',
            content: 'Evo pojednostavljene manuelne implementacije:',
            code: `def erosion_manual(image, kernel_size=3):
    height, width = image.shape
    result = np.zeros_like(image)
    offset = kernel_size // 2
    
    for i in range(offset, height - offset):
        for j in range(offset, width - offset):
            # Uzmi susedne piksele
            neighborhood = image[i-offset:i+offset+1, j-offset:j+offset+1]
            # Uzmi minimum
            result[i, j] = np.min(neighborhood)
    
    return result`
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Erozija ima dva glavna parametra:',
        subsections: [
          {
            title: 'Kernel Size',
            content: 'Veličina strukturnog elementa. Veći kernel znači više erozije.',
            code: `kernel_size = 3  # 3x3 kernel
kernel_size = 5  # 5x5 kernel
kernel_size = 7  # 7x7 kernel`
          },
          {
            title: 'Iterations',
            content: 'Broj ponavljanja erozije. Više iteracija znači više erozije.',
            code: `iterations = 1  # Jedna iteracija
iterations = 2  # Dve iteracije
iterations = 3  # Tri iteracije`
          }
        ]
      }
    ],
    applications: [
      'Smanjenje objekata u slici',
      'Uklanjanje male šuma',
      'Prethodni korak za opening',
      'Segmentacija objekata',
      'Obrađivanje binarnih slika'
    ],
    advantages: [
      'Efikasan za smanjenje objekata',
      'Uklanja male objekte',
      'Jednostavan za implementaciju',
      'Matematički dobro definisan',
      'Brza operacija'
    ],
    disadvantages: [
      'Može uništiti korisne detalje',
      'Smanjuje veličinu objekata',
      'Može stvoriti rupice',
      'Nije invertibilan',
      'Može biti osetljiv na šum'
    ],
    relatedAlgorithms: ['dilation', 'opening', 'closing'],
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
    id: 'dilation',
    name: 'Dilation',
    category: 'morphological',
    icon: '🔺',
    description: 'Dilatacija je osnovna morfološka operacija koja povećava objekte i smanjuje rupice u slici.',
    sections: [
      {
        title: 'Uvod',
        content: 'Dilatacija je morfološka operacija koja se koristi za povećanje objekata u slici. Ona "dodaje sloj" na objekte i smanjuje veličinu rupica.',
        subsections: [
          {
            title: 'Princip dilatacije',
            content: 'Dilatacija se može zamisliti kao "dodavanje sloja" na objekte. Svaki piksel se zamenjuje maksimumom vrednosti u njegovom susedstvu.'
          }
        ]
      },
      {
        title: 'Matematička definicija',
        content: 'Dilatacija se definiše kao:',
        subsections: [
          {
            title: 'Formula',
            content: 'Dilatacija slike A sa strukturnim elementom B se definiše kao:',
            formula: 'A ⊕ B = {z | (B)z ∩ A ≠ ∅}'
          },
          {
            title: 'Implementacija',
            content: 'Praktično, dilatacija se implementira kao:',
            formula: 'Dilation(x,y) = max{I(x+i,y+j) | (i,j) ∈ B}'
          }
        ]
      },
      {
        title: 'Strukturni elementi',
        content: 'Strukturni element određuje oblik i veličinu dilatacije:',
        subsections: [
          {
            title: 'Tipovi strukturnih elemenata',
            content: 'Najčešći strukturni elementi su:',
            code: `# Pravougaoni strukturni element
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))

# Kružni strukturni element
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3,3))

# Kros strukturni element
kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (3,3))`
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Evo primera implementacije dilatacije:',
        subsections: [
          {
            title: 'OpenCV implementacija',
            content: 'OpenCV pruža efikasnu implementaciju dilatacije:',
            code: `import cv2
import numpy as np

def dilation_opencv(image, kernel_size=3, iterations=1):
    """
    Primeni dilataciju na sliku
    
    Args:
        image: Ulazna slika
        kernel_size: Veličina kernel-a
        iterations: Broj iteracija
    """
    # Kreiraj strukturni element
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, kernel_size))
    
    # Primeni dilataciju
    dilated = cv2.dilate(image, kernel, iterations=iterations)
    
    return dilated

# Primer korišćenja
result = dilation_opencv(image, kernel_size=3, iterations=1)`
          },
          {
            title: 'Manuelna implementacija',
            content: 'Evo pojednostavljene manuelne implementacije:',
            code: `def dilation_manual(image, kernel_size=3):
    height, width = image.shape
    result = np.zeros_like(image)
    offset = kernel_size // 2
    
    for i in range(offset, height - offset):
        for j in range(offset, width - offset):
            # Uzmi susedne piksele
            neighborhood = image[i-offset:i+offset+1, j-offset:j+offset+1]
            # Uzmi maksimum
            result[i, j] = np.max(neighborhood)
    
    return result`
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Dilatacija ima dva glavna parametra:',
        subsections: [
          {
            title: 'Kernel Size',
            content: 'Veličina strukturnog elementa. Veći kernel znači više dilatacije.',
            code: `kernel_size = 3  # 3x3 kernel
kernel_size = 5  # 5x5 kernel
kernel_size = 7  # 7x7 kernel`
          },
          {
            title: 'Iterations',
            content: 'Broj ponavljanja dilatacije. Više iteracija znači više dilatacije.',
            code: `iterations = 1  # Jedna iteracija
iterations = 2  # Dve iteracije
iterations = 3  # Tri iteracije`
          }
        ]
      }
    ],
    applications: [
      'Povećanje objekata u slici',
      'Popunjavanje rupica',
      'Prethodni korak za closing',
      'Segmentacija objekata',
      'Obrađivanje binarnih slika'
    ],
    advantages: [
      'Efikasan za povećanje objekata',
      'Popunjava male rupice',
      'Jednostavan za implementaciju',
      'Matematički dobro definisan',
      'Brza operacija'
    ],
    disadvantages: [
      'Može povećati šum',
      'Povećava veličinu objekata',
      'Može povezati bliske objekte',
      'Nije invertibilan',
      'Može biti osetljiv na šum'
    ],
    relatedAlgorithms: ['erosion', 'opening', 'closing'],
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
    id: 'opening',
    name: 'Opening',
    category: 'morphological',
    icon: '🔸',
    description: 'Opening je kombinacija erozije i dilatacije koja uklanja male objekte i glatko ivice.',
    sections: [
      {
        title: 'Uvod',
        content: 'Opening je složena morfološka operacija koja se sastoji od erozije praćene dilatacijom. Ona je korisna za uklanjanje malih objekata i glatko ivica.',
        subsections: [
          {
            title: 'Princip opening-a',
            content: 'Opening se može zamisliti kao "glatko čišćenje" objekata. Prvo se uklanjaju male delove (erozija), zatim se objekti vraćaju na približno originalnu veličinu (dilatacija).'
          }
        ]
      },
      {
        title: 'Matematička definicija',
        content: 'Opening se definiše kao:',
        subsections: [
          {
            title: 'Formula',
            content: 'Opening slike A sa strukturnim elementom B se definiše kao:',
            formula: 'A ∘ B = (A ⊖ B) ⊕ B'
          },
          {
            title: 'Koraci',
            content: '1. Primeni eroziju: A ⊖ B 2. Primeni dilataciju na rezultat: (A ⊖ B) ⊕ B'
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Evo primera implementacije opening-a:',
        subsections: [
          {
            title: 'OpenCV implementacija',
            content: 'OpenCV pruža gotovu implementaciju opening-a:',
            code: `import cv2
import numpy as np

def opening_opencv(image, kernel_size=3):
    """
    Primeni opening na sliku
    
    Args:
        image: Ulazna slika
        kernel_size: Veličina kernel-a
    """
    # Kreiraj strukturni element
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, kernel_size))
    
    # Primeni opening (erozija + dilatacija)
    opened = cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)
    
    return opened

# Primer korišćenja
result = opening_opencv(image, kernel_size=3)`
          },
          {
            title: 'Manuelna implementacija',
            content: 'Evo pojednostavljene manuelne implementacije:',
            code: `def opening_manual(image, kernel_size=3):
    # 1. Erozija
    eroded = erosion_manual(image, kernel_size)
    
    # 2. Dilatacija
    opened = dilation_manual(eroded, kernel_size)
    
    return opened`
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Opening ima jedan glavni parametar:',
        subsections: [
          {
            title: 'Kernel Size',
            content: 'Veličina strukturnog elementa. Veći kernel znači više uklanjanja malih objekata.',
            code: `kernel_size = 3  # 3x3 kernel
kernel_size = 5  # 5x5 kernel
kernel_size = 7  # 7x7 kernel`
          }
        ]
      }
    ],
    applications: [
      'Uklanjanje malih objekata',
      'Glatko ivice',
      'Čišćenje binarnih slika',
      'Prethodni korak za analizu',
      'Segmentacija objekata'
    ],
    advantages: [
      'Uklanja male objekte',
      'Glatko ivice',
      'Čuva veličinu objekata',
      'Jednostavan za implementaciju',
      'Matematički dobro definisan'
    ],
    disadvantages: [
      'Može ukloniti korisne detalje',
      'Sporiji od pojedinačnih operacija',
      'Može biti osetljiv na šum',
      'Nije invertibilan',
      'Može stvoriti artefakte'
    ],
    relatedAlgorithms: ['erosion', 'dilation', 'closing'],
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
    id: 'closing',
    name: 'Closing',
    category: 'morphological',
    icon: '🔹',
    description: 'Closing je kombinacija dilatacije i erozije koja popunjava male rupice i povezuje bliske objekte.',
    sections: [
      {
        title: 'Uvod',
        content: 'Closing je složena morfološka operacija koja se sastoji od dilatacije praćene erozijom. Ona je korisna za popunjavanje malih rupica i povezivanje bliskih objekata.',
        subsections: [
          {
            title: 'Princip closing-a',
            content: 'Closing se može zamisliti kao "popunjavanje rupica". Prvo se objekti povećavaju (dilatacija), zatim se vraćaju na približno originalnu veličinu (erozija).'
          }
        ]
      },
      {
        title: 'Matematička definicija',
        content: 'Closing se definiše kao:',
        subsections: [
          {
            title: 'Formula',
            content: 'Closing slike A sa strukturnim elementom B se definiše kao:',
            formula: 'A • B = (A ⊕ B) ⊖ B'
          },
          {
            title: 'Koraci',
            content: '1. Primeni dilataciju: A ⊕ B 2. Primeni eroziju na rezultat: (A ⊕ B) ⊖ B'
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Evo primera implementacije closing-a:',
        subsections: [
          {
            title: 'OpenCV implementacija',
            content: 'OpenCV pruža gotovu implementaciju closing-a:',
            code: `import cv2
import numpy as np

def closing_opencv(image, kernel_size=3):
    """
    Primeni closing na sliku
    
    Args:
        image: Ulazna slika
        kernel_size: Veličina kernel-a
    """
    # Kreiraj strukturni element
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, kernel_size))
    
    # Primeni closing (dilatacija + erozija)
    closed = cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel)
    
    return closed

# Primer korišćenja
result = closing_opencv(image, kernel_size=3)`
          },
          {
            title: 'Manuelna implementacija',
            content: 'Evo pojednostavljene manuelne implementacije:',
            code: `def closing_manual(image, kernel_size=3):
    # 1. Dilatacija
    dilated = dilation_manual(image, kernel_size)
    
    # 2. Erozija
    closed = erosion_manual(dilated, kernel_size)
    
    return closed`
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Closing ima jedan glavni parametar:',
        subsections: [
          {
            title: 'Kernel Size',
            content: 'Veličina strukturnog elementa. Veći kernel znači više popunjavanja rupica.',
            code: `kernel_size = 3  # 3x3 kernel
kernel_size = 5  # 5x5 kernel
kernel_size = 7  # 7x7 kernel`
          }
        ]
      }
    ],
    applications: [
      'Popunjavanje malih rupica',
      'Povezivanje bliskih objekata',
      'Čišćenje binarnih slika',
      'Segmentacija objekata',
      'Obrađivanje medicinskih slika'
    ],
    advantages: [
      'Popunjava male rupice',
      'Povezuje bliske objekte',
      'Čuva veličinu objekata',
      'Jednostavan za implementaciju',
      'Matematički dobro definisan'
    ],
    disadvantages: [
      'Može povezati neželjene objekte',
      'Sporiji od pojedinačnih operacija',
      'Može biti osetljiv na šum',
      'Nije invertibilan',
      'Može stvoriti artefakte'
    ],
    relatedAlgorithms: ['erosion', 'dilation', 'opening'],
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
    id: 'harris-corners',
    name: 'Harris Corner Detection',
    category: 'feature-detection',
    icon: '📍',
    description: 'Harris corner detector je algoritam koji detektuje uglove (corners) u slikama na osnovu lokalnih promena intenziteta.',
    sections: [
      {
        title: 'Uvod',
        content: 'Harris corner detector je jedan od najpopularnijih algoritama za detekciju uglova u slikama. Razvio ga je Chris Harris i Mike Stephens 1988. godine.',
        subsections: [
          {
            title: 'Šta je corner?',
            content: 'Corner (ugao) je tačka u slici gde se intenzitet menja u više pravaca. To su obično tačke gde se seku ivice ili gde se objekti menjaju u smeru.'
          }
        ]
      },
      {
        title: 'Matematička osnova',
        content: 'Harris corner detector se zasniva na analizi gradijenta u lokalnom susedstvu svake tačke:',
        subsections: [
          {
            title: 'Gradijent struktura',
            content: 'Za svaku tačku (x,y), računamo gradijent strukture:',
            formula: 'M = Σ[Ix²  IxIy]'
          },
          {
            title: 'Harris response',
            content: 'Harris response se računa kao:',
            formula: 'R = det(M) - k * trace(M)²'
          },
          {
            title: 'Detaljnija formula',
            content: 'Gde su:',
            code: `det(M) = λ1 * λ2
trace(M) = λ1 + λ2
R = λ1 * λ2 - k * (λ1 + λ2)²`
          }
        ]
      },
      {
        title: 'Algoritam',
        content: 'Harris corner detection se sastoji od nekoliko koraka:',
        subsections: [
          {
            title: '1. Računanje gradijenta',
            content: 'Računamo gradijente Ix i Iy koristeći Sobel operator.',
            code: `# Računanje gradijenta
Ix = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=3)
Iy = cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=3)`
          },
          {
            title: '2. Računanje proizvoda gradijenta',
            content: 'Računamo Ix², Iy², i IxIy.',
            code: `# Proizvodi gradijenta
Ix2 = Ix * Ix
Iy2 = Iy * Iy
Ixy = Ix * Iy`
          },
          {
            title: '3. Gaussian blur',
            content: 'Primenjujemo Gaussian blur na proizvode gradijenta.',
            code: `# Gaussian blur
Ix2_blur = cv2.GaussianBlur(Ix2, (blockSize, blockSize), 0)
Iy2_blur = cv2.GaussianBlur(Iy2, (blockSize, blockSize), 0)
Ixy_blur = cv2.GaussianBlur(Ixy, (blockSize, blockSize), 0)`
          },
          {
            title: '4. Harris response',
            content: 'Računamo Harris response za svaku tačku.',
            code: `# Harris response
det_M = Ix2_blur * Iy2_blur - Ixy_blur * Ixy_blur
trace_M = Ix2_blur + Iy2_blur
harris_response = det_M - k * trace_M * trace_M`
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Evo primera implementacije Harris corner detector-a:',
        subsections: [
          {
            title: 'OpenCV implementacija',
            content: 'OpenCV pruža gotovu implementaciju Harris corner detector-a:',
            code: `import cv2
import numpy as np

def harris_corners_opencv(image, block_size=2, ksize=3, k=0.04):
    """
    Detektuj uglove koristeći Harris corner detector
    
    Args:
        image: Ulazna slika
        block_size: Veličina bloka za prozor
        ksize: Veličina Sobel kernel-a
        k: Harris parametar
    """
    # Konvertuj u grayscale ako je potrebno
    if len(image.shape) == 3:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        gray = image
    
    # Detektuj uglove
    corners = cv2.cornerHarris(gray, block_size, ksize, k)
    
    # Normalizuj rezultat
    corners = cv2.normalize(corners, None, 0, 255, cv2.NORM_MINMAX)
    
    return corners

# Primer korišćenja
corners = harris_corners_opencv(image, block_size=2, ksize=3, k=0.04)`
          },
          {
            title: 'Manuelna implementacija',
            content: 'Evo pojednostavljene manuelne implementacije:',
            code: `def harris_corners_manual(image, block_size=2, ksize=3, k=0.04):
    # 1. Računanje gradijenta
    Ix = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=ksize)
    Iy = cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=ksize)
    
    # 2. Proizvodi gradijenta
    Ix2 = Ix * Ix
    Iy2 = Iy * Iy
    Ixy = Ix * Iy
    
    # 3. Gaussian blur
    Ix2_blur = cv2.GaussianBlur(Ix2, (block_size, block_size), 0)
    Iy2_blur = cv2.GaussianBlur(Iy2, (block_size, block_size), 0)
    Ixy_blur = cv2.GaussianBlur(Ixy, (block_size, block_size), 0)
    
    # 4. Harris response
    det_M = Ix2_blur * Iy2_blur - Ixy_blur * Ixy_blur
    trace_M = Ix2_blur + Iy2_blur
    harris_response = det_M - k * trace_M * trace_M
    
    return harris_response`
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Harris corner detector ima tri glavna parametra:',
        subsections: [
          {
            title: 'Block Size',
            content: 'Veličina bloka za prozor. Veći blok znači više uklanjanja šuma.',
            code: `block_size = 2  # Standardna vrednost
block_size = 3  # Veći blok
block_size = 5  # Još veći blok`
          },
          {
            title: 'Kernel Size (ksize)',
            content: 'Veličina Sobel kernel-a za računanje gradijenta.',
            code: `ksize = 3  # 3x3 Sobel kernel
ksize = 5  # 5x5 Sobel kernel
ksize = 7  # 7x7 Sobel kernel`
          },
          {
            title: 'Harris Parameter (k)',
            content: 'Empirijski parametar koji kontroliše osetljivost detekcije.',
            code: `k = 0.04  # Standardna vrednost
k = 0.06  # Više osetljivosti
k = 0.02  # Manje osetljivosti`
          }
        ]
      }
    ],
    applications: [
      'Detekcija uglova u slikama',
      'Feature matching',
      'Image registration',
      '3D reconstruction',
      'Motion tracking'
    ],
    advantages: [
      'Robustnost na rotaciju',
      'Robustnost na promene osvetljenja',
      'Dobra detekcija uglova',
      'Matematički dobro definisan',
      'Široko podržan'
    ],
    disadvantages: [
      'Osetljiv na promene skale',
      'Može biti spor za velike slike',
      'Osetljiv na šum',
      'Može detektovati lažne uglove',
      'Parametri mogu biti osetljivi'
    ],
    relatedAlgorithms: ['shi-tomasi', 'fast-corners', 'sift'],
    references: [
      {
        title: 'A Combined Corner and Edge Detector',
        authors: 'Chris Harris, Mike Stephens',
        year: 1988
      },
      {
        title: 'Computer Vision: Algorithms and Applications',
        authors: 'Richard Szeliski',
        year: 2010
      }
    ]
  },
  {
    id: 'adaptive-threshold',
    name: 'Adaptive Threshold',
    category: 'segmentation',
    icon: '⚫',
    description: 'Adaptive threshold je napredna binarizaciona tehnika koja prilagođava prag lokalno za svaki region slike.',
    sections: [
      {
        title: 'Uvod',
        content: 'Adaptive threshold je algoritam za binarizaciju slike koji prilagođava prag lokalno za svaki piksel na osnovu njegovog susedstva. Ovo je korisno kada slika ima neravnomerno osvetljenje.',
        subsections: [
          {
            title: 'Problem globalnog praga',
            content: 'Standardni threshold koristi jedan globalni prag za celu sliku. Ovo ne radi dobro kada slika ima neravnomerno osvetljenje - neki delovi mogu biti previše svetli ili previše tamni.'
          }
        ]
      },
      {
        title: 'Princip rada',
        content: 'Adaptive threshold računa prag za svaki piksel na osnovu srednje vrednosti ili Gaussian srednje vrednosti u njegovom susedstvu:',
        subsections: [
          {
            title: 'Lokalni prag',
            content: 'Za svaki piksel (x,y), računamo lokalni prag T(x,y) na osnovu susednih piksela.',
            formula: 'T(x,y) = mean(I(x,y)) - C'
          },
          {
            title: 'Binarizacija',
            content: 'Zatim primenjujemo binarizaciju koristeći lokalni prag:',
            formula: 'B(x,y) = 255 if I(x,y) > T(x,y), else 0'
          }
        ]
      },
      {
        title: 'Metode proračuna praga',
        content: 'Adaptive threshold podržava dve metode za proračun lokalnog praga:',
        subsections: [
          {
            title: 'Mean (ADAPTIVE_THRESH_MEAN_C)',
            content: 'Prag se računa kao srednja vrednost susednih piksela minus konstanta C.',
            code: `T(x,y) = mean(I(x,y)) - C
# Gde je mean() srednja vrednost u bloku oko (x,y)`
          },
          {
            title: 'Gaussian (ADAPTIVE_THRESH_GAUSSIAN_C)',
            content: 'Prag se računa kao ponderisana srednja vrednost sa Gaussian težinama minus konstanta C.',
            code: `T(x,y) = gaussian_mean(I(x,y)) - C
# Gde je gaussian_mean() ponderisana srednja vrednost`
          }
        ]
      },
      {
        title: 'Implementacija',
        content: 'Evo primera implementacije adaptive threshold-a:',
        subsections: [
          {
            title: 'OpenCV implementacija',
            content: 'OpenCV pruža gotovu implementaciju adaptive threshold-a:',
            code: `import cv2
import numpy as np

def adaptive_threshold_opencv(image, block_size, c, method='GAUSSIAN'):
    """
    Primeni adaptive threshold na sliku
    
    Args:
        image: Ulazna slika (grayscale)
        block_size: Veličina bloka za proračun praga
        c: Konstanta koja se oduzima od srednje vrednosti
        method: 'GAUSSIAN' ili 'MEAN'
    """
    # Konvertuj u grayscale ako je potrebno
    if len(image.shape) == 3:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        gray = image
    
    # Odredi metodu
    if method == 'GAUSSIAN':
        adaptive_method = cv2.ADAPTIVE_THRESH_GAUSSIAN_C
    else:
        adaptive_method = cv2.ADAPTIVE_THRESH_MEAN_C
    
    # Primeni adaptive threshold
    binary = cv2.adaptiveThreshold(
        gray, 
        255, 
        adaptive_method, 
        cv2.THRESH_BINARY, 
        block_size, 
        c
    )
    
    return binary

# Primer korišćenja
result = adaptive_threshold_opencv(image, 11, 2, 'GAUSSIAN')`
          },
          {
            title: 'Manuelna implementacija',
            content: 'Evo pojednostavljene manuelne implementacije:',
            code: `def adaptive_threshold_manual(image, block_size, c, method='GAUSSIAN'):
    height, width = image.shape
    result = np.zeros_like(image)
    offset = block_size // 2
    
    for i in range(offset, height - offset):
        for j in range(offset, width - offset):
            # Uzmi blok oko piksela
            block = image[i-offset:i+offset+1, j-offset:j+offset+1]
            
            if method == 'GAUSSIAN':
                # Gaussian ponderisana srednja vrednost
                threshold = np.mean(block) - c
            else:
                # Obična srednja vrednost
                threshold = np.mean(block) - c
            
            # Binarizacija
            if image[i, j] > threshold:
                result[i, j] = 255
            else:
                result[i, j] = 0
    
    return result`
          }
        ]
      },
      {
        title: 'Parametri',
        content: 'Adaptive threshold ima tri glavna parametra:',
        subsections: [
          {
            title: 'Block Size',
            content: 'Veličina bloka za proračun lokalnog praga. Mora biti neparan broj.',
            code: `block_size = 11  # 11x11 blok
block_size = 15  # 15x15 blok
block_size = 21  # 21x21 blok`
          },
          {
            title: 'Constant (C)',
            content: 'Konstanta koja se oduzima od srednje vrednosti. Kontroliše osetljivost.',
            code: `c = 2   # Standardna vrednost
c = 5   # Više osetljivosti
c = -2  # Manje osetljivosti`
          },
          {
            title: 'Method',
            content: 'Metoda za proračun lokalnog praga.',
            code: `method = 'GAUSSIAN'  # Gaussian ponderisana srednja vrednost
method = 'MEAN'      # Obična srednja vrednost`
          }
        ]
      }
    ],
    applications: [
      'Binarizacija slika sa neravnomernim osvetljenjem',
      'OCR (Optical Character Recognition)',
      'Detekcija objekata',
      'Segmentacija slika',
      'Obrađivanje skeniranih dokumenata'
    ],
    advantages: [
      'Efikasan za neravnomerno osvetljeno slike',
      'Lokalna prilagodba praga',
      'Bolji rezultati od globalnog threshold-a',
      'Robustnost na promene osvetljenja',
      'Pogodan za OCR aplikacije'
    ],
    disadvantages: [
      'Sporiji od globalnog threshold-a',
      'Osetljiv na šum',
      'Može biti osetljiv na parametre',
      'Može stvoriti artefakte',
      'Nije optimalan za slike sa uniformnim osvetljenjem'
    ],
    relatedAlgorithms: ['otsu-threshold', 'gaussian-blur', 'morphological-operations'],
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
  }
];

export const getAlgorithmInfoById = (id: string): AlgorithmInfo | undefined => 
  algorithmInfo.find(info => info.id === id);

export const getAlgorithmInfoByCategory = (category: string): AlgorithmInfo[] => 
  algorithmInfo.filter(info => info.category === category);
