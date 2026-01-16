import GenericTable, {
    DEFAULT_PAGE_INDEX,
    DEFAULT_PAGE_SIZE,
} from '@/components/GenericTable';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { useFilters } from '@/hooks/useFilters';
import { getTratamientosEquipo } from '@/modules/tratamientosEquipo/services/tratamientoEquipo.service';
import { TRATAMIENTOEQUIPO_COLUMNS } from '@/modules/tratamientosEquipo/tratamientoEquipoColumns';
import type { TratamientoEquipoFilters } from '@/modules/tratamientosEquipo/types/tratamientoEquipo.type';
import { sortByToState, stateToSortBy } from '@/utils/tableSortMapper';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/tratamientosEquipo/')({
    component: RouteComponent,
    validateSearch: () => ({}) as TratamientoEquipoFilters,
});

function RouteComponent() {
    const { filters, resetFilters, setFilters } = useFilters(Route.id);

    const { data, isPending } = useQuery({
        queryKey: ['genres', filters],
        queryFn: () => getTratamientosEquipo(filters),
        placeholderData: keepPreviousData,
    });

    const paginationState = {
        pageIndex: filters.pageIndex ?? DEFAULT_PAGE_INDEX,
        pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
    };
    const sortingState = sortByToState(filters.sortBy);
    const columns = useMemo(() => TRATAMIENTOEQUIPO_COLUMNS, []);

    if (isPending) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <h1 className="text-2xl font-semibold mb-1">
                        Tratamiento de Equipos
                    </h1>

                    <Button asChild>
                        <Link to="/tratamientosEquipo/new">Nuevo</Link>
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
