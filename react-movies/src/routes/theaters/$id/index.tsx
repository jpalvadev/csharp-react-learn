import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/theaters/$id/')({
    component: TheaterByIdRoute,
});

function TheaterByIdRoute() {
    return <div>Hello "/theaters/$id/"!</div>;
}
