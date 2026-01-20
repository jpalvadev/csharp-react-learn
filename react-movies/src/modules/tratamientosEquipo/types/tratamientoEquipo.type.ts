import type { Filters } from '@/types/table.type';
import { dateNotInFuture } from '@/utils/validations';
import * as z from 'zod';

const tratamientoEquipoBaseSchema = z.object({
    fecha: z.preprocess(
        (arg) =>
            typeof arg === 'string' || arg instanceof Date
                ? new Date(arg)
                : undefined,
        z
            .date({ message: 'La fecha es obligatoria' })
            .refine(...dateNotInFuture()),
    ),
    correctivo: z.boolean(),
    preventivo: z.boolean(),
    actividad: z.string().min(5, 'Debe ingresar la actividad realizada'),
    observaciones: z.string().optional(),
    operador: z
        .array(z.coerce.number())
        .min(1, 'Debe seleccionar al menos un operador'),
});

// logica de validacion para reutilizar. Se hace asi porque se debe aplicar al final
const validacionCorrectivo = (values: any, ctx: z.RefinementCtx) => {
    if (
        values.correctivo === true &&
        (!values.observaciones || values.observaciones.trim() === '')
    ) {
        ctx.addIssue({
            code: 'custom',
            path: ['observaciones'],
            message: 'Las observaciones son obligatorias cuando es correctivo',
        });
    }
};

// 3. Creamos las variaciones ANTES de aplicar superRefine
export const createTratamientoEquipoSchema =
    tratamientoEquipoBaseSchema.superRefine(validacionCorrectivo);

export const updateTratamientoEquipoSchema = tratamientoEquipoBaseSchema
    .partial()
    .superRefine(validacionCorrectivo);

export const tratamientoEquipoSchema = tratamientoEquipoBaseSchema
    .extend({
        id: z.number(),
    })
    .superRefine(validacionCorrectivo);

// 4. Tipos
export type CreateTratamientoEquipo = z.infer<
    typeof createTratamientoEquipoSchema
>;
export type UpdateTratamientoEquipo = z.infer<
    typeof updateTratamientoEquipoSchema
>;
export type TratamientoEquipo = z.infer<typeof tratamientoEquipoSchema>;

export type TratamientoEquipoFilters = Filters<TratamientoEquipo>;
