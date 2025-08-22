import { Link, useLocation } from 'react-router-dom';
import { Brain, Camera, BookOpen, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              <span className="text-xl font-bold">Computer Vision Lab</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Camera className="h-4 w-4" />
              Interaktivna platforma za kompjuterski vid
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            <Button
              variant={location.pathname === '/' ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link to="/">
                <Brain className="h-4 w-4 mr-2" />
                Glavna strana
              </Link>
            </Button>
            <Button
              variant={location.pathname.startsWith('/tutorials') ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link to="/tutorials">
                <BookOpen className="h-4 w-4 mr-2" />
                Tutorijali
              </Link>
            </Button>
            <Button
              variant={location.pathname.startsWith('/info') ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link to="/info">
                <Info className="h-4 w-4 mr-2" />
                Informacije
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
