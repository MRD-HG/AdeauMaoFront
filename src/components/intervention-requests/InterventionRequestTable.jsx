import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { formatDate, truncateText } from '../../lib/utils';
import { TableSpinner } from '../ui/loading-spinner';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const getPriorityBadgeClass = (priority) => {
    switch (priority) {
        case 'Haute': return 'bg-red-100 text-red-800 border-red-200';
        case 'Moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Faible': return 'bg-blue-100 text-blue-800 border-blue-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'EnCours': return 'bg-blue-100 text-blue-800';
        case 'Nouvelle': return 'bg-yellow-100 text-yellow-800';
        case 'Terminee': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const InterventionRequestTable = ({ requests, isLoading }) => {
  if (isLoading) return <TableSpinner />;
  if (!requests.length) return <p className="text-center py-8 text-muted-foreground">Aucune demande trouvée.</p>;

  return (
    <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Réf</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Équipement</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Demandeur</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell className="font-mono">DI-{req.id}</TableCell>
                <TableCell><Badge variant="outline" className={getPriorityBadgeClass(req.priorite)}>{req.priorite}</Badge></TableCell>
                <TableCell className="font-medium">{req.equipementNom}</TableCell>
                <TableCell>{truncateText(req.descriptionProbleme, 50)}</TableCell>
                <TableCell>{req.demandeurNom}</TableCell>
                <TableCell>{formatDate(req.dateCreation)}</TableCell>
                <TableCell><Badge variant="outline" className={getStatusBadgeClass(req.statut)}>{req.statut}</Badge></TableCell>
                <TableCell>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                            <DropdownMenuItem>Créer un OT</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
};

export default InterventionRequestTable;