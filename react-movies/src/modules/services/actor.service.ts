import type { Actor, CreateActor } from '../actors/types/actor.type';

export async function createActor(actor: CreateActor): Promise<Actor> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newActor: Actor = {
        id: Math.floor(Math.random() * 10) + 1,
        ...actor,
    };

    return newActor;
}
