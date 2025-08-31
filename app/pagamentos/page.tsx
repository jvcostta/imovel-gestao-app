"use client"

import { useState } from "react"
import { Calendar, DollarSign, Plus, Search, Download, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data - in real app this would come from database
const payments = [
  {
    id: 1,
    contractId: 1,
    tenant: "João Silva Santos",
    property: "Rua das Flores, 123",
    dueDate: "2024-03-05",
    amount: 1500,
    paidDate: "2024-03-05",
    paidAmount: 1500,
    lateFee: 0,
    paymentMethod: "pix",
    status: "pago",
    notes: "",
  },
  {
    id: 2,
    contractId: 1,
    tenant: "João Silva Santos",
    property: "Rua das Flores, 123",
    dueDate: "2024-04-05",
    amount: 1500,
    paidDate: null,
    paidAmount: null,
    lateFee: 0,
    paymentMethod: null,
    status: "pendente",
    notes: "",
  },
  {
    id: 3,
    contractId: 2,
    tenant: "Tech Solutions Ltda",
    property: "Rua Comercial, 789",
    dueDate: "2024-03-10",
    amount: 3500,
    paidDate: "2024-03-10",
    paidAmount: 3500,
    lateFee: 0,
    paymentMethod: "transferencia",
    status: "pago",
    notes: "",
  },
  {
    id: 4,
    contractId: 2,
    tenant: "Tech Solutions Ltda",
    property: "Rua Comercial, 789",
    dueDate: "2024-04-10",
    amount: 3500,
    paidDate: null,
    paidAmount: null,
    lateFee: 0,
    paymentMethod: null,
    status: "pendente",
    notes: "",
  },
  {
    id: 5,
    contractId: 3,
    tenant: "Ana Paula Oliveira",
    property: "Av. Paulista, 456",
    dueDate: "2024-02-28",
    amount: 2800,
    paidDate: null,
    paidAmount: null,
    lateFee: 84, // 3% late fee
    paymentMethod: null,
    status: "atrasado",
    notes: "Inquilino notificado sobre atraso",
  },
]

const statusConfig = {
  pago: {
    label: "Pago",
    color: "bg-chart-3 text-white",
    icon: CheckCircle,
  },
  pendente: {
    label: "Pendente",
    color: "bg-chart-4 text-white",
    icon: Clock,
  },
  atrasado: {
    label: "Atrasado",
    color: "bg-chart-5 text-white",
    icon: AlertCircle,
  },
  cancelado: {
    label: "Cancelado",
    color: "bg-muted text-muted-foreground",
    icon: XCircle,
  },
}

const paymentMethods = {
  pix: "PIX",
  transferencia: "Transferência",
  dinheiro: "Dinheiro",
  cartao: "Cartão",
  boleto: "Boleto",
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [monthFilter, setMonthFilter] = useState("todos")
  const [selectedPayments, setSelectedPayments] = useState<number[]>([])
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<(typeof payments)[0] | null>(null)

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || payment.status === statusFilter
    const matchesMonth =
      monthFilter === "todos" || new Date(payment.dueDate).getMonth() === Number.parseInt(monthFilter)

    return matchesSearch && matchesStatus && matchesMonth
  })

  const totalPendingAmount = payments
    .filter((p) => p.status === "pendente" || p.status === "atrasado")
    .reduce((sum, p) => sum + p.amount + p.lateFee, 0)

  const totalPaidAmount = payments.filter((p) => p.status === "pago").reduce((sum, p) => sum + (p.paidAmount || 0), 0)

  const overduePayments = payments.filter((p) => p.status === "atrasado").length
  const pendingPayments = payments.filter((p) => p.status === "pendente").length

  const handleSelectPayment = (paymentId: number, checked: boolean) => {
    if (checked) {
      setSelectedPayments([...selectedPayments, paymentId])
    } else {
      setSelectedPayments(selectedPayments.filter((id) => id !== paymentId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPayments(filteredPayments.map((p) => p.id))
    } else {
      setSelectedPayments([])
    }
  }

  const handleRecordPayment = (payment: (typeof payments)[0]) => {
    setSelectedPayment(payment)
    setIsRecordDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Controle de Pagamentos</h1>
                <p className="text-sm text-muted-foreground">Gerencie pagamentos, atrasos e multas</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Gerar Cobrança
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total a Receber</CardTitle>
              <DollarSign className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">R$ {totalPendingAmount.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-muted-foreground">{pendingPayments + overduePayments} pagamentos pendentes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Recebido</CardTitle>
              <CheckCircle className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">R$ {totalPaidAmount.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-chart-3">Este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pagamentos em Atraso</CardTitle>
              <AlertCircle className="h-4 w-4 text-chart-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{overduePayments}</div>
              <p className="text-xs text-chart-5">Requer ação imediata</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Pontualidade</CardTitle>
              <Calendar className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {Math.round(
                  (payments.filter((p) => p.status === "pago" && p.lateFee === 0).length /
                    payments.filter((p) => p.status === "pago").length) *
                    100,
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">Pagamentos pontuais</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Lista de Pagamentos</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="overdue">Em Atraso</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por inquilino ou propriedade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Meses</SelectItem>
                  <SelectItem value="1">Fevereiro</SelectItem>
                  <SelectItem value="2">Março</SelectItem>
                  <SelectItem value="3">Abril</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk Actions */}
            {selectedPayments.length > 0 && (
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <span className="text-sm text-foreground">{selectedPayments.length} pagamento(s) selecionado(s)</span>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Marcar como Pago
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Enviar Cobrança
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Gerar Relatório
                </Button>
              </div>
            )}

            {/* Payments Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Inquilino</TableHead>
                      <TableHead>Propriedade</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Multa</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => {
                      const StatusIcon = statusConfig[payment.status as keyof typeof statusConfig].icon
                      const isOverdue = payment.status === "atrasado"
                      const daysOverdue = isOverdue
                        ? Math.floor(
                            (new Date().getTime() - new Date(payment.dueDate).getTime()) / (1000 * 60 * 60 * 24),
                          )
                        : 0

                      return (
                        <TableRow key={payment.id} className={isOverdue ? "bg-red-50 dark:bg-red-950/20" : ""}>
                          <TableCell>
                            <Checkbox
                              checked={selectedPayments.includes(payment.id)}
                              onCheckedChange={(checked) => handleSelectPayment(payment.id, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell className="font-medium text-foreground">{payment.tenant}</TableCell>
                          <TableCell className="text-muted-foreground">{payment.property}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-foreground">
                                {new Date(payment.dueDate).toLocaleDateString("pt-BR")}
                              </span>
                              {isOverdue && <span className="text-xs text-chart-5">{daysOverdue} dias em atraso</span>}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            R$ {payment.amount.toLocaleString("pt-BR")}
                          </TableCell>
                          <TableCell>
                            {payment.lateFee > 0 ? (
                              <span className="text-chart-5 font-medium">
                                R$ {payment.lateFee.toLocaleString("pt-BR")}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={statusConfig[payment.status as keyof typeof statusConfig].color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusConfig[payment.status as keyof typeof statusConfig].label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {payment.status !== "pago" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRecordPayment(payment)}
                                  className="bg-transparent"
                                >
                                  Registrar
                                </Button>
                              )}
                              <Button variant="outline" size="sm" className="bg-transparent">
                                Detalhes
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Calendário de Pagamentos</CardTitle>
                <CardDescription>Visualização mensal dos vencimentos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date(2024, 2, i - 6) // March 2024
                    const dayPayments = payments.filter(
                      (p) => new Date(p.dueDate).toDateString() === date.toDateString(),
                    )

                    return (
                      <div
                        key={i}
                        className={`p-2 min-h-20 border rounded-lg ${
                          date.getMonth() === 2 ? "bg-card" : "bg-muted/50"
                        }`}
                      >
                        <div className="text-sm text-foreground mb-1">{date.getDate()}</div>
                        {dayPayments.map((payment) => (
                          <div
                            key={payment.id}
                            className={`text-xs p-1 rounded mb-1 ${
                              statusConfig[payment.status as keyof typeof statusConfig].color
                            }`}
                          >
                            {payment.tenant.split(" ")[0]}
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overdue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Pagamentos em Atraso</CardTitle>
                <CardDescription>Pagamentos que precisam de atenção imediata</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments
                    .filter((p) => p.status === "atrasado")
                    .map((payment) => {
                      const daysOverdue = Math.floor(
                        (new Date().getTime() - new Date(payment.dueDate).getTime()) / (1000 * 60 * 60 * 24),
                      )

                      return (
                        <div
                          key={payment.id}
                          className="p-4 border border-chart-5/20 bg-red-50 dark:bg-red-950/20 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-foreground">{payment.tenant}</h4>
                              <p className="text-sm text-muted-foreground">{payment.property}</p>
                              <p className="text-sm text-chart-5 font-medium">
                                {daysOverdue} dias em atraso • Vencimento:{" "}
                                {new Date(payment.dueDate).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-foreground">
                                R$ {(payment.amount + payment.lateFee).toLocaleString("pt-BR")}
                              </p>
                              <p className="text-sm text-chart-5">
                                Multa: R$ {payment.lateFee.toLocaleString("pt-BR")}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <Button variant="outline" size="sm" className="bg-transparent">
                                  Notificar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRecordPayment(payment)}
                                  className="bg-transparent"
                                >
                                  Registrar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Record Payment Dialog */}
      <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Pagamento</DialogTitle>
            <DialogDescription>
              {selectedPayment && `Registrar pagamento de ${selectedPayment.tenant}`}
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <RecordPaymentForm payment={selectedPayment} onClose={() => setIsRecordDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function RecordPaymentForm({ payment, onClose }: { payment: (typeof payments)[0]; onClose: () => void }) {
  const totalAmount = payment.amount + payment.lateFee

  return (
    <form className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Valor do Aluguel:</span>
          <span className="font-medium text-foreground">R$ {payment.amount.toLocaleString("pt-BR")}</span>
        </div>
        {payment.lateFee > 0 && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Multa por Atraso:</span>
            <span className="font-medium text-chart-5">R$ {payment.lateFee.toLocaleString("pt-BR")}</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="font-medium text-foreground">Total a Receber:</span>
          <span className="font-bold text-foreground">R$ {totalAmount.toLocaleString("pt-BR")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="paidAmount">Valor Recebido (R$)</Label>
          <Input id="paidAmount" type="number" defaultValue={totalAmount} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="paidDate">Data do Pagamento</Label>
          <Input id="paidDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a forma de pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pix">PIX</SelectItem>
            <SelectItem value="transferencia">Transferência Bancária</SelectItem>
            <SelectItem value="dinheiro">Dinheiro</SelectItem>
            <SelectItem value="cartao">Cartão</SelectItem>
            <SelectItem value="boleto">Boleto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Observações</Label>
        <Textarea id="notes" placeholder="Observações sobre o pagamento..." />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Registrar Pagamento</Button>
      </div>
    </form>
  )
}
