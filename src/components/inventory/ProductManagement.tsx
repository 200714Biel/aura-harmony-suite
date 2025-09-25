import React, { useState } from "react";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  ArrowLeft,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SampleProducts = [
  {
    id: 1,
    name: "Smartphone Galaxy S23",
    sku: "SGS23-001",
    category: "Eletrônicos",
    price: 2499.99,
    stock: 15,
    status: "active"
  },
  {
    id: 2,
    name: "Notebook Dell Inspiron",
    sku: "DI15-002",
    category: "Informática",
    price: 3299.00,
    stock: 3,
    status: "low_stock"
  },
  {
    id: 3,
    name: "Fone Bluetooth JBL",
    sku: "JBL-003",
    category: "Audio",
    price: 189.90,
    stock: 0,
    status: "out_of_stock"
  },
  {
    id: 4,
    name: "Smart TV 55 LG",
    sku: "LG55-004",
    category: "TV & Video",
    price: 2199.00,
    stock: 8,
    status: "active"
  }
];

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

export default function ProductManagement() {
  const [currentView, setCurrentView] = useState('list');
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);
  const [newProductForm, setNewProductForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: 0,
    stock: 0
  });

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return (
        <Badge variant="destructive" className="text-xs">
          Sem Estoque
        </Badge>
      );
    }
    if (status === "low_stock" || stock <= 5) {
      return (
        <Badge variant="secondary" className="text-xs bg-warning text-warning-foreground">
          Estoque Baixo
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="text-xs bg-success text-success-foreground">
        Ativo
      </Badge>
    );
  };

  const filteredProducts = SampleProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (currentView === 'new') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('list')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Novo Produto</h2>
              <p className="text-muted-foreground">Adicione um novo produto ao catálogo</p>
            </div>
          </div>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Input
                  placeholder="Nome do produto"
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({...newProductForm, name: e.target.value})}
                />
                <Input
                  placeholder="SKU"
                  value={newProductForm.sku}
                  onChange={(e) => setNewProductForm({...newProductForm, sku: e.target.value})}
                />
                <Input
                  placeholder="Categoria"
                  value={newProductForm.category}
                  onChange={(e) => setNewProductForm({...newProductForm, category: e.target.value})}
                />
                <Input
                  type="number"
                  placeholder="Preço"
                  value={newProductForm.price}
                  onChange={(e) => setNewProductForm({...newProductForm, price: parseFloat(e.target.value)})}
                />
                <Input
                  type="number"
                  placeholder="Estoque inicial"
                  value={newProductForm.stock}
                  onChange={(e) => setNewProductForm({...newProductForm, stock: parseInt(e.target.value)})}
                />
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={() => {
                      alert('Produto criado com sucesso!');
                      setCurrentView('list');
                    }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Criar Produto
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentView('list')}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentView === 'edit' && editForm) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('list')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Editar Produto</h2>
              <p className="text-muted-foreground">Modifique os dados do produto</p>
            </div>
          </div>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
                <Input
                  value={editForm.sku}
                  onChange={(e) => setEditForm({...editForm, sku: e.target.value})}
                />
                <Input
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                />
                <Input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value)})}
                />
                <Input
                  type="number"
                  value={editForm.stock}
                  onChange={(e) => setEditForm({...editForm, stock: parseInt(e.target.value)})}
                />
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={() => {
                      alert('Produto atualizado com sucesso!');
                      setCurrentView('list');
                    }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentView('list')}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentView === 'details' && selectedProduct) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('list')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Detalhes do Produto</h2>
              <p className="text-muted-foreground">Informações completas do produto</p>
            </div>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {selectedProduct.name}
                {getStatusBadge(selectedProduct.status, selectedProduct.stock)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SKU</p>
                  <p className="text-lg">{selectedProduct.sku}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categoria</p>
                  <p className="text-lg">{selectedProduct.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Preço</p>
                  <p className="text-lg font-semibold text-success">
                    R$ {selectedProduct.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estoque</p>
                  <p className="text-lg">{selectedProduct.stock} unidades</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button 
                  onClick={() => {
                    setEditForm(selectedProduct);
                    setCurrentView('edit');
                  }}
                  variant="outline"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => {
                    if (confirm('Tem certeza que deseja excluir este produto?')) {
                      alert('Produto excluído!');
                      setCurrentView('list');
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Produtos</h2>
            <p className="text-muted-foreground">Gerencie o catálogo de produtos</p>
          </div>
          <Button 
            onClick={() => setCurrentView('new')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>

        {/* Lista */}
        <Card className="glass">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Lista de Produtos
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produtos..."
                    className="pl-9 w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Produto</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">SKU</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Categoria</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Preço</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Estoque</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-border hover:bg-accent/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium">{product.name}</td>
                      <td className="py-4 px-4 text-muted-foreground">{product.sku}</td>
                      <td className="py-4 px-4 text-muted-foreground">{product.category}</td>
                      <td className="py-4 px-4 text-right font-semibold">
                        R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-center">{product.stock}</td>
                      <td className="py-4 px-4 text-center">
                        {getStatusBadge(product.status, product.stock)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-8 h-8 p-0"
                            onClick={() => {
                              setSelectedProduct(product);
                              setCurrentView('details');
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-8 h-8 p-0"
                            onClick={() => {
                              setEditForm(product);
                              setCurrentView('edit');
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              if (confirm('Tem certeza que deseja excluir este produto?')) {
                                alert('Produto excluído!');
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum produto encontrado
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{SampleProducts.length}</p>
              </div>
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
          </Card>
          <Card className="p-4 glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ativos</p>
                <p className="text-2xl font-bold text-success">
                  {SampleProducts.filter(p => p.status === 'active' && p.stock > 5).length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
            </div>
          </Card>
          <Card className="p-4 glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Estoque Baixo</p>
                <p className="text-2xl font-bold text-warning">
                  {SampleProducts.filter(p => p.stock > 0 && p.stock <= 5).length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
              </div>
            </div>
          </Card>
          <Card className="p-4 glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sem Estoque</p>
                <p className="text-2xl font-bold text-destructive">
                  {SampleProducts.filter(p => p.stock === 0).length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}