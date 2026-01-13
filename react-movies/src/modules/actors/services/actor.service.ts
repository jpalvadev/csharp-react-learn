import type { PaginatedData } from '@/types/table.type';
import type {
    Actor,
    ActorFilters,
    CreateActor,
    UpdateActor,
} from '../types/actor.type';

export async function getActors(
    filtersAndPagination: ActorFilters
): Promise<PaginatedData<Actor>> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const actors: Actor[] = [
        {
            id: 1,
            name: 'Tom Hanks',
            dateOfBirth: new Date('1956-06-09'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg/250px-TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg',
        },
        {
            id: 2,
            name: 'Meryl Streep',
            dateOfBirth: new Date('1949-06-22'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Meryl_Streep_by_Jack_Mitchell.jpg/220px-Meryl_Streep_by_Jack_Mitchell.jpg',
        },
        {
            id: 3,
            name: 'Leonardo DiCaprio',
            dateOfBirth: new Date('1974-11-11'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Leonardo_DiCaprio_2014.jpg/220px-Leonardo_DiCaprio_2014.jpg',
        },
        {
            id: 4,
            name: 'Viola Davis',
            dateOfBirth: new Date('1965-08-11'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Viola_Davis_by_Gage_Skidmore.jpg/220px-Viola_Davis_by_Gage_Skidmore.jpg',
        },
        {
            id: 5,
            name: 'Denzel Washington',
            dateOfBirth: new Date('1954-12-28'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Denzel_Washington_2018.jpg/220px-Denzel_Washington_2018.jpg',
        },
        {
            id: 6,
            name: 'Ricardo Darín',
            dateOfBirth: new Date('1957-01-16'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Ricardo_Dar%C3%ADn_2015.jpg/220px-Ricardo_Dar%C3%ADn_2015.jpg',
        },
        {
            id: 7,
            name: 'Cate Blanchett',
            dateOfBirth: new Date('1969-05-14'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Cate_Blanchett_Cannes_2018_2.jpg/220px-Cate_Blanchett_Cannes_2018_2.jpg',
        },
        {
            id: 8,
            name: 'Anthony Hopkins',
            dateOfBirth: new Date('1937-12-31'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/AnthonyHopkins.jpg/220px-AnthonyHopkins.jpg',
        },
        {
            id: 9,
            name: 'Emma Stone',
            dateOfBirth: new Date('1988-11-06'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Emma_Stone_at_SAG_Awards_2017.jpg/220px-Emma_Stone_at_SAG_Awards_2017.jpg',
        },
        {
            id: 10,
            name: 'Cillian Murphy',
            dateOfBirth: new Date('1976-05-25'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Cillian_Murphy_2014.jpg/220px-Cillian_Murphy_2014.jpg',
        },
        {
            id: 11,
            name: 'Pedro Pascal',
            dateOfBirth: new Date('1975-04-02'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pedro_Pascal_by_Gage_Skidmore.jpg/220px-Pedro_Pascal_by_Gage_Skidmore.jpg',
        },
    ];

    return { result: actors, rowCount: actors.length };
}

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
