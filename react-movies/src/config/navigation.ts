import {
    HomeIcon,
    InfoIcon,
    // UsersIcon,
    ListIcon,
    ChartNoAxesCombinedIcon,
    ClapperboardIcon,
    SpeechIcon,
    TheaterIcon,
    type LucideProps,
    FactoryIcon,
} from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { FileRouteTypes } from '../routeTree.gen';

type INavigationConfig = {
    title?: string;
    menus?: INavigationConfig[];
    to?: FileRouteTypes['to'];
    icon?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >;
    badge?: number;
};

export const navigationConfig: INavigationConfig[] = [
    {
        menus: [
            {
                title: 'Dashboard',
                to: '/dashboard',
                icon: ChartNoAxesCombinedIcon,
                badge: 5,
            },
        ],
    },
    {
        title: 'Menus',
        menus: [
            { title: 'Home', to: '/', icon: HomeIcon },
            { title: 'About Us', to: '/about', icon: InfoIcon },
            {
                title: 'Genres',
                icon: ListIcon,
                menus: [
                    { title: 'Genres List', to: '/genres' },
                    { title: 'Create Genre', to: '/genres/new' },
                ],
            },
            {
                title: 'Movies',
                icon: ClapperboardIcon,
                menus: [
                    { title: 'Movies List', to: '/movies' },
                    { title: 'Create Movie', to: '/movies/new' },
                ],
            },
            {
                title: 'Actors',
                icon: SpeechIcon,
                menus: [
                    { title: 'Actors List', to: '/actors' },
                    { title: 'Create Actor', to: '/actors/new' },
                ],
            },
            {
                title: 'Theaters',
                icon: TheaterIcon,
                menus: [
                    { title: 'Theaters List', to: '/theaters' },
                    { title: 'Create Theater', to: '/theaters/new' },
                ],
            },
            {
                title: 'Tratamientos Equipo',
                icon: FactoryIcon,
                menus: [
                    { title: 'Listado', to: '/tratamientosEquipo' },
                    { title: 'Crear Registro', to: '/tratamientosEquipo/new' },
                ],
            },
        ],
    },
];
