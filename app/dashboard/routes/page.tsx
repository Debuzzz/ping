"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { MapPin, Clock, User, Route, Play, Pause, Square } from "lucide-react"
import dynamic from "next/dynamic"

// Import dynamique de la carte pour éviter les erreurs SSR
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-slate-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Chargement de la carte...</p>
      </div>
    </div>
  ),
})

export default function RoutesPage() {
  const routes = [
    {
      id: "R-001",
      name: "Centre-ville",
      vehicle: "DN-001",
      driver: "Pierre Martin",
      status: "En cours",
      progress: 65,
      startTime: "06:00",
      estimatedEnd: "10:30",
      priority: "Haute",
      streets: 24,
      completedStreets: 16,
      position: { lat: 48.8566, lng: 2.3522 }, // Paris Centre
    },
    {
      id: "R-002",
      name: "Zone industrielle",
      vehicle: "DN-002",
      driver: "Marie Dubois",
      status: "En cours",
      progress: 40,
      startTime: "06:15",
      estimatedEnd: "11:00",
      priority: "Moyenne",
      streets: 18,
      completedStreets: 7,
      position: { lat: 48.8606, lng: 2.3376 }, // Zone industrielle
    },
    {
      id: "R-003",
      name: "Quartier résidentiel",
      vehicle: "DN-003",
      driver: "Jean Lefebvre",
      status: "Terminé",
      progress: 100,
      startTime: "05:45",
      estimatedEnd: "09:30",
      priority: "Moyenne",
      streets: 32,
      completedStreets: 32,
      position: { lat: 48.8534, lng: 2.3488 }, // Quartier résidentiel
    },
    {
      id: "R-004",
      name: "Rocade Est",
      vehicle: "DN-005",
      driver: "Sophie Bernard",
      status: "En attente",
      progress: 0,
      startTime: "11:00",
      estimatedEnd: "14:30",
      priority: "Haute",
      streets: 8,
      completedStreets: 0,
      position: { lat: 48.8584, lng: 2.3656 }, // Rocade Est
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "Terminé":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Suspendu":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Haute":
        return "bg-red-100 text-red-800"
      case "Moyenne":
        return "bg-orange-100 text-orange-800"
      case "Basse":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Gestion des tournées</h1>
        <div className="ml-auto">
          <Button>Nouvelle tournée</Button>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-[calc(100vh-10rem)]">
          {/* Map */}
          <div className="xl:col-span-2">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <div className="relative h-full">
                  {/* Header de la carte */}
                  <div className="absolute top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-sm border-b p-4 rounded-t-lg">
                    <h3 className="font-semibold text-lg">Suivi en temps réel</h3>
                    <p className="text-sm text-muted-foreground">Position des véhicules</p>
                  </div>
                  {/* Carte Leaflet */}
                  <div className="absolute inset-0 pt-20">
                    <MapComponent routes={routes} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* RECAP - Liste des tournées */}
          <div className="xl:col-span-1 space-y-1 overflow-auto">
            {/* Statistiques rapides */}
            <div className="grid gap-2 md:grid-cols-1">
              <Card className="flex flex-row bg-gray-50 shadow-sm">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <p className="text-sm text-muted-foreground">En cours</p>
                </CardContent>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">1</div>
                  <p className="text-sm text-muted-foreground">Terminées</p>
                </CardContent>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                  <p className="text-sm text-muted-foreground">En attente</p>
                </CardContent>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">52%</div>
                  <p className="text-sm text-muted-foreground">Progression globale</p>
                </CardContent>
              </Card>
            </div>

            {/* Liste des tournées */}
            <div className="space-y-4">
              {routes.map((route) => (
                <Card key={route.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Route className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{route.name}</h3>
                              <Badge className={getStatusColor(route.status)}>{route.status}</Badge>
                              <Badge className={getPriorityColor(route.priority)}>
                                Priorité {route.priority.toLowerCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">ID: {route.id}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {route.driver} ({route.vehicle})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {route.startTime} - {route.estimatedEnd}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {route.completedStreets}/{route.streets} rues
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span>{route.progress}%</span>
                          </div>
                          <Progress value={route.progress} className="h-2" />
                        </div>
                      </div>

                
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
