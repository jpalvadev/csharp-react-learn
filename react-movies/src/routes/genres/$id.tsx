import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/genres/$id')({
    component: GenreOutletRoute,
});

function GenreOutletRoute() {
    return <Outlet />;
}
