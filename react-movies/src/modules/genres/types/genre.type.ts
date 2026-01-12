import type { Filters } from '@/types/table.type';
import { firstLetterUppercase } from '@/utils/validations';
import * as z from 'zod';

// schema base reutilizable
const genreBaseSchema = z.object({
    name: z
        .string()
        .min(3, 'Genre Name must have at least 3 letters')
        .max(50, 'dont set sail, cat (no te zarpes, gato), 50 chars max')
        .refine(...firstLetterUppercase()),
});

// POST
export const createGenreSchema = genreBaseSchema;
export type CreateGenre = z.infer<typeof createGenreSchema>;

// Para PATCH (actualización parcial yendo pal backend)
export const updateGenreSchema = genreBaseSchema.partial();
export type UpdateGenre = z.infer<typeof updateGenreSchema>;

// entidad completa (GET response)
export const genreSchema = genreBaseSchema.extend({
    id: z.number(),
    // se pueden agregar los otros campos acá que nos devuelve el back
    // createdAt: z.string().datetime(),
    // updatedAt: z.string().datetime(),
});
export type Genre = z.infer<typeof genreSchema>;

export type GenreFilters = Filters<Genre>;
