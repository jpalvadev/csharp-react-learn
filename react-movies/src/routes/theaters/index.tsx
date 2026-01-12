import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/theaters/')({
    component: TheatersRoute,
});

function TheatersRoute() {
    return <div>Hello "/theaters/"!</div>;
}
