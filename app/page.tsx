import { Building2, Users, DollarSign, Wrench, Bell, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">ImóvelPro</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/notificacoes">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                  <Badge variant="destructive" className="ml-2">
                    3
                  </Badge>
                </Button>
              </Link>
              <Link href="/imoveis">
                <Button size="sm">
                  <Building2 className="h-4 w-4 mr-2" />
                  Ver Imóveis
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <Navigation />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Imóveis</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">4</div>
              <p className="text-xs text-muted-foreground">3 ocupados, 1 disponível</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Receita Mensal</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">R$ 5.000</div>
              <p className="text-xs text-chart-3">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Inquilinos Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3</div>
              <p className="text-xs text-muted-foreground">2 contratos residenciais, 1 comercial</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Manutenções Pendentes</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2</div>
              <p className="text-xs text-chart-5">1 alta prioridade, 1 média prioridade</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Pagamentos Recentes</CardTitle>
              <CardDescription>Últimas movimentações financeiras</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">João Silva Santos</p>
                  <p className="text-sm text-muted-foreground">Rua das Flores, 123</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-chart-3">R$ 1.500,00</p>
                  <Badge variant="outline" className="text-xs">
                    Pago
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Tech Solutions Ltda</p>
                  <p className="text-sm text-muted-foreground">Rua Comercial, 789</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-chart-4">R$ 3.500,00</p>
                  <Badge variant="secondary" className="text-xs">
                    Pendente
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Solicitações de Manutenção</CardTitle>
              <CardDescription>Últimas solicitações dos inquilinos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Vazamento na torneira</p>
                  <p className="text-sm text-muted-foreground">Rua das Flores, 123</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    Aberta
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Há 2 dias</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Ar condicionado</p>
                  <p className="text-sm text-muted-foreground">Rua das Flores, 123</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs">
                    Em Andamento
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Há 1 dia</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
