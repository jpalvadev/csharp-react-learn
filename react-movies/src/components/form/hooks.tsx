import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import FormCalendar from './FormCalendar';
import FormCheckbox from './FormCheckbox';
import FormFileInput from './FormFileInput';
import FormInput from './FormInput';
import FormLeaflet from './FormLeaflet';
import FormSelect from './FormSelect';
import FormTextarea from './FormTextarea';
import FormMultiSelect from './FormMultiSelect';

const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts();

const { useAppForm } = createFormHook({
    fieldComponents: {
        Input: FormInput,
        FileInput: FormFileInput,
        Textarea: FormTextarea,
        Select: FormSelect,
        MultiSelect: FormMultiSelect,

        Checkbox: FormCheckbox,
        Calendar: FormCalendar,
        Leaflet: FormLeaflet,
    },
    formComponents: {},
    fieldContext,
    formContext,
});

export { useAppForm, useFieldContext, useFormContext };
