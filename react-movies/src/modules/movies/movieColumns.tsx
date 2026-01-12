import { type ColumnDef, type RowData } from '@tanstack/react-table';

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
import type { Movie } from './types/movie.type';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterKey?: keyof TData;
        filterVariant?: 'text' | 'number';
    }
}

export const MOVIE_COLUMNS: ColumnDef<Movie>[] = [
    {
        accessorKey: 'id',
        header: () => <span>Id</span>,
        meta: { filterKey: 'id', filterVariant: 'number' },
    },
    {
        accessorKey: 'title',
        header: () => <span>Movie</span>,
        meta: { filterKey: 'title' },
    },

    {
        accessorKey: 'poster',
        header: () => <span>Poster URL</span>,
        meta: { filterKey: 'poster' },
    },
    {
        id: 'actions',

        cell: ({ row }) => {
            const movie = row.original;

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
                                        movie.id.toString()
                                    );
                                    toast.success(
                                        `Movie Id: ${movie.id} copied to clipboard`,
                                        {
                                            position: 'top-center',
                                        }
                                    );
                                }}
                            >
                                Copy Movie Id
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    to="/movies/$id"
                                    params={{ id: movie.id.toString().trim() }}
                                >
                                    Movie Details
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    to="/movies/$id/edit"
                                    params={{ id: movie.id.toString().trim() }}
                                >
                                    Edit Movie
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Delete Movie</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
