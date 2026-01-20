import type { FieldConfig } from '@/components/GenericForm';
import GenericForm from '@/components/GenericForm';
import Loading from '@/components/Loading';
import { MultiSelectItem } from '@/components/ui/multi-select';
import { getActors } from '@/modules/actors/services/actor.service';
import type { FormMode } from '@/types/FormMode.type';
import { useQuery } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import {
    tratamientoEquipoSchema,
    type TratamientoEquipo,
} from '../types/tratamientoEquipo.type';

type TratamientoEquipoFormProps = {
    initialData?: TratamientoEquipo;
    mode: FormMode;
    onSubmit?: (data: TratamientoEquipo) => void;
    isPending: boolean;
};

const defaultTratamientoEquipo: Partial<TratamientoEquipo> = {
    id: 0,
    // fecha: new Date(),
    correctivo: false,
    preventivo: false,
    actividad: '',
    observaciones: '',
    operador: [],
};

export default function TratamientoEquipoForm({
    initialData = defaultTratamientoEquipo as TratamientoEquipo,
    isPending,
    ...rest
}: TratamientoEquipoFormProps) {
    const [values, setValues] = useState<TratamientoEquipo>(initialData);
    const { data, isPending: isDataPending } = useQuery({
        queryKey: ['actors'],
        queryFn: () => getActors({}),
    });

    if (isDataPending) return <Loading />;

    const multiSelectChildren: ReactNode = data?.result.map((actor) => (
        <MultiSelectItem key={actor.id} value={actor.id.toString()}>
            {actor.name}
        </MultiSelectItem>
    ));

    const handleChange = (values: TratamientoEquipo) => {
        setValues(values);
    };

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
            label: `${values.correctivo ? 'Debe completar Observaciones ya que Correctivo fue seleccionado' : 'Observaciones'}`,
            formField: 'textarea',
        },

        {
            name: 'operador',
            label: 'Operador',
            formField: 'multi-select',
            colSpan: 2,
            children: multiSelectChildren,
        },
    ];

    return (
        <GenericForm
            initialData={initialData}
            fields={tratamientoequipoFields}
            schema={tratamientoEquipoSchema}
            isPending={isPending}
            handleChange={handleChange}
            {...rest}
        />
    );
}
