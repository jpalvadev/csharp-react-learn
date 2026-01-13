import { type ColumnDef, type RowData } from '@tanstack/react-table';
import { type Theater } from './types/theater.type';
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

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterKey?: keyof TData;
        filterVariant?: 'text' | 'number';
    }
}

export const THEATER_COLUMNS: ColumnDef<Theater>[] = [
    {
        accessorKey: 'id',
        header: () => <span>Id</span>,
        meta: { filterKey: 'id', filterVariant: 'number' },
    },
    {
        accessorKey: 'name',
        header: () => <span>Theater</span>,
        meta: { filterKey: 'name' },
    },
    {
        id: 'actions',

        cell: ({ row }) => {
            const theater = row.original;

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
                                        theater.id.toString()
                                    );
                                    toast.success(
                                        `Theater Id: ${theater.id} copied to clipboard`,
                                        {
                                            position: 'top-center',
                                        }
                                    );
                                }}
                            >
                                Copy Theater Id
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    to="/theaters/$id"
                                    params={{
                                        id: theater.id.toString().trim(),
                                    }}
                                >
                                    Theater Details
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    to="/theaters/$id/edit"
                                    params={{
                                        id: theater.id.toString().trim(),
                                    }}
                                >
                                    Edit Theater
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Delete Theater</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
