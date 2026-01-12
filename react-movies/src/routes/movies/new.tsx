import MovieForm from '@/modules/movies/components/MovieForm';
import { createMovie } from '@/modules/movies/services/movie.service';
import { type Movie } from '@/modules/movies/types/movie.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/movies/new')({
    component: NewMovieRoute,
});

function NewMovieRoute() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: Movie) => createMovie(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movies'] });
            toast('Movie created', {
                description: 'The movie has been created successfully',
                action: {
                    label: 'Close',
                    onClick: () => {},
                },
            });
        },
    });

    return <MovieForm mode="create" onSubmit={mutate} isPending={isPending} />;
}
