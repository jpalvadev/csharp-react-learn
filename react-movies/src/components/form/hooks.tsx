import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormSelect from './FormSelect';
import FormCheckbox from './FormCheckbox';
import FormFileInput from './FormFileInput';
import FormCalendar from './FormCalendar';

const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts();

const { useAppForm } = createFormHook({
    fieldComponents: {
        Input: FormInput,
        FileInput: FormFileInput,
        Textarea: FormTextarea,
        Select: FormSelect,
        Checkbox: FormCheckbox,
        Calendar: FormCalendar,
    },
    formComponents: {},
    fieldContext,
    formContext,
});

export { useAppForm, useFieldContext, useFormContext };
