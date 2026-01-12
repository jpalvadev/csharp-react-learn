import GenericForm, { type FieldConfig } from '@/components/GenericForm';
import { movieSchema, type Movie } from '@/modules/movies/types/movie.type';
import type { FormMode } from '@/types/FormMode.type';

interface MovieFormProps {
    initialData?: Movie;
    mode: FormMode;
    onSubmit?: (data: Movie) => void;
    isPending: boolean;
}

const movieFields: FieldConfig<Movie>[] = [
    { name: 'title', label: 'Movie Name', formField: 'input' },
    {
        name: 'poster',
        label: 'Poster URL',
        formField: 'input',
        description: 'This is where the URL resides',
    },
];

const defaultMovie: Movie = { id: 0, title: '', poster: '' };

export default function MovieForm({
    initialData = defaultMovie,
    ...rest
}: MovieFormProps) {
    return (
        <GenericForm
            initialData={initialData}
            schema={movieSchema}
            fields={movieFields}
            {...rest}
        />
    );
}
