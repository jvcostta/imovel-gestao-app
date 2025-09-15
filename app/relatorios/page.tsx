"use client"

import { useState } from "react"
import { BarChart3, Download, Calendar, DollarSign, FileText, TrendingUp, Building2, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

// Mock data for reports
const monthlyData = [
  { month: "Jan", receita: 5000, despesas: 1200, lucro: 3800, ocupacao: 75 },
  { month: "Fev", receita: 5000, despesas: 800, lucro: 4200, ocupacao: 75 },
  { month: "Mar", receita: 7800, despesas: 1500, lucro: 6300, ocupacao: 100 },
  { month: "Abr", receita: 7800, despesas: 900, lucro: 6900, ocupacao: 100 },
  { month: "Mai", receita: 7800, despesas: 1100, lucro: 6700, ocupacao: 100 },
  { month: "Jun", receita: 7800, despesas: 2200, lucro: 5600, ocupacao: 100 },
]

const propertyPerformance = [
  { property: "Rua das Flores, 123", receita: 9000, despesas: 2100, lucro: 6900, ocupacao: 100 },
  { property: "Av. Paulista, 456", receita: 16800, despesas: 3200, lucro: 13600, ocupacao: 60 },
  { property: "Rua Comercial, 789", receita: 21000, despesas: 1800, lucro: 19200, ocupacao: 100 },
  { property: "Rua Residencial, 321", receita: 0, despesas: 4500, lucro: -4500, ocupacao: 0 },
]

const expenseBreakdown = [
  { category: "Manutenção", value: 4200, color: "#ef4444" },
  { category: "Impostos", value: 2800, color: "#f97316" },
  { category: "Administração", value: 1200, color: "#eab308" },
  { category: "Seguros", value: 800, color: "#22c55e" },
]

const reportTemplates = [
  {
    id: "monthly",
    name: "Relatório Mensal",
    description: "Resumo financeiro e operacional do mês",
    icon: Calendar,
    color: "text-chart-1",
  },
  {
    id: "annual",
    name: "Relatório Anual",
    description: "Balanço completo do ano fiscal",
    icon: BarChart3,
    color: "text-chart-2",
  },
  {
    id: "property",
    name: "Relatório por Imóvel",
    description: "Performance individual de cada propriedade",
    icon: Building2,
    color: "text-chart-3",
  },
  {
    id: "tenant",
    name: "Relatório de Inquilinos",
    description: "Histórico e status dos inquilinos",
    icon: Users,
    color: "text-chart-4",
  },
  {
    id: "tax",
    name: "Declaração IR",
    description: "Dados organizados para imposto de renda",
    icon: FileText,
    color: "text-chart-5",
  },
  {
    id: "maintenance",
    name: "Relatório de Manutenção",
    description: "Histórico e custos de manutenção",
    icon: FileText,
    color: "text-chart-1",
  },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024")
  const [selectedProperty, setSelectedProperty] = useState("todos")

  const totalReceita = monthlyData.reduce((sum, month) => sum + month.receita, 0)
  const totalDespesas = monthlyData.reduce((sum, month) => sum + month.despesas, 0)
  const totalLucro = totalReceita - totalDespesas
  const avgOccupancy = monthlyData.reduce((sum, month) => sum + month.ocupacao, 0) / monthlyData.length

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Relatórios e Análises</h1>
                <p className="text-sm text-muted-foreground">Insights e relatórios do seu portfólio</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Tudo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="properties">Imóveis</TabsTrigger>
            <TabsTrigger value="templates">Modelos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-chart-3" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">R$ {totalReceita.toLocaleString("pt-BR")}</div>
                  <p className="text-xs text-chart-3">+15% vs ano anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Lucro Líquido</CardTitle>
                  <TrendingUp className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">R$ {totalLucro.toLocaleString("pt-BR")}</div>
                  <p className="text-xs text-chart-2">Margem: {((totalLucro / totalReceita) * 100).toFixed(1)}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Ocupação</CardTitle>
                  <Building2 className="h-4 w-4 text-chart-1" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{avgOccupancy.toFixed(0)}%</div>
                  <p className="text-xs text-muted-foreground">Média do período</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">ROI Médio</CardTitle>
                  <TrendingUp className="h-4 w-4 text-chart-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">8.5%</div>
                  <p className="text-xs text-chart-4">Retorno sobre investimento</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Performance Mensal</CardTitle>
                  <CardDescription>Receitas, despesas e lucro por mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`} />
                      <Bar dataKey="receita" fill="#22c55e" name="Receita" />
                      <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
                      <Bar dataKey="lucro" fill="#6366f1" name="Lucro" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Distribuição de Despesas</CardTitle>
                  <CardDescription>Categorias de gastos no período</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Trend Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Análise de Tendências</CardTitle>
                <CardDescription>Evolução da taxa de ocupação</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Line type="monotone" dataKey="ocupacao" stroke="#6366f1" strokeWidth={3} name="Taxa de Ocupação" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Resumo Financeiro Detalhado</CardTitle>
                <CardDescription>Análise completa das finanças do período</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Receitas</h4>
                      <p className="text-2xl font-bold text-chart-3">R$ {totalReceita.toLocaleString("pt-BR")}</p>
                      <p className="text-sm text-muted-foreground">Aluguéis recebidos</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Despesas</h4>
                      <p className="text-2xl font-bold text-chart-5">R$ {totalDespesas.toLocaleString("pt-BR")}</p>
                      <p className="text-sm text-muted-foreground">Custos operacionais</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Lucro Líquido</h4>
                      <p className="text-2xl font-bold text-chart-2">R$ {totalLucro.toLocaleString("pt-BR")}</p>
                      <p className="text-sm text-muted-foreground">Resultado final</p>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Relatório Financeiro Completo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Performance por Imóvel</CardTitle>
                <CardDescription>Análise individual de cada propriedade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {propertyPerformance.map((property, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-foreground">{property.property}</h4>
                        <Badge variant={property.ocupacao > 0 ? "default" : "secondary"}>
                          {property.ocupacao}% ocupado
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Receita:</span>
                          <p className="font-medium text-chart-3">R$ {property.receita.toLocaleString("pt-BR")}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Despesas:</span>
                          <p className="font-medium text-chart-5">R$ {property.despesas.toLocaleString("pt-BR")}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Lucro:</span>
                          <p className={`font-medium ${property.lucro > 0 ? "text-chart-3" : "text-chart-5"}`}>
                            R$ {property.lucro.toLocaleString("pt-BR")}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">ROI:</span>
                          <p className="font-medium text-foreground">
                            {property.receita > 0 ? ((property.lucro / property.receita) * 100).toFixed(1) : "0"}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportTemplates.map((template) => {
                const Icon = template.icon
                return (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon className={`h-6 w-6 ${template.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-foreground">{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-transparent" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Gerar Relatório
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
