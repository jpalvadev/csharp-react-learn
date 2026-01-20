import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { FormBase, type FormControlProps } from './FormBase';
import { useFieldContext } from './hooks';

export default function FormCalendar(
    props: FormControlProps & {
        onChange?: (date: Date | undefined) => void; // Cambiado a Date
    },
) {
    const field = useFieldContext<Date>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    const [open, setOpen] = useState(false);

    const selectedDate = field.state.value;

    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return;

        field.handleChange(date); // pasamos el objeto date a tanstack

        if (props.onChange) props.onChange(date); // por si las moscas necesitamos customizar el onchange

        setOpen(false);
    };

    return (
        <FormBase {...props}>
            <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild disabled={props.disabled}>
                        <Button
                            variant="outline"
                            id={field.name}
                            className="justify-between font-normal"
                        >
                            {/* muestra fecha formateada al front, por debajo sigue siendo Date */}
                            {selectedDate instanceof Date &&
                            !isNaN(selectedDate.getTime())
                                ? selectedDate.toLocaleDateString()
                                : 'Select date'}
                            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            disabled={props.disabled}
                            captionLayout="dropdown"
                            className="rounded-md border"
                            aria-invalid={isInvalid}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </FormBase>
    );
}
