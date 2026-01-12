import { useAppForm } from '@/components/form/hooks';
import { FieldGroup } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import type { FormMode } from '@/types/FormMode.type';
import { ZodType } from 'zod';
import { useCanGoBack, useRouter } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import Loading from './Loading';

// TKey asegura que solo pueda usar nombres que existan rn rl objeto Data
export interface FieldConfig<TData> {
    name: keyof TData & string;
    label: string;
    type: 'input' | 'textarea' | 'dateInput' | 'fileInput';
    description?: string;
}

interface GenericFormProps<TData extends Record<string, any>> {
    initialData: TData;
    mode: FormMode;
    schema: ZodType<TData>;

    fields: FieldConfig<TData>[]; // Configuración de campos
    onSubmit?: (values: TData) => void;
    isPending: boolean;
    children?: ReactNode;
}

export default function GenericForm<TData extends Record<string, any>>({
    initialData,
    mode,
    schema,
    fields,
    onSubmit,
    isPending,
    children,
}: GenericFormProps<TData>) {
    const router = useRouter();
    const canGoBack = useCanGoBack();

    const form = useAppForm({
        defaultValues: initialData,
        validators: { onSubmit: schema as any }, // eslint-disable-line @typescript-eslint/no-explicit-any
        onSubmit: async ({ value }) => {
            if (mode !== 'view' && onSubmit) {
                onSubmit(value);
            }
        },
    });

    if (isPending) return <Loading />;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <FieldGroup>
                {fields.map((f) => (
                    <form.AppField key={f.name} name={f.name}>
                        {(field) => {
                            const renderField = () => {
                                switch (f.type) {
                                    case 'input':
                                        return (
                                            <field.Input
                                                type="text"
                                                label={f.label}
                                                description={f.description}
                                                disabled={mode === 'view'}
                                            />
                                        );
                                    case 'textarea':
                                        return (
                                            <field.Textarea
                                                label={f.label}
                                                description={f.description}
                                                disabled={mode === 'view'}
                                            />
                                        );
                                    case 'dateInput':
                                        return (
                                            <field.Input
                                                type="date"
                                                label={f.label}
                                                description={f.description}
                                                disabled={mode === 'view'}
                                            />
                                        );
                                    case 'fileInput':
                                        return (
                                            <field.Input
                                                type="file"
                                                label={f.label}
                                                description={f.description}
                                                disabled={mode === 'view'}
                                            />
                                        );
                                    default:
                                        return null;
                                }
                            };

                            return renderField();
                        }}
                    </form.AppField>
                ))}

                {children}

                <div className="w-full flex gap-4 justify-between">
                    {mode !== 'view' && (
                        <Button variant="info" className="grow" type="submit">
                            Save
                        </Button>
                    )}

                    {canGoBack ? (
                        <Button
                            type="button"
                            className="grow"
                            onClick={() => router.history.back()}
                        >
                            Go Back
                        </Button>
                    ) : null}
                </div>
            </FieldGroup>
        </form>
    );
}
