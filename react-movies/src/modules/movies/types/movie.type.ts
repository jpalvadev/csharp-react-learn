// import * as z from 'zod';

// export const movieSchema = z.object({
//     id: z.number(),
//     title: z.string().min(3, 'Title mus have at least 3 letters'),
//     poster: z.url('Must be a valid URL'),
// });

// export type Movie = z.infer<typeof movieSchema>;

import type { Filters } from '@/types/table.type';
import { firstLetterUppercase } from '@/utils/validations';
import * as z from 'zod';

// schema base reutilizable
const movieBaseSchema = z.object({
    title: z
        .string()
        .min(3, 'Title mus have at least 3 letters')
        .refine(...firstLetterUppercase()),
    poster: z.url('Must be a valid URL'),
});

// POST
export const createMovieSchema = movieBaseSchema;
export type CreateMovie = z.infer<typeof createMovieSchema>;

// Para PATCH (actualización parcial yendo pal backend)
export const updateMovieSchema = movieBaseSchema.partial();
export type UpdateMovie = z.infer<typeof updateMovieSchema>;

// entidad completa (GET response)
export const movieSchema = movieBaseSchema.extend({
    id: z.number(),
    // se pueden agregar los otros campos acá que nos devuelve el back
    // createdAt: z.string().datetime(),
    // updatedAt: z.string().datetime(),
});
export type Movie = z.infer<typeof movieSchema>;

export type MovieFilters = Filters<Movie>;
