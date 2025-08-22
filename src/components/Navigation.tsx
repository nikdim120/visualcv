import { Link, useLocation } from 'react-router-dom';
import { Brain, Camera, BookOpen, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-lg sm:text-xl font-bold">Computer Vision Lab</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Camera className="h-4 w-4" />
              Istraživačkova laboratorija
            </div>
          </div>
          
          <nav className="flex items-center gap-1 sm:gap-2">
            <Button
              variant={location.pathname === '/' ? "default" : "outline"}
              size="sm"
              className="text-xs sm:text-sm px-2 sm:px-3"
              asChild
            >
              <Link to="/">
                <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Glavna strana</span>
                <span className="sm:hidden">Glavna</span>
              </Link>
            </Button>
            <Button
              variant={location.pathname.startsWith('/tutorials') ? "default" : "outline"}
              size="sm"
              className="text-xs sm:text-sm px-2 sm:px-3"
              asChild
            >
              <Link to="/tutorials">
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Tutorijali</span>
                <span className="sm:hidden">Tut</span>
              </Link>
            </Button>
            <Button
              variant={location.pathname.startsWith('/info') ? "default" : "outline"}
              size="sm"
              className="text-xs sm:text-sm px-2 sm:px-3"
              asChild
            >
              <Link to="/info">
                <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Informacije</span>
                <span className="sm:hidden">Info</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
