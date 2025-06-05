"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Download, Calendar, FileText, TrendingUp, Clock } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      id: "RPT-001",
      title: "Rapport quotidien - 23/11/2024",
      type: "Quotidien",
      status: "Généré",
      generatedAt: "23/11/2024 18:30",
      size: "2.4 MB",
      description: "Synthèse des activités de déneigement de la journée",
    },
    {
      id: "RPT-002",
      title: "Rapport hebdomadaire - Semaine 47",
      type: "Hebdomadaire",
      status: "Généré",
      generatedAt: "22/11/2024 09:00",
      size: "5.8 MB",
      description: "Analyse des performances et consommations de la semaine",
    },
    {
      id: "RPT-003",
      title: "Rapport mensuel - Novembre 2024",
      type: "Mensuel",
      status: "En cours",
      generatedAt: "-",
      size: "-",
      description: "Bilan complet des opérations du mois",
    },
    {
      id: "RPT-004",
      title: "Rapport de maintenance - Q4 2024",
      type: "Maintenance",
      status: "Généré",
      generatedAt: "20/11/2024 14:15",
      size: "3.2 MB",
      description: "État des véhicules et interventions de maintenance",
    },
  ]

  const stats = [
    {
      title: "Rapports générés",
      value: "47",
      description: "Ce mois-ci",
      icon: FileText,
      trend: "+12%",
    },
    {
      title: "Temps moyen de génération",
      value: "2.3 min",
      description: "Dernière semaine",
      icon: Clock,
      trend: "-8%",
    },
    {
      title: "Taille moyenne",
      value: "4.2 MB",
      description: "Par rapport",
      icon: BarChart3,
      trend: "+5%",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Généré":
        return "bg-green-100 text-green-800"
      case "En cours":
        return "bg-yellow-100 text-yellow-800"
      case "Erreur":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Quotidien":
        return "bg-blue-100 text-blue-800"
      case "Hebdomadaire":
        return "bg-purple-100 text-purple-800"
      case "Mensuel":
        return "bg-orange-100 text-orange-800"
      case "Maintenance":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Rapports et statistiques</h1>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Programmer
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Nouveau rapport
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.trend} {stat.description}
                    </div>
                  </div>
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Génération rapide */}
        <Card>
          <CardHeader>
            <CardTitle>Génération rapide</CardTitle>
            <CardDescription>Créez rapidement des rapports pour différentes périodes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className="justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Rapport du jour
              </Button>
              <Button variant="outline" className="justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Rapport hebdomadaire
              </Button>
              <Button variant="outline" className="justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analyse mensuelle
              </Button>
              <Button variant="outline" className="justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Rapport personnalisé
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Liste des rapports */}
        <Card>
          <CardHeader>
            <CardTitle>Rapports récents</CardTitle>
            <CardDescription>Historique des rapports générés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{report.title}</h3>
                      <Badge className={getTypeColor(report.type)}>{report.type}</Badge>
                      <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {report.generatedAt !== "-" && <span>Généré le {report.generatedAt}</span>}
                      {report.size !== "-" && <span>Taille: {report.size}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {report.status === "Généré" && (
                      <>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                        <Button size="sm" variant="ghost">
                          Voir
                        </Button>
                      </>
                    )}
                    {report.status === "En cours" && (
                      <Button size="sm" variant="ghost" disabled>
                        Génération...
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
