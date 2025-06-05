"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Package, Fuel, AlertTriangle, TrendingDown, TrendingUp, Plus } from "lucide-react"

export default function InventoryPage() {
  const inventory = [
    {
      id: "SEL-001",
      name: "Sel de déneigement",
      category: "Consommables",
      currentStock: 2450,
      maxCapacity: 5000,
      unit: "kg",
      location: "Dépôt Central",
      lastRefill: "20/11/2024",
      dailyConsumption: 180,
      status: "Normal",
    },
    {
      id: "SEL-002",
      name: "Sel de déneigement",
      category: "Consommables",
      currentStock: 450,
      maxCapacity: 2000,
      unit: "kg",
      location: "Dépôt Nord",
      lastRefill: "15/11/2024",
      dailyConsumption: 120,
      status: "Faible",
    },
    {
      id: "CARB-001",
      name: "Diesel",
      category: "Carburant",
      currentStock: 3200,
      maxCapacity: 5000,
      unit: "L",
      location: "Station principale",
      lastRefill: "22/11/2024",
      dailyConsumption: 250,
      status: "Normal",
    },
    {
      id: "CARB-002",
      name: "Diesel",
      category: "Carburant",
      currentStock: 800,
      maxCapacity: 2500,
      unit: "L",
      location: "Station secondaire",
      lastRefill: "18/11/2024",
      dailyConsumption: 150,
      status: "Critique",
    },
    {
      id: "PIECE-001",
      name: "Lames de déneigement",
      category: "Pièces détachées",
      currentStock: 8,
      maxCapacity: 20,
      unit: "unités",
      location: "Atelier",
      lastRefill: "10/11/2024",
      dailyConsumption: 0.2,
      status: "Normal",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "bg-green-100 text-green-800"
      case "Faible":
        return "bg-yellow-100 text-yellow-800"
      case "Critique":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStockPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100)
  }

  const getIcon = (category: string) => {
    switch (category) {
      case "Carburant":
        return Fuel
      case "Consommables":
        return Package
      default:
        return Package
    }
  }

  const getTrendIcon = (status: string) => {
    switch (status) {
      case "Critique":
      case "Faible":
        return TrendingDown
      default:
        return TrendingUp
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Gestion des stocks</h1>
        <div className="ml-auto">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter stock
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Alertes de stock */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Alertes de stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-red-700">
                • Dépôt Nord - Sel de déneigement: Stock critique (450 kg restants)
              </p>
              <p className="text-sm text-red-700">• Station secondaire - Diesel: Stock critique (800 L restants)</p>
            </div>
          </CardContent>
        </Card>

        {/* Vue d'ensemble */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-sm text-muted-foreground">Articles en stock</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <p className="text-sm text-muted-foreground">Alertes actives</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-sm text-muted-foreground">Niveau moyen</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des stocks */}
        <div className="grid gap-4">
          {inventory.map((item) => {
            const Icon = getIcon(item.category)
            const TrendIcon = getTrendIcon(item.status)
            const percentage = getStockPercentage(item.currentStock, item.maxCapacity)

            return (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </div>
                        <p className="text-muted-foreground">
                          {item.category} - {item.location}
                        </p>
                        <div className="text-sm text-muted-foreground">
                          ID: {item.id} • Dernier réapprovisionnement: {item.lastRefill}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Stock actuel</div>
                        <div className="font-semibold text-lg">
                          {item.currentStock.toLocaleString()} {item.unit}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Capacité max</div>
                        <div className="font-semibold">
                          {item.maxCapacity.toLocaleString()} {item.unit}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Consommation/jour</div>
                        <div className="font-semibold flex items-center justify-center gap-1">
                          <TrendIcon className="h-4 w-4" />
                          {item.dailyConsumption} {item.unit}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 min-w-[200px]">
                      <div className="flex justify-between text-sm">
                        <span>Niveau</span>
                        <span>{percentage}%</span>
                      </div>
                      <Progress
                        value={percentage}
                        className={`h-2 ${
                          percentage < 25
                            ? "[&>div]:bg-red-500"
                            : percentage < 50
                              ? "[&>div]:bg-yellow-500"
                              : "[&>div]:bg-green-500"
                        }`}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Réapprovisionner
                        </Button>
                        <Button size="sm" variant="ghost" className="flex-1">
                          Historique
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </SidebarInset>
  )
}
