import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/actors/')({
    component: ActorsRoute,
});

function ActorsRoute() {
    return <div>Hello "/actors/"!</div>;
}
