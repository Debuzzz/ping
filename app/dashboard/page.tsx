"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Truck, Fuel, Package, AlertTriangle, CheckCircle, Clock, MapPin, Thermometer } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Déneigeuses actives",
      value: "12",
      description: "Sur 15 véhicules",
      icon: Truck,
      color: "text-green-600",
    },
    {
      title: "Stock de sel",
      value: "2,450 kg",
      description: "Niveau optimal",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Consommation carburant",
      value: "1,250 L",
      description: "Aujourd'hui",
      icon: Fuel,
      color: "text-orange-600",
    },
    {
      title: "Alertes actives",
      value: "3",
      description: "À traiter",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  const activeRoutes = [
    {
      id: "DN-001",
      driver: "Pierre Martin",
      zone: "Centre-ville",
      status: "En cours",
      progress: 65,
      lastUpdate: "Il y a 5 min",
    },
    {
      id: "DN-002",
      driver: "Marie Dubois",
      zone: "Zone industrielle",
      status: "En cours",
      progress: 40,
      lastUpdate: "Il y a 8 min",
    },
    {
      id: "DN-003",
      driver: "Jean Lefebvre",
      zone: "Quartier résidentiel",
      status: "Terminé",
      progress: 100,
      lastUpdate: "Il y a 15 min",
    },
  ]

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Tableau de bord</h1>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Thermometer className="h-4 w-4" />
            -5°C
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Statistiques principales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Tournées actives */}
          <Card>
            <CardHeader>
              <CardTitle>Tournées en cours</CardTitle>
              <CardDescription>État en temps réel des déneigeuses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeRoutes.map((route) => (
                <div key={route.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{route.id}</span>
                      <Badge variant={route.status === "Terminé" ? "default" : "secondary"}>{route.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{route.driver}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {route.zone}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm font-medium">{route.progress}%</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {route.lastUpdate}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alertes et notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Alertes récentes</CardTitle>
              <CardDescription>Notifications importantes du système</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 border rounded-lg border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Stock de sel faible</p>
                  <p className="text-xs text-muted-foreground">Dépôt Zone Nord - Moins de 500kg restants</p>
                  <p className="text-xs text-muted-foreground">Il y a 2h</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Maintenance programmée</p>
                  <p className="text-xs text-muted-foreground">DN-005 - Révision 10,000 km atteinte</p>
                  <p className="text-xs text-muted-foreground">Il y a 4h</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Tournée terminée</p>
                  <p className="text-xs text-muted-foreground">Zone Centre - 100% des routes traitées</p>
                  <p className="text-xs text-muted-foreground">Il y a 15 min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
