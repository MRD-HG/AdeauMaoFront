import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { formatCurrency } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { TableSpinner } from '../ui/loading-spinner';

const BudgetTable = ({ budgets, isLoading }) => {
    if (isLoading) return <TableSpinner />;
    if (!budgets.length) return <p className="text-center py-8">Aucun budget trouvé.</p>;

    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Année</TableHead>
                        <TableHead>Mois</TableHead>
                        <TableHead>Budget Prévisionnel</TableHead>
                        <TableHead>Budget Réel</TableHead>
                        <TableHead>Écart</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {budgets.map((budget) => (
                        <TableRow key={budget.id}>
                            <TableCell>{budget.annee}</TableCell>
                            <TableCell className="font-medium">{budget.mois}</TableCell>
                            <TableCell>{formatCurrency(budget.budgetPrevisionnel)}</TableCell>
                            <TableCell>{formatCurrency(budget.budgetReel)}</TableCell>
                            <TableCell className={cn(
                                'font-semibold',
                                budget.ecart > 0 ? 'text-red-600' : 'text-green-600'
                            )}>
                                {formatCurrency(budget.ecart)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default BudgetTable;