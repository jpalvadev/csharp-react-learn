import { useState } from 'react';
import { Input } from '../ui/input';
import { FormBase, type FormControlProps } from './FormBase';
import { useFieldContext } from './hooks';

// para poder pasar la imagen lo hacemos con FormData, no JSON, NUNCA!!!
export default function FormFileInput(
    props: FormControlProps & {
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
) {
    const [preview, setPreview] = useState<string>('');
    const field = useFieldContext<File | null>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files?.[0] || null;

        field.handleChange(file); // se guarda el file en el form

        if (file) {
            const url = URL.createObjectURL(file); // para ver la imagen
            setPreview(url);
        } else {
            setPreview('');
        }
    }

    return (
        <FormBase {...props}>
            <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={handleChange}
                aria-invalid={isInvalid}
                disabled={props.disabled}
                type={props.type}
                accept={props.accept}
            />
            {preview && (
                <div className="mt-2">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded"
                    />
                </div>
            )}
        </FormBase>
    );
}
