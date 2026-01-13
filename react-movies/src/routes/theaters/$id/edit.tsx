import Loading from '@/components/Loading';
import TheaterForm from '@/modules/theaters/components/TheaterForm';
import {
    createTheater,
    getTheaterById,
} from '@/modules/theaters/services/theater.service';
import type { CreateTheater } from '@/modules/theaters/types/theater.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/theaters/$id/edit')({
    loader: ({ params }) => getTheaterById(+params.id),
    pendingComponent: () => <Loading />,
    pendingMs: 250,
    component: EditTheaterRoute,
});

function EditTheaterRoute() {
    const theater = Route.useLoaderData();
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: CreateTheater) => createTheater(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['theaters'] });
            toast.success('Theater created successfully', {
                position: 'top-center',
            });
            router.navigate({ to: '/theaters' });
        },
    });

    return (
        <TheaterForm
            initialData={theater}
            isPending={isPending}
            onSubmit={mutate}
            mode="update"
        />
    );
}
