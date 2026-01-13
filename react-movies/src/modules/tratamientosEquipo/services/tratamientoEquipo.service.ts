import type { PaginatedData } from '@/types/table.type';
import type {
    CreateTratamientoEquipo,
    TratamientoEquipo,
    TratamientoEquipoFilters,
} from '../types/tratamientoEquipo.type';

export async function getTratamientosEquipo(
    filtersAndPagination: TratamientoEquipoFilters
): Promise<PaginatedData<TratamientoEquipo>> {
    // await new Promise((resolve) => setTimeout(resolve, 1500));

    const tratamientosEquipo: TratamientoEquipo[] = [
        {
            id: 1,
            fecha: new Date('2026-01-10'),
            correctivo: false,
            preventivo: true,
            actividad: 'Cambio de aceite y filtros',
            observaciones: 'Mantenimiento de rutina realizado con éxito.',
            operador: 'Juan Pérez',
        },
        {
            id: 2,
            fecha: new Date('2026-01-08'),
            correctivo: true,
            preventivo: false,
            actividad: 'Reparación de motor de arranque',
            observaciones: 'Se reemplazaron las escobillas desgastadas.',
            operador: 'Ricardo Gómez',
        },
        {
            id: 3,
            fecha: new Date('2025-12-28'),
            correctivo: false,
            preventivo: true,
            actividad: 'Calibración de sensores térmicos',
            observaciones: undefined,
            operador: 'Marta Sánchez',
        },
        {
            id: 4,
            fecha: new Date('2026-01-05'),
            correctivo: true,
            preventivo: false,
            actividad: 'Cambio de mangueras de alta presión',
            observaciones: 'Presentaban grietas por uso intensivo.',
            operador: 'Juan Pérez',
        },
        {
            id: 5,
            fecha: new Date('2025-11-15'),
            correctivo: false,
            preventivo: true,
            actividad: 'Limpieza profunda de circuitos',
            observaciones: 'Se recomienda repetir en 6 meses.',
            operador: 'Lucía Fernández',
        },
        {
            id: 6,
            fecha: new Date('2026-01-11'),
            correctivo: false,
            preventivo: true,
            actividad: 'Engrase de rodamientos principales',
            observaciones: 'Sin novedades.',
            operador: 'Carlos Torres',
        },
        {
            id: 7,
            fecha: new Date('2026-01-02'),
            correctivo: true,
            preventivo: false,
            actividad: 'Soldadura de soporte estructural',
            observaciones: 'Falla detectada durante la operación matutina.',
            operador: 'Ricardo Gómez',
        },
        {
            id: 8,
            fecha: new Date('2025-12-12'),
            correctivo: false,
            preventivo: true,
            actividad: 'Inspección de seguridad anual',
            observaciones: 'Equipo cumple con todas las normativas.',
            operador: 'Marta Sánchez',
        },
        {
            id: 9,
            fecha: new Date('2026-01-09'),
            correctivo: false,
            preventivo: true,
            actividad: 'Actualización de firmware de control',
            observaciones: 'Mejora en la eficiencia energética.',
            operador: 'Sofía Martínez',
        },
        {
            id: 10,
            fecha: new Date('2025-10-20'),
            correctivo: true,
            preventivo: false,
            actividad: 'Reemplazo de pantalla LCD',
            observaciones: 'Daño por impacto accidental.',
            operador: 'Carlos Torres',
        },
        {
            id: 11,
            fecha: new Date('2026-01-01'),
            correctivo: false,
            preventivo: true,
            actividad: 'Ajuste de tensión de correas',
            observaciones: 'Mantenimiento preventivo de inicio de año.',
            operador: 'Lucía Fernández',
        },
    ];

    return {
        result: tratamientosEquipo,
        rowCount: tratamientosEquipo.length,
    };
}

export async function createTratamientoEquipo(
    data: CreateTratamientoEquipo
): Promise<TratamientoEquipo> {
    // const response = await apiClient.post<CreateTratamientoEquipo>('/tratamientoEquipos', data);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newTratamientoEquipo: TratamientoEquipo = {
        id: Math.floor(Math.random() * 9) + 1,
        ...data,
    };

    return newTratamientoEquipo;
}
