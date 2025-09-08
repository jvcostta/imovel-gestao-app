"use client"

import { useState } from "react"
import { Users, Plus, Search, Phone, Mail, FileText, MessageCircle, Calendar, Eye, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data - in real app this would come from database
const tenants = [
  {
    id: 1,
    name: "João Silva Santos",
    email: "joao.silva@email.com",
    phone: "(11) 99999-1234",
    cpf: "123.456.789-01",
    birthDate: "1985-03-15",
    occupation: "Engenheiro de Software",
    monthlyIncome: 8000,
    emergencyContact: {
      name: "Maria Silva Santos",
      phone: "(11) 98888-5678",
    },
    property: {
      id: 1,
      address: "Rua das Flores, 123 - Centro",
      rent: 1500,
    },
    contract: {
      startDate: "2024-01-01",
      endDate: "2025-01-01",
      status: "ativo",
    },
    paymentStatus: "em_dia",
    lastPayment: "2024-03-05",
    avatar: null,
  },
  {
    id: 2,
    name: "Ana Paula Oliveira",
    email: "ana.oliveira@email.com",
    phone: "(11) 88888-9876",
    cpf: "987.654.321-02",
    birthDate: "1990-07-22",
    occupation: "Designer Gráfica",
    monthlyIncome: 4500,
    emergencyContact: {
      name: "Carlos Oliveira",
      phone: "(11) 97777-4321",
    },
    property: {
      id: 2,
      address: "Av. Paulista, 456 - Bela Vista",
      rent: 2800,
    },
    contract: {
      startDate: "2023-06-01",
      endDate: "2024-06-01",
      status: "vencendo",
    },
    paymentStatus: "atrasado",
    lastPayment: "2024-02-28",
    avatar: null,
  },
  {
    id: 3,
    name: "Tech Solutions Ltda",
    email: "contato@techsolutions.com",
    phone: "(11) 77777-5555",
    cpf: "12.345.678/0001-90",
    birthDate: null,
    occupation: "Empresa de Tecnologia",
    monthlyIncome: 25000,
    emergencyContact: {
      name: "Roberto Tech",
      phone: "(11) 96666-7890",
    },
    property: {
      id: 3,
      address: "Rua Comercial, 789 - Vila Madalena",
      rent: 3500,
    },
    contract: {
      startDate: "2024-02-15",
      endDate: "2026-02-15",
      status: "ativo",
    },
    paymentStatus: "em_dia",
    lastPayment: "2024-03-10",
    avatar: null,
  },
]

const paymentStatusColors = {
  em_dia: "bg-chart-3 text-white",
  atrasado: "bg-chart-5 text-white",
  pendente: "bg-chart-4 text-white",
}

const paymentStatusLabels = {
  em_dia: "Em Dia",
  atrasado: "Atrasado",
  pendente: "Pendente",
}

const contractStatusColors = {
  ativo: "bg-chart-3 text-white",
  vencendo: "bg-chart-4 text-white",
  vencido: "bg-chart-5 text-white",
  encerrado: "bg-muted text-muted-foreground",
}

const contractStatusLabels = {
  ativo: "Ativo",
  vencendo: "Vencendo",
  vencido: "Vencido",
  encerrado: "Encerrado",
}

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [selectedTenant, setSelectedTenant] = useState<(typeof tenants)[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || tenant.paymentStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (tenant: (typeof tenants)[0]) => {
    setSelectedTenant(tenant)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestão de Inquilinos</h1>
                <p className="text-sm text-muted-foreground">Gerencie informações e contratos dos inquilinos</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Inquilino
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Inquilino</DialogTitle>
                  <DialogDescription>
                    Preencha as informações do inquilino para adicioná-lo ao sistema
                  </DialogDescription>
                </DialogHeader>
                <AddTenantForm onClose={() => setIsAddDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Inquilinos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{tenants.length}</div>
              <p className="text-xs text-muted-foreground">2 residenciais, 1 comercial</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pagamentos em Dia</CardTitle>
              <Calendar className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {tenants.filter((t) => t.paymentStatus === "em_dia").length}
              </div>
              <p className="text-xs text-chart-3">66% dos inquilinos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Contratos Vencendo</CardTitle>
              <FileText className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {tenants.filter((t) => t.contract.status === "vencendo").length}
              </div>
              <p className="text-xs text-chart-4">Próximos 60 dias</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pagamentos Atrasados</CardTitle>
              <Calendar className="h-4 w-4 text-chart-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {tenants.filter((t) => t.paymentStatus === "atrasado").length}
              </div>
              <p className="text-xs text-chart-5">Requer atenção</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou endereço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status do Pagamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="em_dia">Em Dia</SelectItem>
              <SelectItem value="atrasado">Atrasado</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tenants List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTenants.map((tenant) => (
            <Card key={tenant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={tenant.avatar || ""} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {tenant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-foreground">{tenant.name}</CardTitle>
                      <CardDescription className="text-sm">{tenant.occupation}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={paymentStatusColors[tenant.paymentStatus as keyof typeof paymentStatusColors]}>
                      {paymentStatusLabels[tenant.paymentStatus as keyof typeof paymentStatusLabels]}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={contractStatusColors[tenant.contract.status as keyof typeof contractStatusColors]}
                    >
                      {contractStatusLabels[tenant.contract.status as keyof typeof contractStatusLabels]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{tenant.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{tenant.phone}</span>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium text-foreground">{tenant.property.address}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Aluguel:</span>
                    <span className="font-semibold text-foreground">
                      R$ {tenant.property.rent.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Último pagamento:</span>
                    <span className="text-sm text-foreground">
                      {new Date(tenant.lastPayment).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleViewDetails(tenant)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTenants.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum inquilino encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Não encontramos inquilinos que correspondam aos filtros selecionados.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("todos")
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      {/* Tenant Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Inquilino</DialogTitle>
            <DialogDescription>Informações completas e histórico</DialogDescription>
          </DialogHeader>
          {selectedTenant && <TenantDetails tenant={selectedTenant} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function TenantDetails({ tenant }: { tenant: (typeof tenants)[0] }) {
  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="info">Informações</TabsTrigger>
        <TabsTrigger value="contract">Contrato</TabsTrigger>
        <TabsTrigger value="payments">Pagamentos</TabsTrigger>
        <TabsTrigger value="communication">Comunicação</TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nome:</span>
                <span className="font-medium text-foreground">{tenant.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">{tenant.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Telefone:</span>
                <span className="font-medium text-foreground">{tenant.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CPF/CNPJ:</span>
                <span className="font-medium text-foreground">{tenant.cpf}</span>
              </div>
              {tenant.birthDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data de Nascimento:</span>
                  <span className="font-medium text-foreground">
                    {new Date(tenant.birthDate).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Profissão:</span>
                <span className="font-medium text-foreground">{tenant.occupation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Renda Mensal:</span>
                <span className="font-medium text-foreground">R$ {tenant.monthlyIncome.toLocaleString("pt-BR")}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Contato de Emergência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nome:</span>
                <span className="font-medium text-foreground">{tenant.emergencyContact.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Telefone:</span>
                <span className="font-medium text-foreground">{tenant.emergencyContact.phone}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="contract" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Informações do Contrato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Imóvel:</span>
              <span className="font-medium text-foreground">{tenant.property.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Valor do Aluguel:</span>
              <span className="font-medium text-foreground">R$ {tenant.property.rent.toLocaleString("pt-BR")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data de Início:</span>
              <span className="font-medium text-foreground">
                {new Date(tenant.contract.startDate).toLocaleDateString("pt-BR")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data de Término:</span>
              <span className="font-medium text-foreground">
                {new Date(tenant.contract.endDate).toLocaleDateString("pt-BR")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge className={contractStatusColors[tenant.contract.status as keyof typeof contractStatusColors]}>
                {contractStatusLabels[tenant.contract.status as keyof typeof contractStatusLabels]}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="payments" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Histórico de Pagamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Março 2024</p>
                  <p className="text-sm text-muted-foreground">Vencimento: 05/03/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">R$ {tenant.property.rent.toLocaleString("pt-BR")}</p>
                  <Badge className="text-xs bg-chart-3 text-white">Pago</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Fevereiro 2024</p>
                  <p className="text-sm text-muted-foreground">Vencimento: 05/02/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">R$ {tenant.property.rent.toLocaleString("pt-BR")}</p>
                  <Badge className="text-xs bg-chart-3 text-white">Pago</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="communication" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Histórico de Comunicação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">Solicitação de Manutenção</span>
                  <span className="text-sm text-muted-foreground">15/03/2024</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Inquilino reportou vazamento na torneira da cozinha. Manutenção agendada para 18/03/2024.
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">Renovação de Contrato</span>
                  <span className="text-sm text-muted-foreground">01/12/2023</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Discussão sobre renovação do contrato para 2024. Inquilino confirmou interesse.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function AddTenantForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input id="name" placeholder="João Silva Santos" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="joao@email.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" placeholder="(11) 99999-1234" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF/CNPJ</Label>
          <Input id="cpf" placeholder="123.456.789-01" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="birthDate">Data de Nascimento</Label>
          <Input id="birthDate" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupation">Profissão</Label>
          <Input id="occupation" placeholder="Engenheiro de Software" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="income">Renda Mensal (R$)</Label>
          <Input id="income" type="number" placeholder="8000.00" />
        </div>
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="emergencyName">Contato de Emergência - Nome</Label>
        <Input id="emergencyName" placeholder="Maria Silva Santos" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="emergencyPhone">Contato de Emergência - Telefone</Label>
        <Input id="emergencyPhone" placeholder="(11) 98888-5678" />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Adicionar Inquilino</Button>
      </div>
    </form>
  )
}
