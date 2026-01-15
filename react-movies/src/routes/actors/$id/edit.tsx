import Loading from '@/components/Loading';
import ActorForm from '@/modules/actors/components/ActorForm';
import {
    editActor,
    getActorById,
} from '@/modules/actors/services/actor.service';
import type { Actor } from '@/modules/actors/types/actor.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/actors/$id/edit')({
    loader: ({ params }) => getActorById(+params.id),
    pendingComponent: () => <Loading />,
    pendingMs: 250,
    component: EditActorRoute,
});

function EditActorRoute() {
    const router = useRouter();
    const actor = Route.useLoaderData();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: Actor) => editActor(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['actors'] });
            toast('Actor updated', {
                description: 'The actor has been updated successfully',
                position: 'top-center',
            });
            router.navigate({ to: '/actors' });
        },
    });

    return (
        <ActorForm
            mode="update"
            initialData={actor}
            onSubmit={mutate}
            isPending={isPending}
        />
    );
}
