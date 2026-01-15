import TratamientoEquipoForm from '@/modules/tratamientosEquipo/components/TratamientoEquipoForm';
import { createTratamientoEquipo } from '@/modules/tratamientosEquipo/services/tratamientoEquipo.service';
import type { TratamientoEquipo } from '@/modules/tratamientosEquipo/types/tratamientoEquipo.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/tratamientosEquipo/new')({
    component: RouteComponent,
});

function RouteComponent() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: TratamientoEquipo) => createTratamientoEquipo(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tratamientosEquipo'] });
            console.log(data);
            toast('Tratamiento Equipo creado', {
                description: 'Se creó un nuevo registro satisfactoriamente',
                position: 'top-center',
            });
            router.navigate({ to: '/tratamientosEquipo' });
        },
    });

    return (
        <TratamientoEquipoForm
            mode="create"
            onSubmit={mutate}
            isPending={isPending}
        />
    );
}
