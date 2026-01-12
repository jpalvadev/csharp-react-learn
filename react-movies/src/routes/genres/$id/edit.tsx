import Loading from '@/components/Loading';
import GenreForm from '@/modules/genres/components/GenreForm';
import {
    editGenre,
    getGenreById,
} from '@/modules/genres/services/genre.service';
import type { Genre } from '@/modules/genres/types/genre.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/genres/$id/edit')({
    loader: ({ params }) => getGenreById(+params.id),
    pendingComponent: () => <Loading />,
    pendingMs: 250,
    component: EditGenreRoute,
});

function EditGenreRoute() {
    const router = useRouter();
    const genre = Route.useLoaderData();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: Genre) => editGenre(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['genres'] });
            toast('Genre updated', {
                description: 'The genre has been updated successfully',
                position: 'top-center',
            });
            router.navigate({ to: '/genres' });
        },
    });

    return (
        <GenreForm
            mode="update"
            initialData={genre}
            onSubmit={mutate}
            isPending={isPending}
        />
    );
}
