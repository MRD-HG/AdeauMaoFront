import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from './calendar';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

export function DatePicker({ date, setDate, placeholder }) {
  const [selectedDate, setSelectedDate] = React.useState(date);

  const handleDateSelect = (newDate) => {
    setSelectedDate(newDate);
    if (setDate) {
      setDate(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>{placeholder || "Sélectionnez une date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}