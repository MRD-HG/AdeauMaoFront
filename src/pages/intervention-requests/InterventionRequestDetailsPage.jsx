import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInterventionRequest } from '../../hooks/useInterventionRequests';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, Wrench } from 'lucide-react';
import { Skeleton } from '../../components/ui/skeleton';
import { formatDate } from '../../lib/utils';
import { Badge } from '../../components/ui/badge';

const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-lg">{value || '-'}</p>
    </div>
);

const InterventionRequestDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: request, isLoading, error } = useInterventionRequest(id);

    if (isLoading) {
        return <Skeleton className="h-[300px] w-full" />;
    }

    if (error || !request) {
        return <p className="text-red-500 text-center py-8">Impossible de charger la demande d'intervention.</p>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">Détails de la DI-{id}</h1>
                        <p className="text-muted-foreground">{request.equipementNom}</p>
                    </div>
                </div>
                <Button><Wrench className="mr-2 h-4 w-4" /> Transformer en OT</Button>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <DetailItem label="Demandeur" value={request.demandeurNom} />
                        <DetailItem label="Priorité">
                           <Badge>{request.priorite}</Badge>
                        </DetailItem>
                        <DetailItem label="Statut">
                            <Badge variant="secondary">{request.statut}</Badge>
                        </DetailItem>
                        <DetailItem label="Date de création" value={formatDate(request.dateCreation)} />
                    </div>
                    <div className="pt-4 border-t">
                         <DetailItem label="Description du problème" value={request.descriptionProbleme} />
                    </div>
                     {request.commentaires && (
                        <div className="pt-4 border-t">
                            <DetailItem label="Commentaires" value={request.commentaires} />
                        </div>
                     )}
                </CardContent>
            </Card>
        </div>
    );
};

export default InterventionRequestDetailsPage;