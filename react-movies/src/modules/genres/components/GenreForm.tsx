import GenericForm, { type FieldConfig } from '@/components/GenericForm';
import type { FormMode } from '@/types/FormMode.type';
import { genreSchema, type Genre } from '../types/genre.type';

type GenreFormProps = {
    initialData?: Genre;
    mode: FormMode;
    onSubmit?: (data: Genre) => void;
    isPending: boolean;
};

const defaultGenre: Genre = {
    id: 0,
    name: '',
};

export default function GenreForm({
    initialData = defaultGenre,
    ...rest
}: GenreFormProps) {
    const genreFields: FieldConfig<Genre>[] = [
        { name: 'name', label: 'Name', type: 'input' },
    ];

    return (
        <GenericForm
            initialData={initialData}
            fields={genreFields}
            schema={genreSchema}
            {...rest}
        />
    );
}
