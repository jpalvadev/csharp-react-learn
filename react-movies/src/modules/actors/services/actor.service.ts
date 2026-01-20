import type { PaginatedData } from '@/types/table.type';
import type {
    Actor,
    ActorFilters,
    CreateActor,
    UpdateActor,
} from '../types/actor.type';
import { apiClient } from '@/api/apiClient';

export async function getActors(
    filtersAndPagination: ActorFilters,
): Promise<PaginatedData<Actor>> {
    const response = await apiClient<Actor[]>('/actors', {
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

export async function createActor(actor: CreateActor) {
    const response = await apiClient.postForm('/actors', actor);
    return response.data;
}

export async function getActorById(id: number): Promise<Actor> {
    const response = await apiClient.get<Actor>(`/actors/${id}`);
    return response.data;
}

export async function editActor(id: number, actor: UpdateActor): Promise<void> {
    // backend 204 No Content
    await apiClient.putForm(`/actors/${id}`, actor);
}

export async function deleteActor(id: number): Promise<void> {
    await apiClient.delete(`/actors/${id}`);
}
