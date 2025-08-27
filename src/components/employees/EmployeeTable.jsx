import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { TableSpinner } from '../ui/loading-spinner';

const EmployeeTable = ({ employees, isLoading }) => {
    if (isLoading) return <TableSpinner />;
    if (!employees.length) return <p className="text-center py-8">Aucun employé trouvé.</p>;

    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Matricule</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Poste</TableHead>
                        <TableHead>Équipe</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((emp) => (
                        <TableRow key={emp.id}>
                            <TableCell className="font-mono">{emp.matricule}</TableCell>
                            <TableCell className="font-medium">{emp.nom}</TableCell>
                            <TableCell>{emp.prenom}</TableCell>
                            <TableCell>{emp.poste}</TableCell>
                            <TableCell>{emp.equipeNom}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default EmployeeTable;