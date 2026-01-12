import { createFileRoute, Outlet } from '@tanstack/react-router';
export const Route = createFileRoute('/movies/$id')({
    component: MovieByIdPage,
});

function MovieByIdPage() {
    return <Outlet />;
}
