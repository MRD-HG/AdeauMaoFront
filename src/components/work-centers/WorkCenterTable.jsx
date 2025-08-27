import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { TableSpinner } from '../ui/loading-spinner';

const WorkCenterTable = ({ centers, isLoading }) => {
    if (isLoading) return <TableSpinner />;
    if (!centers.length) return <p className="text-center py-8">Aucun poste de travail trouvé.</p>;
    
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Désignation</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {centers.map((center) => (
                        <TableRow key={center.id}>
                            <TableCell className="font-medium">{center.designation}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default WorkCenterTable;