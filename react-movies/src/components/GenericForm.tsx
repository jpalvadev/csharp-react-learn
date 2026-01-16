import { useAppForm } from '@/components/form/hooks';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import type { FormMode } from '@/types/FormMode.type';
import { useCanGoBack, useRouter } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { ZodType } from 'zod';
import Loading from './Loading';

// TKey asegura que solo pueda usar nombres que existan rn rl objeto Data
export interface FieldConfig<TData> {
    name: keyof TData & string;
    label: string;
    formField:
        | 'input'
        | 'textarea'
        | 'fileInput'
        | 'calendar'
        | 'checkbox'
        | 'select'
        | 'multi-select'
        | 'leaflet';
    description?: string;
    colSpan?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    children?: ReactNode;
    data?: TData;
}

interface GenericFormProps<TData extends Record<string, any>> {
    initialData: TData;
    mode: FormMode;
    schema: ZodType<TData>;

    fields: FieldConfig<TData>[]; // Configuración de campos
    onSubmit?: (values: TData) => void;
    isPending: boolean;
    children?: ReactNode;
    columns?: number;
    handleChange?: (values: TData) => void;
}

export default function GenericForm<TData extends Record<string, any>>({
    initialData,
    mode,
    schema,
    fields,
    onSubmit,
    isPending,
    children,
    columns = 4,
    handleChange,
}: GenericFormProps<TData>) {
    const router = useRouter();
    const canGoBack = useCanGoBack();

    const getColClass = (colSpan?: number) => {
        if (!colSpan) return 'col-span-4';

        return {
            'col-span-1': colSpan === 1,
            'col-span-2': colSpan === 2,
            'col-span-3': colSpan === 3,
            'col-span-4': colSpan === 4,
            'col-span-5': colSpan === 5,
            'col-span-6': colSpan === 6,
        };
    };

    const form = useAppForm({
        defaultValues: initialData,
        validators: { onSubmit: schema as any }, // eslint-disable-line @typescript-eslint/no-explicit-any
        onSubmit: async ({ value }) => {
            if (mode !== 'view' && onSubmit) {
                onSubmit(value);
            }
        },
    });
    // const currentValues = form.state.values;
    // console.log({ currentValues });

    if (isPending) return <Loading />;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            onChange={() => {
                if (handleChange) {
                    handleChange(form.state.values);
                }
            }}
        >
            <FieldGroup>
                <div
                    className={cn('grid gap-4', {
                        'grid-cols-1': columns === 1,
                        'grid-cols-2': columns === 2,
                        'grid-cols-3': columns === 3,
                        'grid-cols-4': columns === 4,
                        'grid-cols-5': columns === 5,
                        'grid-cols-6': columns === 6,
                    })}
                >
                    {fields.map((f) => (
                        <div
                            key={f.name}
                            className={cn(getColClass(f.colSpan))}
                        >
                            <form.AppField name={f.name}>
                                {(field) => {
                                    const renderField = () => {
                                        switch (f.formField) {
                                            case 'input':
                                                return (
                                                    <field.Input
                                                        type="text"
                                                        label={f.label}
                                                        description={
                                                            f.description
                                                        }
                                                        disabled={
                                                            mode === 'view'
                                                        }
                                                        onChange={f.onChange}
                                                    />
                                                );
                                            case 'textarea':
                                                return (
                                                    <field.Textarea
                                                        label={f.label}
                                                        description={
                                                            f.description
                                                        }
                                                        disabled={
                                                            mode === 'view'
                                                        }
                                                    />
                                                );

                                            case 'fileInput':
                                                return (
                                                    <field.FileInput
                                                        type="file"
                                                        label={f.label}
                                                        description={
                                                            f.description
                                                        }
                                                        disabled={
                                                            mode === 'view'
                                                        }
                                                        onChange={f.onChange}
                                                        accept={f.accept}
                                                    />
                                                );
                                            case 'calendar':
                                                return (
                                                    <field.Calendar
                                                        label={f.label}
                                                        description={
                                                            f.description
                                                        }
                                                        disabled={
                                                            mode === 'view'
                                                        }
                                                    />
                                                );

                                            case 'checkbox':
                                                return (
                                                    <field.Checkbox
                                                        label={f.label}
                                                        description={
                                                            f.description
                                                        }
                                                        disabled={
                                                            mode === 'view'
                                                        }
                                                    />
                                                );
                                            case 'select':
                                                return (
                                                    <field.Select
                                                        label={f.label}
                                                    >
                                                        {f.children}
                                                    </field.Select>
                                                );
                                            case 'leaflet':
                                                return (
                                                    <field.Leaflet
                                                        label={f.label}
                                                        disabled={
                                                            mode === 'view'
                                                        }
                                                    />
                                                );
                                            case 'multi-select':
                                                return (
                                                    <field.MultiSelect
                                                        label={f.label}
                                                    >
                                                        {f.children}
                                                    </field.MultiSelect>
                                                );
                                            default:
                                                return null;
                                        }
                                    };

                                    return renderField();
                                }}
                            </form.AppField>
                        </div>
                    ))}
                </div>

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
