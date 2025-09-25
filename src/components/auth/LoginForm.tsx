import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, Mail, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock authentication (replace with real API)
const mockUsers = [
  { email: "funcionario@aura.com", password: "123456", role: "employee" },
  { email: "gerente@aura.com", password: "123456", role: "manager" },
  { email: "estoque@aura.com", password: "123456", role: "inventory" },
];

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Store user data in localStorage (in real app, use proper token management)
      localStorage.setItem("user", JSON.stringify(user));
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo ao painel ${user.role === 'employee' ? 'do Funcionário' : user.role === 'manager' ? 'do Gerente' : 'do Estoque'}`,
      });

      // Navigate based on role
      if (user.role === "employee") navigate("/employee");
      else if (user.role === "manager") navigate("/manager");
      else if (user.role === "inventory") navigate("/inventory");
    } else {
      setError("Email ou senha incorretos");
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md glass shadow-large">
      <CardHeader className="space-y-1 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary animate-float" />
            <span className="text-2xl font-bold gradient-text">Aura</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Sistema de Gestão
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Faça login para acessar seu painel de controle
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          {error && (
            <Alert className="border-destructive/50 text-destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            variant="hero"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              "Entrando..."
            ) : (
              <>
                Entrar
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Credenciais de teste:
          </p>
          <div className="mt-2 space-y-1 text-xs text-muted-foreground">
            <p>Funcionário: funcionario@aura.com / 123456</p>
            <p>Gerente: gerente@aura.com / 123456</p>
            <p>Estoque: estoque@aura.com / 123456</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}