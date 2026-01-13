import GenericForm, { type FieldConfig } from '@/components/GenericForm';
import type { Theater } from '../types/theater.type';
import type { FormMode } from '@/types/FormMode.type';
import { theaterSchema } from '../types/theater.type';

type TheaterFormProps = {
    initialData?: Theater;
    mode: FormMode;
    onSubmit?: (data: Theater) => void;
    isPending: boolean;
};

const defaultTheater: Theater = {
    id: 0,
    name: '',
};

export default function TheaterForm({
    initialData = defaultTheater,
    ...rest
}: TheaterFormProps) {
    const theaterFields: FieldConfig<Theater>[] = [
        { name: 'name', label: 'Name', formField: 'input', colSpan: 4 },
    ];

    return (
        <GenericForm
            initialData={initialData}
            schema={theaterSchema}
            fields={theaterFields}
            {...rest}
        />
    );
}
