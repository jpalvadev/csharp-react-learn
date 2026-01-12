import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/theaters/new')({
    component: NewTheaterRoute,
});

function NewTheaterRoute() {
    return <div>Hello "/theaters/new"!</div>;
}
