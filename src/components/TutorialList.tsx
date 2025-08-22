import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Target, Play } from 'lucide-react';
import { tutorials } from '@/data/tutorials';
import type { Tutorial } from '@/types/tutorial';

interface TutorialListProps {
  onTutorialSelect: (tutorial: Tutorial) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'edge-detection': return '⚡';
    case 'filtering': return '🔵';
    case 'morphological': return '🔻';
    case 'feature-detection': return '📍';
    case 'segmentation': return '⚫';
    default: return '📊';
  }
};

export const TutorialList: React.FC<TutorialListProps> = ({ onTutorialSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = ['all', 'edge-detection', 'filtering', 'morphological', 'feature-detection', 'segmentation'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredTutorials = tutorials.filter(tutorial => {
    const categoryMatch = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Interaktivni Tutorijali</h1>
        <p className="text-muted-foreground">
          Naučite algoritme kompjuterskog vida korak po korak
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex gap-2">
          <span className="text-sm font-medium self-center">Kategorija:</span>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Sve' : getCategoryIcon(category) + ' ' + category.replace('-', ' ')}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <span className="text-sm font-medium self-center">Težina:</span>
          {difficulties.map(difficulty => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(difficulty)}
            >
              {difficulty === 'all' ? 'Sve' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Tutorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCategoryIcon(tutorial.category)}</span>
                  <div>
                    <CardTitle className="text-lg">{tutorial.name}</CardTitle>
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">
                {tutorial.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{tutorial.estimatedTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{tutorial.steps.length} koraka</span>
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  Šta ćete naučiti:
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {tutorial.learningObjectives.slice(0, 2).map((objective, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-primary">•</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                  {tutorial.learningObjectives.length > 2 && (
                    <li className="text-primary">+{tutorial.learningObjectives.length - 2} više</li>
                  )}
                </ul>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full" 
                onClick={() => onTutorialSelect(tutorial)}
              >
                <Play className="h-4 w-4 mr-2" />
                Započni tutorijal
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Nema tutorijala</h3>
          <p className="text-muted-foreground">
            Pokušajte da promenite filtere da vidite dostupne tutorijale.
          </p>
        </div>
      )}
    </div>
  );
};
