import { apiClient } from '@/api/apiClient';
import {
    type CreateGenre,
    type Genre,
    type GenreFilters,
    type UpdateGenre,
} from '../types/genre.type';
import type { Filters, PaginatedData } from '@/types/table.type';

export async function getGenres(
    filtersAndPagination: GenreFilters
): Promise<PaginatedData<Genre>> {
    // const response = await apiClient.get<Genre[]>('/genres', {
    //     params: filtersAndPagination,
    //     headers: {
    //         'total-records-count': 'true',
    //     },
    // });

    const data = [
        {
            id: 1,
            name: 'Inception',
            poster: 'https://example.com/inception.jpg',
        },
        {
            id: 2,
            name: 'Interstellar',
            poster: 'https://example.com/interstellar.jpg',
        },
        {
            id: 3,
            name: 'The Dark Knight',
            poster: 'https://example.com/dark-knight.jpg',
        },
        { id: 4, name: 'Memento', poster: 'https://example.com/memento.jpg' },
        {
            id: 5,
            name: 'The Prestige',
            poster: 'https://example.com/prestige.jpg',
        },
        { id: 6, name: 'Tenet', poster: 'https://example.com/tenet.jpg' },
        { id: 7, name: 'Dunkirk', poster: 'https://example.com/dunkirk.jpg' },
        {
            id: 8,
            name: 'Batman Begins',
            poster: 'https://example.com/batman-begins.jpg',
        },
        {
            id: 9,
            name: 'The Dark Knight Rises',
            poster: 'https://example.com/tkk-rises.jpg',
        },
        {
            id: 10,
            name: 'Following',
            poster: 'https://example.com/following.jpg',
        },
        {
            id: 11,
            name: 'Oppenheimer',
            poster: 'https://example.com/oppenheimer.jpg',
        },
    ];

    return {
        // result: response.data,
        result: data,
        // rowCount: parseInt(response.headers['total-records-count'] || '0'),
        rowCount: 11,
    };
}

export async function createGenre(data: CreateGenre): Promise<Genre> {
    // const response = await apiClient.post<CreateGenre>('/genres', data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newGenre: Genre = {
        id: Math.floor(Math.random() * 9) + 1,
        ...data,
    };

    return newGenre;
}

export async function getGenreById(id: number): Promise<Genre> {
    // const response = await apiClient.get<Genre>(`/genres/${id}`);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const data: Genre = {
        id,
        name: 'Inception',
    };

    return data;
}

export async function editGenre(data: UpdateGenre): Promise<UpdateGenre> {
    // const response = await apiClient.put<Genre>(`/genres/${data.id}`, data);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const editedGenre: UpdateGenre = {
        ...data,
    };

    return editedGenre;
}
