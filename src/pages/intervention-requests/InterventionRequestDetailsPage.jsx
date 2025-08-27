import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// We need a hook to get a single request by ID
// import { useInterventionRequest } from '../../hooks/useInterventionRequests';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, Wrench } from 'lucide-react';

const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-lg">{value || '-'}</p>
    </div>
);

const InterventionRequestDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // const { data: request, isLoading, error } = useInterventionRequest(id);

    // Using a placeholder until the hook is ready
    const isLoading = false;
    const request = {
        id: id,
        equipementNom: "Pompe Centrifuge Grundfos",
        demandeurNom: "Youssef Alaoui",
        priorite: "Haute",
        statut: "EnCours",
        dateCreation: "2024-01-24T10:30:00Z",
        descriptionProbleme: "Fuite importante au niveau du joint d'étanchéité, perte de pression"
    };

    if (isLoading) return <div>Chargement...</div>;

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
                <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DetailItem label="Demandeur" value={request.demandeurNom} />
                    <DetailItem label="Priorité" value={request.priorite} />
                    <DetailItem label="Statut" value={request.statut} />
                    <DetailItem label="Date de création" value={new Date(request.dateCreation).toLocaleDateString()} />
                    <div className="md:col-span-2 lg:col-span-4">
                         <DetailItem label="Description du problème" value={request.descriptionProbleme} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default InterventionRequestDetailsPage;