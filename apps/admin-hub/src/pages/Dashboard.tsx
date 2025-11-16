import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Package, TrendingUp, LogOut, Loader2 } from "lucide-react";
import ProductTable from "@/components/ProductTable";
import ProductForm from "@/components/ProductForm";
import { toast } from "sonner";
import api from "@/services/api";
import logo from "@/assets/passaolink_not_bg.png";

// Interface alinhada com o backend
export interface Product {
  id?: number;
  titulo_exibicao: string;
  descricao_curta: string;
  url_imagem: string;
  link_afiliado_final: string;
  slug_personalizado: string;
  preco_exibicao: string;
  plataforma: string;
  categoria: string;
  em_destaque: boolean;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      toast.error("Falha ao carregar produtos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logout realizado");
    navigate("/login");
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Produto excluído com sucesso!");
      fetchProducts(); // Re-fetch
    } catch (error) {
      toast.error("Falha ao excluir produto.");
    }
  };

  const handleSaveProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      if (editingProduct && editingProduct.id) {
        await api.put(`/products/${editingProduct.id}`, productData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await api.post('/products', productData);
        toast.success("Produto adicionado com sucesso!");
      }
      setIsFormOpen(false);
      fetchProducts(); // Re-fetch
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Falha ao salvar produto.";
      toast.error(errorMessage);
    }
  };

  const activeProducts = products.length;
  const featuredProducts = products.filter(p => p.em_destaque).length;
  const lastProduct = products[products.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="PassaoLink.com.br Logo" className="h-10" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">PassaoLink.com.br</h1>
              <p className="text-sm text-muted-foreground">Painel Administrativo</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProducts}</div>
              <p className="text-xs text-muted-foreground">Total no sistema</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Destaque</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featuredProducts}</div>
              <p className="text-xs text-muted-foreground">Produtos destacados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Último Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium truncate">
                {lastProduct?.titulo_exibicao || "Nenhum produto"}
              </div>
              <p className="text-xs text-muted-foreground">Adicionado recentemente</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Gerenciar Produtos</CardTitle>
                <CardDescription>Lista completa de produtos cadastrados</CardDescription>
              </div>
              <Button onClick={handleAddProduct}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <ProductTable
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            )}
          </CardContent>
        </Card>
      </main>

      <ProductForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
};

export default Dashboard;
