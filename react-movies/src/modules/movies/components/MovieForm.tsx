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
    { name: 'title', label: 'Movie Name', formField: 'input', colSpan: 2 },
    {
        name: 'releaseDate',
        label: 'Release Date',
        formField: 'calendar',
        colSpan: 2,
    },
    {
        name: 'picture',
        label: 'Poster URL',
        formField: 'fileInput',
        accept: 'image/*',
    },
    {
        name: 'trailer',
        label: 'Trailer URL',
        formField: 'input',
        description: 'This is where the URL resides',
    },

    {
        name: 'genre',
        label: 'Genres',
        formField: 'multi-select',
    },
];

const defaultMovie: Partial<Movie> = {
    id: 0,
    title: '',
    picture: '',
    trailer: '',
};

export default function MovieForm({
    initialData = defaultMovie as Movie,
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
