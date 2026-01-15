import type { Filters } from '@/types/table.type';
import { dateNotInFuture, firstLetterUppercase } from '@/utils/validations';
import * as z from 'zod';

// schema base reutilizable
const movieBaseSchema = z.object({
    title: z
        .string()
        .min(3, 'Title mus have at least 3 letters')
        .refine(...firstLetterUppercase()),
    releaseDate: z.coerce.date().refine(...dateNotInFuture()),

    trailer: z.string().optional(),
    picture: z
        .union([z.instanceof(File), z.string()]) // puede ser file (front) o string(URL desde backend)
        .optional()
        .refine(
            (value) => {
                if (value instanceof File) {
                    return value.size <= 500000;
                }
                return true; // las URL siempre son válidas
            },
            { message: 'Max file size is 500Kb' }
        ),
    genre: z.array(z.string().optional()),
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
