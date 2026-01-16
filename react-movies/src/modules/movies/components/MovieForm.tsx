import { MultiSelectItems } from '@/components/form/FormMultiSelect';
import GenericForm, { type FieldConfig } from '@/components/GenericForm';
import { movieSchema, type Movie } from '@/modules/movies/types/movie.type';
import type { FormMode } from '@/types/FormMode.type';
import { useMovieLookups } from '../hooks/useMovieLookups';

interface MovieFormProps {
    initialData?: Movie;
    mode: FormMode;
    onSubmit?: (data: Movie) => void;
    isPending: boolean;
}

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
    const { actors, genres, theaters } = useMovieLookups();

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
            name: 'actorIds',
            label: !actors.length ? 'Cargando Actors...' : 'Actors',
            formField: 'multi-select',
            children: <MultiSelectItems data={actors} />,
        },
        {
            name: 'genreIds',
            label: !genres.length ? 'Cargando Genres...' : 'Genres',
            formField: 'multi-select',
            children: <MultiSelectItems data={genres} />,
        },
        {
            name: 'theaterIds',
            label: !theaters.length ? 'Cargando Theaters...' : 'Theaters',
            formField: 'multi-select',
            children: <MultiSelectItems data={theaters} />,
        },
    ];

    return (
        <GenericForm
            initialData={initialData}
            schema={movieSchema}
            fields={movieFields}
            {...rest}
        />
    );
}
