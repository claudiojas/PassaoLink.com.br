import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              PassaoLink.com.br
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Seu Guia de Custo-Benefício
            </p>
          </div>
          
          <div className="w-full max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="pl-10"
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Buscar produtos"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
