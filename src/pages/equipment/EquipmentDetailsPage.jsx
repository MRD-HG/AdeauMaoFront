import {React, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEquipment, useOrganes, useCreateOrgane, useDeleteOrgane } from '../../hooks/useEquipment';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';
import { Pencil, Trash2, Wrench, AlertCircle, ArrowLeft, Plus } from 'lucide-react';
import { formatDate, getStatusColor, formatCurrency } from '../../lib/utils';
import OrganeTable from '../../components/equipment/OrganeTable';
import OrganeForm from '../../components/equipment/OrganeForm';
import { DeleteConfirmationDialog } from '../../components/ui/confirmation-dialog';

const DetailItem = ({ label, value, children }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
        <span className="font-semibold text-gray-600">{label}</span>
        {children || <span className="text-gray-800 text-right">{value || '-'}</span>}
    </div>
);

const EquipmentDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [organeFormOpen, setOrganeFormOpen] = useState(false);
    const [deleteOrganeDialogOpen, setDeleteOrganeDialogOpen] = useState(false);
    const [selectedOrgane, setSelectedOrgane] = useState(null);

    // Utilisation des bons hooks
    const { data: equipment, isLoading: isLoadingEquipment, isError, error } = useEquipment(id);
    const { data: organes, isLoading: isLoadingOrganes } = useOrganes(id);
    
    const createOrganeMutation = useCreateOrgane();
    const deleteOrganeMutation = useDeleteOrgane();

    const handleOrganeFormSubmit = (formData) => {
        createOrganeMutation.mutate({ equipmentId: id, data: formData }, {
            onSuccess: () => setOrganeFormOpen(false),
        });
    };

    const openDeleteDialog = (organe) => {
        setSelectedOrgane(organe);
        setDeleteOrganeDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        deleteOrganeMutation.mutate(selectedOrgane.id, {
            onSuccess: () => setDeleteOrganeDialogOpen(false),
        });
    };

    if (isLoadingEquipment) return <EquipmentDetailsSkeleton />;

    if (isError) {
        return (
          <div className="container mx-auto p-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>
                Échec du chargement des détails de l'équipement : {error.message}
              </AlertDescription>
            </Alert>
          </div>
        );
    }

    if (!equipment) return <p>Équipement non trouvé.</p>;

    return (
        <Dialog open={organeFormOpen} onOpenChange={setOrganeFormOpen}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                      <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                          <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div>
                        <h1 className="text-3xl font-bold tracking-tight">{equipment.nom}</h1>
                        <p className="text-muted-foreground">{equipment.reference}</p>
                      </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2">
                      <Button variant="outline" size="sm"><Pencil className="mr-2 h-4 w-4" /> Modifier</Button>
                      <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Supprimer</Button>
                      <Button size="sm"><Wrench className="mr-2 h-4 w-4" /> Nouvel OT</Button>
                  </div>
                </div>

                {/* Contenu Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Colonne de Gauche : Détails */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations sur l'Équipement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DetailItem label="État">
                                    <Badge className={getStatusColor(equipment.etatOperationnel)}>{equipment.etatOperationnel}</Badge>
                                </DetailItem>
                                <DetailItem label="Fabricant / Modèle" value={`${equipment.fabricant} / ${equipment.modele}`} />
                                <DetailItem label="Localisation" value={equipment.localisation} />
                                <DetailItem label="Ligne de Production" value={equipment.ligneProductionNom} />
                                <DetailItem label="Mise en service" value={formatDate(equipment.dateMiseEnService)} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Colonne de Droite : Onglets */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="organes">
                            <TabsList>
                                <TabsTrigger value="history">Historique</TabsTrigger>
                                <TabsTrigger value="organes">Organes</TabsTrigger>
                                <TabsTrigger value="documents">Documents</TabsTrigger>
                            </TabsList>
                            <TabsContent value="history">
                               <Card>
                                 <CardHeader><CardTitle>Historique de Maintenance</CardTitle></CardHeader>
                                 <CardContent><p className="text-muted-foreground text-center py-8">L'historique des OT sera affiché ici.</p></CardContent>
                               </Card>
                            </TabsContent>
                            <TabsContent value="organes">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle>Composants de l'équipement</CardTitle>
                                            <CardDescription>Liste des sous-parties de l'équipement.</CardDescription>
                                        </div>
                                        <DialogTrigger asChild>
                                            <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Ajouter</Button>
                                        </DialogTrigger>
                                    </CardHeader>
                                    <CardContent>
                                        <OrganeTable 
                                            organes={organes} 
                                            isLoading={isLoadingOrganes}
                                            onDelete={openDeleteDialog}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                             <TabsContent value="documents">
                                <Card>
                                    <CardHeader><CardTitle>Documents Techniques</CardTitle></CardHeader>
                                    <CardContent><p className="text-muted-foreground text-center py-8">La gestion des documents arrive bientôt.</p></CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
            {/* Formulaire et Dialogue de Confirmation */}
            <OrganeForm onSubmit={handleOrganeFormSubmit} isLoading={createOrganeMutation.isPending} />
            <DeleteConfirmationDialog
                open={deleteOrganeDialogOpen}
                onOpenChange={setDeleteOrganeDialogOpen}
                onConfirm={handleDeleteConfirm}
                itemName={selectedOrgane?.nomOrgane}
                itemType="organe"
                loading={deleteOrganeMutation.isPending}
            />
        </Dialog>
    );
};


// Le composant Squelette pour le chargement
const EquipmentDetailsSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10" />
                <div>
                    <Skeleton className="h-9 w-64 mb-2" />
                    <Skeleton className="h-5 w-40" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-24" /><Skeleton className="h-9 w-28" /><Skeleton className="h-9 w-32" />
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1"><Skeleton className="h-64 w-full" /></div>
            <div className="lg:col-span-2"><Skeleton className="h-80 w-full" /></div>
        </div>
    </div>
);

export default EquipmentDetailsPage;