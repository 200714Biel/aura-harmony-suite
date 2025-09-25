import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  MessageSquare,
  FileText,
  Plus
} from "lucide-react";

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }
    
    const userData = JSON.parse(user);
    if (userData.role !== "employee") {
      navigate("/");
    }
  }, [navigate]);

  const stats = [
    {
      title: "Tarefas Pendentes",
      value: "12",
      description: "3 vencendo hoje",
      icon: AlertCircle,
      trend: { value: -8, isPositive: false }
    },
    {
      title: "Tarefas Concluídas",
      value: "28",
      description: "Este mês",
      icon: CheckCircle,
      trend: { value: 15, isPositive: true }
    },
    {
      title: "Horas Trabalhadas",
      value: "42h",
      description: "Esta semana",
      icon: Clock,
      trend: { value: 5, isPositive: true }
    },
    {
      title: "Projetos Ativos",
      value: "3",
      description: "Em andamento",
      icon: FileText,
      trend: { value: 0, isPositive: true }
    }
  ];

  const recentTasks = [
    {
      title: "Relatório de Vendas Q3",
      status: "Em andamento",
      priority: "Alta",
      deadline: "Hoje",
      type: "pending"
    },
    {
      title: "Atualização do Sistema",
      status: "Concluído",
      priority: "Média",
      deadline: "Ontem",
      type: "completed"
    },
    {
      title: "Reunião com Cliente XYZ",
      status: "Agendado",
      priority: "Alta",
      deadline: "Amanhã",
      type: "scheduled"
    },
    {
      title: "Treinamento de Equipe",
      status: "Em andamento",
      priority: "Baixa",
      deadline: "Próxima semana",
      type: "pending"
    }
  ];

  const getStatusColor = (type: string) => {
    switch (type) {
      case "completed": return "text-success";
      case "pending": return "text-warning";
      case "scheduled": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "text-destructive";
      case "Média": return "text-warning";
      case "Baixa": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <DashboardLayout title="Painel do Funcionário" userRole="employee">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Bem-vindo de volta!
          </h2>
          <p className="text-muted-foreground">
            Aqui está um resumo das suas atividades e tarefas.
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
          {/* Recent Tasks */}
          <Card className="lg:col-span-2 glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Tarefas Recentes</CardTitle>
                  <CardDescription>
                    Suas atividades mais recentes e próximas
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Tarefa
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card hover:shadow-soft transition-all duration-300">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{task.title}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={getStatusColor(task.type)}>
                          {task.status}
                        </span>
                        <span className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </span>
                        <span className="text-muted-foreground">
                          {task.deadline}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Ver
                    </Button>
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
                Acesso rápido às funções mais utilizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Agendar Reunião
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Enviar Mensagem
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Criar Relatório
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Ver Equipe
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}