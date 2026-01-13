import Loading from '@/components/Loading';
import TheaterForm from '@/modules/theaters/components/TheaterForm';
import { getTheaterById } from '@/modules/theaters/services/theater.service';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/theaters/$id/')({
    loader: ({ params }) => getTheaterById(+params.id),
    pendingComponent: () => <Loading />,
    pendingMs: 250,
    component: TheaterByIdRoute,
});

function TheaterByIdRoute() {
    const theater = Route.useLoaderData();

    return <TheaterForm mode="view" initialData={theater} isPending={false} />;
}
