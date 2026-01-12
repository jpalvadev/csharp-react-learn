import NotFound from '@/components/notFound';
import AppShell from '@/layouts/AppShell';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';

const RootLayout = () => (
    <>
        <AppShell>
            <Outlet />
        </AppShell>
        <TanStackRouterDevtools />
        <Toaster />
    </>
);

export const Route = createRootRoute({
    component: RootLayout,
    notFoundComponent: NotFound,
});
