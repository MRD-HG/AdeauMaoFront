import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MoreHorizontal, Edit, Trash2, Play, Pause } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Switch } from '../ui/switch';

const MaintenancePlanTable = ({ plans }) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom du Plan</TableHead>
            <TableHead>Fréquence</TableHead>
            <TableHead>Équipements</TableHead>
            <TableHead>Tâches</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan.id}>
              <TableCell className="font-medium">{plan.nom}</TableCell>
              <TableCell>{plan.frequence}</TableCell>
              <TableCell>{plan.equipements}</TableCell>
              <TableCell>{plan.taches}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                    <Switch checked={plan.actif} />
                    <span className={plan.actif ? "text-green-600" : "text-gray-500"}>
                        {plan.actif ? 'Actif' : 'Inactif'}
                    </span>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Modifier</DropdownMenuItem>
                    <DropdownMenuItem>{plan.actif ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />} {plan.actif ? 'Désactiver' : 'Activer'}</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Supprimer</DropdownMenuItem>
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

export default MaintenancePlanTable;