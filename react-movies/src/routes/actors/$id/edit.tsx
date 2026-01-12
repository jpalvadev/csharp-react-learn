import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/actors/$id/edit')({
    component: EditActorRoute,
});

function EditActorRoute() {
    return <div>Hello "/actors/$id/edit"!</div>;
}
