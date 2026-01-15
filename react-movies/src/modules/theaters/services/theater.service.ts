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
            location: [{ lat: -34.6037, lng: -58.3816 }],
        },
        {
            id: 2,
            name: 'Starlight Multiplex',
            location: [{ lat: -34.6083, lng: -58.3701 }],
        },
        {
            id: 3,
            name: 'The Royal Playhouse',
            location: [{ lat: -34.6083, lng: -58.3701 }],
        },
        {
            id: 4,
            name: 'Neon City IMAX',
            location: [{ lat: -34.6083, lng: -58.3701 }],
        },
        {
            id: 5,
            name: 'Vintage Film House',
            location: [{ lat: -34.6083, lng: -58.3701 }],
        },
        {
            id: 6,
            name: 'Horizon Screens',
            location: [{ lat: -34.6083, lng: -58.3701 }],
        },
        {
            id: 7,
            name: 'Classic Apollo',
            location: [{ lat: -34.6083, lng: -58.3701 }],
        },
        {
            id: 8,
            name: 'Silver Screen Center',
            location: [{ lat: -34.6083, lng: -58.3701 }],
        },
        {
            id: 9,
            name: 'Metro Plaza Cinema',
            location: [{ lat: -34.6083, lng: -58.3701 }],
        },
        {
            id: 10,
            name: 'The Majestic Theatre',
            location: [{ lat: -34.6083, lng: -58.3701 }],
        },
        {
            id: 11,
            name: 'Velvet Lounge Cinema',
            location: [{ lat: -34.6083, lng: -58.3701 }],
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
        location: [
            {
                lat: -32.454198638445696,
                lng: -60.88872677041063,
            },
        ],
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
