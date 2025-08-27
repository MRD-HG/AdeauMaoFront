import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { formatDate } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { TableSpinner } from '../../components/ui/loading-spinner';

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
        case 'EnCours': return 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse';
        case 'AFaire': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Termine': return 'bg-green-100 text-green-800 border-green-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const WorkOrderTable = ({ workOrders, isLoading }) => {
  if (isLoading) return <TableSpinner />;
  if (!workOrders.length) return <p className="text-center py-8 text-muted-foreground">Aucun ordre de travail trouvé.</p>;

  return (
    <div className="rounded-lg border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Réf</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Équipement</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Progression</TableHead>
                    <TableHead>État</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Date Début Prévue</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {workOrders.map((wo) => (
                <TableRow key={wo.id}>
                    <TableCell className="font-mono text-primary hover:underline">
                        <Link to={`/work-orders/${wo.id}`}>{wo.numeroOT}</Link>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline" className={getPriorityBadgeClass(wo.priorite)}>{wo.priorite}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{wo.equipementNom}</TableCell>
                    <TableCell>{wo.typeMaintenance}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Progress value={wo.pourcentageProgression} className="w-24" />
                            <span className="text-xs text-muted-foreground">{wo.pourcentageProgression}%</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline" className={getStatusBadgeClass(wo.statut)}>{wo.statut}</Badge>
                    </TableCell>
                    <TableCell>{wo.technicienNom}</TableCell>
                    <TableCell>{formatDate(wo.dateDebutPrevue)}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild><Link to={`/work-orders/${wo.id}`}>Voir les détails</Link></DropdownMenuItem>
                                <DropdownMenuItem>Modifier</DropdownMenuItem>
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

export default WorkOrderTable;