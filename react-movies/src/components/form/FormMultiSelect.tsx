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
} from '@/components/ui/multi-select';
import type { Lookup } from '@/types/lookup.type';

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

type MultiSelectItemsProps = {
    data: Lookup[];
};

export function MultiSelectItems({ data }: MultiSelectItemsProps) {
    return data.map((theater) => (
        <MultiSelectItem key={theater.value} value={theater.value.toString()}>
            {theater.label}
        </MultiSelectItem>
    ));
}
