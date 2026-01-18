import GenreForm from '@/modules/genres/components/GenreForm';
import { createGenre } from '@/modules/genres/services/genre.service';
import { type Genre } from '@/modules/genres/types/genre.type';
import extractErrors from '@/utils/extractErrors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
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
            });
            router.navigate({ to: '/genres' });
        },
        onError: (error: AxiosError) => {
            extractErrors(error, 'Error creating genre');
        },
    });

    return <GenreForm mode="create" onSubmit={mutate} isPending={isPending} />;
}
