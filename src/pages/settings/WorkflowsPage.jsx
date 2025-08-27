import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Plus } from 'lucide-react';
import { useWorkflowList } from '../../hooks/useWorkflows';
import WorkflowTable from '../../components/workflows/WorkflowTable';
import { Dialog, DialogTrigger } from '../../components/ui/dialog';

const WorkflowsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading } = useWorkflowList({});
  const workflows = data?.items || [];

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Workflows</h1>
                 <p className="text-muted-foreground">La création de workflow sera bientôt disponible.</p>
            </div>
            <Card>
                <CardHeader><CardTitle>Liste des workflows</CardTitle></CardHeader>
                <CardContent>
                    <WorkflowTable workflows={workflows} isLoading={isLoading} />
                </CardContent>
            </Card>
        </div>
        {/* Le formulaire de création de workflow sera ajouté ici plus tard */}
    </Dialog>
  );
};

export default WorkflowsPage;