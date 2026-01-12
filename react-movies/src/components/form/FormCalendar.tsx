import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { FormBase, type FormControlProps } from './FormBase';
import { useFieldContext } from './hooks';

export default function FormCalendar(
    props: FormControlProps & {
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
) {
    const field = useFieldContext<string>(); // Cambiar a string para ISO dates
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    const [open, setOpen] = useState(false);

    // Convertir string ISO a Date para el calendario
    const selectedDate = field.state.value
        ? new Date(field.state.value)
        : undefined;

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            // Convertir Date a string ISO para el formulario
            const isoString = date.toISOString().split('T')[0];
            field.handleChange(isoString);
        } else {
            field.handleChange('');
        }
        setOpen(false);
    };

    return (
        <FormBase {...props}>
            <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild disabled={props.disabled}>
                        <Button
                            variant="outline"
                            id="date"
                            className="justify-between font-normal"
                        >
                            {selectedDate
                                ? selectedDate.toLocaleDateString()
                                : 'Select date'}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                    >
                        <Calendar
                            id={field.name}
                            aria-invalid={isInvalid}
                            disabled={props.disabled}
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            className="rounded-md border shadow-sm"
                            captionLayout="dropdown"
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </FormBase>
    );
}
