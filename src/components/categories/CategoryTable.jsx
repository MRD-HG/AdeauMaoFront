import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { TableSpinner } from '../ui/loading-spinner';

const CategoryTable = ({ categories, isLoading }) => {
    if (isLoading) return <TableSpinner />;
    if (!categories.length) return <p className="text-center py-8">Aucune catégorie trouvée.</p>;
    
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Référence</TableHead>
                        <TableHead>Catégorie</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((cat) => (
                        <TableRow key={cat.id}>
                            <TableCell className="font-mono">{cat.reference}</TableCell>
                            <TableCell className="font-medium">{cat.categorie}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CategoryTable;