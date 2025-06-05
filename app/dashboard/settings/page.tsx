"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Bell, Shield, Database, Mail, Smartphone } from "lucide-react"

export default function SettingsPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Paramètres</h1>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Paramètres généraux */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Paramètres généraux
            </CardTitle>
            <CardDescription>Configuration générale de l'application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nom de l'entreprise</Label>
                <Input id="company-name" defaultValue="Services Municipaux" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de contact</Label>
                <Input id="contact-email" type="email" defaultValue="admin@ville.fr" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Textarea id="address" defaultValue="123 Rue de la Mairie, 75001 Paris" rows={3} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" defaultValue="+33 1 23 45 67 89" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuseau horaire</Label>
                <Input id="timezone" defaultValue="Europe/Paris" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Gérez vos préférences de notification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-base font-medium">Alertes de stock faible</div>
                <div className="text-sm text-muted-foreground">
                  Recevoir des notifications quand les stocks sont bas
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-base font-medium">Fin de tournée</div>
                <div className="text-sm text-muted-foreground">Notification à la fin de chaque tournée</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-base font-medium">Maintenance programmée</div>
                <div className="text-sm text-muted-foreground">Rappels pour la maintenance des véhicules</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-base font-medium">Rapports automatiques</div>
                <div className="text-sm text-muted-foreground">Génération automatique des rapports quotidiens</div>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Canaux de notification</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">Email</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <span className="text-sm">SMS</span>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sécurité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Sécurité
            </CardTitle>
            <CardDescription>Paramètres de sécurité et d'authentification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-base font-medium">Authentification à deux facteurs</div>
                <div className="text-sm text-muted-foreground">Sécurité renforcée pour les connexions</div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-base font-medium">Déconnexion automatique</div>
                <div className="text-sm text-muted-foreground">Déconnexion après 30 minutes d'inactivité</div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-4">
              <Button variant="outline">Changer le mot de passe</Button>
              <Button variant="outline">Voir l'historique des connexions</Button>
            </div>
          </CardContent>
        </Card>

        {/* Base de données */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Base de données
            </CardTitle>
            <CardDescription>Gestion et sauvegarde des données</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-base font-medium">Sauvegarde automatique</div>
                <div className="text-sm text-muted-foreground">Sauvegarde quotidienne à 2h00</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retention">Durée de rétention des données (jours)</Label>
              <Input id="retention" type="number" defaultValue="365" />
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button variant="outline">Créer une sauvegarde</Button>
              <Button variant="outline">Restaurer les données</Button>
              <Button variant="outline">Exporter les données</Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">Annuler</Button>
          <Button>Enregistrer les modifications</Button>
        </div>
      </div>
    </SidebarInset>
  )
}
