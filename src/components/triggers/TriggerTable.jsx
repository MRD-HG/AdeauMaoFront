import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { TableSpinner } from '../ui/loading-spinner';

const TriggerTable = ({ triggers, isLoading }) => {
    if (isLoading) return <TableSpinner />;
    if (!triggers.length) return <p className="text-center py-8">Aucun déclencheur trouvé.</p>;
    
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Référence</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Unité</TableHead>
                        <TableHead>Valeur</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {triggers.map((trigger) => (
                        <TableRow key={trigger.id}>
                            <TableCell className="font-mono">{trigger.reference}</TableCell>
                            <TableCell className="font-medium">{trigger.nom}</TableCell>
                            <TableCell>{trigger.unite}</TableCell>
                            <TableCell>{trigger.valeur}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TriggerTable;