import { type ReactNode } from 'react';
import { FormBase, type FormControlProps } from './FormBase';
import { useFieldContext } from './hooks';

import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
    useMultiSelectContext,
} from '@/components/ui/multi-select';
import { useLookup } from '@/hooks/useLookup';
import type { PaginatedData } from '@/types/table.type';

type OverflowBehavior = 'wrap-when-open' | 'wrap' | 'cutoff';

export default function FormMultiSelect({
    children,
    ...props
}: FormControlProps & { children: ReactNode }) {
    const field = useFieldContext<string[]>();
    const overflowBehavior: OverflowBehavior = 'wrap';

    return (
        <FormBase {...props}>
            <MultiSelect
                onValuesChange={(e) => field.handleChange(e)}
                values={field.state.value}
            >
                <MultiSelectTrigger className="w-full">
                    <MultiSelectValue overflowBehavior={overflowBehavior} />
                </MultiSelectTrigger>
                <MultiSelectContent
                    search={{
                        emptyMessage: 'No hay resultados',
                        placeholder: 'Búsqueda...',
                    }}
                >
                    <MultiSelectGroup>{children}</MultiSelectGroup>
                </MultiSelectContent>
            </MultiSelect>
        </FormBase>
    );
}

type MultiSelectItemsProps<T> = {
    cacheKey: string;
    fetchFn: (params: Record<string, string>) => Promise<PaginatedData<T>>;
    mapConfig: { label: keyof T; value: keyof T };
};

export function MultiSelectItems<T>({
    cacheKey,
    fetchFn,
    mapConfig,
}: MultiSelectItemsProps<T>) {
    const { searchValue } = useMultiSelectContext(); // estado del input del buscador

    const { lookups, isPending } = useLookup(
        cacheKey,
        fetchFn,
        searchValue,
        mapConfig
    );

    if (isPending) return <p>Cargando...</p>;

    return lookups.map((item) => (
        <MultiSelectItem key={item.value} value={item.value.toString()}>
            {item.label}
        </MultiSelectItem>
    ));
}
