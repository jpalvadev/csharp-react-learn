import type { FormMode } from '@/types/FormMode.type';
import {
    tratamientoEquipoSchema,
    type TratamientoEquipo,
} from '../types/tratamientoEquipo.type';
import type { FieldConfig } from '@/components/GenericForm';
import GenericForm from '@/components/GenericForm';
import { useQuery } from '@tanstack/react-query';
import { getActors } from '@/modules/actors/services/actor.service';
import type { ReactNode } from 'react';
import { SelectItem } from '@/components/ui/select';
import Loading from '@/components/Loading';

type TratamientoEquipoFormProps = {
    initialData?: TratamientoEquipo;
    mode: FormMode;
    onSubmit?: (data: TratamientoEquipo) => void;
    isPending: boolean;
};

const defaultTratamientoEquipo: TratamientoEquipo = {
    id: 0,
    fecha: new Date(),
    correctivo: false,
    preventivo: false,
    actividad: '',
    observaciones: '',
    operador: '',
};

export default function TratamientoEquipoForm({
    initialData = defaultTratamientoEquipo,
    isPending,
    ...rest
}: TratamientoEquipoFormProps) {
    const { data, isPending: isDataPending } = useQuery({
        queryKey: ['actors'],
        queryFn: () => getActors({}),
    });

    if (isDataPending) return <Loading />;

    const children: ReactNode = data?.result.map((actor) => (
        <SelectItem key={actor.id} value={actor.id.toString()}>
            {actor.name}
        </SelectItem>
    ));

    const tratamientoequipoFields: FieldConfig<TratamientoEquipo>[] = [
        { name: 'fecha', label: 'Fecha', formField: 'calendar', colSpan: 1 },
        {
            name: 'correctivo',
            label: 'Correctivo',
            formField: 'checkbox',
            // colSpan: 1,
        },
        {
            name: 'preventivo',
            label: 'Preventivo',
            formField: 'checkbox',
            // colSpan: 1,
        },

        { name: 'actividad', label: 'Actividad', formField: 'textarea' },
        {
            name: 'observaciones',
            label: 'Observaciones',
            formField: 'textarea',
        },
        {
            name: 'operador',
            label: 'Operador',
            formField: 'select',
            colSpan: 2,
            children: children,
        },
    ];

    return (
        <GenericForm
            initialData={initialData}
            fields={tratamientoequipoFields}
            schema={tratamientoEquipoSchema}
            isPending={isPending}
            {...rest}
        />
    );
}
