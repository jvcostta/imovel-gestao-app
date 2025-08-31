"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Home, Users, DollarSign, Wrench, Bell, BarChart3, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Imóveis", href: "/imoveis", icon: Building2 },
  { name: "Inquilinos", href: "/inquilinos", icon: Users },
  { name: "Financeiro", href: "/financeiro", icon: DollarSign },
  { name: "Pagamentos", href: "/pagamentos", icon: CreditCard },
  { name: "Manutenção", href: "/manutencao", icon: Wrench },
  { name: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { name: "Notificações", href: "/notificacoes", icon: Bell },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-1 overflow-x-auto">
      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
