import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Filter } from 'lucide-react';
import { algorithmInfo } from '@/data/algorithm-info';
import type { AlgorithmInfo } from '@/data/algorithm-info';

interface InfoPageProps {
  onAlgorithmSelect: (algorithm: AlgorithmInfo) => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'filtering': return 'bg-blue-100 text-blue-800';
    case 'edge-detection': return 'bg-green-100 text-green-800';
    case 'morphological': return 'bg-purple-100 text-purple-800';
    case 'feature-detection': return 'bg-orange-100 text-orange-800';
    case 'segmentation': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryName = (category: string) => {
  switch (category) {
    case 'filtering': return 'Filtering';
    case 'edge-detection': return 'Edge Detection';
    case 'morphological': return 'Morphological';
    case 'feature-detection': return 'Feature Detection';
    case 'segmentation': return 'Segmentation';
    default: return category;
  }
};

export const InfoPage: React.FC<InfoPageProps> = ({ onAlgorithmSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', 'filtering', 'edge-detection', 'morphological', 'feature-detection', 'segmentation'];

  const filteredAlgorithms = algorithmInfo.filter(algorithm => {
    const categoryMatch = selectedCategory === 'all' || algorithm.category === selectedCategory;
    const searchMatch = algorithm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       algorithm.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Algoritmi kompjuterskog vida</h1>
        <p className="text-muted-foreground">
          Detaljna objašnjenja algoritama u formi knjige
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pretraži algoritme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2">
          <Filter className="h-5 w-5 self-center text-muted-foreground" />
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Sve' : getCategoryName(category)}
            </Button>
          ))}
        </div>
      </div>

      {/* Algorithm Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlgorithms.map((algorithm) => (
          <Card key={algorithm.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onAlgorithmSelect(algorithm)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{algorithm.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{algorithm.name}</CardTitle>
                    <Badge className={getCategoryColor(algorithm.category)}>
                      {getCategoryName(algorithm.category)}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">
                {algorithm.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Applications */}
              <div>
                <h4 className="text-sm font-medium mb-2">Primene:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {algorithm.applications.slice(0, 3).map((app, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-primary">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                  {algorithm.applications.length > 3 && (
                    <li className="text-primary">+{algorithm.applications.length - 3} više</li>
                  )}
                </ul>
              </div>

              {/* Sections */}
              <div>
                <h4 className="text-sm font-medium mb-2">Sadržaj:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {algorithm.sections.slice(0, 3).map((section, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-primary">•</span>
                      <span>{section.title}</span>
                    </li>
                  ))}
                  {algorithm.sections.length > 3 && (
                    <li className="text-primary">+{algorithm.sections.length - 3} više</li>
                  )}
                </ul>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full" 
                variant="outline"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Pročitaj više
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlgorithms.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Nema algoritama</h3>
          <p className="text-muted-foreground">
            Pokušajte da promenite filtere ili pretragu da vidite dostupne algoritme.
          </p>
        </div>
      )}
    </div>
  );
};
