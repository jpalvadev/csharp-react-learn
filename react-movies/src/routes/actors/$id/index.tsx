import Loading from '@/components/Loading';
import ActorForm from '@/modules/actors/components/ActorForm';
import { getActorById } from '@/modules/actors/services/actor.service';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/actors/$id/')({
    loader: ({ params }) => getActorById(+params.id),
    pendingComponent: () => <Loading />,
    pendingMs: 250,

    component: ActorByIdRoute,
});

function ActorByIdRoute() {
    const actor = Route.useLoaderData();

    console.log({ actor });

    return <ActorForm mode="view" initialData={actor} isPending={false} />;
}
