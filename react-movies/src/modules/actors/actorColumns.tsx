import { type ColumnDef } from '@tanstack/react-table';
import ActorActionCell from './components/ActorActionCell';
import { type Actor } from './types/actor.type';

export const ACTOR_COLUMNS: ColumnDef<Actor>[] = [
    {
        accessorKey: 'id',
        header: () => <span>Id</span>,
        meta: { filterKey: 'id', filterVariant: 'number' },
    },
    {
        accessorKey: 'name',
        header: () => <span>Actor Name</span>,
        meta: { filterKey: 'name' },
    },
    {
        accessorKey: 'dateOfBirth',
        header: () => <span>DateOfBirth</span>,

        cell: ({ getValue }) => {
            const value = getValue() as string;
            return new Date(value).toLocaleDateString();
        },
        meta: { filterKey: 'dateOfBirth', filterVariant: 'date' },
    },
    {
        id: 'actions',
        cell: ({ row }) => <ActorActionCell actor={row.original} />,
    },
];
