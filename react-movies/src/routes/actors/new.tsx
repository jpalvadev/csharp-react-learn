import ActorForm from '@/modules/actors/components/ActorForm';
import { createActor } from '@/modules/actors/services/actor.service';
import type { Actor } from '@/modules/actors/types/actor.type';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/actors/new')({
    component: NewActorRoute,
});

function NewActorRoute() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: Actor) => createActor(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['actors'] });
            toast('Actor created', {
                description: 'The actor has been created successfully',
                position: 'top-center',
            });
            router.navigate({ to: '/actors' });
        },
    });

    return <ActorForm mode="create" onSubmit={mutate} isPending={isPending} />;
}
