import GenericForm, { type FieldConfig } from '@/components/GenericForm';
import type { FormMode } from '@/types/FormMode.type';
import { actorSchema, type Actor } from '../types/actor.type';

type ActorFormProps = {
    initialData?: Actor;
    mode: FormMode;
    onSubmit?: (data: Actor) => void;
    isPending: boolean;
};

const defaultActor: Partial<Actor> = {
    id: 0,
    name: '',
    // dateOfBirth: new Date(),
};

export default function ActorForm({
    initialData = defaultActor as Actor,
    ...rest
}: ActorFormProps) {
    const actorFields: FieldConfig<Actor>[] = [
        { name: 'name', label: 'Name', formField: 'input', colSpan: 2 },
        {
            name: 'dateOfBirth',
            label: 'Date Of Birth',
            formField: 'calendar',
            colSpan: 2,
        },

        {
            name: 'picture',
            label: 'Picture',
            formField: 'fileInput',
            colSpan: 2,
            accept: 'image/*',
        },
    ];

    return (
        <GenericForm
            initialData={initialData}
            fields={actorFields}
            schema={actorSchema}
            {...rest}
        />
    );
}
