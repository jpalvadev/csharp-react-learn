import { type ColumnDef } from '@tanstack/react-table';
import { type TratamientoEquipo } from './types/tratamientoEquipo.type';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { toast } from 'sonner';

export const TRATAMIENTOEQUIPO_COLUMNS: ColumnDef<TratamientoEquipo>[] = [
    {
        accessorKey: 'id',
        header: () => <span>Id</span>,
        meta: { filterKey: 'id', filterVariant: 'number' },
    },
    {
        accessorKey: 'fecha',
        header: () => <span>Fecha</span>,
        cell: ({ getValue }) => {
            console.log(getValue());
            // const fecha = getValue() as Date;
            // return fecha.toLocaleDateString();
        },
        meta: { filterKey: 'fecha' },
    },
    {
        accessorKey: 'correctivo',
        header: () => <span>Correctivo</span>,
        cell: ({ getValue }) => {
            const correctivo = getValue() as boolean;
            return correctivo ? 'Sí' : 'No';
        },
        meta: { filterKey: 'correctivo' },
    },
    {
        accessorKey: 'preventivo',
        header: () => <span>Preventivo</span>,
        cell: ({ getValue }) => {
            const preventivo = getValue() as boolean;
            return preventivo ? 'Sí' : 'No';
        },
        meta: { filterKey: 'preventivo' },
    },
    {
        accessorKey: 'actividad',
        header: () => <span>Actividad</span>,
        meta: { filterKey: 'actividad' },
    },
    {
        accessorKey: 'observaciones',
        header: () => <span>Observaciones</span>,
        meta: { filterKey: 'observaciones' },
    },
    {
        accessorKey: 'operador',
        header: () => <span>Operador</span>,
        meta: { filterKey: 'operador' },
    },

    {
        id: 'actions',

        cell: ({ row }) => {
            const tratamientoEquipo = row.original;

            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir Menú</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        tratamientoEquipo.id.toString(),
                                    );
                                    toast.success(
                                        `TratamientoEquipo Id: ${tratamientoEquipo.id} copied to clipboard`,
                                        {
                                            position: 'top-center',
                                        },
                                    );
                                }}
                            >
                                Copy TratamientoEquipo Id
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    to="/tratamientosEquipo/$id"
                                    params={{
                                        id: tratamientoEquipo.id
                                            .toString()
                                            .trim(),
                                    }}
                                >
                                    TratamientoEquipo Details
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    to="/tratamientosEquipo/$id/edit"
                                    params={{
                                        id: tratamientoEquipo.id
                                            .toString()
                                            .trim(),
                                    }}
                                >
                                    Edit Registro
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Delete Registro</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
