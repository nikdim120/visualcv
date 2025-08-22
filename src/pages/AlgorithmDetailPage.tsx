import { ArrowLeft, BookOpen, Code, Calculator, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AlgorithmInfo } from '@/data/algorithm-info';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface AlgorithmDetailPageProps {
  algorithm: AlgorithmInfo;
  onBack: () => void;
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

export const AlgorithmDetailPage: React.FC<AlgorithmDetailPageProps> = ({ 
  algorithm, 
  onBack 
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Nazad
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{algorithm.icon}</span>
          <div>
            <h1 className="text-2xl font-bold">{algorithm.name}</h1>
            <Badge className={getCategoryColor(algorithm.category)}>
              {getCategoryName(algorithm.category)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Opis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {algorithm.description}
          </p>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Sections */}
        <div className="lg:col-span-2 space-y-6">
          {algorithm.sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
                
                {section.subsections && (
                  <div className="space-y-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="space-y-3">
                        <h4 className="font-medium text-sm">{subsection.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {subsection.content}
                        </p>
                        
                        {subsection.formula && (
                          <div className="bg-muted p-4 rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                              <Calculator className="h-4 w-4" />
                              <span className="text-sm font-medium">Formula</span>
                            </div>
                            <div className="flex justify-center">
                              <BlockMath math={subsection.formula} />
                            </div>
                          </div>
                        )}
                        
                        {subsection.code && (
                          <div className="bg-muted p-4 rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                              <Code className="h-4 w-4" />
                              <span className="text-sm font-medium">Kod</span>
                            </div>
                            <pre className="text-sm font-mono whitespace-pre-wrap">
                              <code>{subsection.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Primene</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {algorithm.applications.map((app, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-1">•</span>
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Advantages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Prednosti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {algorithm.advantages.map((adv, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Disadvantages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Mane
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {algorithm.disadvantages.map((dis, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Related Algorithms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Povezani algoritmi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {algorithm.relatedAlgorithms.map((related, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {related}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* References */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {algorithm.references.map((ref, index) => (
                  <li key={index} className="text-sm">
                    <div className="font-medium">{ref.title}</div>
                    {ref.authors && (
                      <div className="text-muted-foreground">{ref.authors}</div>
                    )}
                    {ref.year && (
                      <div className="text-muted-foreground">{ref.year}</div>
                    )}
                    {ref.url && (
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Link
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
