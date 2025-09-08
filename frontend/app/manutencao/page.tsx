"use client"

import { useState } from "react"
import {
  Wrench,
  Plus,
  Search,
  Calendar,
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Camera,
  FileText,
} from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data - in real app this would come from database
const maintenanceRequests = [
  {
    id: 1,
    propertyId: 1,
    tenantId: 1,
    property: "Rua das Flores, 123",
    tenant: "João Silva Santos",
    title: "Vazamento na torneira da cozinha",
    description: "A torneira da cozinha está pingando constantemente, causando desperdício de água",
    priority: "media",
    category: "hidraulica",
    status: "aberta",
    estimatedCost: 150,
    actualCost: null,
    assignedTo: "João Encanador",
    assignedPhone: "(11) 99999-0001",
    scheduledDate: null,
    completedDate: null,
    photos: ["/placeholder-0tgwp.png"],
    createdAt: "2024-03-15T10:30:00Z",
    updatedAt: "2024-03-15T10:30:00Z",
  },
  {
    id: 2,
    propertyId: 3,
    tenantId: 3,
    property: "Rua Comercial, 789",
    tenant: "Tech Solutions Ltda",
    title: "Lâmpada queimada no banheiro",
    description: "A lâmpada do banheiro principal queimou e precisa ser substituída",
    priority: "baixa",
    category: "eletrica",
    status: "concluida",
    estimatedCost: 50,
    actualCost: 45,
    assignedTo: "Elétrica Silva",
    assignedPhone: "(11) 88888-0002",
    scheduledDate: "2024-03-10T14:00:00Z",
    completedDate: "2024-03-10T15:30:00Z",
    photos: [],
    createdAt: "2024-03-08T09:15:00Z",
    updatedAt: "2024-03-10T15:30:00Z",
  },
  {
    id: 3,
    propertyId: 1,
    tenantId: 1,
    property: "Rua das Flores, 123",
    tenant: "João Silva Santos",
    title: "Ar condicionado não está gelando",
    description: "O ar condicionado do quarto principal não está resfriando adequadamente",
    priority: "alta",
    category: "eletrica",
    status: "em_andamento",
    estimatedCost: 300,
    actualCost: null,
    assignedTo: "Refrigeração Pro",
    assignedPhone: "(11) 77777-0003",
    scheduledDate: "2024-03-18T09:00:00Z",
    completedDate: null,
    photos: ["/placeholder-z0by7.png"],
    createdAt: "2024-03-14T16:45:00Z",
    updatedAt: "2024-03-16T11:20:00Z",
  },
  {
    id: 4,
    propertyId: 4,
    tenantId: null,
    property: "Rua Residencial, 321",
    tenant: "Proprietário",
    title: "Pintura externa da casa",
    description: "A pintura externa da casa está descascando e precisa ser renovada",
    priority: "media",
    category: "pintura",
    status: "orcamento",
    estimatedCost: 1200,
    actualCost: null,
    assignedTo: null,
    assignedPhone: null,
    scheduledDate: null,
    completedDate: null,
    photos: ["/placeholder-7l3ir.png"],
    createdAt: "2024-03-12T14:20:00Z",
    updatedAt: "2024-03-12T14:20:00Z",
  },
]

const priorityConfig = {
  baixa: {
    label: "Baixa",
    color: "bg-chart-2 text-white",
    icon: Clock,
  },
  media: {
    label: "Média",
    color: "bg-chart-4 text-white",
    icon: AlertTriangle,
  },
  alta: {
    label: "Alta",
    color: "bg-chart-5 text-white",
    icon: AlertTriangle,
  },
  urgente: {
    label: "Urgente",
    color: "bg-destructive text-destructive-foreground",
    icon: AlertTriangle,
  },
}

const statusConfig = {
  aberta: {
    label: "Aberta",
    color: "bg-chart-4 text-white",
    icon: Clock,
  },
  orcamento: {
    label: "Orçamento",
    color: "bg-chart-2 text-white",
    icon: FileText,
  },
  em_andamento: {
    label: "Em Andamento",
    color: "bg-chart-1 text-white",
    icon: Wrench,
  },
  concluida: {
    label: "Concluída",
    color: "bg-chart-3 text-white",
    icon: CheckCircle,
  },
  cancelada: {
    label: "Cancelada",
    color: "bg-muted text-muted-foreground",
    icon: XCircle,
  },
}

