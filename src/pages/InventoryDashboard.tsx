import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  TrendingDown, 
  AlertTriangle, 
  Truck,
  ShoppingCart,
  BarChart3,
  Plus,
  Search,
  FileText,
  RefreshCw
} from "lucide-react";

export default function InventoryDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }
    
    const userData = JSON.parse(user);
    if (userData.role !== "inventory") {
      navigate("/");
    }
  }, [navigate]);

  const stats = [
    {
      title: "Total de Produtos",
      value: "1,847",
      description: "23 adicionados hoje",
      icon: Package,
      trend: { value: 5, isPositive: true }
    },
    {
      title: "Estoque Baixo",
      value: "18",
      description: "Requer atenção",
      icon: AlertTriangle,
      trend: { value: -12, isPositive: false }
    },
    {
      title: "Valor do Estoque",
      value: "R$ 284.5K",
      description: "Total em produtos",
      icon: BarChart3,
      trend: { value: 7, isPositive: true }
    },
    {
      title: "Movimentação Hoje",
      value: "156",
      description: "Entradas e saídas",
      icon: Truck,
      trend: { value: 23, isPositive: true }
    }
  ];

  const lowStockItems = [
    { name: "Notebook Dell Inspiron", category: "Eletrônicos", stock: 3, minimum: 10, status: "critical" },
    { name: "Cadeira Ergonômica", category: "Móveis", stock: 7, minimum: 15, status: "low" },
    { name: "Monitor 24\" Samsung", category: "Eletrônicos", stock: 5, minimum: 12, status: "critical" },
    { name: "Impressora HP LaserJet", category: "Equipamentos", stock: 2, minimum: 8, status: "critical" },
    { name: "Mesa de Escritório", category: "Móveis", stock: 4, minimum: 10, status: "low" }
  ];

  const recentMovements = [
    { item: "Notebook Lenovo", type: "entrada", quantity: 15, time: "há 2 horas", user: "Ana Silva" },
    { item: "Mouse Wireless", type: "saída", quantity: 8, time: "há 3 horas", user: "Carlos Santos" },
    { item: "Teclado Mecânico", type: "entrada", quantity: 20, time: "há 5 horas", user: "Maria Oliveira" },
    { item: "Webcam HD", type: "saída", quantity: 3, time: "há 6 horas", user: "João Costa" }
  ];

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getMovementColor = (type: string) => {
    return type === "entrada" ? "text-success" : "text-destructive";
  };

  const getMovementIcon = (type: string) => {
    return type === "entrada" ? "↗" : "↙";
  };

  return (
    <DashboardLayout title="Painel de Estoque" userRole="inventory">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Controle de Estoque
          </h2>
          <p className="text-muted-foreground">
            Gerencie produtos, monitore níveis de estoque e acompanhe movimentações.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Low Stock Alert */}
          <Card className="lg:col-span-2 glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-foreground">
                    <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                    Estoque Baixo
                  </CardTitle>
                  <CardDescription>
                    Produtos que precisam de reposição urgente
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Solicitar Compra
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card hover:shadow-soft transition-all duration-300">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">{item.category}</span>
                        <span className="text-foreground">
                          Estoque: <span className={item.status === 'critical' ? 'text-destructive font-semibold' : 'text-warning'}>{item.stock}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Mín: {item.minimum}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStockStatusColor(item.status)}>
                        {item.status === 'critical' ? 'Crítico' : 'Baixo'}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Reabastecer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-foreground">Ações Rápidas</CardTitle>
              <CardDescription>
                Acesso rápido às funções de estoque
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Produto
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Buscar Item
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Nova Entrada
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Truck className="mr-2 h-4 w-4" />
                Nova Saída
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Relatório
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="mr-2 h-4 w-4" />
                Inventário
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Movements */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-foreground">Movimentações Recentes</CardTitle>
            <CardDescription>
              Últimas entradas e saídas do estoque
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovements.map((movement, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card hover:shadow-soft transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      movement.type === 'entrada' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                    }`}>
                      {getMovementIcon(movement.type)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{movement.item}</p>
                      <p className="text-sm text-muted-foreground">
                        por {movement.user} • {movement.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${getMovementColor(movement.type)}`}>
                      {movement.type === 'entrada' ? '+' : '-'}{movement.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {movement.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}