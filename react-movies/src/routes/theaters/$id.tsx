import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/theaters/$id')({
    component: TheaterOutletRoute,
});

function TheaterOutletRoute() {
    return <Outlet />;
}
