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
import { deleteActor } from '../services/actor.service';
import type { Actor } from '../types/actor.type';

type ActorActionCellProps = {
    actor: Actor;
};

export default function ActorActionCell({ actor }: ActorActionCellProps) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteActor(actor.id),
        onSuccess: () => {
            toast.success('Actor deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['actors'] });
        },
        onError: (error: AxiosError) => {
            extractErrors(error, 'Error deleting Actor');
        },
    });

    return (
        <div className="text-right">
            <GenericAlertDialog
                title="¿Eliminar género?"
                description={`Estás a punto de eliminar ${actor.name}.`}
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
                                    actor.id.toString(),
                                )
                            }
                        >
                            Copy Actor Id
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                to="/actors/$id"
                                params={{ id: actor.id.toString().trim() }}
                            >
                                Actor Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                to="/actors/$id/edit"
                                params={{ id: actor.id.toString() }}
                            >
                                Edit Actor
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-red-600 focus:bg-red-50 w-full">
                            <AlertDialogTrigger className="cursor-pointer">
                                Delete Actor
                            </AlertDialogTrigger>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </GenericAlertDialog>
        </div>
    );
}