const categoryLabels = {
  eletrica: "Elétrica",
  hidraulica: "Hidráulica",
  pintura: "Pintura",
  limpeza: "Limpeza",
  jardinagem: "Jardinagem",
  estrutural: "Estrutural",
  outros: "Outros",
}

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [priorityFilter, setPriorityFilter] = useState("todos")
  const [categoryFilter, setCategoryFilter] = useState("todos")
  const [selectedRequest, setSelectedRequest] = useState<(typeof maintenanceRequests)[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const filteredRequests = maintenanceRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.tenant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || request.status === statusFilter
    const matchesPriority = priorityFilter === "todos" || request.priority === priorityFilter
    const matchesCategory = categoryFilter === "todos" || request.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const handleViewDetails = (request: (typeof maintenanceRequests)[0]) => {
    setSelectedRequest(request)
    setIsDetailDialogOpen(true)
  }

  const openRequests = maintenanceRequests.filter((r) => r.status === "aberta").length
  const inProgressRequests = maintenanceRequests.filter((r) => r.status === "em_andamento").length
  const urgentRequests = maintenanceRequests.filter((r) => r.priority === "urgente" || r.priority === "alta").length
  const totalEstimatedCost = maintenanceRequests
    .filter((r) => r.status !== "concluida" && r.status !== "cancelada")
    .reduce((sum, r) => sum + (r.estimatedCost || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Sistema de Manutenção</h1>
                <p className="text-sm text-muted-foreground">Gerencie solicitações e serviços de manutenção</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Solicitação
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nova Solicitação de Manutenção</DialogTitle>
                  <DialogDescription>Registre uma nova solicitação de manutenção</DialogDescription>
                </DialogHeader>
                <AddMaintenanceForm onClose={() => setIsAddDialogOpen(false)} />
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Solicitações Abertas</CardTitle>
              <Clock className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{openRequests}</div>
              <p className="text-xs text-muted-foreground">Aguardando atendimento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Andamento</CardTitle>
              <Wrench className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{inProgressRequests}</div>
              <p className="text-xs text-chart-1">Sendo executadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Alta Prioridade</CardTitle>
              <AlertTriangle className="h-4 w-4 text-chart-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{urgentRequests}</div>
              <p className="text-xs text-chart-5">Requer atenção</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Custo Estimado</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">R$ {totalEstimatedCost.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-muted-foreground">Solicitações pendentes</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Lista de Solicitações</TabsTrigger>
            <TabsTrigger value="calendar">Agenda</TabsTrigger>
            <TabsTrigger value="providers">Prestadores</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título, propriedade ou inquilino..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="aberta">Aberta</SelectItem>
                  <SelectItem value="orcamento">Orçamento</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Prioridades</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Categorias</SelectItem>
                  <SelectItem value="eletrica">Elétrica</SelectItem>
                  <SelectItem value="hidraulica">Hidráulica</SelectItem>
                  <SelectItem value="pintura">Pintura</SelectItem>
                  <SelectItem value="limpeza">Limpeza</SelectItem>
                  <SelectItem value="jardinagem">Jardinagem</SelectItem>
                  <SelectItem value="estrutural">Estrutural</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Maintenance Requests Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredRequests.map((request) => {
                const PriorityIcon = priorityConfig[request.priority as keyof typeof priorityConfig].icon
                const StatusIcon = statusConfig[request.status as keyof typeof statusConfig].icon
                const daysAgo = Math.floor(
                  (new Date().getTime() - new Date(request.createdAt).getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-foreground line-clamp-2">{request.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {categoryLabels[request.category as keyof typeof categoryLabels]} • {request.property}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={priorityConfig[request.priority as keyof typeof priorityConfig].color}>
                            <PriorityIcon className="h-3 w-3 mr-1" />
                            {priorityConfig[request.priority as keyof typeof priorityConfig].label}
                          </Badge>
                          <Badge className={statusConfig[request.status as keyof typeof statusConfig].color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[request.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{request.description}</p>

                      {request.photos.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{request.photos.length} foto(s)</span>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Solicitante:</span>
                          <span className="font-medium text-foreground">{request.tenant}</span>
                        </div>
                        {request.assignedTo && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Responsável:</span>
                            <span className="font-medium text-foreground">{request.assignedTo}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Custo estimado:</span>
                          <span className="font-medium text-foreground">
                            R$ {(request.estimatedCost || 0).toLocaleString("pt-BR")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Criado há:</span>
                          <span className="text-foreground">{daysAgo} dia(s)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleViewDetails(request)}
                        >
                          Ver Detalhes
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma solicitação encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  Não encontramos solicitações que correspondam aos filtros selecionados.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("todos")
                    setPriorityFilter("todos")
                    setCategoryFilter("todos")
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Agenda de Manutenções</CardTitle>
                <CardDescription>Serviços agendados e em andamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceRequests
                    .filter((r) => r.scheduledDate || r.status === "em_andamento")
                    .map((request) => (
                      <div key={request.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">
                            {request.scheduledDate
                              ? new Date(request.scheduledDate).toLocaleDateString("pt-BR")
                              : "Em andamento"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{request.title}</p>
                          <p className="text-sm text-muted-foreground">{request.property}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{request.assignedTo}</p>
                          <Badge className={statusConfig[request.status as keyof typeof statusConfig].color}>
                            {statusConfig[request.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Prestadores de Serviço</CardTitle>
                <CardDescription>Profissionais cadastrados para manutenções</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "João Encanador", category: "Hidráulica", phone: "(11) 99999-0001", rating: 4.8 },
                    { name: "Elétrica Silva", category: "Elétrica", phone: "(11) 88888-0002", rating: 4.9 },
                    { name: "Refrigeração Pro", category: "Ar Condicionado", phone: "(11) 77777-0003", rating: 4.7 },
                    { name: "Pintura & Cia", category: "Pintura", phone: "(11) 66666-0004", rating: 4.6 },
                  ].map((provider) => (
                    <Card key={provider.name}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {provider.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{provider.name}</p>
                            <p className="text-sm text-muted-foreground">{provider.category}</p>
                            <p className="text-sm text-muted-foreground">{provider.phone}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-sm text-chart-4">★</span>
                              <span className="text-sm text-foreground">{provider.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Request Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Solicitação</DialogTitle>
            <DialogDescription>Informações completas da manutenção</DialogDescription>
          </DialogHeader>
          {selectedRequest && <MaintenanceDetails request={selectedRequest} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MaintenanceDetails({ request }: { request: (typeof maintenanceRequests)[0] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Título:</span>
              <span className="font-medium text-foreground">{request.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Propriedade:</span>
              <span className="font-medium text-foreground">{request.property}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Solicitante:</span>
              <span className="font-medium text-foreground">{request.tenant}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Categoria:</span>
              <span className="font-medium text-foreground">
                {categoryLabels[request.category as keyof typeof categoryLabels]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Prioridade:</span>
              <Badge className={priorityConfig[request.priority as keyof typeof priorityConfig].color}>
                {priorityConfig[request.priority as keyof typeof priorityConfig].label}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge className={statusConfig[request.status as keyof typeof statusConfig].color}>
                {statusConfig[request.status as keyof typeof statusConfig].label}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Custos e Prazos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Custo Estimado:</span>
              <span className="font-medium text-foreground">
                R$ {(request.estimatedCost || 0).toLocaleString("pt-BR")}
              </span>
            </div>
            {request.actualCost && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Custo Real:</span>
                <span className="font-medium text-foreground">R$ {request.actualCost.toLocaleString("pt-BR")}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data de Criação:</span>
              <span className="font-medium text-foreground">
                {new Date(request.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
            {request.scheduledDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Agendada:</span>
                <span className="font-medium text-foreground">
                  {new Date(request.scheduledDate).toLocaleDateString("pt-BR")}
                </span>
              </div>
            )}
            {request.completedDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data de Conclusão:</span>
                <span className="font-medium text-foreground">
                  {new Date(request.completedDate).toLocaleDateString("pt-BR")}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Descrição</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">{request.description}</p>
        </CardContent>
      </Card>

      {request.assignedTo && (
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Prestador de Serviço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nome:</span>
              <span className="font-medium text-foreground">{request.assignedTo}</span>
            </div>
            {request.assignedPhone && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Telefone:</span>
                <span className="font-medium text-foreground">{request.assignedPhone}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {request.photos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Fotos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {request.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg border"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AddMaintenanceForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="property">Propriedade</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a propriedade" />
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
              <SelectItem value="eletrica">Elétrica</SelectItem>
              <SelectItem value="hidraulica">Hidráulica</SelectItem>
              <SelectItem value="pintura">Pintura</SelectItem>
              <SelectItem value="limpeza">Limpeza</SelectItem>
              <SelectItem value="jardinagem">Jardinagem</SelectItem>
              <SelectItem value="estrutural">Estrutural</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título da Solicitação</Label>
        <Input id="title" placeholder="Ex: Vazamento na torneira da cozinha" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição Detalhada</Label>
        <Textarea id="description" placeholder="Descreva o problema em detalhes..." rows={4} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridade</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baixa">Baixa</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="urgente">Urgente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="estimatedCost">Custo Estimado (R$)</Label>
          <Input id="estimatedCost" type="number" placeholder="150.00" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="assignedTo">Prestador de Serviço (Opcional)</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um prestador" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="joao">João Encanador</SelectItem>
            <SelectItem value="silva">Elétrica Silva</SelectItem>
            <SelectItem value="pro">Refrigeração Pro</SelectItem>
            <SelectItem value="pintura">Pintura & Cia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Criar Solicitação</Button>
      </div>
    </form>
  )
}
