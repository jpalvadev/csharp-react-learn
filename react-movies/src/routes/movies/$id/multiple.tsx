import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movies/$id/multiple')({
    component: FormExample,
});

import { toast } from 'sonner';
import { z } from 'zod';

import { MultiSelect } from '@/components/multi-select';

const FormSchema = z.object({
    frameworks: z
        .array(z.string())
        .min(1, { message: 'Please select at least one framework.' }),
});

const frameworksList = [
    { value: 'next.js', label: 'Next.js' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
];

export default function FormExample() {
    return (
        <MultiSelect
            options={frameworksList}
            value={field.value}
            onValueChange={field.onChange}
            placeholder="Choose frameworks..."
        />
    );
}
