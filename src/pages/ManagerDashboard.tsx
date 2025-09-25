import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Target, 
  DollarSign,
  BarChart3,
  PieChart,
  UserPlus,
  Settings
} from "lucide-react";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }
    
    const userData = JSON.parse(user);
    if (userData.role !== "manager") {
      navigate("/");
    }
  }, [navigate]);

  const stats = [
    {
      title: "Equipe Total",
      value: "24",
      description: "2 novos este mês",
      icon: Users,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Receita Mensal",
      value: "R$ 125.4K",
      description: "Meta: R$ 150K",
      icon: DollarSign,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Projetos Ativos",
      value: "18",
      description: "5 entregues esta semana",
      icon: Target,
      trend: { value: 15, isPositive: true }
    },
    {
      title: "Performance",
      value: "94%",
      description: "Acima da média",
      icon: TrendingUp,
      trend: { value: 3, isPositive: true }
    }
  ];

  const teamMembers = [
    { name: "Ana Silva", role: "Desenvolvedora", status: "online", tasks: 8 },
    { name: "Carlos Santos", role: "Designer", status: "busy", tasks: 12 },
    { name: "Maria Oliveira", role: "Analista", status: "online", tasks: 6 },
    { name: "João Costa", role: "Tester", status: "offline", tasks: 4 },
    { name: "Paula Lima", role: "Desenvolvedora", status: "online", tasks: 10 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-success";
      case "busy": return "bg-warning";
      case "offline": return "bg-muted-foreground";
      default: return "bg-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online": return "Online";
      case "busy": return "Ocupado";
      case "offline": return "Offline";
      default: return "Desconhecido";
    }
  };

  return (
    <DashboardLayout title="Painel do Gerente" userRole="manager">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Visão Geral da Gestão
          </h2>
          <p className="text-muted-foreground">
            Monitore o desempenho da equipe e acompanhe as métricas importantes.
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
          {/* Team Overview */}
          <Card className="lg:col-span-2 glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Equipe</CardTitle>
                  <CardDescription>
                    Status atual dos membros da equipe
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Adicionar Membro
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card hover:shadow-soft transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">{member.tasks} tarefas</Badge>
                      <Badge variant={member.status === 'online' ? 'default' : 'secondary'}>
                        {getStatusText(member.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Management Actions */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-foreground">Ações de Gestão</CardTitle>
              <CardDescription>
                Ferramentas administrativas principais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Relatórios
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <PieChart className="mr-2 h-4 w-4" />
                Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Gerenciar Equipe
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="mr-2 h-4 w-4" />
                Definir Metas
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-foreground">Performance Semanal</CardTitle>
              <CardDescription>
                Produtividade da equipe nos últimos 7 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Gráfico de performance</p>
                  <p className="text-xs">Dados simulados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-foreground">Distribuição de Projetos</CardTitle>
              <CardDescription>
                Status dos projetos em andamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Gráfico de distribuição</p>
                  <p className="text-xs">Dados simulados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}