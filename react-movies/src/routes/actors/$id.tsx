import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/actors/$id')({
    component: ActorOutletRoute,
});

function ActorOutletRoute() {
    return <Outlet />;
}
