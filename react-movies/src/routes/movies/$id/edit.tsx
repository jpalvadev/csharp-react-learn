import Loading from '@/components/Loading';
import MovieForm from '@/modules/movies/components/MovieForm';
import {
    createMovie,
    getMovieById,
} from '@/modules/movies/services/movie.service';
import type { Movie } from '@/modules/movies/types/movie.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/movies/$id/edit')({
    loader: ({ params }) => getMovieById(+params.id),
    pendingComponent: () => <Loading />,
    pendingMs: 250,
    component: EditMovieRoute,
});

function EditMovieRoute() {
    const router = useRouter();
    const movie = Route.useLoaderData();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: Movie) => createMovie(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movies'] });
            toast('Movie updated', {
                description: 'The movie has been updated successfully',
                position: 'top-center',
            });
            router.navigate({ to: '/movies' });
        },
    });

    return (
        <MovieForm
            mode="update"
            initialData={movie}
            onSubmit={mutate}
            isPending={isPending}
        />
    );
}
