import { ImageData } from '@/types/cv';

// Konstante za URL-ove
const IMAGE_SIZES = {
  THUMBNAIL: 'w=100&h=100&fit=crop',
  FULL: 'w=400&h=400&fit=crop'
} as const;

const IMAGE_SOURCES = {
  WIKIMEDIA: 'https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png',
  UNSPLASH_BASE: 'https://images.unsplash.com/photo-',
  PICSUM_BASE: 'https://picsum.photos/400/400?random='
} as const;

// Helper funkcija za kreiranje Unsplash URL-ova
const createUnsplashUrl = (photoId: string, size: string) => 
  `${IMAGE_SOURCES.UNSPLASH_BASE}${photoId}?${size}`;

// Helper funkcija za kreiranje Picsum URL-ova
const createPicsumUrl = (randomId: number) => 
  `${IMAGE_SOURCES.PICSUM_BASE}${randomId}`;

// Definicija slika sa njihovim metapodacima
const IMAGE_DEFINITIONS = [
  {
    id: 'lena',
    name: 'Lena',
    description: 'Klasična test slika za kompjuterski vid',
    source: 'wikimedia',
    url: IMAGE_SOURCES.WIKIMEDIA,
    unsplashId: null,
    picsumId: null
  },
  {
    id: 'cameraman',
    name: 'Cameraman',
    description: 'Slika kamere/fotografa sa detaljnim ivicama',
    source: 'unsplash',
    url: null,
    unsplashId: '1507003211169-0a1dd7228f2d',
    picsumId: 1
  },
  {
    id: 'baboon',
    name: 'Baboon',
    description: 'Slika majmuna sa teksturom i detaljima',
    source: 'unsplash',
    url: null,
    unsplashId: '1549366021-9f761d450615',
    picsumId: 2
  },
  {
    id: 'peppers',
    name: 'Peppers',
    description: 'Slika paprike sa bojama i kontrastom',
    source: 'unsplash',
    url: null,
    unsplashId: '1563565375-f3fdfdbefa83',
    picsumId: 3
  },
  {
    id: 'house',
    name: 'House',
    description: 'Slika kuće sa geometrijskim oblicima',
    source: 'unsplash',
    url: null,
    unsplashId: '1564013799919-ab600027ffc6',
    picsumId: 4
  },
  {
    id: 'jetplane',
    name: 'Jet Plane',
    description: 'Slika aviona sa linijama i ivicama',
    source: 'unsplash',
    url: null,
    unsplashId: '1558618666-fcd25c85cd64',
    picsumId: 5
  }
] as const;

// Kreiranje glavnih slika
export const sampleImages: ImageData[] = IMAGE_DEFINITIONS.map(img => {
  if (img.source === 'wikimedia') {
    return {
      id: img.id,
      name: img.name,
      url: img.url!,
      thumbnail: img.url!
    };
  }
  
  // Unsplash slike
  const unsplashUrl = createUnsplashUrl(img.unsplashId!, IMAGE_SIZES.FULL);
  const unsplashThumbnail = createUnsplashUrl(img.unsplashId!, IMAGE_SIZES.THUMBNAIL);
  
  return {
    id: img.id,
    name: img.name,
    url: unsplashUrl,
    thumbnail: unsplashThumbnail
  };
});

// Kreiranje fallback URL-ova
export const fallbackImages: Record<string, string> = IMAGE_DEFINITIONS
  .filter(img => img.picsumId !== null)
  .reduce((acc, img) => {
    acc[img.id] = createPicsumUrl(img.picsumId!);
    return acc;
  }, {} as Record<string, string>);

// Helper funkcija za dobijanje slike po ID-u
export const getSampleImageById = (id: string): ImageData | undefined => 
  sampleImages.find(img => img.id === id);

// Helper funkcija za dobijanje fallback URL-a
export const getFallbackUrl = (id: string): string | undefined => 
  fallbackImages[id];

// Tipovi za bolju type safety
export type SampleImageId = typeof IMAGE_DEFINITIONS[number]['id'];
export type ImageSource = 'wikimedia' | 'unsplash' | 'picsum';
