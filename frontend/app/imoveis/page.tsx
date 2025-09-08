"use client"

import { useState } from "react"
import { Building2, Plus, Search, Bed, Bath, Square, Eye, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

// Mock data - in real app this would come from database
const properties = [
  {
    id: 1,
    address: "Rua das Flores, 123 - Centro",
    type: "apartamento",
    area: 85.5,
    rooms: 2,
    bathrooms: 1,
    monthlyRent: 1500,
    status: "ocupado",
    tenant: "João Silva Santos",
    description: "Apartamento moderno no centro da cidade",
    amenities: ["ar_condicionado", "varanda", "portaria_24h"],
  },
  {
    id: 2,
    address: "Av. Paulista, 456 - Bela Vista",
    type: "apartamento",
    area: 120,
    rooms: 3,
    bathrooms: 2,
    monthlyRent: 2800,
    status: "disponivel",
    tenant: null,
    description: "Apartamento amplo com vista para a cidade",
    amenities: ["piscina", "academia", "garagem"],
  },
  {
    id: 3,
    address: "Rua Comercial, 789 - Vila Madalena",
    type: "comercial",
    area: 200,
    rooms: 0,
    bathrooms: 2,
    monthlyRent: 3500,
    status: "ocupado",
    tenant: "Tech Solutions Ltda",
    description: "Loja térrea em rua movimentada",
    amenities: ["vitrine", "deposito", "banheiro_adaptado"],
  },
  {
    id: 4,
    address: "Rua Residencial, 321 - Jardins",
    type: "casa",
    area: 180,
    rooms: 4,
    bathrooms: 3,
    monthlyRent: 4200,
    status: "manutencao",
    tenant: null,
    description: "Casa com quintal e garagem para 2 carros",
    amenities: ["quintal", "churrasqueira", "garagem_2_vagas"],
  },
]

const statusColors = {
  ocupado: "bg-chart-3 text-white",
  disponivel: "bg-chart-2 text-white",
  manutencao: "bg-chart-4 text-white",
}

const statusLabels = {
  ocupado: "Ocupado",
  disponivel: "Disponível",
  manutencao: "Manutenção",
}

const typeLabels = {
  apartamento: "Apartamento",
  casa: "Casa",
  comercial: "Comercial",
}

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [typeFilter, setTypeFilter] = useState("todos")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.tenant && property.tenant.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "todos" || property.status === statusFilter
    const matchesType = typeFilter === "todos" || property.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestão de Imóveis</h1>
                <p className="text-sm text-muted-foreground">Gerencie seu portfólio de propriedades</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Imóvel
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Imóvel</DialogTitle>
                  <DialogDescription>
                    Preencha as informações do imóvel para adicioná-lo ao seu portfólio
                  </DialogDescription>
                </DialogHeader>
                <AddPropertyForm onClose={() => setIsAddDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por endereço ou inquilino..."
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
              <SelectItem value="ocupado">Ocupado</SelectItem>
              <SelectItem value="disponivel">Disponível</SelectItem>
              <SelectItem value="manutencao">Manutenção</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Tipos</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground line-clamp-2">{property.address}</CardTitle>
                    <CardDescription className="mt-1">
                      {typeLabels[property.type as keyof typeof typeLabels]}
                    </CardDescription>
                  </div>
                  <Badge className={statusColors[property.status as keyof typeof statusColors]}>
                    {statusLabels[property.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      <span>{property.area}m²</span>
                    </div>
                    {property.rooms > 0 && (
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.rooms}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.bathrooms}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Aluguel:</span>
                    <span className="font-semibold text-foreground">
                      R$ {property.monthlyRent.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  {property.tenant && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Inquilino:</span>
                      <span className="text-sm text-foreground font-medium">{property.tenant}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" size="sm">
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

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Não encontramos imóveis que correspondam aos filtros selecionados.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("todos")
                setTypeFilter("todos")
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function AddPropertyForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Endereço Completo</Label>
          <Input id="address" placeholder="Rua, número, bairro, cidade" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Tipo do Imóvel</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="area">Área (m²)</Label>
          <Input id="area" type="number" placeholder="85.5" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rooms">Quartos</Label>
          <Input id="rooms" type="number" placeholder="2" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Banheiros</Label>
          <Input id="bathrooms" type="number" placeholder="1" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rent">Valor do Aluguel (R$)</Label>
        <Input id="rent" type="number" placeholder="1500.00" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" placeholder="Descreva as características do imóvel..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amenities">Comodidades</Label>
        <Input id="amenities" placeholder="ar condicionado, varanda, portaria 24h (separado por vírgula)" />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Adicionar Imóvel</Button>
      </div>
    </form>
  )
}
