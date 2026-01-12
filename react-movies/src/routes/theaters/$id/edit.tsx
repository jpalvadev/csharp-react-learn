import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/theaters/$id/edit')({
    component: EditTheaterRoute,
});

function EditTheaterRoute() {
    return <div>Hello "/theaters/$id/edit"!</div>;
}
