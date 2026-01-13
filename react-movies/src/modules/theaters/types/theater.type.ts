import type { Filters } from '@/types/table.type';
import { firstLetterUppercase } from '@/utils/validations';
import * as z from 'zod';

const theaterBaseSchema = z.object({
    name: z
        .string()
        .min(3, 'Theater Name must have at least 3 letters')
        .max(50, 'Theater Name can have a maximum of 50 letters')
        .refine(...[firstLetterUppercase]),
});

export const createTheaterSchema = theaterBaseSchema;

export type CreateTheater = z.infer<typeof createTheaterSchema>;

export const updateTheaterSchema = theaterBaseSchema.partial();
export type UpdateTheater = z.infer<typeof updateTheaterSchema>;

export const theaterSchema = theaterBaseSchema.extend({
    id: z.number(),
});

export type Theater = z.infer<typeof theaterSchema>;

export type TheaterFilters = Filters<Theater>;
