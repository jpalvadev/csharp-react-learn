import Loading from '@/components/Loading';
import GenreForm from '@/modules/genres/components/GenreForm';
import {
    deleteGenre,
    getGenreById,
} from '@/modules/genres/services/genre.service';
import type { Genre } from '@/modules/genres/types/genre.type';
import extractErrors from '@/utils/extractErrors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

export const Route = createFileRoute('/genres/$id/delete')({
    loader: ({ params }) => getGenreById(+params.id),
    pendingComponent: () => <Loading />,
    pendingMs: 250,
    component: DeleteGenreRoute,
});

function DeleteGenreRoute() {
    const router = useRouter();
    const genre = Route.useLoaderData();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (genre: Genre) => deleteGenre(genre.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['genres'] });
            toast('Genre Deleted', {
                description: 'The genre has been deleted!',
            });
            router.navigate({ to: '/genres' });
        },
        onError: (error: AxiosError) => {
            extractErrors(error, 'Error deleting the Genre');
        },
    });

    return (
        <GenreForm
            mode="delete"
            initialData={genre}
            onSubmit={mutate}
            isPending={isPending}
        />
    );
}
