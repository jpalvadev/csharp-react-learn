import type { Actor, CreateActor, UpdateActor } from '../types/actor.type';

export async function createActor(actor: CreateActor): Promise<Actor> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newActor: Actor = {
        id: Math.floor(Math.random() * 10) + 1,
        ...actor,
    };

    return newActor;
}

export async function getActorById(id: number): Promise<Actor> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const actor: Actor = {
        id,
        name: 'Tom Hanks',
        dateOfBirth: new Date('1956-06-09'),
        picture:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg/250px-TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg',
    };

    return actor;
}

export async function editActor(data: UpdateActor): Promise<UpdateActor> {
    // const response = await apiClient.put<Actor>(`/actors/${data.id}`, data);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const editedActor: UpdateActor = {
        ...data,
    };

    return editedActor;
}
