import { GenericAlertDialog } from '@/components/GenericAlertDialog';
import { AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import extractErrors from '@/utils/extractErrors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { deleteGenre } from '../services/genre.service';
import type { Genre } from '../types/genre.type';

type GenreActionCellProps = {
    genre: Genre;
};

export default function GenreActionCell({ genre }: GenreActionCellProps) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteGenre(genre.id),
        onSuccess: () => {
            toast.success('Genre deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['genres'] });
        },
        onError: (error: AxiosError) => {
            extractErrors(error, 'Error deleting Genre');
        },
    });

    return (
        <div className="text-right">
            <GenericAlertDialog
                title="¿Eliminar género?"
                description={`Estás a punto de eliminar ${genre.name}.`}
                actionText={isPending ? 'Eliminando...' : 'Eliminar'}
                onAction={mutate}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    genre.id.toString(),
                                )
                            }
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
                                params={{ id: genre.id.toString() }}
                            >
                                Edit Genre
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-red-600 focus:bg-red-50 w-full">
                            <AlertDialogTrigger className="cursor-pointer">
                                Delete Genre
                            </AlertDialogTrigger>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </GenericAlertDialog>
        </div>
    );
}
