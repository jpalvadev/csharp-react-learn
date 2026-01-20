import { type ColumnDef } from '@tanstack/react-table';
import GenreActionCell from './components/GenreActionCell';
import { type Genre } from './types/genre.type';

export const GENRE_COLUMNS: ColumnDef<Genre>[] = [
    {
        accessorKey: 'id',
        header: () => <span>Id</span>,
        meta: { filterKey: 'id', filterVariant: 'number' },
    },
    {
        accessorKey: 'name',
        header: () => <span>Genre</span>,
        meta: { filterKey: 'name' },
    },
    {
        id: 'actions',
        cell: ({ row }) => <GenreActionCell genre={row.original} />,
    },
];
