import { ExternalLink, Zap } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  platform: string;
  link: string;
  featured?: boolean;
  onImageClick: () => void;
}

export function ProductCard({
  title,
  image,
  platform,
  link,
  featured = false,
  onImageClick,
}: ProductCardProps) {
  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-card-hover ${featured ? 'border-primary border-2' : ''}`}>
      <CardContent className="p-0">
        <div
          className="relative aspect-square overflow-hidden bg-muted cursor-pointer"
          onClick={onImageClick}
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {featured && (
            <Badge 
              variant="warning"
              className="absolute top-3 right-3 shadow-md"
            >
              <Zap className="h-3 w-3 mr-1" />
              Destaque
            </Badge>
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-base line-clamp-2 min-h-[3rem]">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{platform}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="cta" 
          className="w-full"
          asChild
        >
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Ver ${title} no ${platform}`}
          >
            Ver Oferta
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
