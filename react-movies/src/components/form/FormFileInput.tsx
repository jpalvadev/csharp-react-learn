import { useState } from 'react';
import { Input } from '../ui/input';
import { FormBase, type FormControlProps } from './FormBase';
import { useFieldContext } from './hooks';

export default function FormFileInput(
    props: FormControlProps & {
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
) {
    const [imageBase64, setImageBase64] = useState('');
    const field = useFieldContext<string>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0];
            toBase64(file)
                .then((value) => setImageBase64(value))
                .catch((err) => console.error(err));
        }
    }

    function toBase64(file: File) {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (err) => reject(err);
        });
    }

    return (
        <FormBase {...props}>
            <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={handleChange}
                aria-invalid={isInvalid}
                disabled={props.disabled}
                type={props.type}
                accept={props.accept}
            />
            {imageBase64 && (
                <div className="col-span-2">
                    <img src={imageBase64} alt="Actor" className="w-32 h-32" />
                </div>
            )}
        </FormBase>
    );
}
