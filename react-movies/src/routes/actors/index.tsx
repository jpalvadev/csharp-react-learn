import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo } from 'react';

import GenericTable, {
    DEFAULT_PAGE_INDEX,
    DEFAULT_PAGE_SIZE,
} from '@/components/GenericTable';
import { useFilters } from '@/hooks/useFilters';
import { sortByToState, stateToSortBy } from '@/utils/tableSortMapper';
import { Button } from '@/components/ui/button';
import { ACTOR_COLUMNS } from '@/modules/actors/actorColumns';
import { getActors } from '@/modules/actors/services/actor.service';
import { type ActorFilters } from '@/modules/actors/types/actor.type';
import Loading from '@/components/Loading';

export const Route = createFileRoute('/actors/')({
    component: ActorsRoute,
    validateSearch: () => ({}) as ActorFilters,
});

function ActorsRoute() {
    const { filters, resetFilters, setFilters } = useFilters(Route.id);

    const { data, isPending } = useQuery({
        queryKey: ['actors', filters],
        queryFn: () => getActors(filters),
        placeholderData: keepPreviousData,
    });

    const paginationState = {
        pageIndex: filters.pageIndex ?? DEFAULT_PAGE_INDEX,
        pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
    };
    const sortingState = sortByToState(filters.sortBy);
    const columns = useMemo(() => ACTOR_COLUMNS, []);

    if (isPending) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <h1 className="text-2xl font-semibold mb-1">Actors</h1>

                    <Button asChild>
                        <Link to="/actors/new">Nuevo</Link>
                    </Button>
                </div>

                {Object.keys(filters).length > 0 && (
                    <Button
                        onClick={resetFilters}
                        disabled={Object.keys(filters).length === 0}
                        variant="outline"
                    >
                        Limpiar filtros
                    </Button>
                )}
            </div>
            <GenericTable
                data={data?.result ?? []}
                columns={columns}
                pagination={paginationState}
                paginationOptions={{
                    onPaginationChange: (pagination) => {
                        setFilters(
                            typeof pagination === 'function'
                                ? pagination(paginationState)
                                : pagination,
                        );
                    },
                    rowCount: data?.rowCount,
                }}
                filters={filters}
                onFilterChange={(filters) => setFilters(filters)}
                sorting={sortingState}
                onSortingChange={(updaterOrValue) => {
                    const newSortingState =
                        typeof updaterOrValue === 'function'
                            ? updaterOrValue(sortingState)
                            : updaterOrValue;
                    return setFilters({
                        sortBy: stateToSortBy(newSortingState),
                    });
                }}
            />
            <div className="flex items-center gap-2"></div>
            <pre>{JSON.stringify(filters, null, 2)}</pre>
        </div>
    );
}
