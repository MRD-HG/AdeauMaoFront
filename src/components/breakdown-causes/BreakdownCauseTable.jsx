import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { TableSpinner } from '../ui/loading-spinner';

const BreakdownCauseTable = ({ causes, isLoading }) => {
    if (isLoading) return <TableSpinner />;
    if (!causes.length) return <p className="text-center py-8">Aucune cause de panne trouvée.</p>;
    
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Référence</TableHead>
                        <TableHead>Libellé</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {causes.map((cause) => (
                        <TableRow key={cause.id}>
                            <TableCell className="font-mono">{cause.reference}</TableCell>
                            <TableCell className="font-medium">{cause.libelle}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default BreakdownCauseTable;