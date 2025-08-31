"use client"

import { useState } from "react"
import { Bell, Check, X, Calendar, DollarSign, Wrench, FileText, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock data - in real app this would come from database
const notifications = [
  {
    id: 1,
    type: "pagamento_vencendo",
    title: "Pagamento Vencendo",
    message: "O pagamento do contrato de João Silva Santos vence em 2 dias (05/04/2024)",
    relatedId: 1,
    relatedType: "payment",
    isRead: false,
    priority: "media",
    createdAt: "2024-04-03T09:00:00Z",
    scheduledFor: "2024-04-03T09:00:00Z",
  },
  {
    id: 2,
    type: "pagamento_atrasado",
    title: "Pagamento em Atraso",
    message: "O pagamento de Ana Paula Oliveira está 5 dias em atraso. Multa aplicada: R$ 84,00",
    relatedId: 2,
    relatedType: "payment",
    isRead: false,
    priority: "alta",
    createdAt: "2024-04-02T10:30:00Z",
    scheduledFor: "2024-04-02T10:30:00Z",
  },
  {
    id: 3,
    type: "manutencao",
    title: "Nova Solicitação de Manutenção",
    message: "João Silva Santos solicitou reparo no ar condicionado - Rua das Flores, 123",
    relatedId: 3,
    relatedType: "maintenance",
    isRead: true,
    priority: "alta",
    createdAt: "2024-04-01T14:15:00Z",
    scheduledFor: "2024-04-01T14:15:00Z",
  },
  {
    id: 4,
    type: "contrato_vencendo",
    title: "Contrato Vencendo",
    message: "O contrato de Ana Paula Oliveira vence em 60 dias (01/06/2024). Considere renovação.",
    relatedId: 2,
    relatedType: "contract",
    isRead: true,
    priority: "media",
    createdAt: "2024-04-01T08:00:00Z",
    scheduledFor: "2024-04-01T08:00:00Z",
  },
  {
    id: 5,
    type: "manutencao_concluida",
    title: "Manutenção Concluída",
    message: "Reparo da lâmpada no banheiro foi concluído - Rua Comercial, 789",
    relatedId: 2,
    relatedType: "maintenance",
    isRead: false,
    priority: "baixa",
    createdAt: "2024-03-31T16:45:00Z",
    scheduledFor: "2024-03-31T16:45:00Z",
  },
]

const notificationConfig = {
  pagamento_vencendo: {
    icon: Calendar,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  pagamento_atrasado: {
    icon: DollarSign,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  manutencao: {
    icon: Wrench,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  manutencao_concluida: {
    icon: Check,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  contrato_vencendo: {
    icon: FileText,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
}

const priorityColors = {
  baixa: "bg-chart-2 text-white",
  media: "bg-chart-4 text-white",
  alta: "bg-chart-5 text-white",
}

export default function NotificationsPage() {
  const [typeFilter, setTypeFilter] = useState("todos")
  const [priorityFilter, setPriorityFilter] = useState("todos")
  const [readFilter, setReadFilter] = useState("todos")
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType = typeFilter === "todos" || notification.type === typeFilter
    const matchesPriority = priorityFilter === "todos" || notification.priority === priorityFilter
    const matchesRead =
      readFilter === "todos" ||
      (readFilter === "lidas" && notification.isRead) ||
      (readFilter === "nao_lidas" && !notification.isRead)

    return matchesType && matchesPriority && matchesRead
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const highPriorityCount = notifications.filter((n) => n.priority === "alta" && !n.isRead).length

  const handleSelectNotification = (notificationId: number, checked: boolean) => {
    if (checked) {
      setSelectedNotifications([...selectedNotifications, notificationId])
    } else {
      setSelectedNotifications(selectedNotifications.filter((id) => id !== notificationId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    } else {
      setSelectedNotifications([])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Central de Notificações</h1>
                <p className="text-sm text-muted-foreground">Gerencie alertas e configurações</p>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Não Lidas</CardTitle>
              <Bell className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">Notificações pendentes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Alta Prioridade</CardTitle>
              <Calendar className="h-4 w-4 text-chart-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{highPriorityCount}</div>
              <p className="text-xs text-chart-5">Requer atenção</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Hoje</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {notifications.filter((n) => new Date(n.createdAt).toDateString() === new Date().toDateString()).length}
              </div>
              <p className="text-xs text-muted-foreground">Notificações de hoje</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inbox" className="space-y-6">
          <TabsList>
            <TabsTrigger value="inbox">Caixa de Entrada</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="inbox" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="pagamento_vencendo">Pagamento Vencendo</SelectItem>
                  <SelectItem value="pagamento_atrasado">Pagamento Atrasado</SelectItem>
                  <SelectItem value="manutencao">Manutenção</SelectItem>
                  <SelectItem value="contrato_vencendo">Contrato Vencendo</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Prioridades</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
              <Select value={readFilter} onValueChange={setReadFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  <SelectItem value="nao_lidas">Não Lidas</SelectItem>
                  <SelectItem value="lidas">Lidas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk Actions */}
            {selectedNotifications.length > 0 && (
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <span className="text-sm text-foreground">
                  {selectedNotifications.length} notificação(ões) selecionada(s)
                </span>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Check className="h-4 w-4 mr-2" />
                  Marcar como Lida
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <X className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            )}

            {/* Notifications List */}
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  <div className="flex items-center gap-4 p-4 border-b">
                    <Checkbox
                      checked={
                        selectedNotifications.length === filteredNotifications.length &&
                        filteredNotifications.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm font-medium text-foreground">Selecionar Todas</span>
                  </div>
                  {filteredNotifications.map((notification) => {
                    const config = notificationConfig[notification.type as keyof typeof notificationConfig]
                    const Icon = config.icon
                    const timeAgo = Math.floor(
                      (new Date().getTime() - new Date(notification.createdAt).getTime()) / (1000 * 60 * 60),
                    )

                    return (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 border-b hover:bg-muted/50 transition-colors ${
                          !notification.isRead ? "bg-muted/30" : ""
                        }`}
                      >
                        <Checkbox
                          checked={selectedNotifications.includes(notification.id)}
                          onCheckedChange={(checked) => handleSelectNotification(notification.id, checked as boolean)}
                        />
                        <div className={`p-2 rounded-lg ${config.bgColor}`}>
                          <Icon className={`h-4 w-4 ${config.color}`} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-medium ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </h4>
                            <Badge className={priorityColors[notification.priority as keyof typeof priorityColors]}>
                              {notification.priority}
                            </Badge>
                            {!notification.isRead && <div className="w-2 h-2 bg-chart-1 rounded-full" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {timeAgo < 1 ? "Agora mesmo" : `${timeAgo}h atrás`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Ver
                          </Button>
                          {!notification.isRead && (
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma notificação encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  Não há notificações que correspondam aos filtros selecionados.
                </p>
                <Button
                  onClick={() => {
                    setTypeFilter("todos")
                    setPriorityFilter("todos")
                    setReadFilter("todos")
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Configurações de Notificação</CardTitle>
                <CardDescription>Configure quando e como receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Pagamentos Vencendo</Label>
                      <p className="text-sm text-muted-foreground">Notificar 3 dias antes do vencimento</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Pagamentos Atrasados</Label>
                      <p className="text-sm text-muted-foreground">Notificar imediatamente após vencimento</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Solicitações de Manutenção</Label>
                      <p className="text-sm text-muted-foreground">Notificar sobre novas solicitações</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Contratos Vencendo</Label>
                      <p className="text-sm text-muted-foreground">Notificar 60 dias antes do vencimento</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-foreground">Relatórios Mensais</Label>
                      <p className="text-sm text-muted-foreground">Receber resumo mensal automaticamente</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
