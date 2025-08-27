// src/pages/equipment/EquipmentDetailsPage.jsx

import { useParams, useNavigate } from 'react-router-dom';
import { useEquipmentById } from '@/hooks/useEquipment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Pencil, Trash2, Wrench, AlertCircle, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const EquipmentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: equipment, isLoading, isError, error } = useEquipmentById(id);

  if (isLoading) {
    return <EquipmentDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load equipment details: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!equipment) {
    return null; // or a "Not Found" message
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'In Service':
        return 'success';
      case 'Under Maintenance':
        return 'secondary';
      case 'Out of Service':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <>
      
      <title>{equipment.title}</title>
      <meta name="description" content="This is a description." />
    
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
             </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{equipment.name}</h1>
              <p className="text-muted-foreground">Details and maintenance history for {equipment.name}.</p>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <Button variant="outline" size="sm"><Pencil className="mr-2 h-4 w-4" /> Edit</Button>
            <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
            <Button size="sm"><Wrench className="mr-2 h-4 w-4" /> New Work Order</Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-muted-foreground">Status</span>
                  <Badge variant={getStatusVariant(equipment.status)}>{equipment.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-muted-foreground">Model</span>
                  <span>{equipment.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-muted-foreground">Serial #</span>
                  <span>{equipment.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-muted-foreground">Location</span>
                  <span>{equipment.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-muted-foreground">Acquired</span>
                  {/* <span>{format(new Date(equipment.acquisitionDate), 'PPP')}</span> */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="history">
              <TabsList>
                <TabsTrigger value="history">Maintenance History</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <WorkOrderTable workOrders={equipment.workOrders} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Attached Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Document management coming soon.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

// Sub-component for the Work Order Table
const WorkOrderTable = ({ workOrders }) => {
  if (!workOrders || workOrders.length === 0) {
    return <p className="text-center text-muted-foreground py-4">No work orders found for this equipment.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.description}</TableCell>
            <TableCell>
              <Badge variant={order.status === 'Completed' ? 'success' : 'secondary'}>{order.status}</Badge>
            </TableCell>
            <TableCell>{format(new Date(order.dateCreated), 'PPP')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};


// Sub-component for Loading Skeleton
const EquipmentDetailsSkeleton = () => (
  <div className="container mx-auto p-4 space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-80" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-36" />
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
           <CardHeader>
             <Skeleton className="h-7 w-40" />
           </CardHeader>
           <CardContent>
             <Skeleton className="h-40 w-full" />
           </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default EquipmentDetailsPage;