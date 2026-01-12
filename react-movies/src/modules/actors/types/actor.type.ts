import type { Filters } from '@/types/table.type';
import { dateNotInFuture, firstLetterUppercase } from '@/utils/validations';
import * as z from 'zod';

const actorBaseSchema = z.object({
    name: z
        .string()
        .min(3, 'Actor Name must have at least 3 letters')
        .max(50, 'dont set sail, cat (no te zarpes, gato), 50 chars max')
        .refine(...firstLetterUppercase()),
    dateOfBirth: z.coerce.date().refine(...dateNotInFuture()),
    picture: z
        .file()
        .optional()
        .refine((file) => file?.size <= 500000, {
            message: 'Max file size is 500Kb',
        }),
});

export const createActorSchema = actorBaseSchema;
export type CreateActor = z.infer<typeof createActorSchema>;

export const updateActorSchema = actorBaseSchema.partial();
export type UpdateActor = z.infer<typeof updateActorSchema>;

export const actorSchema = actorBaseSchema.extend({
    id: z.number(),
});
export type Actor = z.infer<typeof actorSchema>;

export type ActorFilters = Filters<Actor>;
