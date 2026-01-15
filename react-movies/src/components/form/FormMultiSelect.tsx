import { type ReactNode } from 'react';
import { FormBase, type FormControlProps } from './FormBase';
import { useFieldContext } from './hooks';

import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectTrigger,
    MultiSelectValue,
} from '@/components/ui/multi-select';

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
                <MultiSelectContent>
                    <MultiSelectGroup>{children}</MultiSelectGroup>
                </MultiSelectContent>
            </MultiSelect>
        </FormBase>
    );
}
