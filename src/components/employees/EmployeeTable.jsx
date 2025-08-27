import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { TableSpinner } from '../ui/loading-spinner';
import { Button } from '../ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const EmployeeTable = ({ employees, isLoading, onEdit, onDelete }) => {
    if (isLoading) return <TableSpinner />;
    if (!employees.length) return <p className="text-center py-8 text-muted-foreground">Aucun employé trouvé.</p>;

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
                        <TableHead className="w-[50px]"></TableHead>
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
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => onEdit(emp)}>
                                            <Edit className="mr-2 h-4 w-4" /> Modifier
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onDelete(emp)} className="text-red-600">
                                            <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                                        </DropdownMenuItem>
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

export default EmployeeTable;