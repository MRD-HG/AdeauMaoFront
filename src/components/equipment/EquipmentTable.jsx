import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { formatDate, getStatusColor, formatCurrency, getCriticiteColor } from "../../lib/utils";
import { TableSpinner } from "../ui/loading-spinner";

const EquipmentTable = ({ equipment = [], isLoading = false, onEdit, onDelete }) => {
  if (isLoading) {
    return <TableSpinner />;
  }

  if (!equipment.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No results found.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Equipment Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Purchase Price</TableHead>
              <TableHead>Maintenance Cost</TableHead>
              <TableHead>In Service Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Criticality</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((item) => (
              <TableRow key={item.id} className="group hover:bg-gray-50">
                <TableCell className="font-mono text-primary hover:underline">
                  <Link to={`/equipment/${item.id}`}>{item.reference}</Link>
                </TableCell>
                <TableCell className="font-medium">{item.nom}</TableCell>
                <TableCell>{item.categorie || "-"}</TableCell>
                <TableCell>{item.fabricant || "-"}</TableCell>
                <TableCell>{formatDate(item.dateAchat) || "-"}</TableCell>
                <TableCell>{formatCurrency(item.prixAchat) || "-"}</TableCell>
                <TableCell>{formatCurrency(item.coutMaintenance) || "-"}</TableCell>
                <TableCell>{formatDate(item.dateMiseEnService) || "-"}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.etatOperationnel)}>
                    {item.etatOperationnel || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getCriticiteColor(item.criticite)}>
                    {item.criticite || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/equipment/${item.id}`}><Eye className="mr-2 h-4 w-4" />View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(item)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(item)} className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default EquipmentTable;