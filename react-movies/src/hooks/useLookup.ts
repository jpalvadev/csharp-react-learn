import { useQuery } from '@tanstack/react-query';
import type { Lookup } from '@/types/lookup.type';
import type { PaginatedData } from '@/types/table.type';

export function useLookup<T>(
    cacheKey: string,
    fetchFn: (params: Record<string, string>) => Promise<PaginatedData<T>>,
    searchValue: string,
    mapConfig: { value: keyof T; label: keyof T }
) {
    const query = useQuery({
        queryKey: [cacheKey, 'lookup', searchValue],
        // el label es la prop con la que decimos que busque. Por ejemplo "name" o "apellido"
        queryFn: () =>
            fetchFn({ [mapConfig.label]: searchValue, pageSize: '10' }), // llamamos a la funcion cada vez que cambia el filter
        placeholderData: (previousData) => previousData, // Evita que parpadee la UI
    });

    const lookups: Lookup[] =
        query.data?.result.map((item) => ({
            label: item[mapConfig.label] as unknown as string,
            value: item[mapConfig.value] as unknown as string | number,
        })) ?? [];

    return {
        lookups,
        isPending: query.isPending,
    };
}
