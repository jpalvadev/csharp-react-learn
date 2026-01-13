import type { PaginatedData } from '@/types/table.type';
import type {
    CreateTheater,
    Theater,
    TheaterFilters,
} from '../types/theater.type';

export async function getTheaters(
    filtersAndPagination: TheaterFilters
): Promise<PaginatedData<Theater>> {
    const theaters: Theater[] = [
        {
            id: 1,
            name: 'Grand Cinema',
        },
        {
            id: 2,
            name: 'Starlight Multiplex',
        },
        {
            id: 3,
            name: 'The Royal Playhouse',
        },
        {
            id: 4,
            name: 'Neon City IMAX',
        },
        {
            id: 5,
            name: 'Vintage Film House',
        },
        {
            id: 6,
            name: 'Horizon Screens',
        },
        {
            id: 7,
            name: 'Classic Apollo',
        },
        {
            id: 8,
            name: 'Silver Screen Center',
        },
        {
            id: 9,
            name: 'Metro Plaza Cinema',
        },
        {
            id: 10,
            name: 'The Majestic Theatre',
        },
        {
            id: 11,
            name: 'Velvet Lounge Cinema',
        },
    ];

    return {
        result: theaters,
        rowCount: theaters.length,
    };
}

export async function getTheaterById(id: number): Promise<Theater> {
    const theater: Theater = {
        id,
        name: 'Mascacine',
    };

    return theater;
}

export async function createTheater(data: CreateTheater): Promise<Theater> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const theater: Theater = {
        id: Math.floor(Math.random() * 9) + 1,
        ...data,
    };

    return theater;
}
