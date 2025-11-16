
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/Product";
import { ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ProductModal({ product, isOpen, onOpenChange }: ProductModalProps) {
  const isMobile = useIsMobile();

  if (!product) {
    return null;
  }

  const ModalComponent = isMobile ? Drawer : Dialog;
  const ModalContent = isMobile ? DrawerContent : DialogContent;
  const ModalHeader = isMobile ? DrawerHeader : DialogHeader;
  const ModalTitle = isMobile ? DrawerTitle : DialogTitle;
  const ModalDescription = isMobile ? DrawerDescription : DialogDescription;
  const ModalFooter = isMobile ? DrawerFooter : DialogFooter;

  return (
    <ModalComponent open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="p-0 max-w-2xl">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={product.url_imagem}
            alt={product.titulo_exibicao}
            className="w-full h-full object-cover"
          />
        </div>
        <ModalHeader className="p-6">
          <ModalTitle className="text-2xl font-bold">{product.titulo_exibicao}</ModalTitle>
          <p className="text-3xl font-bold text-primary mt-2">{product.preco_exibicao}</p>
          <ModalDescription className="pt-2">
            <div className="flex items-center gap-2 flex-wrap mt-4">
              <Badge variant="secondary">{product.plataforma}</Badge>
              <Badge variant="outline">{product.categoria}</Badge>
            </div>
            <p className="text-foreground text-base mt-4">{product.descricao_curta}</p>
          </ModalDescription>
        </ModalHeader>
        <ModalFooter className="p-6 pt-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:bg-transparent">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            {isMobile && (
              <DrawerClose asChild>
                <Button variant="outline">Fechar</Button>
              </DrawerClose>
            )}
            <Button asChild className="w-full" variant="cta">
              <a href={product.link_afiliado_final} target="_blank" rel="noopener noreferrer">
                Ver Oferta <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </ModalComponent>
  );
}
