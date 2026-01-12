import Loading from '@/components/Loading';
import MovieForm from '@/modules/movies/components/MovieForm';
import { getMovieById } from '@/modules/movies/services/movie.service';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/movies/$id/')({
    loader: ({ params }) => getMovieById(+params.id),
    pendingComponent: () => <Loading />,
    pendingMs: 250,
    component: MovieByIdRoute,
});

function MovieByIdRoute() {
    const genre = Route.useLoaderData();

    return <MovieForm mode="view" isPending={false} initialData={genre} />;
}
