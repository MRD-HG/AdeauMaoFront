import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkOrder } from '../../hooks/useWorkOrders';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Skeleton } from '../../components/ui/skeleton';
import { formatDate } from '../../lib/utils';
import { Badge } from '../../components/ui/badge';

const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-lg">{value || '-'}</p>
    </div>
);

const WorkOrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: wo, isLoading, error } = useWorkOrder(id);

    if (isLoading) {
        return <Skeleton className="h-[400px] w-full" />;
    }

    if (error) {
        return <p className="text-red-500">Erreur: {error.message}</p>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">OT: {wo.numeroOT}</h1>
                        <p className="text-muted-foreground">{wo.descriptionTache}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Modifier</Button>
                    <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Supprimer</Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Détails de l'intervention</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                    <DetailItem label="Équipement" value={wo.equipementNom} />
                    <DetailItem label="Technicien assigné" value={wo.technicienNom} />
                    <DetailItem label="Priorité">
                        <Badge>{wo.priorite}</Badge>
                    </DetailItem>
                    <DetailItem label="Statut">
                        <Badge variant="secondary">{wo.statut}</Badge>
                    </DetailItem>
                    <DetailItem label="Type de maintenance" value={wo.typeMaintenance} />
                    <DetailItem label="Date de début prévue" value={formatDate(wo.dateDebutPrevue)} />
                </CardContent>
            </Card>
        </div>
    );
};

export default WorkOrderDetailsPage;