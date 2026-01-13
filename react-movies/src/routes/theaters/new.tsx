import TheaterForm from '@/modules/theaters/components/TheaterForm';
import { createTheater } from '@/modules/theaters/services/theater.service';
import type { Theater } from '@/modules/theaters/types/theater.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/theaters/new')({
    component: NewTheaterRoute,
});

function NewTheaterRoute() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: Theater) => createTheater(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['theaters'] });
            toast.success('Theater created', {
                description: 'The theater has been created successfully',
                position: 'top-center',
            });
            router.navigate({ to: '/theaters' });
        },
    });

    return (
        <TheaterForm mode="create" onSubmit={mutate} isPending={isPending} />
    );
}
