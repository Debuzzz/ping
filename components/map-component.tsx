"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix pour les icônes Leaflet avec Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Icônes personnalisées pour les différents statuts
const createCustomIcon = (color: string, status: string) => {
  const svgIcon = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="${color}" stroke="#fff" strokeWidth="2"/>
      <circle cx="12.5" cy="12.5" r="6" fill="#fff"/>
      <text x="12.5" y="17" textAnchor="middle" fontSize="8" fontWeight="bold" fill="${color}">
        ${status === "En cours" ? "●" : status === "Terminé" ? "✓" : "⏸"}
      </text>
    </svg>
  `

  return L.divIcon({
    html: svgIcon,
    className: "custom-marker",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })
}

interface Route {
  id: string
  name: string
  vehicle: string
  driver: string
  status: string
  progress: number
  position: { lat: number; lng: number }
}

interface MapComponentProps {
  routes: Route[]
}

export default function MapComponent({ routes }: MapComponentProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-full bg-slate-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Chargement de la carte...</p>
        </div>
      </div>
    )
  }

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "#2563eb" // blue-600
      case "Terminé":
        return "#16a34a" // green-600
      case "En attente":
        return "#ca8a04" // yellow-600
      case "Suspendu":
        return "#dc2626" // red-600
      default:
        return "#6b7280" // gray-500
    }
  }

  const getCircleColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "#3b82f6" // blue-500
      case "Terminé":
        return "#22c55e" // green-500
      case "En attente":
        return "#eab308" // yellow-500
      case "Suspendu":
        return "#ef4444" // red-500
      default:
        return "#9ca3af" // gray-400
    }
  }

  // Centre de la carte (Paris)
  const center: [number, number] = [48.8566, 2.3522]

  return (
    <div className="h-full w-full rounded-b-lg overflow-hidden">
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }} className="rounded-b-lg">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routes.map((route) => (
          <div key={route.id}>
            {/* Marqueur du véhicule */}
            <Marker
              position={[route.position.lat, route.position.lng]}
              icon={createCustomIcon(getMarkerColor(route.status), route.status)}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-semibold text-lg mb-2">{route.vehicle}</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Tournée:</strong> {route.name}
                    </p>
                    <p>
                      <strong>Conducteur:</strong> {route.driver}
                    </p>
                    <p>
                      <strong>Statut:</strong>
                      <span
                        className={`ml-1 px-2 py-1 rounded text-xs ${
                          route.status === "En cours"
                            ? "bg-blue-100 text-blue-800"
                            : route.status === "Terminé"
                              ? "bg-green-100 text-green-800"
                              : route.status === "En attente"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {route.status}
                      </span>
                    </p>
                    <p>
                      <strong>Progression:</strong> {route.progress}%
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* Zone de couverture pour les véhicules actifs */}
            {route.status === "En cours" && (
              <Circle
                center={[route.position.lat, route.position.lng]}
                radius={500}
                pathOptions={{
                  color: getCircleColor(route.status),
                  fillColor: getCircleColor(route.status),
                  fillOpacity: 0.1,
                  weight: 2,
                }}
              />
            )}
          </div>
        ))}
      </MapContainer>

      {/* Légende */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
        <h4 className="text-sm font-medium mb-2">Légende</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span>En cours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>Terminé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
            <span>En attente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>Suspendu</span>
          </div>
        </div>
      </div>
    </div>
  )
}
