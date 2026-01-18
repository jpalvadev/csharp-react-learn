import { apiClient } from '@/api/apiClient';
import type { PaginatedData } from '@/types/table.type';
import {
    type CreateGenre,
    type Genre,
    type GenreFilters,
    type UpdateGenre,
} from '../types/genre.type';

export async function getGenres(
    filtersAndPagination: GenreFilters,
): Promise<PaginatedData<Genre>> {
    const response = await apiClient.get<Genre[]>('/genres', {
        params: filtersAndPagination,
        headers: {
            'total-records-count': 'true',
        },
    });

    return {
        result: response.data,
        rowCount: parseInt(response.headers['total-records-count'] || '0'),
    };
}

export async function createGenre(data: CreateGenre): Promise<Genre> {
    const response = await apiClient.post<Genre>('/genres', data);

    return response.data;
}

export async function getGenreById(id: number): Promise<Genre> {
    const response = await apiClient.get<Genre>(`/genres/${id}`);

    return response.data;
}

export async function editGenre(id: number, genre: UpdateGenre): Promise<void> {
    // backend 204 No Content
    await apiClient.put(`/genres/${id}`, genre);
}

export async function deleteGenre(id: number): Promise<void> {
    await apiClient.delete(`/genres/${id}`);
}
