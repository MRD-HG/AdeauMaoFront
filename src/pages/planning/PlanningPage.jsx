import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useWorkOrderList } from '../../hooks/useWorkOrders';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { motion } from 'framer-motion';
import { fr } from 'date-fns/locale';

const PlanningPage = () => {
  const { data: workOrderData, isLoading } = useWorkOrderList({ pageSize: 100 }); // Fetch all WOs for the calendar

  const events = workOrderData?.items?.map(wo => ({
    id: wo.id,
    title: `${wo.numeroOT} - ${wo.equipementNom}`,
    start: wo.dateDebutPrevue,
    end: wo.dateFinPrevue,
    extendedProps: {
      type: wo.typeMaintenance,
      status: wo.statut,
    },
    // Apply colors based on status
    backgroundColor: wo.statut === 'Termine' ? '#22c55e' : (wo.statut === 'EnCours' ? '#3b82f6' : '#f97316'),
    borderColor: wo.statut === 'Termine' ? '#16a34a' : (wo.statut === 'EnCours' ? '#2563eb' : '#ea580c'),
  })) || [];

  const handleEventClick = (clickInfo) => {
    alert(`Vous avez cliqué sur l'OT : ${clickInfo.event.title}`);
    // Future: navigate(`/work-orders/${clickInfo.event.id}`);
  };

  return (
    <div className="space-y-6">
       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Calendrier de Maintenance</h1>
        <p className="text-muted-foreground">Visualisez et gérez la planification des interventions.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
            <CardContent className="p-4">
                {isLoading ? (
                    <div className="h-[70vh] flex items-center justify-center">Chargement du calendrier...</div>
                ) : (
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        events={events}
                        locale="fr" // Use French locale
                        buttonText={{
                            today: "Aujourd'hui",
                            month: 'Mois',
                            week: 'Semaine',
                            day: 'Jour',
                            list: 'Liste',
                        }}
                        eventClick={handleEventClick}
                        editable={true} // Allows drag-and-drop
                        droppable={true}
                        height="auto" // Adjusts height automatically
                        contentHeight="auto"
                        dayMaxEvents={true} // For a cleaner month view
                    />
                )}
            </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PlanningPage;