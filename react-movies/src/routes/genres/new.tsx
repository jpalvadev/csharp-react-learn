import GenreForm from '@/modules/genres/components/GenreForm';
import { createGenre } from '@/modules/genres/services/genre.service';
import { type Genre } from '@/modules/genres/types/genre.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/genres/new')({
    component: NewGenreRoute,
});

function NewGenreRoute() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: Genre) => createGenre(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['genres'] });
            toast('Genre created', {
                description: 'The genre has been created successfully',
                position: 'top-center',
            });
            router.navigate({ to: '/genres' });
        },
    });

    return <GenreForm mode="create" onSubmit={mutate} isPending={isPending} />;
}
