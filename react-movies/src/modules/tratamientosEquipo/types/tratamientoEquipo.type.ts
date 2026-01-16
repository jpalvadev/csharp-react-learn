import type { Filters } from '@/types/table.type';
import { dateNotInFuture } from '@/utils/validations';
import * as z from 'zod';

const tratamientoEquipoBaseSchema = z.object({
    fecha: z.coerce
        .date()
        .refine(...dateNotInFuture('La fecha no puede ser futura')),
    correctivo: z.boolean(),
    preventivo: z.boolean(),
    actividad: z.string().min(5, 'Debe ingresar la actividad realizada'),
    observaciones: z.string().optional(),
    operador: z
        .array(z.coerce.number()) // Convierte ["1", "2"] a [1, 2] automáticamente
        .min(1, 'Debe seleccionar al menos un operador'),
});

export const createTratamientoEquipoSchema = tratamientoEquipoBaseSchema;
export type CreateTratamientoEquipo = z.infer<
    typeof tratamientoEquipoBaseSchema
>;

export const updateTratamientoEquipoSchema =
    tratamientoEquipoBaseSchema.partial();
export type UpdateTratamientoEquipo = z.infer<
    typeof updateTratamientoEquipoSchema
>;

export const tratamientoEquipoSchema = tratamientoEquipoBaseSchema.extend({
    id: z.number(),
});

export type TratamientoEquipo = z.infer<typeof tratamientoEquipoSchema>;

export type TratamientoEquipoFilters = Filters<TratamientoEquipo>;
