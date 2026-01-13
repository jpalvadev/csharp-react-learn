import GenericTable, {
    DEFAULT_PAGE_INDEX,
    DEFAULT_PAGE_SIZE,
} from '@/components/GenericTable';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { useFilters } from '@/hooks/useFilters';
import { getTheaters } from '@/modules/theaters/services/theater.service';
import { THEATER_COLUMNS } from '@/modules/theaters/theaterColumns';
import type { TheaterFilters } from '@/modules/theaters/types/theater.type';
import { sortByToState, stateToSortBy } from '@/utils/tableSortMapper';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { useMemo } from 'react';

export const Route = createFileRoute('/theaters/')({
    component: TheatersRoute,
    validateSearch: () => ({}) as TheaterFilters,
});

function TheatersRoute() {
    const { filters, resetFilters, setFilters } = useFilters(Route.id);

    const { data, isPending } = useQuery({
        queryKey: ['theaters', filters],
        queryFn: () => getTheaters(filters),
        placeholderData: keepPreviousData,
    });

    const paginationState = {
        pageIndex: filters.pageIndex ?? DEFAULT_PAGE_INDEX,
        pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
    };
    const sortingState = sortByToState(filters.sortBy);
    const columns = useMemo(() => THEATER_COLUMNS, []);

    if (isPending) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <h1 className="text-2xl font-semibold mb-1">Theaters</h1>

                    <Button asChild>
                        <Link to="/theaters/new">Nuevo</Link>
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
                                : pagination
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
