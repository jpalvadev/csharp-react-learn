import GenericForm, { type FieldConfig } from '@/components/GenericForm';
import type { FormMode } from '@/types/FormMode.type';
import { useState, type ChangeEvent } from 'react';
import { actorSchema, type Actor } from '../types/actor.type';

type ActorFormProps = {
    initialData?: Actor;
    mode: FormMode;
    onSubmit?: (data: Actor) => void;
    isPending: boolean;
};

const defaultActor: Actor = {
    id: 0,
    name: '',
    dateOfBirth: new Date(),
};

export default function ActorForm({
    initialData = defaultActor,
    ...rest
}: ActorFormProps) {
    const [imageBase64, setImageBase64] = useState('');

    const actorFields: FieldConfig<Actor>[] = [
        { name: 'name', label: 'Name', type: 'input', colSpan: 2 },
        {
            name: 'dateOfBirth',
            label: 'Date Of Birth',
            type: 'dateInput',
            colSpan: 2,
        },
        {
            name: 'picture',
            label: 'Picture',
            type: 'fileInput',
            colSpan: 2,
            onChange: handleChange,
        },
    ];

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0];
            toBase64(file)
                .then((value) => setImageBase64(value))
                .catch((err) => console.error(err));
        }
    }

    function toBase64(file: File) {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (err) => reject(err);
        });
    }

    return (
        <GenericForm
            initialData={initialData}
            fields={actorFields}
            schema={actorSchema}
            {...rest}
        >
            {imageBase64 && (
                <div className="col-span-2">
                    <img src={imageBase64} alt="Actor" className="w-32 h-32" />
                </div>
            )}
        </GenericForm>
    );
}
