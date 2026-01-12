import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/actors/$id/')({
    component: ActorByIdRoute,
});

function ActorByIdRoute() {
    return <div>Hello "/actors/$id/"!</div>;
}
