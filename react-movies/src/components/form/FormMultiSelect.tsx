import { MultiSelect } from '../multi-select';
import { FormBase, type FormControlProps } from './FormBase';
import { useFieldContext } from './hooks';

const frameworksList = [
    { value: 'next.js', label: 'Next.js' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
];

export default function FormMultiSelect({
    // children,
    ...props
}: FormControlProps) {
    const field = useFieldContext<string[]>();
    // const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <FormBase {...props}>
            <MultiSelect
                options={frameworksList}
                value={field.state.value}
                onValueChange={(e) => {
                    console.log(field.state.value);
                    field.handleChange(e);
                }}
                placeholder="Select..."
            />
        </FormBase>
    );
}
