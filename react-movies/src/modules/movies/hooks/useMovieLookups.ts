import { getActors } from '@/modules/actors/services/actor.service';
import { getGenres } from '@/modules/genres/services/genre.service';
import { getTheaters } from '@/modules/theaters/services/theater.service';
import type { Lookup } from '@/types/lookup.type';
import { useQueries } from '@tanstack/react-query';

export function useMovieLookups() {
    const [genresData, actorsData, theatersData] = useQueries({
        queries: [
            {
                queryKey: ['genres'],
                queryFn: () => getGenres({}),
            },
            {
                queryKey: ['actors'],
                queryFn: () => getActors({}),
            },
            {
                queryKey: ['theaters'],
                queryFn: () => getTheaters({}),
            },
        ],
    });

    const genres: Lookup[] =
        genresData.data?.result.map((g) => ({ label: g.name, value: g.id })) ??
        [];
    const actors: Lookup[] =
        actorsData.data?.result.map((g) => ({ label: g.name, value: g.id })) ??
        [];
    const theaters: Lookup[] =
        theatersData.data?.result.map((g) => ({
            label: g.name,
            value: g.id,
        })) ?? [];

    return {
        genres,
        actors,
        theaters,
    };
}
