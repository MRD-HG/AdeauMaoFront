import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { DateRangePicker } from '../../components/ui/date-range-picker';
import { motion } from 'framer-motion';
import { FileDown, FileText, Printer, Download } from 'lucide-react';
import { mockWorkOrders } from '../../lib/mockData'; // Pour simuler les données du rapport
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { formatDate } from '../../lib/utils';


// Un composant pour l'état vide de l'aperçu
const ReportEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <FileText className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">Générez votre rapport</h3>
        <p className="text-muted-foreground mt-2">Configurez les options sur la gauche et cliquez sur "Générer" pour voir l'aperçu ici.</p>
    </div>
);

// Un composant pour l'aperçu du rapport généré
const ReportPreview = ({ reportData, onDownload, onPrint }) => (
    <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
             <div>
                <h3 className="text-lg font-semibold">Rapport d'Intervention</h3>
                <p className="text-sm text-muted-foreground">Période du 01/01/2024 au 31/01/2024</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onDownload}><Download className="h-4 w-4 mr-2" />Télécharger en PDF</Button>
                <Button variant="outline" size="sm" onClick={onPrint}><Printer className="h-4 w-4 mr-2" />Imprimer</Button>
            </div>
        </div>
        <div className="border rounded-lg overflow-hidden flex-grow">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>OT N°</TableHead>
                        <TableHead>Équipement</TableHead>
                        <TableHead>Technicien</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Statut</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reportData.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.numeroOT}</TableCell>
                            <TableCell>{item.equipementNom}</TableCell>
                            <TableCell>{item.technicienNom}</TableCell>
                            <TableCell>{formatDate(item.dateCreation)}</TableCell>
                            <TableCell>{item.statut}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
);


const ReportsPage = () => {
  const [dateRange, setDateRange] = useState();
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = () => {
    // Simule la génération d'un rapport avec nos données de test
    setReportData(mockWorkOrders.slice(0, 3)); // Affiche les 3 premiers OT
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Génération de Rapports</h1>
        <p className="text-muted-foreground">Créez des rapports de maintenance personnalisés.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire de configuration */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Configurer le Rapport</CardTitle>
              <CardDescription>Sélectionnez les critères pour votre rapport.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Type de Rapport</Label>
                <Select defaultValue="intervention">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intervention">Rapport d'intervention</SelectItem>
                    <SelectItem value="couts">Rapport des coûts</SelectItem>
                    <SelectItem value="equipement">Historique par équipement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Période</Label>
                <DateRangePicker date={dateRange} onDateChange={setDateRange} />
              </div>

              <div className="space-y-2">
                <Label>Équipement</Label>
                 <Select>
                  <SelectTrigger><SelectValue placeholder="Tous les équipements" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les équipements</SelectItem>
                    <SelectItem value="1">Compresseur Principal</SelectItem>
                    <SelectItem value="2">Pompe Centrifuge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleGenerateReport} className="w-full text-lg py-6">
                <FileDown className="mr-2 h-5 w-5" />
                Générer le Rapport
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Aperçu du rapport */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
           <Card className="h-full">
             <CardContent className="p-6 h-full">
                {reportData ? (
                    <ReportPreview 
                        reportData={reportData} 
                        onDownload={() => alert('Téléchargement...')}
                        onPrint={() => alert('Impression...')}
                    />
                ) : (
                    <ReportEmptyState />
                )}
             </CardContent>
           </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportsPage;