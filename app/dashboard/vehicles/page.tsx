"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Truck, MapPin, User, Search, Filter, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function VehiclesPage() {
  const vehicles = [
    {
      id: "DN-001",
      model: "Mercedes Unimog",
      driver: "Pierre Martin",
      status: "En service",
      location: "Rue de la Paix",
      fuel: 85,
      lastMaintenance: "15/11/2024",
      mileage: "45,230 km",
      route: "Centre-ville",
    },
    {
      id: "DN-002",
      model: "Iveco Daily",
      driver: "Marie Dubois",
      status: "En service",
      location: "Zone industrielle",
      fuel: 62,
      lastMaintenance: "10/11/2024",
      mileage: "38,450 km",
      route: "Zone industrielle",
    },
    {
      id: "DN-003",
      model: "Mercedes Unimog",
      driver: "Jean Lefebvre",
      status: "Disponible",
      location: "Dépôt central",
      fuel: 95,
      lastMaintenance: "20/11/2024",
      mileage: "52,100 km",
      route: "-",
    },
    {
      id: "DN-004",
      model: "Volvo FH",
      driver: "-",
      status: "Maintenance",
      location: "Atelier",
      fuel: 40,
      lastMaintenance: "22/11/2024",
      mileage: "67,890 km",
      route: "-",
    },
    {
      id: "DN-005",
      model: "Scania R-Series",
      driver: "Sophie Bernard",
      status: "En service",
      location: "Avenue des Champs",
      fuel: 78,
      lastMaintenance: "05/11/2024",
      mileage: "41,200 km",
      route: "Quartier résidentiel",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En service":
        return "bg-green-100 text-green-800"
      case "Disponible":
        return "bg-blue-100 text-blue-800"
      case "Maintenance":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFuelColor = (fuel: number) => {
    if (fuel > 70) return "text-green-600"
    if (fuel > 30) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Gestion des véhicules</h1>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Filtres et recherche */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un véhicule..." className="pl-10" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
          <Button>Ajouter un véhicule</Button>
        </div>

        {/* Liste des véhicules */}
        <div className="grid gap-4">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{vehicle.id}</h3>
                        <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                      </div>
                      <p className="text-muted-foreground">{vehicle.model}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {vehicle.driver !== "-" && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {vehicle.driver}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {vehicle.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Carburant</div>
                      <div className={`font-semibold ${getFuelColor(vehicle.fuel)}`}>{vehicle.fuel}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Kilométrage</div>
                      <div className="font-semibold">{vehicle.mileage}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Dernière maintenance</div>
                      <div className="font-semibold">{vehicle.lastMaintenance}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Tournée</div>
                      <div className="font-semibold">{vehicle.route}</div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Voir détails</DropdownMenuItem>
                      <DropdownMenuItem>Assigner tournée</DropdownMenuItem>
                      <DropdownMenuItem>Programmer maintenance</DropdownMenuItem>
                      <DropdownMenuItem>Historique</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarInset>
  )
}
