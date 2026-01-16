import { MultiSelectItems } from '@/components/form/FormMultiSelect';
import GenericForm, { type FieldConfig } from '@/components/GenericForm';
import { getActors } from '@/modules/actors/services/actor.service';
import type { Actor } from '@/modules/actors/types/actor.type';
import { getGenres } from '@/modules/genres/services/genre.service';
import type { Genre } from '@/modules/genres/types/genre.type';
import { movieSchema, type Movie } from '@/modules/movies/types/movie.type';
import { getTheaters } from '@/modules/theaters/services/theater.service';
import type { Theater } from '@/modules/theaters/types/theater.type';
import type { FormMode } from '@/types/FormMode.type';

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
            label: 'Actors',
            formField: 'multi-select',
            children: (
                <MultiSelectItems<Actor>
                    cacheKey="actors"
                    fetchFn={getActors}
                    mapConfig={{ value: 'id', label: 'name' }}
                />
            ),
        },
        {
            name: 'genreIds',
            label: 'Genres',
            formField: 'multi-select',
            children: (
                <MultiSelectItems<Genre>
                    cacheKey="genres"
                    fetchFn={getGenres}
                    mapConfig={{ value: 'id', label: 'name' }}
                />
            ),
        },
        {
            name: 'theaterIds',
            label: 'Theaters',
            formField: 'multi-select',
            children: (
                <MultiSelectItems<Theater>
                    cacheKey="theaters-lookup"
                    fetchFn={getTheaters}
                    mapConfig={{ value: 'id', label: 'name' }}
                />
            ),
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
