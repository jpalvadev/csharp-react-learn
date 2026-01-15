import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@tanstack/react-router';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
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

        cell: ({ row }) => {
            const genre = row.original;

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
                                        genre.id.toString()
                                    );
                                    toast.success(
                                        `Genre Id: ${genre.id} copied to clipboard`,
                                        {
                                            position: 'top-center',
                                        }
                                    );
                                }}
                            >
                                Copy Genre Id
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    to="/genres/$id"
                                    params={{ id: genre.id.toString().trim() }}
                                >
                                    Genre Details
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    to="/genres/$id/edit"
                                    params={{ id: genre.id.toString().trim() }}
                                >
                                    Edit Genre
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Delete Genre</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
