import type { PaginatedData } from '@/types/table.type';
import type { Movie, MovieFilters } from '../types/movie.type';

export async function getMovies(
    filtersAndPagination: MovieFilters
): Promise<PaginatedData<Movie>> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const movies: Movie[] = [
        {
            id: 1,
            title: 'The Wild Robot',
            releaseDate: new Date('2024-09-27'),
            picture:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/The_Wild_Robot_logo.png/250px-The_Wild_Robot_logo.png',
            trailer: 'https://www.youtube.com/watch?v=njPNg0A9VpY',
        },
        {
            id: 2,
            title: 'Interstellar',
            releaseDate: new Date('2014-11-07'),
            picture:
                'https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Interstellar_film_poster.jpg/220px-Interstellar_film_poster.jpg',
            trailer: 'https://youtube.com/watch?v=677i4303',
        },
        {
            id: 3,
            title: 'Dune: Part Two',
            releaseDate: new Date('2024-03-01'),
            picture:
                'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Dune_Part_Two_poster.jpeg/220px-Dune_Part_Two_poster.jpeg',
            trailer: 'https://youtube.com/watch?v=677i4303',
        },
        {
            id: 4,
            title: 'Spider-Man: Across the Spider-Verse',
            releaseDate: new Date('2023-06-02'),
            picture:
                'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Spider-Man_Across_the_Spider-Verse_poster.jpg/220px-Spider-Man_Across_the_Spider-Verse_poster.jpg',
            trailer: 'https://youtube.com/watch?v=677i4303',
        },
        {
            id: 5,
            title: 'The Dark Knight',
            releaseDate: new Date('2008-07-18'),
            picture:
                'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/The_Dark_Knight_%282008_film%29_poster.jpg/220px-The_Dark_Knight_%282008_film%29_poster.jpg',
            trailer: 'https://youtube.com/watch?v=677i4303',
        },
        {
            id: 6,
            title: 'Blade Runner 2049',
            releaseDate: new Date('2017-10-06'),
            picture:
                'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Blade_Runner_2049_poster.png/220px-Blade_Runner_2049_poster.png',
            trailer: 'https://youtube.com/watch?v=677i4303',
        },
        {
            id: 7,
            title: 'Oppenheimer',
            releaseDate: new Date('2023-07-21'),
            picture:
                'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg',
            trailer: 'https://youtube.com/watch?v=677i4303',
        },
        {
            id: 8,
            title: 'Mad Max: Fury Road',
            releaseDate: new Date('2015-05-15'),
            picture:
                'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Mad_Max_Fury_Road.jpg/220px-Mad_Max_Fury_Road.jpg',
            trailer: 'https://youtube.com/watch?v=677i4303',
        },
        {
            id: 9,
            title: 'Everything Everywhere All at Once',
            releaseDate: new Date('2022-03-25'),
            picture:
                'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Everything_Everywhere_All_at_Once.jpg/220px-Everything_Everywhere_All_at_Once.jpg',
            trailer: 'https://youtube.com/watch?v=677i4303',
        },
        {
            id: 10,
            title: 'The Matrix',
            releaseDate: new Date('1999-03-31'),
            picture:
                'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg',
            trailer: 'https://youtube.com/watch?v=677i4303',
        },
        {
            id: 11,
            title: 'Arrival',
            releaseDate: new Date('2016-11-11'),
            picture:
                'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Arrival%2C_Movie_Poster.jpg/220px-Arrival%2C_Movie_Poster.jpg',
            trailer: 'https://youtube.com/watch?v=677i4303',
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
        releaseDate: new Date('2024-09-27'),
        picture:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/The_Wild_Robot_logo.png/250px-The_Wild_Robot_logo.png',
        trailer: 'https://www.youtube.com/watch?v=njPNg0A9VpY',
    };

    return movie;
}
