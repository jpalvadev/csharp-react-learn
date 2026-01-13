import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/tratamientosEquipo/$id')({
    component: RouteComponent,
});

function RouteComponent() {
    return <Outlet />;
}
