import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import logo from "@/assets/passaolink_not_bg.png";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center">
          <a href="/" className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <img src={logo} alt="PassaoLink.com.br Logo" className="h-40" />
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                <p className="text-3xl text-green-700 font-semibold">PassaoLink.com.br</p>
                Seu Guia de Custo-Benefício
              </p>
            </div>
          </a>
          
          <div className="w-full max-w-md relative">
            <Search className="absolute left-10 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="pl-10 ml-7"
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Buscar produtos"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
