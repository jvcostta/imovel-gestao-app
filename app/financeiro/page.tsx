"use client"

import { useState } from "react"
import { DollarSign, TrendingUp, TrendingDown, Plus, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

// Mock data - in real app this would come from database
const monthlyData = [
  { month: "Jan", receita: 5000, despesas: 1200, lucro: 3800 },
  { month: "Fev", receita: 5000, despesas: 800, lucro: 4200 },
  { month: "Mar", receita: 5000, despesas: 1500, lucro: 3500 },
  { month: "Abr", receita: 7800, despesas: 900, lucro: 6900 },
  { month: "Mai", receita: 7800, despesas: 1100, lucro: 6700 },
  { month: "Jun", receita: 7800, despesas: 2200, lucro: 5600 },
]

const expenseCategories = [
  { name: "Manutenção", value: 2800, color: "#ef4444" },
  { name: "Impostos", value: 1200, color: "#f97316" },
  { name: "Administração", value: 800, color: "#eab308" },
  { name: "Seguros", value: 600, color: "#22c55e" },
  { name: "Outros", value: 400, color: "#6366f1" },
]

const recentTransactions = [
  {
    id: 1,
    type: "receita",
    description: "Aluguel - João Silva Santos",
    property: "Rua das Flores, 123",
    amount: 1500,
    date: "2024-03-05",
    status: "recebido",
  },
  {
    id: 2,
    type: "receita",
    description: "Aluguel - Tech Solutions Ltda",
    property: "Rua Comercial, 789",
    amount: 3500,
    date: "2024-03-10",
    status: "pendente",
  },
  {
    id: 3,
    type: "despesa",
    description: "Reparo hidráulico",
    property: "Rua das Flores, 123",
    amount: -350,
    date: "2024-03-08",
    status: "pago",
  },
  {
    id: 4,
    type: "despesa",
    description: "IPTU 2024 - 2ª parcela",
    property: "Av. Paulista, 456",
    amount: -280,
    date: "2024-03-01",
    status: "pago",
  },
  {
    id: 5,
    type: "receita",
    description: "Aluguel - Ana Paula Oliveira",
    property: "Av. Paulista, 456",
    amount: 2800,
    date: "2024-02-28",
    status: "atrasado",
  },
]

const paymentStatus = [
  { status: "Em dia", count: 2, amount: 5000, color: "text-chart-3" },
  { status: "Pendente", count: 1, amount: 3500, color: "text-chart-4" },
  { status: "Atrasado", count: 1, amount: 2800, color: "text-chart-5" },
]

export default function FinancialPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6m")
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false)

  const totalReceita = monthlyData.reduce((sum, month) => sum + month.receita, 0)
  const totalDespesas = monthlyData.reduce((sum, month) => sum + month.despesas, 0)
  const totalLucro = totalReceita - totalDespesas

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard Financeiro</h1>
                <p className="text-sm text-muted-foreground">Acompanhe receitas, despesas e rentabilidade</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3m">3 meses</SelectItem>
                  <SelectItem value="6m">6 meses</SelectItem>
                  <SelectItem value="12m">12 meses</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Despesa
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Registrar Nova Despesa</DialogTitle>
                    <DialogDescription>Adicione uma nova despesa ao seu controle financeiro</DialogDescription>
                  </DialogHeader>
                  <AddExpenseForm onClose={() => setIsExpenseDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">R$ {totalReceita.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-chart-3">+8% em relação ao período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Despesas Totais</CardTitle>
              <TrendingDown className="h-4 w-4 text-chart-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">R$ {totalDespesas.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-chart-5">+15% em relação ao período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lucro Líquido</CardTitle>
              <DollarSign className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">R$ {totalLucro.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-chart-3">+5% em relação ao período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Margem de Lucro</CardTitle>
              <TrendingUp className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {((totalLucro / totalReceita) * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Meta: 75%</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
            <TabsTrigger value="expenses">Despesas</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue vs Expenses Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Receitas vs Despesas</CardTitle>
                  <CardDescription>Comparativo mensal dos últimos 6 meses</CardDescription>
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
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Expense Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Categorias de Despesas</CardTitle>
                  <CardDescription>Distribuição das despesas por categoria</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Profit Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Evolução do Lucro</CardTitle>
                <CardDescription>Tendência de lucro líquido ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`} />
                    <Line type="monotone" dataKey="lucro" stroke="#6366f1" strokeWidth={3} name="Lucro" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {paymentStatus.map((status) => (
                <Card key={status.status}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{status.status}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{status.count}</div>
                    <p className={`text-sm font-medium ${status.color}`}>R$ {status.amount.toLocaleString("pt-BR")}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Transações Recentes</CardTitle>
                <CardDescription>Últimas movimentações financeiras</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.property}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${transaction.amount > 0 ? "text-chart-3" : "text-chart-5"}`}>
                          {transaction.amount > 0 ? "+" : ""}R$ {Math.abs(transaction.amount).toLocaleString("pt-BR")}
                        </p>
                        <Badge
                          variant={
                            transaction.status === "recebido" || transaction.status === "pago"
                              ? "default"
                              : transaction.status === "pendente"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {transaction.status === "recebido" && "Recebido"}
                          {transaction.status === "pago" && "Pago"}
                          {transaction.status === "pendente" && "Pendente"}
                          {transaction.status === "atrasado" && "Atrasado"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Despesas por Categoria</CardTitle>
                  <CardDescription>Últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenseCategories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                          <span className="text-foreground">{category.name}</span>
                        </div>
                        <span className="font-medium text-foreground">R$ {category.value.toLocaleString("pt-BR")}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Despesas Recentes</CardTitle>
                  <CardDescription>Últimas despesas registradas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTransactions
                      .filter((t) => t.type === "despesa")
                      .map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{expense.description}</p>
                            <p className="text-sm text-muted-foreground">{expense.property}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-chart-5">
                              R$ {Math.abs(expense.amount).toLocaleString("pt-BR")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(expense.date).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-foreground">Relatório Mensal</CardTitle>
                  <CardDescription>Resumo financeiro do mês atual</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Gerar PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-foreground">Relatório Anual</CardTitle>
                  <CardDescription>Balanço completo do ano</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Gerar PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-foreground">Declaração IR</CardTitle>
                  <CardDescription>Dados para imposto de renda</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Gerar PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AddExpenseForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="property">Imóvel</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Rua das Flores, 123</SelectItem>
              <SelectItem value="2">Av. Paulista, 456</SelectItem>
              <SelectItem value="3">Rua Comercial, 789</SelectItem>
              <SelectItem value="4">Rua Residencial, 321</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manutencao">Manutenção</SelectItem>
              <SelectItem value="imposto">Impostos</SelectItem>
              <SelectItem value="administracao">Administração</SelectItem>
              <SelectItem value="seguro">Seguros</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Valor (R$)</Label>
          <Input id="amount" type="number" placeholder="350.00" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Data da Despesa</Label>
          <Input id="date" type="date" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" placeholder="Descreva a despesa..." />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Registrar Despesa</Button>
      </div>
    </form>
  )
}
