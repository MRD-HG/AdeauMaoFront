import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { TableSpinner } from '../ui/loading-spinner';

const SubcontractorTable = ({ subcontractors, isLoading }) => {
    if (isLoading) return <TableSpinner />;
    if (!subcontractors.length) return <p className="text-center py-8">Aucun sous-traitant trouvé.</p>;
    
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Référence</TableHead>
                        <TableHead>Sous-traitant</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Ville</TableHead>
                        <TableHead>Adresse</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subcontractors.map((sub) => (
                        <TableRow key={sub.id}>
                            <TableCell className="font-mono">{sub.reference}</TableCell>
                            <TableCell className="font-medium">{sub.nom}</TableCell>
                            <TableCell>{sub.telephone}</TableCell>
                            <TableCell>{sub.email}</TableCell>
                            <TableCell>{sub.ville}</TableCell>
                            <TableCell>{sub.adresse}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SubcontractorTable;