import type { PaginatedData } from '@/types/table.type';
import type { Movie, MovieFilters } from '../types/movie.type';

export async function getMovies(
    filtersAndPagination: MovieFilters
): Promise<PaginatedData<Movie>> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const movies: Movie[] = [
        {
            id: 1,
            title: 'The Wild Robot',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/The_Wild_Robot_poster.jpg/220px-The_Wild_Robot_poster.jpg',
        },
        {
            id: 2,
            title: 'Interstellar',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Interstellar_film_poster.jpg/220px-Interstellar_film_poster.jpg',
        },
        {
            id: 3,
            title: 'Dune: Part Two',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Dune_Part_Two_poster.jpeg/220px-Dune_Part_Two_poster.jpeg',
        },
        {
            id: 4,
            title: 'Spider-Man: Across the Spider-Verse',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Spider-Man_Across_the_Spider-Verse_poster.jpg/220px-Spider-Man_Across_the_Spider-Verse_poster.jpg',
        },
        {
            id: 5,
            title: 'The Dark Knight',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/The_Dark_Knight_%282008_film%29_poster.jpg/220px-The_Dark_Knight_%282008_film%29_poster.jpg',
        },
        {
            id: 6,
            title: 'Blade Runner 2049',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Blade_Runner_2049_poster.png/220px-Blade_Runner_2049_poster.png',
        },
        {
            id: 7,
            title: 'Oppenheimer',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg',
        },
        {
            id: 8,
            title: 'Mad Max: Fury Road',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Mad_Max_Fury_Road.jpg/220px-Mad_Max_Fury_Road.jpg',
        },
        {
            id: 9,
            title: 'Everything Everywhere All at Once',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Everything_Everywhere_All_at_Once.jpg/220px-Everything_Everywhere_All_at_Once.jpg',
        },
        {
            id: 10,
            title: 'The Matrix',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg',
        },
        {
            id: 11,
            title: 'Arrival',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Arrival%2C_Movie_Poster.jpg/220px-Arrival%2C_Movie_Poster.jpg',
        },
    ];

    return {
        result: movies,
        rowCount: movies.length,
    };
}

export const createMovie = async (data: Movie) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newMovie = {
        ...data,
        id: Math.floor(Math.random() * 10) + 1,
    };

    return newMovie;
};

export async function getMovieById(id: number): Promise<Movie> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const movie: Movie = {
        id,
        title: 'The Wild Robot',
        poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/The_Wild_Robot_logo.png/250px-The_Wild_Robot_logo.png',
    };

    return movie;
}
