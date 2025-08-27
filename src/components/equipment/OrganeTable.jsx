import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { TableSpinner } from '../ui/loading-spinner';

const OrganeTable = ({ organes, isLoading, onDelete }) => {
    if (isLoading) return <TableSpinner />;
    if (!organes || organes.length === 0) {
        return <p className="text-center py-8 text-muted-foreground">Aucun organe défini pour cet équipement.</p>;
    }

    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom de l'Organe</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {organes.map(organe => (
                        <TableRow key={organe.id}>
                            <TableCell className="font-medium">{organe.nomOrgane}</TableCell>
                            <TableCell>{organe.description}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => onDelete(organe)} className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Supprimer</DropdownMenuItem>
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

export default OrganeTable;