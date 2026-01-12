import Loading from '@/components/Loading';
import GenreForm from '@/modules/genres/components/GenreForm';
import { getGenreById } from '@/modules/genres/services/genre.service';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/genres/$id/')({
    loader: ({ params }) => getGenreById(+params.id),
    pendingComponent: () => <Loading />,
    pendingMs: 250,
    component: GenreByIdRoute,
});

function GenreByIdRoute() {
    const genre = Route.useLoaderData();

    return <GenreForm mode="view" initialData={genre} isPending={false} />;
}
