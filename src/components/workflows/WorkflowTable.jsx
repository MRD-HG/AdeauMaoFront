import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { TableSpinner } from '../ui/loading-spinner';
import { Badge } from '../ui/badge';
import { formatDate } from '../../lib/utils';

const WorkflowTable = ({ workflows, isLoading }) => {
    if (isLoading) return <TableSpinner />;
    if (!workflows.length) return <p className="text-center py-8">Aucun workflow trouvé.</p>;
    
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Réf</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Agent</TableHead>
                        <TableHead>1er Approbateur</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date de début</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workflows.map((wf) => (
                        <TableRow key={wf.id}>
                            <TableCell className="font-mono">{wf.reference}</TableCell>
                            <TableCell className="font-medium">{wf.nom}</TableCell>
                            <TableCell>{wf.type}</TableCell>
                            <TableCell>{wf.agent}</TableCell>
                            <TableCell>{wf.approbateur1}</TableCell>
                            <TableCell><Badge>{wf.statut}</Badge></TableCell>
                            <TableCell>{formatDate(wf.dateDebut)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default WorkflowTable;