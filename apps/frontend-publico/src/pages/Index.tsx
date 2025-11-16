import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { FeaturedProduct } from "@/components/FeaturedProduct";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/services/api";
import { Product } from "@/types/Product";

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/products");
  return data;
};

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const featuredProduct = useMemo(() => {
    return products.find(p => p.em_destaque);
  }, [products]);

  const categories = useMemo(() => {
    const allCategories = products.map(p => p.categoria);
    return ["Todos", ...Array.from(new Set(allCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    // Exclude the featured product from the main list if it exists
    const nonFeatured = featuredProduct 
      ? products.filter(p => p.id !== featuredProduct.id)
      : products;

    return nonFeatured.filter((product) => {
      const matchesSearch = product.titulo_exibicao
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "Todos" || product.categoria === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory, featuredProduct]);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />

      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Featured Product Section */}
        <section aria-label="Produto em destaque">
          {isLoading ? (
            <Skeleton className="h-[400px] w-full rounded-lg" />
          ) : featuredProduct ? (
            <FeaturedProduct
              title={featuredProduct.titulo_exibicao}
              image={featuredProduct.url_imagem}
              platform={featuredProduct.plataforma}
              description={featuredProduct.descricao_curta}
              link={featuredProduct.link_afiliado_final}
            />
          ) : null}
        </section>

        {/* Category Filter */}
        <section aria-label="Filtros de categoria">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </section>

        {/* Products Grid */}
        <section aria-label="Produtos disponíveis">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {activeCategory === "Todos" ? "Nossas Escolhas" : activeCategory}
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[450px] w-full rounded-lg" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-destructive text-lg">
                Oops! Não foi possível carregar os produtos.
              </p>
              <p className="text-muted-foreground mt-2">
                Tente novamente mais tarde.
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum produto encontrado para sua busca.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={String(product.id)}
                  title={product.titulo_exibicao}
                  image={product.url_imagem}
                  platform={product.plataforma}
                  link={product.link_afiliado_final}
                  featured={product.em_destaque}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 PassaoLink.com.br. Todos os direitos reservados.</p>
          <p className="mt-2">Reviews honestos e links afiliados para suas melhores compras.</p>
        </div>
      </footer>
    </div>
  );
}
