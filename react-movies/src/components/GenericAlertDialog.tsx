import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { ReactNode } from 'react';

type GenericAlertDialogProps = {
    children: ReactNode;
    title?: string;
    description?: string;
    actionText?: string;
    cancelText?: string;
    onAction: () => void;
};

export function GenericAlertDialog({
    children,
    description = 'This cannot be undone',
    actionText = 'Continue',
    cancelText = 'Cancel',
    title = 'Are you absolutely sure?',
    onAction,
}: GenericAlertDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onAction}>
                        {actionText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
